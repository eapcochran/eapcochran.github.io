import { useEffect, useState } from 'react';

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function NavBar({ currentPath }: { currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 900) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', closeOnResize);
    return () => window.removeEventListener('resize', closeOnResize);
  }, []);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-brand" href="/">
          ewen.dev
        </a>

        <button
          className="site-menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-navigation"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={currentPath === item.href ? 'is-active' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className={`mobile-nav ${isOpen ? 'is-open' : ''}`} id="site-navigation">
        <div className="container mobile-nav__inner">
          <p className="mobile-nav__eyebrow">Navigate the site</p>
          <p className="mobile-nav__hint">Jump between portfolio sections in a clean, touch-friendly layout.</p>
          <nav className="site-nav site-nav--mobile" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={currentPath === item.href ? 'is-active' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
