import { useEffect, useState } from "react";
import { updateProject } from "../../api/projectsApi";
import ImageCropUploader from "./ImageCropUploader";

const ProjectEditModal = ({ project, onClose, onSaved }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
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
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("description", form.description);

    if (imageFile) {
      fd.append("image", imageFile);
    }

    setLoading(true);
    try {
      await updateProject(project._id, fd);
      setMsg("Project updated successfully.");
      if (onSaved) onSaved();
    } catch (err) {
      console.error(err);
      setMsg("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Edit Project</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              required
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">
              Current Image:
            </p>
            <img
              src={project.imageUrl}
              alt={project.name}
              className="w-full max-h-40 object-cover rounded mb-3"
            />
            <ImageCropUploader
              label="Change Image (optional) - Crop to 9:7"
              aspect={9 / 7}
              onCroppedFile={setImageFile}
            />
          </div>
          <div className="flex items-center gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border text-sm"
            >
              Cancel
            </button>
          </div>
          {msg && <p className="text-xs text-gray-600 mt-1">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default ProjectEditModal;
