import { useEffect, useState } from "react";
import HeroSection from "../Landing/HeroSection";
import ProjectsSection from "../Landing/ProjectsSection";
import ClientsSection from "../Landing/ClientsSection";
import ContactForm from "../Landing/ContactForm";
import NewsletterSection from "../Landing/NewsletterSection";
import { fetchProjects } from "../../api/projectsApi";
import { fetchClients } from "../../api/clientsApi";

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const proj = await fetchProjects();
        setProjects(proj);
      } catch (err) {
        console.error("Failed to load projects", err);
      }
      try {
        const cls = await fetchClients();
        setClients(cls);
      } catch (err) {
        console.error("Failed to load clients", err);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple nav */}
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="font-bold text-lg">Company</div>
          <nav className="flex gap-4 text-sm">
            <a href="#projects">Projects</a>
            <a href="#clients">Clients</a>
            <a href="#contact">Contact</a>
            <a href="/admin/login" className="text-gray-500">
              Admin
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <ProjectsSection projects={projects} />
        <ClientsSection clients={clients} />
        <ContactForm />
        <NewsletterSection />
      </main>

      <footer className="bg-gray-100 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Company. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
