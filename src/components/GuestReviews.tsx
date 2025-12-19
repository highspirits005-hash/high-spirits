import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Review {
  id: number;
  reviewText: string;
  rating: number;
  guestName: string;
  guestTitle: string;
  displayOrder: number;
}

const GuestReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://calm-actor-864a39d720.strapiapp.com/api/guest-reviews'
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch guest reviews');
        }
        
        const data = await response.json();
        // Sort by displayOrder
        const sortedReviews = (data.data || []).sort((a: Review, b: Review) => a.displayOrder - b.displayOrder);
        setReviews(sortedReviews);
      } catch (err) {
        console.error('Error fetching guest reviews:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, reviews.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setAutoPlay(false);
  };

  const displayedReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section className="py-24 bg-black/40 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-inter tracking-widest mb-3 uppercase text-sm">
            Guest Reviews
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-luxury mb-4">
            What Our Guests Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover why diners from around the world choose High Spirits for their culinary journey
          </p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading guest reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No reviews available</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  reviews[currentIndex],
                  reviews[(currentIndex + 1) % reviews.length],
                  reviews[(currentIndex + 2) % reviews.length],
                ].map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-effect rounded-2xl p-8 border border-accent/30 hover:border-accent/60 transition-all duration-300 hover:scale-105 min-h-[300px] flex flex-col justify-between"
                  >
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-accent text-accent"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground italic text-base leading-relaxed mb-6 flex-grow">
                      {review.reviewText}
                    </p>

                    {/* Divider */}
                    <div className="border-t border-accent/20 pt-6 mb-0">
                      {/* Guest Info */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-lg">😊</div>
                        <div>
                          <p className="text-accent font-bold text-sm md:text-base">
                            {review.guestName}
                          </p>
                          <p className="text-muted-foreground text-xs md:text-sm">
                            {review.guestTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
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
                  {reviews.map((_, index) => (
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
              <div className="text-center mt-6">
                <p className="text-muted-foreground text-sm">
                  Auto-playing • {currentIndex + 1} of {reviews.length}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GuestReviews;
