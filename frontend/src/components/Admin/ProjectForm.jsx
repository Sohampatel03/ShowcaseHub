import { useState } from "react";
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi2';
import { createProject } from "../../api/projectsApi";
import ImageCropUploader from "./ImageCropUploader";

const ProjectForm = ({ onCreated }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setSuccess(false);

    if (!imageFile) {
      setMsg("Please select and confirm a cropped image.");
      return;
    }

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);
    fd.append("image", imageFile);

    setLoading(true);
    try {
      await createProject(fd);
      setMsg("Project created successfully!");
      setSuccess(true);
      setForm({ name: "", description: "" });
      setImageFile(null);
      if (onCreated) onCreated();
    } catch {
      setMsg("Failed to create project.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Add New Project
      </h2>

      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
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
              placeholder="My Awesome Project"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <ImageCropUploader
              label="Project Image (9:7 ratio)"
              aspect={9 / 7}
              onCroppedFile={setImageFile}
            />
          </div>
        </div>

        {/* Description */}
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
            placeholder="Describe your project..."
            required
          />
        </div>

        {/* Submit button and message */}
        <div className="flex items-center gap-4">
          <motion.button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? "Creating..." : "Create Project"}
          </motion.button>

          {msg && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                success
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {success ? (
                <HiCheckCircle className="w-5 h-5" />
              ) : (
                <HiXCircle className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{msg}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.form>
  );
};

export default ProjectForm;