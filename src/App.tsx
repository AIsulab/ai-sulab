import siteData from '../site.config.json'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="flex items-center justify-between border-b bg-white p-6 shadow-sm">
        <h1
          className="text-2xl font-bold"
          style={{ color: siteData.site_info.main_color }}
        >
          {siteData.site_info.site_name}
        </h1>
      </nav>
      <header className="px-6 py-24 text-center">
        <h2 className="mb-6 text-6xl font-black leading-tight tracking-tight">
          {siteData.hero.title}
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600">
          {siteData.hero.subtitle}
        </p>
        <button
          className="rounded-xl px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:brightness-110 active:scale-95"
          style={{ backgroundColor: siteData.site_info.main_color }}
        >
          {siteData.hero.cta_button}
        </button>
      </header>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
        {siteData.services.map((service, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl shadow-gray-200/50 transition-transform hover:-translate-y-2"
          >
            <h3 className="mb-4 text-2xl font-bold">{service.title}</h3>
            <p className="text-lg leading-relaxed text-gray-500">
              {service.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
