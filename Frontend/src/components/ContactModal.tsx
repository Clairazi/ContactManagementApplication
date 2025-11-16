// src/components/ContactModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import api from '../lib/api';

interface ContactModalProps {
  contact: any;
  onClose: () => void;
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  photo?: FileList;
}

export default function ContactModal({ contact, onClose }: ContactModalProps) {
  const [loading, setLoading] = useState(false);
  // const [preview, setPreview] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
  contact?.photo ? contact.photo : null
  );
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactForm>({
    defaultValues: contact || {},
  });

  const photoFile = watch('photo');

  // useEffect(() => {
  //   if (photoFile && photoFile.length > 0) {
  //     const file = photoFile[0];
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }, [photoFile]);

  useEffect(() => {
  if (!photoFile || photoFile.length === 0) {
    // No new file selected; keep existing preview (from contact.photo)
    return;
  }

  const file = photoFile[0];
  if (!(file instanceof File)) {
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setPreview(reader.result as string);
  };
  reader.readAsDataURL(file);

  // optional cleanup
  return () => {
    reader.onloadend = null;
  };
}, [photoFile]);


  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      
      if (data.photo && data.photo.length > 0) {
        formData.append('photo', data.photo[0]);
      }

      if (contact) {
        await api.put(`/contacts/${contact.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Contact updated successfully');
      } else {
        await api.post('/contacts', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Contact created successfully');
      }
      
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {contact ? 'Edit Contact' : 'Add Contact'}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <input
              {...register('name', { required: 'Name is required' })}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Photo
            </label>
            <input
              {...register('photo')}
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-full object-cover"
              />
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}