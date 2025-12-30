import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import heroDish1 from '@/assets/hero-dish-1.jpg';
import heroDish2 from '@/assets/hero-dish-2.jpg';
import heroDish3 from '@/assets/hero-dish-3.jpg';
import dalMakhani from '@/assets/dish-dal-makhani.jpg';
import palakPaneer from '@/assets/dish-palak-paneer.jpg';
import roganJosh from '@/assets/dish-rogan-josh.jpg';
import naan from '@/assets/dish-naan.jpg';

const Menu = () => {
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
      {
        name: 'High Spirits Buffet',
        description: 'A curated buffet featuring a rotating selection of starters, signature curries and desserts — the perfect way to experience a wide range of our culinary offerings.',
        sections: {
          starters: [
            'Veg Samosa - Crispy pastry with spiced vegetables',
            'Mixed Pakoras - Assorted vegetables in gram flour batter',
            'Fish Pakoras - Tender fish in a crispy coating',
            'Honey Chilli Chicken - Spicy and sweet glazed chicken'
          ],
          signatureCurries: [
            'Butter Chicken - Tender chicken in rich tomato cream sauce',
            'Lamb Saag - Lamb cooked with creamy spinach',
            'Lamb Vindaloo - Fiery lamb curry with potatoes',
            'Dal Makhani - Slow-cooked black lentils with butter and cream',
            'Chana Masala - Chickpea curry with aromatic spices',
            'Shahi Paneer - Cottage cheese in creamy fenugreek sauce'
          ],
          desserts: [
            'Gulab Jamun - Milk dumplings in rose-cardamom syrup',
            'Rice Pudding - Creamy rice pudding with cardamom and nuts'
          ]
        },
        priceLabel: '$35',
        price: 35,
        note: 'Available daily from 5:30 PM'
      }
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
        description: 'An exclusive experience at our Chef\'s Table with personalized menu, kitchen tour, and interaction with Chef Amardeep Singh. Features rare ingredients and innovative preparations not available on the regular menu.',
        price: 185,
        featured: true
      },
      { 
        name: 'Vegetarian Tasting Menu', 
        description: 'Seven exquisite vegetarian courses celebrating the diversity of Indian vegetable-based cuisine. From farm-fresh seasonal produce to heritage legumes and artisanal dairy.',
        price: 110
      },
    ],
    wines: [
      { name: 'Penfolds Grange (Shiraz)', description: 'South Australia - Full-bodied, rich tannins', price: 120, type: 'Red' },
      { name: 'Henschke Hill of Grace (Shiraz)', description: 'Eden Valley - Complex, elegant, age-worthy', price: 150, type: 'Red' },
      { name: 'Leeuwin Estate Art Series (Chardonnay)', description: 'Margaret River - Refined, creamy, oak-aged', price: 85, type: 'White' },
      { name: 'Cloudy Bay (Sauvignon Blanc)', description: 'New Zealand - Crisp, tropical, vibrant', price: 75, type: 'White' },
      { name: 'Dom Pérignon (Champagne)', description: 'France - Prestige cuvée, fine bubbles', price: 350, type: 'Sparkling' },
    ]
  };

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
      <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="mains" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-12 bg-secondary/50 p-2 rounded-lg">
              <TabsTrigger value="starters" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Starters
              </TabsTrigger>
              <TabsTrigger value="mains" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Mains
              </TabsTrigger>
              <TabsTrigger value="buffet" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Buffet
              </TabsTrigger>
              <TabsTrigger value="breads" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Breads
              </TabsTrigger>
              <TabsTrigger value="desserts" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Desserts
              </TabsTrigger>
              <TabsTrigger value="tasting" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Tasting Menus
              </TabsTrigger>
              <TabsTrigger value="wines" className="text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Wine List
              </TabsTrigger>
            </TabsList> 

            {Object.entries(menuCategories).map(([category, items]) => (
              <TabsContent key={category} value={category} className="space-y-8">
                {category === 'buffet' ? (
                  items.map((buffetItem: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`glass-effect rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 border-2 border-accent gold-glow p-8`}
                    >
                      <div className="max-w-3xl mx-auto text-foreground">
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-luxury mb-4">{buffetItem.name}</h2>
                        <p className="text-muted-foreground mb-6">{buffetItem.description}</p>

                        <div className="bg-primary/80 p-6 rounded-md border border-accent/20">
                          <div>
                            <h4 className="text-accent font-semibold mb-2">Starters</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {buffetItem.sections.starters.map((s: string, i: number) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-accent font-semibold mb-2">Signature Curries</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {buffetItem.sections.signatureCurries.map((s: string, i: number) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-accent font-semibold mb-2">Desserts</h4>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1">
                              {buffetItem.sections.desserts.map((s: string, i: number) => (
                                <li key={i}>{s}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="text-center mt-6">
                          <div className="text-4xl md:text-5xl font-playfair text-luxury font-bold">{buffetItem.priceLabel} <span className="text-base font-medium text-muted-foreground">Per Person</span></div>
                          <p className="text-muted-foreground mt-2">{buffetItem.note}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  items.map((item: { featured?: boolean; image?: string; name: string; description?: string; price?: number; type?: string }, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`glass-effect rounded-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${
                        item.featured ? 'border-2 border-accent gold-glow' : ''
                      }`}
                    >
                      <div className="grid md:grid-cols-[200px_1fr] gap-6 p-6">
                        {item.image && (
                          <div className="relative overflow-hidden rounded-lg h-48 md:h-auto">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.featured && (
                              <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                Chef's Special
                              </div>
                            )}
                          </div>
                        )}
                        <div className="flex flex-col justify-center">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-2xl font-playfair font-bold text-foreground">
                                {item.name}
                              </h3>
                              {item.type && (
                                <span className="inline-block mt-2 px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                                  {item.type}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </TabsContent>
            ))}
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
              onClick={() => window.location.href = '/walk-in'}
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