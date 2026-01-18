import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Award, Download } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  // Resume file URL (replace with your actual resume URL)
  const resumeUrl =
    "https://res.cloudinary.com/dphier2de/image/upload/v1768722793/shaman_hwlwyc.png"; // Replace with your actual resume URL

  const handleDownloadResume = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Shaman_Dhungel_Resume.pdf"; // Default filename for download
    link.target = "_blank"; // Open in new tab as fallback

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);

    // Optional: Show a success message
    console.log("Resume download initiated");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyberpunk-dark via-purple-900/20 to-cyberpunk-dark"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,255,0.1),transparent_50%)]"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-cyberpunk-pink animate-pulse" />
                <span className="font-space text-sm tracking-widest text-cyberpunk-blue">
                  WELCOME TO MY DIGITAL REALM
                </span>
              </div>

              <h1 className="font-orbitron text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-gradient">SHAMAN</span>
                <span className="block text-gradient">DHUNGEL</span>
              </h1>

              <div className="h-1 w-32 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue"></div>

              <p className="font-rajdhani text-xl md:text-2xl text-muted-foreground max-w-2xl">
                Full-Stack Developer crafting immersive digital experiences with
                cutting-edge technologies. Specializing in the MERN stack and
                modern web architecture.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                variant="cyber"
                size="lg"
                className="group"
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View My Work
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-cyberpunk-blue/50 hover:bg-cyberpunk-blue/10 hover:border-cyberpunk-blue"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Let's Connect
              </Button>
            </div>

            {/* Resume Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="pt-8"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full md:w-auto px-8 py-6 group border-cyberpunk-pink/40 hover:border-cyberpunk-pink hover:bg-cyberpunk-pink/10 transition-all duration-300"
                onClick={handleDownloadResume}
              >
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center space-x-2">
                    <Download className="h-5 w-5 text-cyberpunk-pink group-hover:animate-bounce" />
                    <span className="font-orbitron text-xl text-cyberpunk-pink">
                      Download Resume
                    </span>
                  </div>
                  <span className="font-space text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    CV
                  </span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Passport Photo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center"
          >
            {/* Main photo container */}
            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-12">
              {/* Image wrapper with effects */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-cyberpunk-pink/40 
                            shadow-2xl shadow-cyberpunk-pink/30"
              >
                {/* Passport Photo */}
                <img
                  src="https://res.cloudinary.com/dphier2de/image/upload/v1766164590/495132399_10033740026690015_9053434352582941300_n-removebg-preview_ogppwi.png"
                  alt="Shaman Dhungel"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://res.cloudinary.com/dphier2de/image/upload/v1766164590/495132399_10033740026690015_9053434352582941300_n-removebg-preview_ogppwi.png";
                  }}
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyberpunk-pink/10 to-cyberpunk-blue/10"></div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm">
                  <Award className="h-5 w-5 text-cyberpunk-yellow" />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-4 -right-4 h-20 w-20 rounded-full bg-gradient-to-r from-cyberpunk-blue to-cyan-500 opacity-20 blur-xl"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-gradient-to-r from-cyberpunk-pink to-purple-500 opacity-20 blur-xl"
              />

              {/* Name badge */}
              <div
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full 
                            bg-gradient-to-r from-cyberpunk-dark/80 to-background/80 backdrop-blur-sm 
                            border border-cyberpunk-pink/30 shadow-lg min-w-max"
              >
                <p className="font-orbitron text-lg text-cyberpunk-pink whitespace-nowrap">
                  SHAMAN DHUNGEL
                </p>
                <p className="font-space text-xs text-cyberpunk-blue tracking-widest whitespace-nowrap">
                  FULL-STACK DEVELOPER
                </p>
              </div>
            </div>

            {/* Tech stack badges - moved below image with proper spacing */}
            <div className="flex flex-wrap justify-center gap-3 max-w-md">
              {["React", "Node.js", "MongoDB", "Tailwind", "AWS"].map(
                (tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-cyberpunk-blue/30 font-space text-sm hover:border-cyberpunk-pink/50 transition-colors duration-300"
                  >
                    {tech}
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="h-8 w-px bg-gradient-to-b from-cyberpunk-pink to-transparent"></div>
      </motion.div>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)
          `,
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
