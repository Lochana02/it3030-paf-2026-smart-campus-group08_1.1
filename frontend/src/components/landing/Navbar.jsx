export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-40 bg-slate-50/70 backdrop-blur-xl flex items-center justify-between px-8 py-4">
      
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold text-slate-900 tracking-tight font-['Manrope']">
          Campus Intelligence
        </span>

        <div className="hidden md:flex space-x-6">
          <a className="font-['Manrope'] text-blue-700 border-b-2 border-blue-600">Dashboard</a>
          <a className="font-['Manrope'] text-slate-500 hover:bg-slate-200/50 px-2 rounded">Assets</a>
          <a className="font-['Manrope'] text-slate-500 hover:bg-slate-200/50 px-2 rounded">Operations</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button className="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full">
          <span className="material-symbols-outlined">settings</span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/20">
          <img src="https://i.pravatar.cc/100" alt="profile" />
        </div>
      </div>

    </nav>
  );
}