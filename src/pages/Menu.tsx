import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemSkeleton } from '@/components/skeletons/MenuItemSkeleton';
import ShareButtons from '@/components/ShareButtons';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import naan from '@/assets/dish-naan.jpg';

const Menu = () => {
  const [selectedDrinkCategory, setSelectedDrinkCategory] = useState('softDrinks');
  const [isLoading, setIsLoading] = useState(true);

  const menuCategories = {
    starters: [
      { name: 'Tandoori Chicken', description: 'Clay oven roasted chicken marinated in yogurt and spices', price: 24, image: heroDish2 },
      { name: 'Paneer Tikka', description: 'Cottage cheese cubes with bell peppers and aromatic spices', price: 22, image: heroDish2 },
      { name: 'Seekh Kebab', description: 'Minced lamb skewers with traditional herbs', price: 26, image: heroDish2 },
      { name: 'Samosa Chaat', description: 'Crispy samosas topped with chickpeas, yogurt, and tamarind chutney', price: 18, image: heroDish2 },
      { name: 'Chicken 65', description: 'Spicy fried chicken with curry leaves and green chilies', price: 24, image: heroDish2 },
    ],
    mains: [
      { name: 'Butter Chicken', description: 'Tender chicken in rich tomato cream sauce', price: 32, image: heroDish1, featured: true },
      { name: 'Dal Makhani', description: 'Slow-cooked black lentils with butter and cream', price: 26, image: dalMakhani },
      { name: 'Rogan Josh', description: 'Kashmiri lamb curry with aromatic spices', price: 38, image: roganJosh },
      { name: 'Palak Paneer', description: 'Cottage cheese in creamy spinach gravy', price: 28, image: palakPaneer },
      { name: 'Biryani', description: 'Fragrant basmati rice with meat or vegetables', price: 34, image: heroDish3 },
      { name: 'Vindaloo', description: 'Goan-style fiery curry with tender meat and potatoes', price: 36, image: roganJosh },
      { name: 'Korma', description: 'Mild creamy curry with nuts and aromatic spices', price: 34, image: heroDish1 },
    ],
        buffet: [
      // Starters
      { name: 'Veg Samosa', description: 'Crispy pastry with spiced vegetables', price: 0, category: 'Starters' },
      { name: 'Mixed Pakoras', description: 'Assorted vegetables in gram flour batter', price: 0, category: 'Starters' },
      { name: 'Fish Pakoras', description: 'Tender fish in crispy coating', price: 0, category: 'Starters' },
      { name: 'Honey Chilli Chicken', description: 'Spicy and sweet glazed chicken', price: 0, category: 'Starters' },
      // Signature Curries
      { name: 'Butter Chicken', description: 'Tender chicken in rich tomato cream sauce', price: 0, category: 'Signature Curries' },
      { name: 'Lamb Saag', description: 'Lamb cooked with creamy spinach', price: 0, category: 'Signature Curries' },
      { name: 'Lamb Vindaloo', description: 'Fiery lamb curry with potatoes', price: 0, category: 'Signature Curries' },
      { name: 'Dal Makhani', description: 'Slow-cooked black lentils with butter and cream', price: 0, category: 'Signature Curries' },
      { name: 'Chana Masala', description: 'Chickpea curry with aromatic spices', price: 0, category: 'Signature Curries' },
      { name: 'Shahi Paneer', description: 'Cottage cheese in creamy fenugreek sauce', price: 0, category: 'Signature Curries' },
      // Desserts
      { name: 'Gulab Jamun', description: 'Milk dumplings in rose-cardamom syrup', price: 0, category: 'Desserts' },
      { name: 'Rice Pudding', description: 'Creamy rice pudding with cardamom and nuts', price: 0, category: 'Desserts' },
    ],
    breads: [
      { name: 'Butter Naan', description: 'Traditional leavened bread brushed with butter', price: 6, image: naan },
      { name: 'Garlic Naan', description: 'Naan topped with fresh garlic and herbs', price: 7, image: naan },
      { name: 'Tandoori Roti', description: 'Whole wheat flatbread from the clay oven', price: 5, image: naan },
      { name: 'Cheese Naan', description: 'Naan stuffed with mozzarella and herbs', price: 9, image: naan },
      { name: 'Kulcha', description: 'Leavened flatbread stuffed with spiced potatoes', price: 8, image: naan },
    ],

    desserts: [
      { name: 'Gulab Jamun', description: 'Milk dumplings in rose-cardamom syrup', price: 12 },
      { name: 'Kulfi', description: 'Traditional Indian ice cream with pistachios', price: 14 },
      { name: 'Rasmalai', description: 'Cottage cheese patties in sweetened milk', price: 14 },
      { name: 'Gajar Halwa', description: 'Warm carrot pudding with nuts and saffron', price: 13 },
    ],
    tasting: [
      { 
        name: '7-Course Degustation', 
        description: 'A curated journey through our signature dishes, showcasing the finest seasonal ingredients and culinary techniques. Includes amuse-bouche, two starters, two mains, cheese course, and dessert.',
        price: 125,
        featured: true
      },
      { 
        name: '10-Course Chef\'s Table', 
        description: 'An exclusive experience at our Chef\'s Table with personalized menu, kitchen tour, and interaction with Chef Rajveer Singh. Features rare ingredients and innovative preparations not available on the regular menu.',
        price: 185,
        featured: true
      },
      { 
        name: 'Vegetarian Tasting Menu', 
        description: 'Seven exquisite vegetarian courses celebrating the diversity of Indian vegetable-based cuisine. From farm-fresh seasonal produce to heritage legumes and artisanal dairy.',
        price: 110
      },
    ],
  };

  const drinksMenu = {
    softDrinks: [
      { name: 'Coca Cola', price: 3.50 },
      { name: 'Sprite', price: 3.50 },
      { name: 'Fanta Orange', price: 3.50 },
      { name: 'Lemonade', price: 4.00 },
      { name: 'Iced Tea', price: 4.00 },
      { name: 'Fresh Orange Juice', price: 5.00 },
      { name: 'Mango Lassi', price: 5.50 },
      { name: 'Masala Chai', price: 4.00 },
    ],
    cocktails: [
      { name: 'Signature Maharaja Martini', description: 'Premium vodka infused with saffron and rose petals', price: 18 },
      { name: 'Spiced Mango Mojito', description: 'Fresh mint, mango, and Indian spices with white rum', price: 16 },
      { name: 'Cardamom Old Fashioned', description: 'Premium whiskey with cardamom syrup and bitters', price: 20 },
      { name: 'Pomegranate Cosmopolitan', description: 'Cranberry vodka with pomegranate juice and lime', price: 17 },
      { name: 'Turmeric Sunrise', description: 'Tequila, turmeric syrup, orange juice, and lime', price: 16 },
    ],
    classicCocktails: [
      { name: 'Lynchburg Lemonade', price: 5.95 },
      { name: 'Classic Mojito', description: 'Blend of white rum, lemon chunks, mint leaves and soda with ice', price: 5.85 },
      { name: 'Bloody Mary', price: 5.95 },
      { name: 'Cosmopolitan', price: 5.95 },
      { name: 'Manhattan', description: 'A classic combination of whiskey mixed with sweet vermouth and a splash of bitters', price: 5.95 },
      { name: 'Whiskey Sour', price: 5.95 },
      { name: 'Negroni', description: 'A classic combination of gin, sweet vermouth and campari', price: 5.95 },
      { name: 'Pina Colada', description: 'A tropical blend of white rum, toasted cream and pineapple juice', price: 5.95 },
      { name: 'Mai Tai', description: 'Perfect blend of dark rum, white rum, lime juice & pineapple juice', price: 5.95 },
      { name: 'Old Fashioned', description: 'A blend of Bourbon, whiskey, brown sugar and angostura bitter', price: 5.95 },
      { name: 'Muddlier', description: 'A blended smoothie of vodka, Bailey, Kahlua and vanilla ice cream', price: 5.85 },
      { name: 'Rusty Nail', description: 'Drambuie, whisky', price: 5.95 },
    ],
    champagne: [
      { name: 'Laurent Perrier La Cuvee Brut', price: 229.95 },
      { name: 'Moet Chandon Brut', price: 126.95 },
      { name: 'G.H. MUMM', price: 131.95 },
      { name: 'Sala Brut', price: 39.55 },
    ],
    shooters: [
      { name: 'Jager Bomb', description: 'Jagermeister shot dropped into a glass of red bull', price: 6.55 },
      { name: 'B-52', description: 'A layered shot composed of Kahlua, Bailey and Cointreau', price: 6.55 },
      { name: 'Hand Grenade', description: 'Blend of liqueurs dropped into a glass of red bull', price: 5.25 },
      { name: 'Raging Bull', description: 'Vodka, blue raspberry, red bull', price: 5.25 },
      { name: 'Kamikaze', description: 'Finest part of vodka, triple sec and lime juice', price: 4.85 },
    ],
    sangria: [
      { name: 'Red', description: 'A traditional drink consists of red wine, vodka, triple sec and chopped fruits', price: 7.35, type: 'Glass 150 ML', price2: 34.75, type2: 'Pitcher (750ML)' },
      { name: 'White', description: 'A traditional drink consists of white wine, vodka, triple sec and chopped fruits', price: 7.35, type: 'Glass 150 ML', price2: 34.75, type2: 'Pitcher (750ML)' },
    ],
    liqueur: [
      { name: 'Drambuie', price: 5.95 },
      { name: 'Jägermeister', price: 5.75 },
      { name: 'Bailey\'s Irish Cream', price: 4.85 },
      { name: 'Absinthe', price: 4.65 },
      { name: 'Kahlua', price: 4.65 },
      { name: 'Sambuca', price: 4.85 },
      { name: 'Triple Sec', price: 4.65 },
      { name: 'Cointreau', price: 4.65 },
    ],
    vodka: [
      { name: 'Grey Goose', single: 5.25, double: 5.775, btl: 11335 },
      { name: 'Belvedere', single: 5.25, double: 5.775, btl: 11355 },
      { name: 'Ciroc', single: 5.25, double: 5.775, btl: 11385 },
      { name: 'Ketel One', single: 4.95, double: 5.445, btl: 10735 },
      { name: 'Absolut Blue', single: 3.85, double: 4.235, btl: 8275 },
      { name: 'Smirnoff', single: 3.25, double: 3.575, btl: 6955 },
      { name: 'M.M Verve', single: 3.25, double: 3.575, btl: 6955 },
    ],
    gin: [
      { name: 'Jaisalmer', single: 5.25, double: 5.775, btl: 11385 },
      { name: 'Hendricks', single: 5.25, double: 5.775, btl: 11355 },
      { name: 'Roku Japanese Craft Gin', single: 5.25, double: 5.775, btl: 11355 },
      { name: 'Old Tom Gin', single: 5.25, double: 5.775, btl: 11355 },
      { name: 'Bombay Sapphire', single: 4.15, double: 4.565, btl: 8935 },
      { name: 'Tanqueray', single: 4.15, double: 4.565, btl: 8935 },
      { name: 'Short Story Gin', single: 3.95, double: 4.345, btl: 8495 },
      { name: 'Beefeater', single: 3.95, double: 4.345, btl: 8495 },
      { name: 'Gordons', single: 3.65, double: 4.015, btl: 7835 },
      { name: 'Tanqueray Malacca', single: 4.25, double: 4.675, btl: 9155 },
      { name: 'Tanqueray Rangpur', single: 4.25, double: 4.675, btl: 9155 },
    ],
    shots: [
      { name: 'Patron Silver', single: 6.55, double: 7.205, btl: 14215 },
      { name: 'Patron Reposado', single: 6.15, double: 6.765, btl: 13655 },
      { name: 'Jose Cuervo Reposado', single: 4.75, double: 5.225, btl: 10255 },
      { name: 'Camino Silver', single: 4.25, double: 5.005, btl: 9815 },
      { name: 'Don Julio Blanco', single: 5.25, double: 5.775, btl: 11355 },
      { name: 'Don Julio Reposado', single: 5.45, double: 5.995, btl: 11795 },
    ]
  };

  // Simulate menu loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

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
            Culinary Delights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-playfair font-bold text-luxury mb-6"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground max-w-2xl mx-auto"
          >
            A curated selection of authentic Indian & Punjabi specialties
          </motion.p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="mains" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 mb-8 md:mb-12 bg-secondary/50 p-2 rounded-lg gap-1 md:gap-2">
              <TabsTrigger value="starters" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Starters
              </TabsTrigger>
              <TabsTrigger value="mains" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Mains
              </TabsTrigger>
              <TabsTrigger value="buffet" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Buffet
              </TabsTrigger>
              <TabsTrigger value="breads" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Breads
              </TabsTrigger>
              <TabsTrigger value="desserts" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hidden md:inline-flex">
                Desserts
              </TabsTrigger>
              <TabsTrigger value="tasting" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground hidden lg:inline-flex">
                Tasting Menus
              </TabsTrigger>
              <TabsTrigger value="drinks" className="text-xs sm:text-sm md:text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Drinks
              </TabsTrigger>
            </TabsList>

            {/* Main Menu Items Tabs */}

            {['starters', 'mains', 'buffet', 'breads', 'desserts', 'tasting'].map((category) => {
              const items = menuCategories[category as keyof typeof menuCategories];
              return (
              <TabsContent key={category} value={category} className="space-y-4 md:space-y-6 lg:space-y-8">
                {isLoading ? (
                  <MenuItemSkeleton count={Math.min(items.length, 6)} />
                ) : category === 'buffet' ? (
                  // Special buffet display
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-effect rounded-lg md:rounded-xl overflow-hidden border-2 border-accent gold-glow p-6 md:p-10 max-w-4xl mx-auto"
                  >
                    <div className="space-y-8">
                      {/* Buffet Title */}
                      <div className="text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-accent mb-2">
                          High Spirits Buffet
                        </h2>
                        <p className="text-muted-foreground">Complete dining experience</p>
                      </div>

                      {/* Group items by category */}
                      {Array.from(new Set(items.map((i: any) => i.category))).map((itemCategory) => (
                        <div key={itemCategory} className="space-y-3">
                          <h3 className="text-xl md:text-2xl font-playfair font-bold text-accent border-b border-accent/30 pb-2">
                            {itemCategory}
                          </h3>
                          <ul className="space-y-2">
                            {items
                              .filter((item: any) => item.category === itemCategory)
                              .map((item: any, idx: number) => (
                                <li key={idx} className="flex items-start gap-3">
                                  <span className="text-accent text-lg mt-1">•</span>
                                  <div>
                                    <p className="text-lg font-semibold text-foreground">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}

                      {/* Price Card */}
                      <div className="text-center pt-6 border-t border-accent/30">
                        <p className="text-lg text-muted-foreground mb-2">All for just</p>
                        <p className="text-4xl md:text-5xl font-playfair font-bold text-accent">
                          $35 <span className="text-xl">Per Person</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-3">Available daily from 5:30 PM</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  // Regular menu items display
                  items.map((item: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass-effect rounded-lg md:rounded-xl overflow-hidden hover:scale-[1.01] md:hover:scale-[1.02] transition-transform duration-300 ${
                        item.featured ? 'border-2 border-accent gold-glow' : ''
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] gap-4 md:gap-6 p-4 md:p-6">
                        {item.image && (
                          <div className="relative overflow-hidden rounded-lg h-40 md:h-48 lg:h-auto">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.featured && (
                              <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                                Chef's Special
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col justify-center flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 md:mb-3 gap-2">
                            <div className="flex-1">
                              <h3 className="text-lg md:text-xl lg:text-2xl font-playfair font-bold text-foreground">
                                {item.name}
                              </h3>
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-accent flex-shrink-0">
                              ${item.price}
                            </span>
                          </div>
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                            {item.description}
                          </p>
                          {/* Share Buttons */}
                          <ShareButtons 
                            title={item.name}
                            description={item.description || ''}
                            hashtags={['HighSpirits', 'IndianCuisine', 'FineFood', 'MusTry']}
                            showLabel={true}
                            size="sm"
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </TabsContent>
            );
            })}

            {/* Drinks Tab */}
            <TabsContent value="drinks" className="space-y-8 md:space-y-12">
              {/* Category Title */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-accent mb-3">Our Curated Selection</h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">Discover our handpicked collection of drinks, from refreshing beverages to premium spirits</p>
              </div>
              {/* Category Title */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-accent mb-3">Our Curated Selection</h2>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">Discover our handpicked collection of drinks, from refreshing beverages to premium spirits</p>
              </div>

              {/* Drinks Category Buttons - Enhanced */}
              <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 justify-center">
                {Object.keys(drinksMenu).map((category, idx) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ scale: 1.08, y: -5 }}
                    onClick={() => setSelectedDrinkCategory(category)}
                    className={`px-4 md:px-7 lg:px-10 py-3 md:py-4 rounded-full font-bold transition-all duration-300 text-xs md:text-sm lg:text-base uppercase tracking-widest relative overflow-hidden group ${
                      selectedDrinkCategory === category
                        ? 'bg-accent text-primary gold-glow shadow-xl shadow-accent/60'
                        : 'border-2 md:border-3 border-accent text-accent hover:bg-accent/10 backdrop-blur-sm'
                    }`}
                  >
                    <span className="relative z-10">
                      {category === 'softDrinks' && '🥤 Soft Drinks'}
                      {category === 'cocktails' && '🍹 Cocktails'}
                      {category === 'classicCocktails' && '🍸 Classic'}
                      {category === 'champagne' && '🍾 Champagne'}
                      {category === 'shooters' && '🔥 Shooters'}
                      {category === 'sangria' && '🍷 Sangria'}
                      {category === 'liqueur' && '🌟 Liqueur'}
                      {category === 'vodka' && '❄️ Vodka'}
                      {category === 'gin' && '🌿 Gin'}
                      {category === 'shots' && '⚡ Shots'}
                    </span>
                    {selectedDrinkCategory !== category && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Drinks List - Premium Card Layout */}
              <div className="space-y-4 md:space-y-5 lg:space-y-6">
                {drinksMenu[selectedDrinkCategory as keyof typeof drinksMenu]?.map((drink: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.2)" }}
                    className="group relative glass-effect rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-10 hover:scale-[1.02] md:hover:scale-[1.03] transition-all duration-400 border-2 border-accent/40 hover:border-accent/80 backdrop-blur-lg overflow-hidden"
                  >
                    {/* Gradient Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Animated Border Glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 via-transparent to-accent/50 rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />

                    <div className="flex flex-col gap-5 md:gap-7 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3 md:mb-5 gap-3">
                          <div className="flex-1">
                            <h3 className="text-lg md:text-2xl lg:text-3xl font-playfair font-bold text-accent group-hover:text-amber-300 transition-colors duration-300 mb-2">
                              {drink.name}
                            </h3>
                            {drink.description && (
                              <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed group-hover:text-muted-foreground transition-colors">
                                {drink.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        {/* Price Grid - Premium Design */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 pt-4 md:pt-6 border-t border-accent/20">
                          {drink.single && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Single</p>
                              <p className="text-xs text-muted-foreground/70">(30 ML)</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.single}</p>
                            </div>
                          )}
                          {drink.double && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Double</p>
                              <p className="text-xs text-muted-foreground/70">(60 ML)</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.double}</p>
                            </div>
                          )}
                          {drink.btl && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Bottle</p>
                              <p className="text-xs text-muted-foreground/70">&nbsp;</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.btl}</p>
                            </div>
                          )}
                          {drink.price && !drink.single && !drink.price2 && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Price</p>
                              <p className="text-xs text-muted-foreground/70">&nbsp;</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.price}</p>
                            </div>
                          )}
                          {drink.type && drink.price && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{drink.type}</p>
                              <p className="text-xs text-muted-foreground/70">&nbsp;</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.price}</p>
                            </div>
                          )}
                          {drink.type2 && drink.price2 && (
                            <div className="flex flex-col space-y-2">
                              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">{drink.type2}</p>
                              <p className="text-xs text-muted-foreground/70">&nbsp;</p>
                              <p className="text-2xl md:text-3xl font-bold text-accent/90 group-hover:text-amber-300 transition-colors">${drink.price2}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6 text-lg">
              Ready to experience culinary excellence?
            </p>
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold gold-glow"
              onClick={() => window.location.href = '/reservations'}
            >
              Book Your Table
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Menu;