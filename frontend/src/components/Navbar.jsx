import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Code2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '#about' },
    { name: 'Skills', path: '#skills' },
    { name: 'Projects', path: '#projects' },
    { name: 'Certificates', path: '#certificates' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (hash) => {
    if (hash === '/' || hash === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }
    
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const handleNavClick = (path, e) => {
    e.preventDefault();
    scrollToSection(path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-cyberpunk-pink/20 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative">
              <Code2 className="h-8 w-8 text-cyberpunk-pink animate-pulse-glow" />
              <div className="absolute -inset-1 bg-cyberpunk-blue/20 blur-sm rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue">
                SHAMAN DHUNGEL
              </span>
              <span className="text-xs font-space tracking-widest text-cyberpunk-blue">
                FULL-STACK DEVELOPER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(item.path, e)}
                className={`px-4 py-2 font-rajdhani font-medium transition-all duration-300 hover:text-cyberpunk-pink ${
                  (item.path === '/' && location.pathname === '/') || 
                  (item.path.startsWith('#') && location.hash === item.path)
                    ? 'text-cyberpunk-pink border-b-2 border-cyberpunk-pink'
                    : 'text-foreground'
                }`}
              >
                {item.name}
              </button>
            ))}
            
            <div className="flex items-center space-x-4 ml-6">
              <ThemeToggle />
              <Button
                variant="cyber"
                size="sm"
                onClick={() => scrollToSection('#contact')}
              >
                Let's Connect
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-accent transition-colors duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-cyberpunk-pink" />
              ) : (
                <Menu className="h-6 w-6 text-cyberpunk-pink" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(item.path, e)}
                  className={`px-4 py-3 text-left rounded-md font-rajdhani font-medium transition-all duration-300 ${
                    (item.path === '/' && location.pathname === '/') || 
                    (item.path.startsWith('#') && location.hash === item.path)
                      ? 'bg-cyberpunk-pink/10 text-cyberpunk-pink'
                      : 'hover:bg-accent hover:text-cyberpunk-pink'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <Button
                variant="cyber"
                className="mt-4"
                onClick={() => {
                  scrollToSection('#contact');
                  setIsOpen(false);
                }}
              >
                Let's Connect
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;