// src/contacts/contacts.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { QueryContactDto } from './dto/query-contact.dto';

@Controller('contacts')
@UseGuards(JwtAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createContactDto: CreateContactDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const photo = file ? `/uploads/${file.filename}` : null;
    return this.contactsService.create(createContactDto, req.user.userId, photo);
  }

  @Get()
  findAll(@Request() req, @Query() query: QueryContactDto) {
    return this.contactsService.findAll(req.user.userId, req.user.role, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.contactsService.findOne(id, req.user.userId, req.user.role);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const photo = file ? `/uploads/${file.filename}` : null;
    return this.contactsService.update(
      id,
      updateContactDto,
      req.user.userId,
      req.user.role,
      photo,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.contactsService.remove(id, req.user.userId, req.user.role);
  }
}