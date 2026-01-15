import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemSkeleton } from '@/components/skeletons/MenuItemSkeleton';
import ShareButtons from '@/components/ShareButtons';


interface StrapiImage {
  url: string;
  alternativeText?: string | null;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
  };
}


interface MenuItem {
  id: number;
  documentId?: string;
  title: string;
  shortDescription: string;
  price: number;
  priceLabel?: string;
  featured: boolean;
  displayOrder?: number;
  image?: StrapiImage | null;
  // Legacy support
  attributes?: {
    title: string;
    shortDescription: string;
    price: number;
    priceLabel: string;
    featured: boolean;
    displayOrder: number;
    image: StrapiImage | { data?: { attributes?: { url: string; alternativeText?: string } } };
  };
}


interface MenuCategory {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  displayOrder?: number;
  menu_items?: MenuItem[];
  attributes?: {
    title: string;
    slug: string;
    displayOrder: number;
    menu_items?: {
      data: MenuItem[];
    };
  };
}

interface BuffetItem {
  id: number;
  name: string;
  description: string | null;
  isVeg: boolean | null;
  isSpicy: boolean | null;
  order: number;
}

interface BuffetCategory {
  id: number;
  title: string;
  order: number;
  price: number;
  buffet_items: BuffetItem[];
}

const Menu = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [buffetCategories, setBuffetCategories] = useState<BuffetCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buffetLoading, setBuffetLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'High Spirits Menu | Indian Buffet & Fine Dining Bunbury';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore the High Spirits menu featuring an Indian buffet and fine dining dishes, with vegetarian and non-vegetarian mains crafted for refined tastes.');
    }
  }, []);

  // Fetch menu items directly and group by category
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/menu-items');
        apiUrl.searchParams.append('populate', '*');
        apiUrl.searchParams.append('sort', 'displayOrder:asc');

        console.log('Fetching menu items from:', apiUrl.toString());

        const response = await fetch(apiUrl.toString());

        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data: any = await response.json();
        console.log('Full API Response:', data);
        
        const items = data.data || [];
        console.log('Raw Items:', items);
        
        // Group items by category
        const categoryMap = new Map<number, any>();
        
        items.forEach((item: any) => {
          const category = item.menu_category;
          if (category && category.isActive) {
            if (!categoryMap.has(category.id)) {
              categoryMap.set(category.id, {
                id: category.id,
                documentId: category.documentId,
                title: category.title,
                slug: category.slug,
                displayOrder: category.displayOrder,
                menu_items: [],
              });
            }
            const catData = categoryMap.get(category.id)!;
            catData.menu_items.push(item);
          }
        });

        // Convert to sorted array
        const sortedCategories = Array.from(categoryMap.values()).sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        
        console.log('Grouped Categories:', sortedCategories);
        setMenuCategories(sortedCategories);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Fetch buffet categories
  useEffect(() => {
    const fetchBuffetCategories = async () => {
      try {
        setBuffetLoading(true);
        
        const apiUrl = new URL('https://calm-actor-864a39d720.strapiapp.com/api/buffet-categories');
        
        apiUrl.searchParams.append('fields[0]', 'title');
        apiUrl.searchParams.append('fields[1]', 'price');
        apiUrl.searchParams.append('fields[2]', 'order');
        apiUrl.searchParams.append('sort', 'order:asc');
        
        apiUrl.searchParams.append('populate[buffet_items][fields][0]', 'name');
        apiUrl.searchParams.append('populate[buffet_items][fields][1]', 'description');
        apiUrl.searchParams.append('populate[buffet_items][fields][2]', 'isVeg');
        apiUrl.searchParams.append('populate[buffet_items][fields][3]', 'isSpicy');
        apiUrl.searchParams.append('populate[buffet_items][sort]', 'order:asc');

        const buffetRes = await fetch(apiUrl.toString());

        if (!buffetRes.ok) {
          throw new Error('Failed to fetch buffet categories');
        }

        const buffetData = await buffetRes.json();
        const categories = (buffetData.data || []) as BuffetCategory[];

        setBuffetCategories(categories);
      } catch (error) {
        console.error('Error fetching buffet categories:', error);
      } finally {
        setBuffetLoading(false);
      }
    };

    fetchBuffetCategories();
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
          <Tabs defaultValue="buffet" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-1 md:gap-2 mb-8 md:mb-12 bg-secondary/50 p-2 rounded-lg h-auto w-fit mx-auto">
              <TabsTrigger value="buffet" className="text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Buffet
              </TabsTrigger>
              {menuCategories.map((category: any) => {
                const slug = category.slug || category.attributes?.slug || `category-${category.id}`;
                const title = category.title || category.attributes?.title || 'Menu';
                return (
                  <TabsTrigger
                    key={category.id}
                    value={slug}
                    className="text-xs sm:text-sm md:text-base whitespace-nowrap data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    {title}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Menu Categories Tabs */}
            {menuCategories.map((category: any) => {
              const slug = category.slug || category.attributes?.slug || `category-${category.id}`;
              // Handle both new flat structure and old nested structure
              const menuItems = category.menu_items || category.attributes?.menu_items?.data || [];

              return (
                <TabsContent key={category.id} value={slug} className="space-y-4 md:space-y-6 lg:space-y-8">
                  {isLoading ? (
                    <MenuItemSkeleton count={6} />
                  ) : menuItems.length > 0 ? (
                    menuItems.map((item: any, index: number) => {
                      // Handle both new flat structure and old nested structure
                      const title = item.title || item.attributes?.title;
                      const price = item.price || item.attributes?.price;
                      const shortDescription = item.shortDescription || item.attributes?.shortDescription;
                      const featured = item.featured !== undefined ? item.featured : item.attributes?.featured;
                      
                      // Handle image URL for both structures
                      let imageUrl: string | null = null;
                      let imageAlt = title || 'Menu item image';
                      
                      // Handle image URL for Strapi v5 flat structure
                      // Prefer formats.medium if available, fallback to main url (already absolute)
                      const image = item.image || item.attributes?.image;
                      imageUrl = image?.formats?.medium?.url || image?.url || null;
                      imageAlt = image?.alternativeText || title || 'Menu item image';

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className={`glass-effect rounded-lg md:rounded-xl overflow-hidden hover:scale-[1.01] md:hover:scale-[1.02] transition-transform duration-300 ${
                            featured ? 'border-2 border-accent gold-glow' : ''
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] lg:grid-cols-[200px_1fr] gap-4 md:gap-6 p-4 md:p-6">
                            {imageUrl ? (
                              <div className="relative overflow-hidden rounded-lg h-40 md:h-48 lg:h-auto">
                                <img
                                  src={imageUrl}
                                  alt={imageAlt}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                                {featured && (
                                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                                    Chef's Special
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="relative overflow-hidden rounded-lg h-40 md:h-48 lg:h-auto bg-secondary/50 flex items-center justify-center">
                                <p className="text-muted-foreground text-sm">No Image</p>
                              </div>
                            )}

                            <div className="flex flex-col justify-center flex-1">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 md:mb-3 gap-2">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-playfair font-bold text-foreground">
                                  {title}
                                </h3>
                                {!['starters', 'mains', 'breads', 'desserts', 'tasting-menus', 'tasting-menu'].includes(slug) && !slug?.toLowerCase().includes('tasting') && (
                                  <span className="text-xl md:text-2xl font-bold text-accent flex-shrink-0">
                                    ${price?.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                                {shortDescription}
                              </p>
                              <ShareButtons
                                title={title}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground text-lg">No items available in this category</p>
                    </div>
                  )}
                </TabsContent>
              );
            })}

            {/* Buffet Tab */}
            <TabsContent value="buffet" className="space-y-4 md:space-y-6 lg:space-y-8">
              {buffetLoading ? (
                <MenuItemSkeleton count={4} />
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass-effect rounded-lg md:rounded-xl overflow-hidden border-2 border-accent gold-glow p-6 md:p-10 max-w-4xl mx-auto"
                >
                  <div className="space-y-8">
                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-accent mb-2">
                        High Spirits Buffet
                      </h2>
                      <p className="text-muted-foreground">Complete dining experience</p>
                    </div>

                    {buffetCategories.map((buffetCategory) => (
                      <div key={buffetCategory.id} className="space-y-3">
                        <h3 className="text-xl md:text-2xl font-playfair font-bold text-accent border-b border-accent/30 pb-2">
                          {buffetCategory.title}
                        </h3>
                        <ul className="space-y-2">
                          {buffetCategory.buffet_items.map((item: any) => (
                            <li key={item.id} className="flex items-start gap-3">
                              <span className="text-accent text-lg mt-1">•</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-lg font-semibold text-foreground">{item.name}</p>
                                  {item.isVeg && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded border-2 border-green-500">
                                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    </span>
                                  )}
                                  {!item.isVeg && (
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded border-2 border-red-500">
                                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    </span>
                                  )}
                                  {item.isSpicy && (
                                    <span className="text-xs font-semibold text-red-500">🌶️</span>
                                  )}
                                </div>
                                {item.description && (
                                  <p className="text-sm text-muted-foreground">{item.description}</p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    <div className="text-center pt-6 border-t border-accent/30">
                      <p className="text-lg text-muted-foreground mb-2">All for just</p>
                      {buffetCategories[0]?.price ? (
                        <>
                          <p className="text-4xl md:text-5xl font-playfair font-bold text-accent">
                            ${buffetCategories[0].price} <span className="text-xl">Per Person</span>
                          </p>
                          <p className="text-sm text-muted-foreground mt-3">Available daily from 5:30 PM</p>
                        </>
                      ) : null}
                    </div>
                  </div>
                </motion.div>
              )}
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