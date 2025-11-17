import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { HiFolder, HiUsers, HiEnvelope, HiNewspaper, HiArrowRightOnRectangle } from 'react-icons/hi2';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const menuItems = [
    { id: 'projects', label: 'Projects', icon: HiFolder },
    { id: 'clients', label: 'Clients', icon: HiUsers },
    { id: 'contacts', label: 'Contact Entries', icon: HiEnvelope },
    { id: 'subscribers', label: 'Subscribers', icon: HiNewspaper },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-900">Admin Panel</h2>
            <p className="text-xs text-gray-500">Content Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ x: isActive ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="ml-auto w-2 h-2 rounded-full bg-white"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Stats Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-lg">📊</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Dashboard</p>
              <p className="text-lg font-bold text-gray-900">Overview</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            View Live Site →
          </a>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiArrowRightOnRectangle className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default Sidebar;