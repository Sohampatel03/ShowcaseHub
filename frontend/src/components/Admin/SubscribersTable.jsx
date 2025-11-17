const SubscribersTable = ({ subscribers }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-xs text-gray-500">
              <th className="py-2 pr-2">Email</th>
              <th className="py-2 pr-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id} className="border-b last:border-0">
                <td className="py-2 pr-2 text-xs">{s.email}</td>
                <td className="py-2 pr-2 text-xs text-gray-500">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr>
                <td colSpan="2" className="py-3 text-center text-gray-500">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscribersTable;
