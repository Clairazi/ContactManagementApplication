// src/contacts/contacts.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto, userId: string, photo?: string) {
    const contact = this.contactsRepository.create({
      ...createContactDto,
      userId,
      photo,
    });
    
    return this.contactsRepository.save(contact);
  }

  async findAll(userId: string, role: string, query: QueryContactDto) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'createdAt',
      sortOrder = 'DESC',
    } = query;

    const skip = (page - 1) * limit;
    
    const queryBuilder = this.contactsRepository.createQueryBuilder('contact');

    // Admin can see all contacts, users only their own
    if (role !== 'admin') {
      queryBuilder.where('contact.userId = :userId', { userId });
    }

    // Search functionality
    if (search) {
      queryBuilder.andWhere(
        '(contact.name ILIKE :search OR contact.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Sorting
    queryBuilder.orderBy(`contact.${sortBy}`, sortOrder as 'ASC' | 'DESC');

    // Pagination
    queryBuilder.skip(skip).take(limit);

    const [contacts, total] = await queryBuilder.getManyAndCount();

    return {
      success: true,
      data: contacts,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string, role: string) {
    const contact = await this.contactsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Check ownership unless admin
    if (role !== 'admin' && contact.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact');
    }

    return {
      success: true,
      data: contact,
    };
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    userId: string,
    role: string,
    photo?: string,
  ) {
    const contact = await this.contactsRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Check ownership unless admin
    if (role !== 'admin' && contact.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact');
    }

    const updatedData = { ...updateContactDto };
    if (photo) {
      updatedData['photo'] = photo;
    }

    await this.contactsRepository.update(id, updatedData);
    
    const updatedContact = await this.contactsRepository.findOne({ where: { id } });
    
    return {
      success: true,
      data: updatedContact,
    };
  }

  async remove(id: string, userId: string, role: string) {
    const contact = await this.contactsRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }

    // Check ownership unless admin
    if (role !== 'admin' && contact.userId !== userId) {
      throw new ForbiddenException('You do not have access to this contact');
    }

    await this.contactsRepository.delete(id);
    
    return {
      success: true,
      message: 'Contact deleted successfully',
    };
  }
}