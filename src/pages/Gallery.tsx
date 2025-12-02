import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import naan from '@/assets/dish-naan.jpg';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';
import chefPortrait from '@/assets/chef-portrait.jpg';

const Gallery = () => {
  const images = [
    { src: restaurantAmbience, title: 'Elegant Dining Room', category: 'ambience' },
    { src: heroDish1, title: 'Butter Chicken', category: 'food' },
    { src: heroDish2, title: 'Tandoori Platter', category: 'food' },
    { src: heroDish3, title: 'Biryani', category: 'food' },
    { src: dalMakhani, title: 'Dal Makhani', category: 'food' },
    { src: palakPaneer, title: 'Palak Paneer', category: 'food' },
    { src: roganJosh, title: 'Rogan Josh', category: 'food' },
    { src: naan, title: 'Fresh Naan', category: 'food' },
    { src: chefPortrait, title: 'Executive Chef', category: 'team' },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden mt-20 luxury-gradient">
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
          >
            Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            Discover the beauty of our cuisine and ambience
          </motion.p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative overflow-hidden rounded-lg elegant-shadow cursor-pointer aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-accent/80 text-accent-foreground text-xs font-semibold rounded-full mb-2 uppercase tracking-wider">
                    {image.category}
                  </span>
                  <h3 className="text-xl font-playfair font-bold text-foreground">
                    {image.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Experience it yourself
            </p>
            <button
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-4 rounded-md gold-glow transition-all duration-300"
              onClick={() => window.location.href = '/reservations'}
            >
              Make a Reservation
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;