import { motion } from 'framer-motion';
import { HiEnvelope, HiNewspaper } from 'react-icons/hi2';

const ContactsTable = ({ contacts }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <HiEnvelope className="w-5 h-5 text-pink-600" />
          Contact Form Entries
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {contacts.length} {contacts.length === 1 ? 'entry' : 'entries'} total
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Mobile
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((c) => (
              <motion.tr
                key={c._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                className="transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{c.fullName}</div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={`mailto:${c.email}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {c.email}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{c.mobile}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{c.city}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </td>
              </motion.tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <HiEnvelope className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">No contact entries yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Entries will appear here when visitors submit the contact form
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsTable;
