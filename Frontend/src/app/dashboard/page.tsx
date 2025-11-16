// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../components/ThemeProvider';
import ContactModal from '../../components/ContactModal';
import ContactCard from '../../components/ContactCard';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    fetchContacts();
  }, [search, sortBy, sortOrder, page]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contacts', {
        params: { search, sortBy, sortOrder, page, limit: 9 },
      });
      setContacts(response.data.data);
      setTotalPages(response.data.meta.totalPages);
    } catch (error: any) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      await api.delete(`/contacts/${id}`);
      toast.success('Contact deleted successfully');
      fetchContacts();
    } catch (error: any) {
      toast.error('Failed to delete contact');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingContact(null);
    fetchContacts();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Contact Management
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user?.email} ({user?.role})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="createdAt-DESC">Newest First</option>
              <option value="createdAt-ASC">Oldest First</option>
              <option value="name-ASC">Name A-Z</option>
              <option value="name-DESC">Name Z-A</option>
            </select>
          </div>
          <button
            onClick={handleAddContact}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Add Contact
          </button>
        </div>

        {/* Contacts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No contacts found. Add your first contact!
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  onEdit={handleEditContact}
                  onDelete={handleDeleteContact}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 text-gray-900 dark:text-white"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg disabled:opacity-50 text-gray-900 dark:text-white"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Contact Modal */}
      {isModalOpen && (
        <ContactModal
          contact={editingContact}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}