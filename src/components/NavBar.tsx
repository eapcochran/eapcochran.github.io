import { useEffect, useRef, useState } from 'react';
import { sectionVisibility } from '../data/site';

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

if (sectionVisibility.projects) {
  navItems.splice(2, 0, { href: '/projects', label: 'Projects' });
}

if (sectionVisibility.blog) {
  navItems.splice(sectionVisibility.projects ? 3 : 2, 0, { href: '/blog', label: 'Blog' });
}

export default function NavBar({ currentPath }: { currentPath: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  const isActivePath = (href: string) => {
    if (href === '/') {
      return currentPath === '/';
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const firstLink = mobileNavRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-brand" href="/" aria-label="ewen.dev home">
          <img src="/logo-ewen.svg" alt="ewen.dev" />
        </a>

        <button
          ref={toggleRef}
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
              className={isActivePath(item.href) ? 'is-active' : undefined}
              aria-current={isActivePath(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div
        ref={mobileNavRef}
        className={`mobile-nav ${isOpen ? 'is-open' : ''}`}
        id="site-navigation"
        hidden={!isOpen}
      >
        <div className="container mobile-nav__inner">
          <nav className="site-nav site-nav--mobile" aria-label="Mobile">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={isActivePath(item.href) ? 'is-active' : undefined}
                aria-current={isActivePath(item.href) ? 'page' : undefined}
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
