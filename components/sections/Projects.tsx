'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { projects } from '@/config/projects';
import { fadeInUp, containerVariants } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type Category = 'advisory' | 'assessment' | 'training' | 'operations' | 'all';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories: Array<{ id: Category; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'advisory', label: 'Security Advisory' },
    { id: 'assessment', label: 'Risk Assessment' },
    { id: 'training', label: 'Training & Education' },
    { id: 'operations', label: 'Operations & Governance' },
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -bottom-40 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Explore security architecture, risk advisory, and organizational governance projects
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedProject(null);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-sky-500 to-violet-500 text-white shadow-lg shadow-sky-500/50'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
              <Card hoverable gradient className="h-full flex flex-col">
                {/* Image */}
                <div className="w-full h-48 bg-slate-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="neutral" size="sm">
                      {`+${project.technologies.length - 3}`}
                    </Badge>
                  )}
                </div>

                {/* View Details Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="w-full px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details →
                </motion.button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-400 text-lg">
              No projects in the <span className="text-cyan-400 font-semibold">{selectedCategory}</span> category yet.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Try selecting a different category or view all projects.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => {
          setSelectedProject(null);
          setCurrentImageIndex(0);
        }}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Image Carousel */}
            <div className="w-full relative group">
              <motion.div
                className="w-full h-64 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedProject.images[currentImageIndex]}
                  alt={`${selectedProject.title} - image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                />
              </motion.div>

              {/* Image navigation */}
              {selectedProject.images.length > 1 && (
                <>
                  <motion.button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? selectedProject.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ←
                  </motion.button>
                  <motion.button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev === selectedProject.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    →
                  </motion.button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {selectedProject.images.map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'bg-cyan-400 w-6'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">About</h4>
              <p className="text-slate-400">{selectedProject.description}</p>
            </div>

            {/* Role */}
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-2">My Role</h4>
              <p className="text-slate-400">{selectedProject.role}</p>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Badge key={tech} variant="primary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="text-lg font-semibold text-slate-200 mb-3">Key Highlights</h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-slate-400"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span>{highlight}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {selectedProject.link && (
                <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary" size="md">
                    Visit Project
                  </Button>
                </a>
              )}
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="md">
                    View Code
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
};
