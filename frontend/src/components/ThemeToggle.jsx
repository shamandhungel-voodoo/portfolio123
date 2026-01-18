import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Button } from './ui/button';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="flex items-center justify-center"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-cyberpunk-yellow" />
        ) : (
          <Moon className="h-5 w-5 text-cyberpunk-purple" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-cyberpunk-pink/0 via-cyberpunk-blue/0 to-cyberpunk-purple/0 group-hover:from-cyberpunk-pink/10 group-hover:via-cyberpunk-blue/10 group-hover:to-cyberpunk-purple/10 transition-all duration-300"></div>
    </Button>
  );
};

export default ThemeToggle;