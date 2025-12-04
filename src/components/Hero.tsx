import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import VideoBackground from './VideoBackground';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <VideoBackground />

      {/* Floating Food Images */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute left-10 top-1/4 w-64 h-64 hidden lg:block"
      >
        <motion.img
          src={heroDish1}
          alt="Luxury Indian Dish"
          className="w-full h-full object-cover rounded-full shadow-2xl gold-glow"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute right-10 bottom-1/4 w-56 h-56 hidden lg:block"
      >
        <motion.img
          src={heroDish2}
          alt="Premium Punjabi Cuisine"
          className="w-full h-full object-cover rounded-full shadow-2xl gold-glow"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute right-1/4 top-20 w-48 h-48 hidden xl:block"
      >
        <motion.img
          src={heroDish3}
          alt="North Indian Delicacy"
          className="w-full h-full object-cover rounded-full shadow-2xl gold-glow"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* <motion.p
            className="text-accent font-inter tracking-widest mb-4 text-sm md:text-base uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Authentic Indian Fine Dining
          </motion.p> */}

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6">
            <span className="text-luxury block">HIGH SPIRITS</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-xl md:text-3xl font-playfair text-foreground mb-4"
          >
         AUTHENTIC INDIAN RESTAURANT
          </motion.p>

          {/* ⭐ ONLY NEW THING ADDED — SLOGAN */}
    <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.9 }}
  className="text-lg md:text-xl text-accent italic font-semibold mb-4"
  style={{ fontFamily: 'Playfair Display, serif' }}
>
  “Taste the Spirit of Punjab”
</motion.p>



          {/* ⭐ END OF NEW LINE */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Discover authentic Punjabi, North Indian, and tandoori specialties 
            crafted with traditional flavors - served in a luxurious fine-dining atmosphere.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/reservations">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-8 py-6 gold-glow"
            >
              Book a Table
            </Button>
          </Link>
          <Link to="/menu">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold text-lg px-8 py-6"
            >
              Explore Menu
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="w-8 h-8 text-accent" />
      </motion.div>
    </section>
  );
};

export default Hero;
