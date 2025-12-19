import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  title: string;
  category: string;
  alt: string;
}

const GalleryPreview = () => {
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/gallery-items?populate=*'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        
        const data = await response.json();
        
        // Sort by displayOrder and transform data
        const sortedImages = data.data
          .sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0))
          .map((item: any) => ({
            src: item.imsge?.url || item.imsge?.formats?.large?.url || '',
            title: item.Title,
            category: item.Category,
            alt: item.altText || item.Title,
          }));
        
        setAllImages(sortedImages);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || allImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, allImages.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    setAutoPlay(false);
  };

  if (isLoading || allImages.length === 0) {
    return null;
  }

  // Get the 3 images to display (current, next, next+1)
  const displayImages = [];
  for (let i = 0; i < 3; i++) {
    displayImages.push(allImages[(currentIndex + i) % allImages.length]);
  }

  const leftImage = displayImages[0];
  const centerImage = displayImages[1];
  const rightImage = displayImages[2];

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-luxury mb-4">
            Our Gallery
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Experience the magic of High Spirits through our gallery! Explore how every detail is designed to make your experience truly unique.
          </p>
        </motion.div>

        {/* Gallery Grid with Auto-Slide */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Left Image */}
            <motion.div
              key={`left-${currentIndex}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden elegant-shadow group cursor-pointer">
                <motion.img
                  src={leftImage.src}
                  alt={leftImage.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-1">{leftImage.category}</p>
                  <h3 className="text-xl font-playfair font-bold text-luxury">{leftImage.title}</h3>
                </div>
              </div>
            </motion.div>

            {/* Center Column - 1 Image */}
            <motion.div
              key={`center-${currentIndex}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden elegant-shadow group cursor-pointer">
                <motion.img
                  src={centerImage.src}
                  alt={centerImage.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-1">{centerImage.category}</p>
                  <h3 className="text-xl font-playfair font-bold text-luxury">{centerImage.title}</h3>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              key={`right-${currentIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative h-[500px] rounded-3xl overflow-hidden elegant-shadow group cursor-pointer">
                <motion.img
                  src={rightImage.src}
                  alt={rightImage.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-1">{rightImage.category}</p>
                  <h3 className="text-xl font-playfair font-bold text-luxury">{rightImage.title}</h3>
                </div>
              </div>
            </motion.div>

            {/* Mobile Layout - Single Column */}
            <motion.div
              key={`mobile-${currentIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.8 }}
              className="md:hidden col-span-1"
            >
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className="relative h-[250px] rounded-2xl overflow-hidden elegant-shadow group cursor-pointer mb-6"
                >
                  <motion.img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-accent text-xs font-semibold uppercase tracking-wider">{image.category}</p>
                    <h3 className="text-sm font-playfair font-bold text-luxury">{image.title}</h3>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-8">
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
            {allImages.map((_, index) => (
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
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm">
            Auto-sliding • {currentIndex + 1} of {allImages.length}
          </p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Link to="/gallery">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8 py-6 gold-glow group"
            >
              Explore Full Gallery
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryPreview;
