import { motion } from 'framer-motion';

interface VideoBackgroundProps {
  className?: string;
  overlayOpacity?: number;
}

const VideoBackground = ({ className = '', overlayOpacity = 0.6 }: VideoBackgroundProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Video placeholder with animated gradient */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary"
      >
        {/* Animated overlay pattern */}
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(203, 161, 53, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(203, 161, 53, 0.2) 0%, transparent 50%)`,
            backgroundSize: '200% 200%'
          }}
        />
      </motion.div>
      
      {/* Luxury overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              y: [null, `${Math.random() * 100}%`],
              opacity: [0, 0.8, 0],
            }}
            transition={{ 
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoBackground;
