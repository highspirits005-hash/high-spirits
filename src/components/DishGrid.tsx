import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import naan from '@/assets/dish-naan.jpg';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';

const dishes = [
  { id: 1, image: heroDish1, name: 'Butter Chicken', category: 'North Indian' },
  { id: 2, image: heroDish2, name: 'Tandoori Platter', category: 'Punjabi' },
  { id: 3, image: dalMakhani, name: 'Dal Makhani', category: 'Indian' },
  { id: 4, image: palakPaneer, name: 'Palak Paneer', category: 'Vegetarian' },
  { id: 5, image: roganJosh, name: 'Rogan Josh', category: 'Kashmiri' },
  { id: 6, image: naan, name: 'Assorted Naan', category: 'Breads' },
];

const DishGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
            Culinary Excellence
          </p>
       <h2
  className="
    font-playfair font-bold text-luxury mb-4 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2rem,5.5vw,3.5rem)]
  "
>
  Signature Dishes
</h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Handcrafted with the finest ingredients and authentic spices
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative overflow-hidden rounded-lg elegant-shadow cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              >
                <p className="text-accent text-sm font-inter uppercase tracking-wider mb-1">
                  {dish.category}
                </p>
                <h3 className="text-2xl font-playfair font-bold text-foreground">
                  {dish.name}
                </h3>
                <div className="w-16 h-1 bg-accent mt-3 rounded-full" />
              </motion.div>
              <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-accent text-xl">+</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DishGrid;