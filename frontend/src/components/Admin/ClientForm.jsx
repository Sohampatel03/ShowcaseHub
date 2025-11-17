import { useState } from "react";
import { createClient } from "../../api/clientsApi";
import ImageCropUploader from "./ImageCropUploader";

const ClientForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    description: "",
  });
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
    fd.append("designation", form.designation);
    fd.append("description", form.description);
    fd.append("image", imageFile);

    setLoading(true);
    try {
      await createClient(fd);
      setMsg("Client added successfully.");
      setForm({ name: "", designation: "", description: "" });
      setImageFile(null);
      if (onCreated) onCreated();
    } catch  {
      setMsg("Failed to add client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-4 space-y-4"
    >
      <h2 className="font-semibold text-sm mb-2">Add Client</h2>
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
        <div>
          <label className="block text-sm font-medium mb-1">
            Designation
          </label>
          <input
            type="text"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Feedback / Description
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
        <div className="md:col-span-2">
          <ImageCropUploader
            label="Client Image (Crop to 1:1)"
            aspect={1}
            onCroppedFile={setImageFile}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Client"}
      </button>
      {msg && <p className="text-xs text-gray-600 mt-1">{msg}</p>}
    </form>
  );
};

export default ClientForm;
