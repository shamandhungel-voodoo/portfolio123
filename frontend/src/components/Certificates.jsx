import { motion } from "framer-motion";
import { Award, Download, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: "Full-Stack Development",
      issuer: "MERN",
      date: "June 2025",
      image:
        "https://res.cloudinary.com/dphier2de/image/upload/v1766165750/1_o136k6.png",
      credentialId: "MERN-FSD-2025",
      skills: ["React", "Node.js", "MongoDB", "Express", "API Design"]
    },
    {
      id: 2,
      title: "UI/UX Design",
      issuer: "FIGMA",
      date: "December 2025",
      image:
        "https://res.cloudinary.com/dphier2de/image/upload/v1766165749/2_ghgaj4.jpg",
      credentialId: "FIGMA-UIUX-2025",
      skills: ["Figma", "Wireframing", "Prototyping", "Design Systems"]
    },
    {
      id: 3,
      title: "Fundamentals of Digital Marketing",
      issuer: "Google",
      date: "August 2023",
      image:
        "https://res.cloudinary.com/dphier2de/image/upload/v1766165749/3_mdtwuz.jpg",
      credentialId: "GOOGLE-DM-2023",
      skills: ["SEO", "SEM", "Analytics", "Social Media"]
    },
  ];

  return (
    <section
      id="certificates"
      className="py-20 bg-gradient-to-b from-background to-transparent"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue font-space text-sm tracking-widest mb-4">
            CERTIFICATIONS
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            Validating my expertise with industry-recognized certifications and
            continuous learning.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div
                className="h-full rounded-2xl border-2 border-cyberpunk-blue/20 bg-background/50 backdrop-blur-sm 
                            overflow-hidden hover:border-cyberpunk-pink/40 hover:shadow-xl hover:shadow-cyberpunk-pink/10 
                            transition-all duration-300"
              >
                {/* Certificate Image Container - Fixed Size */}
                <div className="relative h-48 bg-gradient-to-br from-cyberpunk-dark/50 to-background/50 overflow-hidden">
                  {/* Certificate Image - Fitted to container */}
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-auto h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ maxHeight: "100%" }}
                    />
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm">
                      <Award className="h-5 w-5 text-cyberpunk-yellow" />
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/10 to-transparent pointer-events-none"></div>
                </div>

                {/* Certificate Content */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-orbitron text-xl mb-2">
                      {cert.title}
                    </h3>
                    <p className="font-rajdhani text-cyberpunk-blue text-lg">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Certificate ID */}
                  <div className="mb-6">
                    <div className="px-3 py-1.5 rounded-lg bg-cyberpunk-blue/10 border border-cyberpunk-blue/20">
                      <p className="font-space text-xs text-cyberpunk-blue">
                        ID: {cert.credentialId}
                      </p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="font-orbitron text-sm mb-2 text-cyberpunk-pink">
                      Skills Validated
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-cyberpunk-blue/30 hover:bg-cyberpunk-blue/10 hover:border-cyberpunk-blue transition-all"
                      onClick={() => {
                        // Open certificate in modal or new tab with better view
                        const newWindow = window.open("", "_blank");
                        if (newWindow) {
                          newWindow.document.write(`
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <title>${cert.title} - ${cert.issuer}</title>
                                <style>
                                  body { 
                                    margin: 0; 
                                    padding: 20px; 
                                    background: #0a0a0a;
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                    min-height: 100vh;
                                  }
                                  img { 
                                    max-width: 100%; 
                                    max-height: 90vh;
                                    border-radius: 12px;
                                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
                                    border: 2px solid #00f0ff;
                                  }
                                  .container {
                                    text-align: center;
                                    color: white;
                                  }
                                  .title {
                                    font-family: sans-serif;
                                    margin-bottom: 20px;
                                    color: #ff00ff;
                                  }
                                </style>
                              </head>
                              <body>
                                <div class="container">
                                  <h1 class="title">${cert.title}</h1>
                                  <img src="${cert.image}" alt="${cert.title}" />
                                  <p style="margin-top: 20px; color: #00f0ff;">Click anywhere to close</p>
                                </div>
                                <script>
                                  document.addEventListener('click', () => window.close());
                                </script>
                              </body>
                            </html>
                          `);
                          newWindow.document.close();
                        }
                      }}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-cyberpunk-pink/30 hover:bg-cyberpunk-pink/10 hover:border-cyberpunk-pink transition-all"
                      onClick={() => {
                        // Download the certificate image
                        const link = document.createElement("a");
                        link.href = cert.image;
                        link.download = `${cert.title.replace(
                          /\s+/g,
                          "_"
                        )}_Certificate`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div
            className="inline-block p-8 rounded-2xl border-2 border-cyberpunk-pink/20 
                        bg-gradient-to-r from-cyberpunk-dark/50 to-background/50 backdrop-blur-sm"
          >
            <h3 className="font-orbitron text-2xl mb-4">Continuous Learning</h3>
            <p className="font-rajdhani text-lg text-muted-foreground mb-6 max-w-2xl">
              I believe in constantly updating my skills with the latest
              technologies and best practices.
            </p>
            <Button
              variant="cyber"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/shaman-dhungel",
                  "_blank"
                )
              }
            >
              View All Certifications
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;