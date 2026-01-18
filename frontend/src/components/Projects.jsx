import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, Github, Eye, X, ChevronRight, 
  Calendar, Tag, Globe, Code, Maximize2
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { projectsAPI } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Image optimization function
  const getOptimizedImageUrl = (url) => {
    if (!url || url.trim() === '') {
      return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
    }
    
    // If it's already a good URL, return it
    if (url.startsWith('http')) {
      // Add dimensions if it's unsplash
      if (url.includes('unsplash.com') && !url.includes('w=')) {
        return url + (url.includes('?') ? '&' : '?') + 'w=1200&h=600&fit=crop&q=80';
      }
      return url;
    }
    
    return 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80';
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberpunk-pink mx-auto"></div>
            <p className="mt-4 font-rajdhani">Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-transparent to-background relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-cyberpunk-pink/10 text-cyberpunk-pink font-space text-sm tracking-widest mb-4">
            PORTFOLIO
          </span>
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue mx-auto mb-8"></div>
          <p className="font-rajdhani text-xl text-muted-foreground max-w-3xl mx-auto">
            Click on any project image to view detailed information, technologies used, and live demos.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="max-w-md mx-auto">
                <div className="h-40 w-40 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyberpunk-pink/10 to-cyberpunk-blue/10 
                              flex items-center justify-center">
                  <Eye className="h-16 w-16 text-cyberpunk-pink/50" />
                </div>
                <h3 className="font-orbitron text-2xl mb-4">No Projects Yet</h3>
                <p className="font-rajdhani text-muted-foreground mb-6">
                  Projects will appear here once added from the admin dashboard.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.open('/admin/login', '_blank')}
                  className="border-cyberpunk-blue/50"
                >
                  Admin Login to Add Projects
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  layout
                >
                  <Card className="h-full overflow-hidden border-2 border-cyberpunk-blue/20 
                                 bg-background/50 backdrop-blur-sm 
                                 hover:border-cyberpunk-pink/40 hover:shadow-xl hover:shadow-cyberpunk-pink/10 
                                 transition-all duration-300">
                    
                    {/* Project Image - FIXED SIZE */}
                    <div 
                      className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer group"
                      onClick={() => openProjectModal(project)}
                    >
                      {/* Image Background */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url(${getOptimizedImageUrl(project.imageUrl)})`,
                          backgroundPosition: 'center center',
                          backgroundSize: 'cover'
                        }}
                      ></div>
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                    group-hover:from-black/40 transition-all duration-300"></div>
                      
                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                                      text-white font-space text-xs tracking-widest shadow-lg z-10">
                          FEATURED
                        </div>
                      )}
                      
                      {/* View Details Overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 
                                    transition-all duration-300 bg-black/40">
                        <div className="p-4 rounded-full bg-gradient-to-r from-cyberpunk-pink/90 to-cyberpunk-blue/90 
                                      backdrop-blur-sm mb-3">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-rajdhani text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                          View Details
                        </span>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                        <span className="font-space text-xs text-white uppercase">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="font-orbitron text-xl mb-2 line-clamp-1">
                            {project.title}
                          </CardTitle>
                          <CardDescription className="font-rajdhani line-clamp-2">
                            {project.shortDescription}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-4">
                      {/* Technologies Preview */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue 
                                     border border-cyberpunk-blue/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      <p className="font-rajdhani text-sm text-muted-foreground line-clamp-3">
                        {project.description}
                      </p>
                    </CardContent>

                    <CardFooter className="flex justify-between pt-4 border-t border-cyberpunk-blue/20">
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-cyberpunk-blue/30 hover:border-cyberpunk-blue hover:bg-cyberpunk-blue/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const url = project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="border border-cyberpunk-pink/30 hover:border-cyberpunk-pink hover:bg-cyberpunk-pink/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              const url = project.githubUrl.startsWith('http') ? project.githubUrl : `https://${project.githubUrl}`;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openProjectModal(project)}
                        className="text-cyberpunk-blue hover:text-cyberpunk-pink"
                      >
                        View Details
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Details Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeProjectModal}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-cyberpunk-pink/30 
                            bg-gradient-to-br from-cyberpunk-dark to-background shadow-2xl shadow-cyberpunk-pink/20 modal-scrollbar"
                >
                  {/* Close Button */}
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 backdrop-blur-sm 
                             hover:bg-cyberpunk-pink/20 transition-colors"
                  >
                    <X className="h-5 w-5 text-white" />
                  </button>

                  {/* Modal Header with Image - FIXED SIZE */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${getOptimizedImageUrl(selectedProject.imageUrl)})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover'
                      }}
                    ></div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        {selectedProject.featured && (
                          <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                                        text-white font-space text-sm tracking-widest">
                            FEATURED
                          </span>
                        )}
                        <span className="px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white font-space text-sm">
                          {selectedProject.category.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="font-orbitron text-3xl md:text-4xl text-white mb-2">
                        {selectedProject.title}
                      </h3>
                      <p className="font-rajdhani text-xl text-gray-200">
                        {selectedProject.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="p-8">
                    {/* Project Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-cyberpunk-blue/10 border border-cyberpunk-blue/20">
                        <Calendar className="h-5 w-5 text-cyberpunk-blue" />
                        <div>
                          <p className="font-space text-xs text-muted-foreground">Created</p>
                          <p className="font-rajdhani">{formatDate(selectedProject.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-cyberpunk-pink/10 border border-cyberpunk-pink/20">
                        <Tag className="h-5 w-5 text-cyberpunk-pink" />
                        <div>
                          <p className="font-space text-xs text-muted-foreground">Technologies</p>
                          <p className="font-rajdhani">{selectedProject.technologies.length} used</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-4 rounded-xl bg-cyberpunk-purple/10 border border-cyberpunk-purple/20">
                        <Code className="h-5 w-5 text-cyberpunk-purple" />
                        <div>
                          <p className="font-space text-xs text-muted-foreground">Type</p>
                          <p className="font-rajdhani capitalize">{selectedProject.category} Project</p>
                        </div>
                      </div>
                    </div>

                    {/* Full Description */}
                    <div className="mb-8">
                      <h4 className="font-orbitron text-2xl text-cyberpunk-blue mb-4">Project Overview</h4>
                      <div className="prose prose-invert max-w-none">
                        <p className="font-rajdhani text-lg leading-relaxed whitespace-pre-line">
                          {selectedProject.description}
                        </p>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="font-orbitron text-2xl text-cyberpunk-pink mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-cyberpunk-blue/10 to-cyberpunk-pink/10 
                                     border border-cyberpunk-blue/30 text-cyberpunk-blue font-rajdhani"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="border-t border-cyberpunk-blue/20 pt-8">
                      <h4 className="font-orbitron text-2xl mb-6 text-center">Project Links</h4>
                      <div className="flex flex-col md:flex-row gap-4 justify-center">
                        {selectedProject.liveUrl && (
                          <Button
                            variant="cyber"
                            size="lg"
                            className="flex-1 max-w-md group"
                            onClick={() => {
                              const url = selectedProject.liveUrl.startsWith('http') 
                                ? selectedProject.liveUrl 
                                : `https://${selectedProject.liveUrl}`;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <Globe className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Visit Live Website
                          </Button>
                        )}
                        {selectedProject.githubUrl && (
                          <Button
                            variant="outline"
                            size="lg"
                            className="flex-1 max-w-md border-cyberpunk-blue/50 hover:bg-cyberpunk-blue/10"
                            onClick={() => {
                              const url = selectedProject.githubUrl.startsWith('http') 
                                ? selectedProject.githubUrl 
                                : `https://${selectedProject.githubUrl}`;
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                          >
                            <Github className="h-5 w-5 mr-2" />
                            View Source Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="inline-block p-8 rounded-2xl border-2 border-cyberpunk-pink/20 
                        bg-gradient-to-r from-cyberpunk-dark/50 to-background/50 backdrop-blur-sm">
            <h3 className="font-orbitron text-2xl mb-4">Have a project in mind?</h3>
            <p className="font-rajdhani text-lg text-muted-foreground mb-6 max-w-2xl">
              Let's collaborate to bring your ideas to life with cutting-edge technology
              and exceptional user experience.
            </p>
            <Button
              variant="cyber"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;