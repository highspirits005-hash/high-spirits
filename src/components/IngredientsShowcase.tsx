import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Ingredient {
  id: number;
  title: string;
  shortDescription: string;
  displayOrder: number;
  image: {
    url: string;
  };
}

// Map ingredient titles to origin and description
const descriptionMap: { [key: string]: { origin: string; description: string } } = {
  'Dal Makhni': {
    origin: 'Punjab, India',
    description: 'Hand-selected premium whole urad dal, slow-cooked for 12 hours to achieve velvety perfection'
  },
  'Palak Paneer': {
    origin: 'Victoria, Australia',
    description: 'Farm-fresh spinach with house-made paneer, enhanced with organic produce'
  },
  'Naan': {
    origin: 'Punjab, India',
    description: 'Traditional chakki-ground whole wheat, imported directly from heritage mills in Punjab'
  },
  'Biryani': {
    origin: 'Tasmania, Australia',
    description: 'Grass-fed, ethically sourced from pristine Tasmanian highlands, aged for optimal tenderness'
  },
};

const IngredientsShowcase = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/premium-ingredients?populate=*'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch premium ingredients');
        }
        
        const data = await response.json();
        // Sort by displayOrder
        const sortedIngredients = (data.data || []).sort((a: Ingredient, b: Ingredient) => a.displayOrder - b.displayOrder);
        setIngredients(sortedIngredients);
      } catch (err) {
        console.error('Error fetching premium ingredients:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <section className="py-32 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(203, 161, 53, 0.4) 0%, transparent 50%)`,
          backgroundSize: '200% 200%'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <motion.p
            className="text-accent font-inter tracking-widest mb-4 uppercase text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            From Farm to Table
          </motion.p>
       <h2
  className="
    font-playfair font-bold text-luxury mb-6 text-center
    whitespace-normal break-words leading-tight
    text-[clamp(2.2rem,6vw,4.2rem)]
  "
>
  Premium Ingredients
</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A harmonious fusion of the finest Australian produce and authentic Indian heritage ingredients
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {isLoading ? (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground">Loading premium ingredients...</p>
            </div>
          ) : (
            ingredients.map((ingredient, index) => {
              const details = descriptionMap[ingredient.title] || {
                origin: ingredient.shortDescription,
                description: 'Premium ingredient sourced with excellence'
              };
              
              return (
                <motion.div
                  key={ingredient.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className="group relative overflow-hidden rounded-2xl elegant-shadow cursor-pointer"
                >
                  {/* Image with macro effect */}
                  <div className="relative h-96 overflow-hidden">
                    <motion.img
                      src={ingredient.image.url}
                      alt={ingredient.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ filter: 'brightness(1.1)' }}
                    />
                    
                    {/* Gold glow on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-accent/30 via-transparent to-transparent"
                      transition={{ duration: 0.5 }}
                    />
                    
                    {/* Golden shimmer effect */}
                    <motion.div
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent skew-x-12"
                    />
                  </div>

                  {/* Content overlay */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                    className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-primary via-primary/95 to-transparent"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-3xl font-playfair font-bold text-luxury">
                        {ingredient.title}
                      </h3>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="w-2 h-2 bg-accent rounded-full gold-glow"
                      />
                    </div>
                    
                    <p className="text-accent text-sm font-semibold mb-3 tracking-wider uppercase">
                      {details.origin}
                    </p>
                    
                    <p className="text-foreground/90 leading-relaxed">
                      {details.description}
                    </p>
                  </motion.div>

                  {/* Border glow */}
                  <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-500 pointer-events-none" />
                </motion.div>
              );
            })
          )}
        </div>

        {/* Sustainability message */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 text-center glass-effect rounded-2xl p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-playfair font-bold text-foreground mb-4">
            Ethical Sourcing & Sustainability
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every ingredient tells a story of respect—for the land, for tradition, and for the future. 
            We partner exclusively with farmers and suppliers who share our commitment to sustainable practices, 
            fair trade, and environmental stewardship. From organic farms in Victoria to heritage producers in Punjab, 
            our supply chain reflects our values of quality, integrity, and responsibility.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsShowcase;
