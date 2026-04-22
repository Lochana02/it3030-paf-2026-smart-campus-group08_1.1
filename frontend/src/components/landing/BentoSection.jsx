export default function BentoSection() {
  return (
    <section className="py-24 px-8 bg-surface">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-6">

        <div className="md:col-span-8 rounded-2xl overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXLhslD1kC1kAzomaWYEXsZsWgrnJLV98Ii40w-_oVh8dg5HpmwdQpTAbwr-F-dC9dFEw3idD7Of5VQo9_JhiGHTSOh0BSiDeeIELUVAqiC7XxRgP9eRYt0V6ADHDcM4rZZ-Z44ZsHV_H9rbIZaYN4rYPup_xpLfFyd1WX7Bs3nYN_lD0NepoZCpUnUgDM7EV7Q9tRwRKrQCTMlMoI7gwCtJuQaOKORFLyg1n6atAWah-tjpuN0--K3PfcSPta3rmIiW4nlMub37E"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="bg-primary p-8 text-white rounded-2xl">Predictive Insights</div>
          <div className="bg-gray-100 p-8 rounded-2xl">Team Sync</div>
        </div>

      </div>
    </section>
  );
}