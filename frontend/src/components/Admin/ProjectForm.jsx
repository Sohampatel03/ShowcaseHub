import { useState } from "react";
import { createProject } from "../../api/projectsApi";
import ImageCropUploader from "./ImageCropUploader";

const ProjectForm = ({ onCreated }) => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

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
      setMsg("Project created successfully.");
      setForm({ name: "", description: "" });
      setImageFile(null);
      if (onCreated) onCreated();
    } catch  {
      setMsg("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-4 space-y-4"
    >
      <h2 className="font-semibold text-sm mb-2">Add Project</h2>
      <div className="grid md:grid-cols-2 gap-4">
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
        <div className="md:row-span-2">
          <ImageCropUploader
            label="Project Image (Crop to 9:7)"
            aspect={9 / 7}
            onCroppedFile={setImageFile}
          />
        </div>
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
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
      {msg && <p className="text-xs text-gray-600 mt-1">{msg}</p>}
    </form>
  );
};

export default ProjectForm;
