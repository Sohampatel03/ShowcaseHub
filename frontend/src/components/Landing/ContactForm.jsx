import { useState } from "react";
import { submitContact } from "../../api/contactApi";

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await submitContact(form);
      setMsg("Thank you! We have received your details.");
      setForm({ fullName: "", email: "", mobile: "", city: "" });
    } catch  {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          {msg && <p className="text-sm mt-2 text-gray-600">{msg}</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
