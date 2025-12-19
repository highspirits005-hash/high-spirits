import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Dish {
  id: number;
  title: string;
  shortDescription: string;
  displayOrder: number;
  image: {
    url: string;
  };
}

const DishGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/signature-dishes?populate=*'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch signature dishes');
        }
        
        const data = await response.json();
        // Sort by displayOrder
        const sortedDishes = (data.data || []).sort((a: Dish, b: Dish) => a.displayOrder - b.displayOrder);
        setDishes(sortedDishes);
      } catch (err) {
        console.error('Error fetching dishes:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDishes();
  }, []);

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
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading signature dishes...</p>
            </div>
          ) : dishes.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No dishes available</p>
            </div>
          ) : (
            dishes.map((dish, index) => (
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
                    src={dish.image.url}
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                >
                  <p className="text-accent text-sm font-inter uppercase tracking-wider mb-1">
                    {dish.shortDescription}
                  </p>
                  <h3 className="text-2xl font-playfair font-bold text-foreground">
                    {dish.title}
                  </h3>
                  <div className="w-16 h-1 bg-accent mt-3 rounded-full" />
                </motion.div>
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-accent text-xl">+</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default DishGrid;