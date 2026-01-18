import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { testimonialsAPI } from '../utils/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsAPI.getAll();
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberpunk-blue mx-auto"></div>
            <p className="mt-4 font-rajdhani">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue font-space text-sm tracking-widest mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Client <span className="text-gradient">Feedback</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            What clients and colleagues say about working with me.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {testimonials.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <div className="h-40 w-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyberpunk-blue/10 to-cyberpunk-pink/10 
                              flex items-center justify-center">
                  <Quote className="h-16 w-16 text-cyberpunk-blue/50" />
                </div>
                <h3 className="font-orbitron text-2xl mb-4">No Testimonials Yet</h3>
                <p className="font-rajdhani text-muted-foreground mb-6">
                  Testimonials will appear here once added from the admin dashboard.
                </p>
                <button
                  onClick={() => window.open('/admin/login', '_blank')}
                  className="px-6 py-2 rounded-lg border border-cyberpunk-blue/50 hover:bg-cyberpunk-blue/10 
                           transition-colors font-rajdhani"
                >
                  Admin Login to Add Testimonials
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="p-8 md:p-12 rounded-3xl border-glow bg-background/50 backdrop-blur-sm">
                  <Quote className="h-12 w-12 text-cyberpunk-pink/30 mb-6" />
                  
                  <div className="mb-8">
                    <p className="font-rajdhani text-xl md:text-2xl leading-relaxed italic text-muted-foreground">
                      "{testimonials[currentIndex]?.content}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyberpunk-pink/30">
                        <img
                          src={testimonials[currentIndex]?.avatar}
                          alt={testimonials[currentIndex]?.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = '<div class="h-full w-full flex items-center justify-center bg-cyberpunk-blue/20"><User className="h-8 w-8 text-cyberpunk-blue" /></div>';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-orbitron text-lg">{testimonials[currentIndex]?.name}</h4>
                        <p className="font-rajdhani text-cyberpunk-blue">
                          {testimonials[currentIndex]?.role}
                          {testimonials[currentIndex]?.company && `, ${testimonials[currentIndex]?.company}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < (testimonials[currentIndex]?.rating || 5)
                              ? 'fill-cyberpunk-yellow text-cyberpunk-yellow'
                              : 'fill-gray-800 text-gray-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full border border-cyberpunk-blue/30 hover:bg-cyberpunk-blue/10 
                             transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5 text-cyberpunk-blue" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-3 w-3 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-cyberpunk-pink w-6'
                            : 'bg-gray-600 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full border border-cyberpunk-blue/30 hover:bg-cyberpunk-blue/10 
                             transition-colors"
                  >
                    <ChevronRight className="h-5 w-5 text-cyberpunk-blue" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Featured Testimonials Grid */}
        {testimonials.filter(t => t.featured).length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h3 className="font-orbitron text-3xl text-center mb-12">
              Featured <span className="text-gradient">Reviews</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials
                .filter(t => t.featured)
                .slice(0, 3)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-xl border border-cyberpunk-pink/20 bg-background/30 
                             hover:bg-background/50 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden border border-cyberpunk-blue/30">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.parentElement.innerHTML = '<div class="h-full w-full flex items-center justify-center bg-cyberpunk-pink/20"><User className="h-6 w-6 text-cyberpunk-pink" /></div>';
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="font-orbitron">{testimonial.name}</h4>
                        <p className="font-rajdhani text-sm text-cyberpunk-blue">{testimonial.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating
                              ? 'fill-cyberpunk-yellow text-cyberpunk-yellow'
                              : 'fill-gray-800 text-gray-800'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="font-rajdhani text-sm text-muted-foreground line-clamp-4">
                      "{testimonial.content}"
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;