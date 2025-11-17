const ClientsSection = ({ clients }) => {
  return (
    <section id="clients" className="bg-white py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Happy Clients</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client._id}
              className="bg-gray-50 rounded-2xl p-4 shadow-sm flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb 3">
                <img
                  src={client.imageUrl}
                  alt={client.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold">{client.name}</h3>
              <p className="text-xs text-gray-500 mb-2">
                {client.designation}
              </p>
              <p className="text-sm text-gray-600">
                &quot;{client.description}&quot;
              </p>
            </div>
          ))}
          {clients.length === 0 && (
            <p className="text-gray-500">
              No client testimonials yet. Please check back soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
