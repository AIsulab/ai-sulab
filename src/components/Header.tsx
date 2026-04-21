export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="text-2xl font-bold tracking-tight text-slate-900">SULAB AI</div>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <a href="#design-pixel" className="transition hover:text-slate-900">
            Design Pixel
          </a>
          <a href="#portfolio" className="transition hover:text-slate-900">
            Portfolio
          </a>
          <a href="#request" className="transition hover:text-slate-900">
            Project Request
          </a>
          <a href="#contact" className="transition hover:text-slate-900">
            Contact Us
          </a>
        </nav>

        <div className="text-sm font-semibold text-slate-900">T. 02 587 1152</div>
      </div>
    </header>
  )
}
