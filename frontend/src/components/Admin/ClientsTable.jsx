import { motion } from 'framer-motion';
import { HiPencil, HiTrash, HiUsers } from 'react-icons/hi2';

const ClientsTable = ({ clients, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <HiUsers className="w-5 h-5 text-purple-600" />
          Existing Clients
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {clients.length} {clients.length === 1 ? 'client' : 'clients'} total
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Photo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Designation
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((c) => (
              <motion.tr
                key={c._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(249, 250, 251, 0.5)' }}
                className="transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-200">
                      <img
                        src={c.imageUrl}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-900">{c.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{c.designation}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 max-w-md line-clamp-2">
                    {c.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <motion.button
                      onClick={() => onEdit(c)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiPencil className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => onDelete(c._id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <HiTrash className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <HiUsers className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">No clients yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add your first client testimonial to get started
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

export default ClientsTable;