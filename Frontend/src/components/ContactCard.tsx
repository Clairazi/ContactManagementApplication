// src/components/ContactCard.tsx
interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo: string | null;
    createdAt: string;
  };
  onEdit: (contact: any) => void;
  onDelete: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const API_BASE = API_URL.replace(/\/api$/, '');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        {contact.photo ? (
          <img
            src={`${API_BASE}${contact.photo}`}
            alt={contact.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {contact.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(contact.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          📧 {contact.email}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          📱 {contact.phone}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(contact)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}