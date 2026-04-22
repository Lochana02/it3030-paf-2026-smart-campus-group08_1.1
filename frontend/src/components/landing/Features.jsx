export default function Features() {
  return (
    <section className="py-24 px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {["Asset Tracking", "Smart Booking", "Incident Management"].map((title, i) => (
          <div key={i} className="group p-8 bg-white rounded-xl shadow">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-500">High-level campus management feature.</p>
          </div>
        ))}

      </div>
    </section>
  );
}