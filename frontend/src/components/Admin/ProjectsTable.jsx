const ProjectsTable = ({ projects, onEdit, onDelete }) => {
  const handleEditClick = (project) => {
    if (onEdit) onEdit(project);
  };

  const handleDeleteClick = (id) => {
    if (onDelete) onDelete(id);
  };

  return (
    <div className="mt-6 bg-white rounded-2xl shadow p-4">
      <h2 className="font-semibold mb-3 text-sm">Existing Projects</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-gray-500">
              <th className="py-2 pr-2">Image</th>
              <th className="py-2 pr-2">Name</th>
              <th className="py-2 pr-2">Description</th>
              <th className="py-2 pr-2">Created</th>
              <th className="py-2 pr-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b last:border-0">
                <td className="py-2 pr-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="py-2 pr-2">{p.name}</td>
                <td className="py-2 pr-2 text-xs text-gray-600">
                  {p.description}
                </td>
                <td className="py-2 pr-2 text-xs text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 pr-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditClick(p)}
                      className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(p._id)}
                      className="px-2 py-1 text-xs rounded-full bg-red-50 text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
