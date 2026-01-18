import { motion } from "framer-motion";
import { User, Target, Rocket, Code2 } from "lucide-react";

const About = () => {
  const aboutPoints = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Full-Stack Expertise",
      description:
        "Proficient in both frontend and backend technologies, creating seamless end-to-end solutions.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Problem Solver",
      description:
        "Passionate about tackling complex challenges and delivering efficient, scalable solutions.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Fast Learner",
      description:
        "Quick to adapt to new technologies and methodologies in the ever-evolving tech landscape.",
    },
    {
      icon: <User className="h-6 w-6" />,
      title: "User-Centric",
      description:
        "Focused on creating intuitive, accessible experiences that delight users.",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-b from-transparent to-background"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-pink/10 text-cyberpunk-pink font-space text-sm tracking-widest mb-4">
            ABOUT ME
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Crafting Digital <span className="text-gradient">Experiences</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            I'm a passionate full-stack developer with expertise in modern web
            technologies. I bridge the gap between beautiful design and robust
            functionality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-orbitron text-2xl text-cyberpunk-blue">
                My Journey
              </h3>
              <p className="font-rajdhani text-lg leading-relaxed">
                I come from a background rooted in technology, problem-solving,
                and a constant drive to build things that work—and work well. I
                earned my Bachelor's degree in Computer Information Systems,
                where I developed a solid understanding of software development,
                databases, system architecture, and how digital products are
                engineered from the ground up.
              </p>
              <p className="font-rajdhani text-lg leading-relaxed">
                With this foundation, I moved beyond theory into practice. I
                began designing and building real-world web applications using
                the MERN stack, while sharpening my skills in UI/UX design to
                ensure every product is not only functional but intuitive and
                engaging. I approach each project with intention—focusing on
                clean design, scalable code, and user-first thinking.
              </p>
              <p className="font-rajdhani text-lg leading-relaxed">
                Today, I confidently build production-ready, user-centered
                digital experiences. I thrive at the intersection of design and
                engineering, continuously pushing myself to create solutions
                that are impactful, modern, and built to last.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aboutPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border-glow bg-background/50 backdrop-blur-sm"
                >
                  <div className="text-cyberpunk-pink mb-3">{point.icon}</div>
                  <h4 className="font-orbitron text-lg mb-2">{point.title}</h4>
                  <p className="font-rajdhani text-sm text-muted-foreground">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative p-8 rounded-2xl border-glow bg-gradient-to-br from-cyberpunk-dark/50 to-background/50 backdrop-blur-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="font-orbitron text-2xl text-cyberpunk-pink mb-4">
                    Current Focus
                  </h3>
                  <p className="font-rajdhani text-lg">
                    Currently exploring AI/ML integration in web applications
                    and building scalable microservices architecture.
                  </p>
                </div>

                <div>
                  <h3 className="font-orbitron text-2xl text-cyberpunk-blue mb-4">
                    Philosophy
                  </h3>
                  <p className="font-rajdhani text-lg">
                    "Good design is as little design as possible" - I focus on
                    simplicity, performance, and user experience above all.
                  </p>
                </div>

                <div className="pt-6 border-t border-cyberpunk-blue/20">
                  <h3 className="font-orbitron text-xl mb-4">
                    When I'm not coding
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Photography",
                      "Gaming",
                      "Reading",
                      "Hiking",
                      "Music",
                    ].map((hobby) => (
                      <span
                        key={hobby}
                        className="px-3 py-1 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue font-space text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-cyberpunk-pink/10 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-cyberpunk-blue/10 to-transparent rounded-full blur-2xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
