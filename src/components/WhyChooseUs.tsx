import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceCard {
  icon: string;
  title: string;
  description: string;
}

const WhyChooseUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const services: ServiceCard[] = [
    {
      icon: '👨‍🍳',
      title: 'Authentic Cuisine',
      description: 'Heritage recipes combined with modern techniques for an unforgettable culinary experience.'
    },
    {
      icon: '✨',
      title: 'Luxury Ambience',
      description: 'Elegantly designed spaces that transport you to a world of sophistication and comfort.'
    },
    {
      icon: '🎯',
      title: 'Impeccable Service',
      description: 'Attentive and professional staff dedicated to exceeding your expectations.'
    },
    {
      icon: '🌟',
      title: 'Premium Ingredients',
      description: 'Ethically sourced produce and authentic spices for exceptional quality.'
    },
    {
      icon: '🎉',
      title: 'Event Excellence',
      description: 'Bespoke event services for unforgettable celebrations and gatherings.'
    },
    {
      icon: '❤️',
      title: 'Guest-Centric',
      description: 'Your satisfaction and comfort are our top priorities in every detail.'
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, services.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setAutoPlay(false);
  };

  const visibleCards = 3;
  const displayedServices = [];
  for (let i = 0; i < visibleCards; i++) {
    displayedServices.push(services[(currentIndex + i) % services.length]);
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground mb-4">
            Why Choose{' '}
            <span className="text-accent">High Spirits</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            At High Spirits, we combine culinary expertise, exceptional service, and an atmosphere of luxury to create dining experiences that transcend the ordinary. Every visit is a celebration of authentic flavors and refined elegance.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Border Container */}
          <div className="rounded-2xl p-8 md:p-12 bg-gradient-to-br from-accent/5 to-transparent">
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <AnimatePresence mode="wait">
                {displayedServices.map((service, index) => (
                  <motion.div
                    key={`${currentIndex}-${index}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="glass-effect rounded-xl p-6 border border-accent/30 hover:border-accent/60 transition-all duration-300 hover:scale-105 group"
                  >
                    {/* Icon */}
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-playfair font-bold text-luxury mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>

                    {/* Accent dot */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                      <div className="flex-1 h-px bg-gradient-to-r from-accent to-transparent" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              {/* Left Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border-2 border-accent hover:bg-accent hover:text-accent-foreground text-accent transition-all duration-300 flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex gap-2 items-center">
                {services.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setAutoPlay(false);
                    }}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-accent w-8 h-2'
                        : 'bg-accent/40 w-2 h-2 hover:bg-accent/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-12 h-12 rounded-full border-2 border-accent hover:bg-accent hover:text-accent-foreground text-accent transition-all duration-300 flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Auto-play Info */}
            <div className="text-center mt-6">
              <p className="text-muted-foreground text-sm">
                Auto-sliding • {currentIndex + 1} of {services.length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
