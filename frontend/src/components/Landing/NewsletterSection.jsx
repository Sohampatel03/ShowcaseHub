import { useState } from "react";
import { subscribeNewsletter } from "../../api/subscribersApi";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await subscribeNewsletter(email);
      setMsg("Subscribed successfully!");
      setEmail("");
    } catch  {
      setMsg("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-blue-50 py-12">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          Subscribe to our newsletter
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Get updates on new projects, insights, and more.
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3 py-2 rounded-full border w-full sm:w-64 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-full bg-blue-600 text-white text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {msg && <p className="text-sm mt-2 text-gray-600">{msg}</p>}
      </div>
    </section>
  );
};

export default NewsletterSection;
