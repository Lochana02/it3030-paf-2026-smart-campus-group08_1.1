export default function Hero() {
  return (
    <section className="relative min-h-[819px] flex items-center px-8 py-24 overflow-hidden bg-surface">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        {/* LEFT */}
        <div className="lg:col-span-7 space-y-8 relative z-10">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold uppercase">
            <span className="material-symbols-outlined text-sm">auto_awesome</span>
            Next-Gen Operations
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.95] tracking-tight">
            Aetheris Hub <br />
            <span className="text-primary bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              Total Clarity.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
            Transform complex campus data into a serene, high-clarity workspace.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl shadow-lg">
              Get Started
            </button>

            <button className="px-8 py-4 bg-surface-container-high text-on-surface font-semibold rounded-xl">
              View Live Maps
            </button>
          </div>

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 relative">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk3p5dTvd1r230Jci-Unb7pAZAwaQwYXI4qXNGNbHFBUCL2c8UGGCm59kLMmCSvMQW4TWoJZZCYg9yKrRInHAu58QzaeqAX4ID6tv8q8sahqTIytwmKjGRHwdV9Kt9f03237VEcJTQMjOcqDQ2LEhqJj8BUFnrk_kF90ftyXmb2ud83Xpv3_VcHK1fVEHTHwvW4ZVi7_hlZKNf6Q0oWcEC0r6Sx0x8cfSwSrtUp5GW3mX-dzHKDKwUB9bQ699Daez90Xsvwq5zIac"
              className="w-full h-full object-cover"
              alt="campus"
            />

            <div className="absolute bottom-6 left-6 right-6 p-6 glass-nav rounded-2xl shadow-sm border border-white/20">
              <p className="text-xs text-on-surface-variant">Active Operations</p>
              <p className="text-3xl font-black">98.4%</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}