import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Loader2,
  Clock,
} from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { contactAPI } from "../utils/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      await contactAPI.sendMessage(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setStatus(""), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
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
            CONTACT
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-2xl border-glow bg-background/50 backdrop-blur-sm">
              <h3 className="font-orbitron text-2xl mb-6 text-cyberpunk-blue">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-cyberpunk-pink/10 text-cyberpunk-pink">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-orbitron mb-1">Email</h4>
                    <a
                      href="mailto:shamandhungel@gmail.com"
                      className="font-rajdhani text-muted-foreground hover:text-cyberpunk-pink transition-colors"
                    >
                      shamandhungel@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-cyberpunk-blue/10 text-cyberpunk-blue">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-orbitron mb-1">Phone</h4>
                    <p className="font-rajdhani text-muted-foreground">
                      +977 9869346515
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-cyberpunk-purple/10 text-cyberpunk-purple">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-orbitron mb-1">Location</h4>
                    <p className="font-rajdhani text-muted-foreground">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 p-4 rounded-lg bg-gradient-to-r from-cyberpunk-dark/50 to-background/50">
                <div className="flex items-center space-x-3">
                  <div
                    className="h-10 w-10 rounded-full bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                                flex items-center justify-center"
                  >
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-orbitron">Quick Response</h4>
                    <p className="font-rajdhani text-sm text-muted-foreground">
                      Typically responds within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-8 rounded-2xl border border-cyberpunk-blue/20 bg-background/30">
              <h3 className="font-orbitron text-xl mb-4 text-cyberpunk-blue">
                Working Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM - 2:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center py-2 border-b border-cyberpunk-blue/10"
                  >
                    <span className="font-rajdhani">{item.day}</span>
                    <span className="font-space text-sm text-cyberpunk-pink">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-2xl border-glow bg-background/50 backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="font-rajdhani font-medium mb-2 block"
                >
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="border-cyberpunk-blue/30 focus:border-cyberpunk-pink"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-rajdhani font-medium mb-2 block"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="border-cyberpunk-blue/30 focus:border-cyberpunk-pink"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-rajdhani font-medium mb-2 block"
                >
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="border-cyberpunk-blue/30 focus:border-cyberpunk-pink resize-none"
                />
              </div>

              {/* Status Messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-green-500/10 border border-green-500/30"
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-rajdhani text-green-500">
                          Message sent successfully! I'll get back to you soon.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                        <span className="text-white text-sm">!</span>
                      </div>
                      <div>
                        <p className="font-rajdhani text-red-500">
                          Something went wrong. Please try again or email me
                          directly.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                variant="cyber"
                className="w-full group"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <p className="font-rajdhani text-sm text-center text-muted-foreground">
                By submitting this form, you agree to our privacy policy.
              </p>
            </form>

            {/* Alternative Contact */}
            <div className="mt-8 pt-8 border-t border-cyberpunk-blue/20">
              <h4 className="font-orbitron text-lg mb-4 text-center">
                Prefer another way?
              </h4>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() =>
                    window.open("mailto:contact@shamandhungel.com", "_blank")
                  }
                  className="px-4 py-2 rounded-lg border border-cyberpunk-pink/30 hover:bg-cyberpunk-pink/10 
                           transition-colors font-rajdhani text-sm"
                >
                  Email Directly
                </button>
                <button
                  onClick={() => window.open("https://linkedin.com", "_blank")}
                  className="px-4 py-2 rounded-lg border border-cyberpunk-blue/30 hover:bg-cyberpunk-blue/10 
                           transition-colors font-rajdhani text-sm"
                >
                  LinkedIn
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
