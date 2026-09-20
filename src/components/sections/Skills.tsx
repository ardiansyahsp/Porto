import React from 'react';
import { useLanguage } from '@/hooks';
import { motion } from 'framer-motion';

// Daftar teknologi inti dengan ikon resolusi tinggi dari Devicon
const techStack = [
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  { name: 'Apache', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg' },
  { name: 'Google Cloud', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
];

export const Skills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="skills" className="bg-surface border-y border-border-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          
          <div className="flex-shrink-0 z-20 bg-surface lg:pr-4">
            <p className="text-xs font-bold tracking-wider text-muted uppercase whitespace-nowrap">
              {t('strip.label')}
            </p>
          </div>
          
          {/* Marquee Container dengan efek transisi di ujung */}
          <div className="relative flex w-full overflow-hidden">
            {/* Gradien kiri & kanan agar animasi terlihat halus saat muncul/menghilang */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-10"></div>
            
            <motion.div 
              className="flex items-center gap-12 sm:gap-16 shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            >
              {/* Kita me-render array dua kali agar efek looping tidak pernah terputus */}
              {[...techStack, ...techStack].map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer"
                >
                  <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />
                  <span className="text-sm font-semibold text-body whitespace-nowrap">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};