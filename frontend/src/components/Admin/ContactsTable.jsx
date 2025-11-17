const ContactsTable = ({ contacts }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-gray-500">
              <th className="py-2 pr-2">Name</th>
              <th className="py-2 pr-2">Email</th>
              <th className="py-2 pr-2">Mobile</th>
              <th className="py-2 pr-2">City</th>
              <th className="py-2 pr-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-b last:border-0">
                <td className="py-2 pr-2">{c.fullName}</td>
                <td className="py-2 pr-2 text-xs">{c.email}</td>
                <td className="py-2 pr-2 text-xs">{c.mobile}</td>
                <td className="py-2 pr-2 text-xs">{c.city}</td>
                <td className="py-2 pr-2 text-xs text-gray-500">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="py-3 text-center text-gray-500">
                  No contact entries yet.
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
