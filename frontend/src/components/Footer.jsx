import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Instagram, 
  Code2, Heart, ArrowUp 
} from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: 'https://github.com', label: 'GitHub' },
    { icon: <Linkedin className="h-5 w-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <Twitter className="h-5 w-5" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Instagram className="h-5 w-5" />, url: 'https://instagram.com', label: 'Instagram' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Admin Login', href: '/admin/login' },
  ];

  return (
    <footer className="relative border-t border-cyberpunk-pink/20 bg-background/80 backdrop-blur-sm">
      {/* Back to top button */}
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 border-cyberpunk-pink/30 
                 hover:border-cyberpunk-pink hover:bg-cyberpunk-pink/10"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-cyberpunk-pink" />
              <div>
                <span className="font-orbitron font-bold text-xl">SHAMAN DHUNGEL</span>
                <div className="font-space text-xs tracking-widest text-cyberpunk-blue">
                  FULL-STACK DEVELOPER
                </div>
              </div>
            </Link>
            <p className="font-rajdhani text-sm text-muted-foreground">
              Crafting digital experiences with cutting-edge technology and innovative design.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-cyberpunk-blue/20 hover:border-cyberpunk-pink 
                           hover:bg-cyberpunk-pink/10 transition-all duration-300 text-muted-foreground 
                           hover:text-cyberpunk-pink"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-orbitron text-lg mb-4 text-cyberpunk-blue">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-rajdhani text-sm text-muted-foreground hover:text-cyberpunk-pink 
                             transition-colors flex items-center space-x-2"
                  >
                    <span className="h-1 w-1 rounded-full bg-cyberpunk-pink opacity-0 group-hover:opacity-100"></span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-orbitron text-lg mb-4 text-cyberpunk-blue">Services</h3>
            <ul className="space-y-2">
              {[
                'Web Development',
                'Mobile Apps',
                'UI/UX Design',
                'API Development',
                'DevOps',
                'Consulting'
              ].map((service) => (
                <li key={service}>
                  <span className="font-rajdhani text-sm text-muted-foreground">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-orbitron text-lg mb-4 text-cyberpunk-blue">Contact</h3>
            <ul className="space-y-3">
              <li className="font-rajdhani text-sm text-muted-foreground">
                Email: contact@shamandhungel.com
              </li>
              <li className="font-rajdhani text-sm text-muted-foreground">
                Available for remote work worldwide
              </li>
              <li>
                <Button
                  variant="cyber"
                  size="sm"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start a Project
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyberpunk-pink/20 to-transparent my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 font-rajdhani text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Shaman Dhungel. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <div className="flex space-x-4">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-cyberpunk-pink transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 font-rajdhani text-sm text-muted-foreground">
            <span>Made using MERN Stack</span>
          </div>
        </div>
      </div>

      {/* Cyberpunk decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyberpunk-pink via-cyberpunk-blue to-cyberpunk-pink opacity-20"></div>
      <div className="absolute -top-1 left-1/4 h-2 w-2 rounded-full bg-cyberpunk-pink blur-sm"></div>
      <div className="absolute -top-1 right-1/4 h-2 w-2 rounded-full bg-cyberpunk-blue blur-sm"></div>
    </footer>
  );
};

export default Footer;