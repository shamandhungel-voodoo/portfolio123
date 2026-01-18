import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LogOut, Plus, Edit2, Trash2, Eye, 
  FileText, MessageSquare, Users, 
  BarChart3, Settings, Briefcase
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { projectsAPI, testimonialsAPI, contactAPI, authAPI } from '../utils/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    shortDescription: '',
    technologies: '',
    imageUrl: '',
    liveUrl: '',
    githubUrl: '',
    category: 'web',
    featured: false
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    avatar: '',
    rating: 5,
    featured: false
  });

  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [activeTab]);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    try {
      const response = await authAPI.getProfile();
      setAdmin(response.data);
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const response = await projectsAPI.getAll();
        setProjects(response.data);
      } else if (activeTab === 'testimonials') {
        const response = await testimonialsAPI.getAll();
        setTestimonials(response.data);
      } else if (activeTab === 'messages') {
        const response = await contactAPI.getContactMessages();
        setMessages(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies.split(',').map(t => t.trim()).filter(t => t)
      };

      if (isEditing && editingId) {
        await projectsAPI.update(editingId, projectData);
      } else {
        await projectsAPI.create(projectData);
      }

      resetForms();
      fetchData();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await testimonialsAPI.update(editingId, testimonialForm);
      } else {
        await testimonialsAPI.create(testimonialForm);
      }

      resetForms();
      fetchData();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const resetForms = () => {
    setProjectForm({
      title: '',
      description: '',
      shortDescription: '',
      technologies: '',
      imageUrl: '',
      liveUrl: '',
      githubUrl: '',
      category: 'web',
      featured: false
    });
    setTestimonialForm({
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: '',
      rating: 5,
      featured: false
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleEdit = (type, item) => {
    setIsEditing(true);
    setEditingId(item._id);
    
    if (type === 'project') {
      setProjectForm({
        title: item.title,
        description: item.description,
        shortDescription: item.shortDescription,
        technologies: item.technologies.join(', '),
        imageUrl: item.imageUrl,
        liveUrl: item.liveUrl || '',
        githubUrl: item.githubUrl || '',
        category: item.category,
        featured: item.featured
      });
      setActiveTab('projects');
    } else {
      setTestimonialForm({
        name: item.name,
        role: item.role,
        company: item.company || '',
        content: item.content,
        avatar: item.avatar,
        rating: item.rating,
        featured: item.featured
      });
      setActiveTab('testimonials');
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      if (type === 'project') {
        await projectsAPI.delete(id);
        setProjects(projects.filter(p => p._id !== id));
      } else {
        await testimonialsAPI.delete(id);
        setTestimonials(testimonials.filter(t => t._id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const tabs = [
    { id: 'projects', label: 'Projects', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Users className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyberpunk-dark via-purple-900/20 to-cyberpunk-dark p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
            <div>
              <h1 className="font-orbitron text-3xl mb-2">Admin Dashboard</h1>
              <p className="font-rajdhani text-muted-foreground">
                Welcome back, {admin?.name || 'Admin'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-cyberpunk-blue/50"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Site
              </Button>
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-pink-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-cyberpunk-pink/20 to-cyberpunk-blue/20 text-cyberpunk-pink border border-cyberpunk-pink/30'
                        : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-rajdhani font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-cyberpunk-blue/20">
                <h3 className="font-orbitron text-lg mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-sm">Projects</span>
                    <span className="font-space text-cyberpunk-pink">{projects.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-sm">Testimonials</span>
                    <span className="font-space text-cyberpunk-blue">{testimonials.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani text-sm">Messages</span>
                    <span className="font-space text-cyberpunk-purple">{messages.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                  <h2 className="font-orbitron text-2xl mb-6">
                    {isEditing ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <form onSubmit={handleProjectSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Title *</label>
                        <Input
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                          placeholder="Project Title"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Category</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          <option value="web">Web Development</option>
                          <option value="mobile">Mobile App</option>
                          <option value="full-stack">Full Stack</option>
                          <option value="design">Design</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-rajdhani font-medium mb-2 block">Short Description *</label>
                      <Input
                        value={projectForm.shortDescription}
                        onChange={(e) => setProjectForm({...projectForm, shortDescription: e.target.value})}
                        placeholder="Brief description (max 150 chars)"
                        maxLength={150}
                        required
                      />
                    </div>

                    <div>
                      <label className="font-rajdhani font-medium mb-2 block">Full Description *</label>
                      <Textarea
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        placeholder="Detailed project description"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <label className="font-rajdhani font-medium mb-2 block">Technologies (comma separated)</label>
                      <Input
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        placeholder="React, Node.js, MongoDB, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Image URL</label>
                        <Input
                          value={projectForm.imageUrl}
                          onChange={(e) => setProjectForm({...projectForm, imageUrl: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Live URL</label>
                        <Input
                          value={projectForm.liveUrl}
                          onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">GitHub URL</label>
                        <Input
                          value={projectForm.githubUrl}
                          onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})}
                          placeholder="https://github.com/username/repo"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={projectForm.featured}
                          onChange={(e) => setProjectForm({...projectForm, featured: e.target.checked})}
                          className="rounded border-cyberpunk-pink text-cyberpunk-pink focus:ring-cyberpunk-pink"
                        />
                        <span className="font-rajdhani">Featured Project</span>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" variant="cyber">
                        {isEditing ? 'Update Project' : 'Add Project'}
                      </Button>
                      {isEditing && (
                        <Button type="button" variant="outline" onClick={resetForms}>
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Projects List */}
                <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                  <h3 className="font-orbitron text-2xl mb-6">All Projects ({projects.length})</h3>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberpunk-pink mx-auto"></div>
                      <p className="mt-4 font-rajdhani">Loading projects...</p>
                    </div>
                  ) : projects.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="h-16 w-16 text-cyberpunk-pink/30 mx-auto mb-4" />
                      <p className="font-rajdhani text-muted-foreground">No projects yet. Add your first project!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div key={project._id} className="p-4 rounded-lg border border-cyberpunk-blue/20 hover:border-cyberpunk-pink/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-orbitron text-lg">{project.title}</h4>
                                {project.featured && (
                                  <span className="px-2 py-1 text-xs rounded-full bg-cyberpunk-pink/20 text-cyberpunk-pink">
                                    Featured
                                  </span>
                                )}
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                                  {project.category}
                                </span>
                              </div>
                              <p className="font-rajdhani text-sm text-muted-foreground mb-3">{project.shortDescription}</p>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.slice(0, 3).map((tech) => (
                                  <span key={tech} className="px-2 py-1 text-xs rounded-full bg-cyberpunk-blue/10 text-cyberpunk-blue">
                                    {tech}
                                  </span>
                                ))}
                                {project.technologies.length > 3 && (
                                  <span className="px-2 py-1 text-xs rounded-full bg-gray-800 text-gray-400">
                                    +{project.technologies.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit('project', project)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete('project', project._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                  <h2 className="font-orbitron text-2xl mb-6">
                    {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                  </h2>
                  <form onSubmit={handleTestimonialSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Name *</label>
                        <Input
                          value={testimonialForm.name}
                          onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                          placeholder="Client Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Role *</label>
                        <Input
                          value={testimonialForm.role}
                          onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                          placeholder="CEO, Developer, etc."
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-rajdhani font-medium mb-2 block">Company</label>
                      <Input
                        value={testimonialForm.company}
                        onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                        placeholder="Company Name"
                      />
                    </div>

                    <div>
                      <label className="font-rajdhani font-medium mb-2 block">Testimonial *</label>
                      <Textarea
                        value={testimonialForm.content}
                        onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})}
                        placeholder="What they said about your work..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Avatar URL</label>
                        <Input
                          value={testimonialForm.avatar}
                          onChange={(e) => setTestimonialForm({...testimonialForm, avatar: e.target.value})}
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>
                      <div>
                        <label className="font-rajdhani font-medium mb-2 block">Rating (1-5)</label>
                        <select
                          value={testimonialForm.rating}
                          onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                        >
                          {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={testimonialForm.featured}
                          onChange={(e) => setTestimonialForm({...testimonialForm, featured: e.target.checked})}
                          className="rounded border-cyberpunk-pink text-cyberpunk-pink focus:ring-cyberpunk-pink"
                        />
                        <span className="font-rajdhani">Featured Testimonial</span>
                      </label>
                    </div>

                    <div className="flex space-x-4">
                      <Button type="submit" variant="cyber">
                        {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                      </Button>
                      {isEditing && (
                        <Button type="button" variant="outline" onClick={resetForms}>
                          Cancel Edit
                        </Button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Testimonials List */}
                <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                  <h3 className="font-orbitron text-2xl mb-6">All Testimonials ({testimonials.length})</h3>
                  {loading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberpunk-blue mx-auto"></div>
                      <p className="mt-4 font-rajdhani">Loading testimonials...</p>
                    </div>
                  ) : testimonials.length === 0 ? (
                    <div className="text-center py-12">
                      <Users className="h-16 w-16 text-cyberpunk-blue/30 mx-auto mb-4" />
                      <p className="font-rajdhani text-muted-foreground">No testimonials yet. Add your first testimonial!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testimonials.map((testimonial) => (
                        <div key={testimonial._id} className="p-4 rounded-lg border border-cyberpunk-blue/20 hover:border-cyberpunk-pink/50 transition-colors">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4 flex-1">
                              <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-cyberpunk-pink/30">
                                <img
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h4 className="font-orbitron text-lg">{testimonial.name}</h4>
                                  {testimonial.featured && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-cyberpunk-pink/20 text-cyberpunk-pink">
                                      Featured
                                    </span>
                                  )}
                                </div>
                                <p className="font-rajdhani text-sm text-cyberpunk-blue mb-2">
                                  {testimonial.role}
                                  {testimonial.company && ` • ${testimonial.company}`}
                                </p>
                                <div className="flex items-center space-x-2 mb-3">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`h-3 w-3 rounded-full ${
                                        i < testimonial.rating
                                          ? 'bg-cyberpunk-yellow'
                                          : 'bg-gray-700'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <p className="font-rajdhani text-sm text-muted-foreground line-clamp-2">
                                  "{testimonial.content}"
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEdit('testimonial', testimonial)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDelete('testimonial', testimonial._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                <h2 className="font-orbitron text-2xl mb-6">Contact Messages ({messages.length})</h2>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyberpunk-purple mx-auto"></div>
                    <p className="mt-4 font-rajdhani">Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="h-16 w-16 text-cyberpunk-purple/30 mx-auto mb-4" />
                    <p className="font-rajdhani text-muted-foreground">No messages yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message._id} className="p-4 rounded-lg border border-cyberpunk-blue/20">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-orbitron text-lg">{message.name}</h4>
                            <p className="font-rajdhani text-sm text-cyberpunk-blue">{message.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              message.status === 'read' 
                                ? 'bg-green-500/20 text-green-500'
                                : message.status === 'replied'
                                ? 'bg-blue-500/20 text-blue-500'
                                : 'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {message.status}
                            </span>
                            <span className="font-space text-xs text-muted-foreground">
                              {new Date(message.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="font-rajdhani text-muted-foreground">{message.message}</p>
                        <div className="mt-4 pt-4 border-t border-cyberpunk-blue/10">
                          <a
                            href={`mailto:${message.email}`}
                            className="inline-flex items-center space-x-2 text-cyberpunk-pink hover:text-cyberpunk-blue"
                          >
                            <Mail className="h-4 w-4" />
                            <span className="font-rajdhani text-sm">Reply via Email</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                <h2 className="font-orbitron text-2xl mb-6">Analytics Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 rounded-xl border border-cyberpunk-pink/20">
                    <div className="text-3xl font-orbitron text-cyberpunk-pink mb-2">{projects.length}</div>
                    <p className="font-rajdhani text-sm text-muted-foreground">Total Projects</p>
                  </div>
                  <div className="p-6 rounded-xl border border-cyberpunk-blue/20">
                    <div className="text-3xl font-orbitron text-cyberpunk-blue mb-2">{testimonials.length}</div>
                    <p className="font-rajdhani text-sm text-muted-foreground">Total Testimonials</p>
                  </div>
                  <div className="p-6 rounded-xl border border-cyberpunk-purple/20">
                    <div className="text-3xl font-orbitron text-cyberpunk-purple mb-2">{messages.length}</div>
                    <p className="font-rajdhani text-sm text-muted-foreground">Total Messages</p>
                  </div>
                </div>
                
                <div className="p-6 rounded-xl border border-cyberpunk-blue/20">
                  <h3 className="font-orbitron text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project._id} className="flex items-center justify-between py-2 border-b border-cyberpunk-blue/10 last:border-0">
                        <div>
                          <p className="font-rajdhani font-medium">New Project Added</p>
                          <p className="font-rajdhani text-sm text-muted-foreground">{project.title}</p>
                        </div>
                        <span className="font-space text-xs text-muted-foreground">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="p-6 rounded-2xl border-glow bg-background/80 backdrop-blur-sm">
                <h2 className="font-orbitron text-2xl mb-6">Settings</h2>
                
                <div className="space-y-8">
                  {/* Profile Settings */}
                  <div className="p-6 rounded-xl border border-cyberpunk-blue/20">
                    <h3 className="font-orbitron text-xl mb-6">Profile Settings</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="font-rajdhani font-medium mb-2 block">Admin Name</label>
                          <Input value={admin?.name || ''} disabled />
                        </div>
                        <div>
                          <label className="font-rajdhani font-medium mb-2 block">Email</label>
                          <Input value={admin?.email || ''} disabled />
                        </div>
                      </div>
                      <div>
                        <p className="font-rajdhani text-sm text-muted-foreground">
                          Last login: {admin?.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* System Information */}
                  <div className="p-6 rounded-xl border border-cyberpunk-purple/20">
                    <h3 className="font-orbitron text-xl mb-6">System Information</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between py-2 border-b border-cyberpunk-blue/10">
                        <span className="font-rajdhani">Backend Status</span>
                        <span className="font-space text-green-500">● Online</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-cyberpunk-blue/10">
                        <span className="font-rajdhani">Database Connection</span>
                        <span className="font-space text-green-500">● Connected</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="font-rajdhani">JWT Authentication</span>
                        <span className="font-space text-green-500">● Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="p-6 rounded-xl border border-red-500/20">
                    <h3 className="font-orbitron text-xl mb-6 text-red-500">Danger Zone</h3>
                    <div className="space-y-4">
                      <p className="font-rajdhani text-sm text-muted-foreground">
                        These actions are irreversible. Please proceed with caution.
                      </p>
                      <div className="flex space-x-4">
                        <Button
                          variant="outline"
                          className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete all data? This cannot be undone.')) {
                              alert('This feature would delete all data. Implement as needed.');
                            }
                          }}
                        >
                          Delete All Data
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleLogout}
                        >
                          Logout All Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;