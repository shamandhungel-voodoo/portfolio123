import { motion } from 'framer-motion';
import { 
  Code2, Database, Palette, Cloud, Cpu, 
  Server, GitBranch, Shield, Zap, Globe,
  Layers, Workflow, MemoryStick, Terminal,
  Wrench, Box, Brain, GitMerge, Network,
  Cpu as CpuIcon, Settings
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      name: "Frontend",
      icon: <Palette className="h-5 w-5" />,
      skills: [
        { name: "React", level: 95, color: "from-cyan-500 to-blue-500" },
        { name: "JavaScript/ES6+", level: 90, color: "from-yellow-500 to-orange-500" },
        { name: "TypeScript", level: 85, color: "from-blue-500 to-blue-700" },
        { name: "Tailwind CSS", level: 95, color: "from-teal-500 to-cyan-500" },
        { name: "Framer Motion", level: 80, color: "from-purple-500 to-pink-500" },
      ]
    },
    {
      name: "Backend",
      icon: <Server className="h-5 w-5" />,
      skills: [
        { name: "Node.js", level: 90, color: "from-green-500 to-green-700" },
        { name: "Express.js", level: 88, color: "from-gray-500 to-gray-700" },
        { name: "MongoDB", level: 85, color: "from-green-400 to-green-600" },
        { name: "REST APIs", level: 92, color: "from-blue-400 to-blue-600" },
        { name: "GraphQL", level: 75, color: "from-pink-500 to-purple-500" },
      ]
    },
    {
      name: "Tools & DevOps",
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        { name: "Git & GitHub", level: 90, color: "from-orange-500 to-red-500" },
        { name: "Docker", level: 75, color: "from-blue-400 to-cyan-500" },
        { name: "AWS", level: 70, color: "from-yellow-500 to-orange-500" },
        { name: "CI/CD", level: 80, color: "from-purple-500 to-pink-500" },
        { name: "Vite", level: 85, color: "from-purple-400 to-pink-400" },
      ]
    }
  ];

  const otherSkills = [
    { icon: <Cpu className="h-5 w-5" />, name: "Performance Optimization" },
    { icon: <Shield className="h-5 w-5" />, name: "Security Best Practices" },
    { icon: <Zap className="h-5 w-5" />, name: "Progressive Web Apps" },
    { icon: <Globe className="h-5 w-5" />, name: "Internationalization" },
    { icon: <GitBranch className="h-5 w-5" />, name: "Git Workflows" },
    { icon: <Database className="h-5 w-5" />, name: "Database Design" },
  ];

  // Tech stack with available lucide-react icons
  const techStack = [
    { name: "React", icon: <Code2 className="h-8 w-8 text-cyan-400" />, color: "from-cyan-500/20 to-blue-500/20" },
    { name: "Node.js", icon: <Terminal className="h-8 w-8 text-green-500" />, color: "from-green-500/20 to-green-700/20" },
    { name: "MongoDB", icon: <Database className="h-8 w-8 text-green-400" />, color: "from-green-400/20 to-green-600/20" },
    { name: "Express", icon: <Network className="h-8 w-8 text-gray-300" />, color: "from-gray-500/20 to-gray-700/20" },
    { name: "TypeScript", icon: <Code2 className="h-8 w-8 text-blue-400" />, color: "from-blue-500/20 to-blue-700/20" },
    { name: "Tailwind", icon: <Box className="h-8 w-8 text-cyan-300" />, color: "from-teal-500/20 to-cyan-500/20" },
    { name: "AWS", icon: <Layers className="h-8 w-8 text-orange-400" />, color: "from-yellow-500/20 to-orange-500/20" },
    { name: "Docker", icon: <Box className="h-8 w-8 text-blue-300" />, color: "from-blue-400/20 to-cyan-500/20" },
    { name: "GraphQL", icon: <Workflow className="h-8 w-8 text-pink-400" />, color: "from-pink-500/20 to-purple-500/20" },
    { name: "Redis", icon: <MemoryStick className="h-8 w-8 text-red-400" />, color: "from-red-500/20 to-red-700/20" },
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue font-space text-sm tracking-widest mb-4">
            TECHNICAL SKILLS
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-gradient">Expertise</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive skill set honed through years of practical experience
            and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="p-6 rounded-2xl border-glow bg-background/50 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-cyberpunk-pink/10 text-cyberpunk-pink">
                  {category.icon}
                </div>
                <h3 className="font-orbitron text-2xl">{category.name}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-rajdhani font-medium">{skill.name}</span>
                      <span className="font-space text-sm text-cyberpunk-pink">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.1 + 0.3, duration: 1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-orbitron text-3xl text-center mb-12">
            Additional <span className="text-gradient">Competencies</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {otherSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-4 rounded-xl border border-cyberpunk-blue/20 hover:border-cyberpunk-blue/50 
                         bg-background/30 hover:bg-background/50 transition-all duration-300 text-center group"
              >
                <div className="text-cyberpunk-pink mb-2 flex justify-center group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <span className="font-rajdhani font-medium text-sm">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-cyberpunk-dark/50 to-background/50 
                   border border-cyberpunk-pink/20 relative"
        >
          <h3 className="font-orbitron text-3xl text-center mb-12">
            Tech <span className="text-gradient">Stack</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-8">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex flex-col items-center space-y-2 group cursor-pointer"
              >
                <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${tech.color}
                              flex items-center justify-center border border-cyberpunk-pink/30
                              group-hover:border-cyberpunk-pink/60 transition-all duration-300
                              group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]`}>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                </div>
                <span className="font-space font-bold text-sm bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-2xl border border-cyberpunk-blue/10 pointer-events-none"></div>
          <div className="absolute inset-0 rounded-2xl border border-cyberpunk-pink/5 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;