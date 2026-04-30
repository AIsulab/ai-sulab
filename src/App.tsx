import { Phone } from 'lucide-react'

const navItems = ['Home', 'About', 'Contact Us']

export default function App() {
  return (
    <main className="hero-shell relative bg-black">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4"
          type="video/mp4"
        />
      </video>

      <header className="hero-header relative z-10">
        <a className="brand" href="#top" aria-label="targo home">
          <svg
            className="brand-mark"
            viewBox="0 0 64 64"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 30.5C10 20.2837 18.2837 12 28.5 12H39.5C49.7163 12 58 20.2837 58 30.5V31.5C58 41.7163 49.7163 50 39.5 50H28.5C18.2837 50 10 41.7163 10 31.5V30.5Z"
              stroke="white"
              strokeWidth="2.4"
            />
            <path
              d="M19 33.5C22.3333 26.8333 27 23.5 33 23.5C39 23.5 43.6667 26.8333 47 33.5"
              stroke="white"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <circle cx="24" cy="29" r="2.4" fill="white" />
            <circle cx="40" cy="29" r="2.4" fill="white" />
          </svg>
          <span className="brand-wordmark">targo</span>
        </a>

        <nav className="hero-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
              {item}
            </a>
          ))}
        </nav>

        <a className="btn btn-sm btn-red clip-shape" href="#contact">
          Contact Us
        </a>
      </header>

      <section className="hero-content relative z-10" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Global logistics</p>
          <h1>Swift and Simple Transport</h1>
          <a className="btn btn-lg btn-red clip-shape" href="#contact">
            Get Started
          </a>
        </div>
      </section>

      <section className="consult-card-wrap relative z-10" id="contact">
        <article className="consult-card">
          <div className="shine" aria-hidden="true" />
          <div className="consult-copy">
            <p className="consult-label">Need a route plan?</p>
            <h2>Book a Free Consultation</h2>
            <p>
              Talk through shipment timing, transport scope, and the fastest way to move
              your operation forward.
            </p>
          </div>

          <a className="btn btn-call clip-shape btn-white" href="tel:+10000000000">
            <Phone size={18} strokeWidth={2.25} />
            Book a Call
          </a>
        </article>
      </section>
    </main>
  )
}
