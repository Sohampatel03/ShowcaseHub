const ClientsTable = ({ clients, onEdit, onDelete }) => {
  const handleEditClick = (client) => {
    if (onEdit) onEdit(client);
  };

  const handleDeleteClick = (id) => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-3 text-sm">Existing Clients</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-gray-500">
              <th className="py-2 pr-2">Image</th>
              <th className="py-2 pr-2">Name</th>
              <th className="py-2 pr-2">Designation</th>
              <th className="py-2 pr-2">Feedback</th>
              <th className="py-2 pr-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c._id} className="border-b last:border-0">
                <td className="py-2 pr-2">
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="w-12 h-12 object-cover rounded-full"
                  />
                </td>
                <td className="py-2 pr-2">{c.name}</td>
                <td className="py-2 pr-2 text-xs text-gray-600">
                  {c.designation}
                </td>
                <td className="py-2 pr-2 text-xs text-gray-600">
                  {c.description}
                </td>
                <td className="py-2 pr-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(c)}
                      className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(c._id)}
                      className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No clients yet.
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
