import { useEffect, useState } from "react";
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

  const [editingProject, setEditingProject] = useState(null);
  const [editingClient, setEditingClient] = useState(null);

  const loadData = async () => {
    try {
      const proj = await fetchAdminProjects();
      setProjects(proj);
    } catch (e) {
      console.error(e);
    }
    try {
      const cls = await fetchAdminClients();
      setClients(cls);
    } catch (e) {
      console.error(e);
    }
    try {
      const cts = await fetchContacts();
      setContacts(cts);
    } catch (e) {
      console.error(e);
    }
    try {
      const subs = await fetchSubscribers();
      setSubscribers(subs);
    } catch (e) {
      console.error(e);
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

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 md:p-6 relative">
        {activeTab === "projects" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <ProjectForm onCreated={loadData} />
            <ProjectsTable
              projects={projects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
            />
          </>
        )}
        {activeTab === "clients" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <ClientForm onCreated={loadData} />
            <ClientsTable
              clients={clients}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
          </>
        )}
        {activeTab === "contacts" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Contact Form Details</h1>
            <ContactsTable contacts={contacts} />
          </>
        )}
        {activeTab === "subscribers" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Subscribers</h1>
            <SubscribersTable subscribers={subscribers} />
          </>
        )}

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
      </main>
    </div>
  );
};

export default AdminDashboard;
