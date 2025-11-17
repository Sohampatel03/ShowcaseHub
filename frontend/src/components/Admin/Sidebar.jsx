import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="w-56 bg-white border-r min-h-screen p-4 flex flex-col">
      <div className="font-bold text-lg mb-6">Admin Panel</div>
      <nav className="flex-1 space-y-2 text-sm">
        <button
          className={`w-full text-left px-3 py-2 rounded-lg ${
            activeTab === "projects"
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded-lg ${
            activeTab === "clients"
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("clients")}
        >
          Clients
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded-lg ${
            activeTab === "contacts"
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("contacts")}
        >
          Contact Form Details
        </button>
        <button
          className={`w-full text-left px-3 py-2 rounded-lg ${
            activeTab === "subscribers"
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-50"
          }`}
          onClick={() => setActiveTab("subscribers")}
        >
          Subscribers
        </button>
      </nav>
      <button
        onClick={handleLogout}
        className="mt-4 px-3 py-2 text-sm rounded-lg bg-red-50 text-red-600"
      >
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
