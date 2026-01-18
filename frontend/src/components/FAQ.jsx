import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Mail, Clock, Globe, Code2, Zap } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in the MERN stack (MongoDB, Express.js, React, Node.js) along with modern technologies like TypeScript, Tailwind CSS, AWS, Docker, and various frontend libraries and frameworks.",
      icon: <Code2 className="h-5 w-5" />
    },
    {
      question: "What is your typical project timeline?",
      answer: "Project timelines vary based on complexity. A simple website takes 2-3 weeks, medium complexity projects 4-8 weeks, and large applications 2-6 months. I provide detailed timelines during project planning.",
      icon: <Clock className="h-5 w-5" />
    },
    {
      question: "Do you work with clients internationally?",
      answer: "Yes, I work with clients worldwide. I'm experienced in remote collaboration across different time zones and cultures, using tools like Slack, Zoom, and project management software.",
      icon: <Globe className="h-5 w-5" />
    },
    {
      question: "What is your development process?",
      answer: "My process includes discovery & planning, design & prototyping, development & testing, deployment, and maintenance. I follow Agile methodologies with regular client updates and feedback loops.",
      icon: <Zap className="h-5 w-5" />
    },
    {
      question: "How do you handle project communication?",
      answer: "I maintain regular communication through scheduled meetings, progress reports, and instant messaging. Clients have access to project management tools to track progress in real-time.",
      icon: <Mail className="h-5 w-5" />
    },
    {
      question: "Do you provide post-launch support?",
      answer: "Yes, I offer comprehensive post-launch support including bug fixes, performance optimization, and feature enhancements. I provide different support packages based on client needs.",
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-pink/10 text-cyberpunk-pink font-space text-sm tracking-widest mb-4">
            FAQ
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about my services, process, and collaboration.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-cyberpunk-blue/20 bg-background/50 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-cyberpunk-blue/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-cyberpunk-pink">
                      {faq.icon}
                    </div>
                    <h3 className="font-orbitron text-lg text-left">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown className={`h-5 w-5 text-cyberpunk-blue transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} />
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4">
                        <p className="font-rajdhani text-muted-foreground pl-10">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 rounded-2xl border-glow bg-gradient-to-r from-cyberpunk-dark/50 to-background/50">
            <h3 className="font-orbitron text-2xl mb-4">Still have questions?</h3>
            <p className="font-rajdhani text-lg text-muted-foreground mb-6 max-w-2xl">
              Don't hesitate to reach out. I'm here to help with any questions you might have.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                       text-white font-bold hover:shadow-lg hover:shadow-cyberpunk-pink/30 transition-all"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;