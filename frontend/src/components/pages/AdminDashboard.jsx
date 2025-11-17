import { useEffect, useState } from "react";
import { motion ,AnimatePresence } from 'framer-motion';
import Sidebar from "../Admin/Sidebar";
import ProjectsTable from "../Admin/ProjectsTable";
import ClientsTable from "../Admin/ClientsTable";
import ContactsTable from "../Admin/ContactsTable";
import SubscribersTable from "../Admin/SubscribersTable";
import ProjectForm from "../Admin/ProjectForm";
import ClientForm from "../Admin/ClientForm";
import ProjectEditModal from "../Admin/ProjectEditModal";
import ClientEditModal from "../Admin/ClientEditModal";

import {
  fetchAdminProjects,
  deleteProject,
} from "../../api/projectsApi";
import {
  fetchAdminClients,
  deleteClient,
} from "../../api/clientsApi";
import { fetchContacts } from "../../api/contactApi";
import { fetchSubscribers } from "../../api/subscribersApi";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingProject, setEditingProject] = useState(null);
  const [editingClient, setEditingClient] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const loadData = async () => {
    setLoading(true);
    try {
      const [proj, cls, cts, subs] = await Promise.all([
        fetchAdminProjects().catch(() => []),
        fetchAdminClients().catch(() => []),
        fetchContacts().catch(() => []),
        fetchSubscribers().catch(() => []),
      ]);
      setProjects(proj);
      setClients(cls);
      setContacts(cts);
      setSubscribers(subs);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEditProject = (project) => {
    setEditingProject(project);
  };

  const handleDeleteProject = async (id) => {
    const ok = window.confirm("Delete this project?");
    if (!ok) return;
    try {
      await deleteProject(id);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
  };

  const handleDeleteClient = async (id) => {
    const ok = window.confirm("Delete this client?");
    if (!ok) return;
    try {
      await deleteClient(id);
      await loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const stats = [
    { label: 'Total Projects', value: projects.length, gradient: 'from-blue-500 to-blue-600' },
    { label: 'Happy Clients', value: clients.length, gradient: 'from-purple-500 to-purple-600' },
    { label: 'Contact Entries', value: contacts.length, gradient: 'from-pink-500 to-pink-600' },
    { label: 'Subscribers', value: subscribers.length, gradient: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
       <Sidebar
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isOpen={sidebarOpen}
      onClose={() => setSidebarOpen(false)}
    />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
           {/* mobile hamburger */}
        <button
          className="mb-4 inline-flex items-center gap-2 md:hidden rounded-xl border px-3 py-2 text-sm"
          onClick={() => setSidebarOpen(true)}
        >
          ☰ Menu
        </button>
          {/* Header with Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {activeTab === 'projects' && 'Projects Management'}
              {activeTab === 'clients' && 'Clients Management'}
              {activeTab === 'contacts' && 'Contact Form Entries'}
              {activeTab === 'subscribers' && 'Newsletter Subscribers'}
            </h1>
            <p className="text-gray-600">
              Manage and organize your content from one place
            </p>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-2xl bg-white shadow-soft p-6"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`}></div>
                  <div className="relative">
                    <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {loading ? '...' : stat.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <ProjectForm onCreated={loadData} />
                  <ProjectsTable
                    projects={projects}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                  />
                </div>
              )}

              {activeTab === "clients" && (
                <div className="space-y-6">
                  <ClientForm onCreated={loadData} />
                  <ClientsTable
                    clients={clients}
                    onEdit={handleEditClient}
                    onDelete={handleDeleteClient}
                  />
                </div>
              )}

              {activeTab === "contacts" && (
                <ContactsTable contacts={contacts} />
              )}

              {activeTab === "subscribers" && (
                <SubscribersTable subscribers={subscribers} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {editingProject && (
            <ProjectEditModal
              project={editingProject}
              onClose={() => setEditingProject(null)}
              onSaved={() => {
                setEditingProject(null);
                loadData();
              }}
            />
          )}

          {editingClient && (
            <ClientEditModal
              client={editingClient}
              onClose={() => setEditingClient(null)}
              onSaved={() => {
                setEditingClient(null);
                loadData();
              }}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;