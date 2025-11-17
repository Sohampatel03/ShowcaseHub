import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX, HiCheckCircle } from "react-icons/hi";
import { updateProject } from "../../api/projectsApi";

const ProjectEditModal = ({ project, onClose, onSaved }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setForm({ name: project.name, description: project.description });
    }
  }, [project]);

  if (!project) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    // ❌ no image in edit

    setLoading(true);
    try {
      await updateProject(project._id, fd);
      setMsg("Project updated successfully!");
      setSuccess(true);
      setTimeout(() => {
        if (onSaved) onSaved();
      }, 1000);
    } catch {
      setMsg("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <h2 className="text-xl font-bold text-gray-900">Edit Project</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <HiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none resize-none"
                required
              />
            </div>

            {/* ✅ Only show current image, no uploader */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Current Image
              </p>
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-48 object-cover rounded-2xl mb-4 border border-gray-200"
              />
            </div>

            {msg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-xl ${
                  success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {success && <HiCheckCircle className="w-5 h-5" />}
                <p className="text-sm font-medium">{msg}</p>
              </motion.div>
            )}

            <div className="flex gap-3 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-60"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </motion.button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectEditModal;
