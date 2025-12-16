import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

import heroDish1 from '@/assets/Image.jpg';
import heroDish2 from '@/assets/1.png';
import heroDish3 from '@/assets/2.png';
import dalMakhani from '@/assets/HighSpirit.png';
import palakPaneer from '@/assets/5.png';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import naan from '@/assets/dish-naan.jpg';
import restaurantAmbience from '@/assets/restaurant-ambience.jpg';
import chefPortrait from '@/assets/chef-portrait.jpg';

const Gallery = () => {

  const images = [
    { src: restaurantAmbience },
    { src: heroDish1 },
    { src: heroDish2 },
    { src: heroDish3 },
    { src: dalMakhani },
    { src: palakPaneer },
    { src: 'https://highspirts-new.vercel.app/8.jpg' },
    { src: 'https://highspirts-new.vercel.app/9.jpg' },
    { src: 'https://highspirts-new.vercel.app/assets/cocktail-signature-S5XTVbi_.jpg' },
    { src: 'https://highspirts-new.vercel.app/assets/wine-pairing-cjecvPaa.jpg' },
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
            className="
              font-playfair font-bold text-luxury mb-6 text-center 
              whitespace-normal break-words leading-tight
              text-[clamp(2.2rem,6vw,4.8rem)]
            "
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
                className="group relative overflow-hidden rounded-xl elegant-shadow cursor-pointer aspect-square"
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Soft hover gradient (no text now) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-80 transition-all duration-500" />
              </motion.div>
            ))}

          </div>

          {/* Reservation CTA */}
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
