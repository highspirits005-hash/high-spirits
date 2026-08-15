import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Sparkles, MapPin, Phone, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ClosureNoticePopupProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const ClosureNoticePopup: React.FC<ClosureNoticePopupProps> = ({ isOpen: externalIsOpen, onClose: externalOnClose }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the popup in this session
    const hasDismissed = sessionStorage.getItem('hs_closure_notice_aug16_dismissed');
    if (!hasDismissed && externalIsOpen === undefined) {
      // Auto-open after a short delay for smooth entrance
      const timer = setTimeout(() => {
        setInternalIsOpen(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  const showModal = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    sessionStorage.setItem('hs_closure_notice_aug16_dismissed', 'true');
    setInternalIsOpen(false);
    if (externalOnClose) {
      externalOnClose();
    }
  };

  const colors = {
    emerald: '#146854',
    emeraldDark: '#0a3d31',
    gold: '#FBBF24',
    goldLight: '#FDE68A',
    dark: '#0a0a0a',
    cardDark: '#121916',
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.82)' }}
        >
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Luxury Card Container */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 25 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-md my-auto rounded-3xl shadow-2xl overflow-hidden border border-[#FBBF24]/30"
            style={{
              background: `linear-gradient(145deg, ${colors.cardDark} 0%, ${colors.dark} 100%)`,
            }}
          >
            {/* Top Glowing Gold Border Accent Line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent shadow-[0_0_15px_#FBBF24]" />

            {/* Subtle background glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#146854]/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#FBBF24]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 z-20 group"
              aria-label="Close Notice"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Content Padding */}
            <div className="p-6 sm:p-8 text-center relative z-10">
              
              {/* Luxury Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#146854] to-[#0a3d31] border border-[#FBBF24]/40 text-[#FBBF24] shadow-lg mb-5"
              >
                <AlertCircle className="w-8 h-8 text-[#FBBF24]" />
              </motion.div>

              {/* Tagline */}
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#FBBF24] uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Important Announcement</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4 tracking-wide leading-tight">
                Closed Tomorrow <br />
                <span className="text-[#FBBF24]">Sunday, 16th August</span>
              </h2>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#FBBF24]/60 to-transparent mx-auto mb-5" />

              {/* Main Message */}
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-inter">
                Dear valued guests, please note that High Spirits will be <strong className="text-white font-semibold">CLOSED tomorrow, Sunday 16th August</strong>.
              </p>

              {/* Reopening highlight card */}
              <div className="bg-[#146854]/25 border border-[#146854]/60 rounded-2xl p-4 mb-6 text-left space-y-2.5">
                <div className="flex items-center space-x-3 text-sm text-gray-200">
                  <Calendar className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>Reopening: <strong className="text-white">Monday, 17th August</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-200">
                  <Clock className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span>Hours: <span className="text-gray-300">Normal Trading Hours</span></span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-[#FBBF24] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#d97706] text-black font-bold py-3.5 rounded-xl shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 text-sm tracking-wide"
                >
                  Understood & Continue
                </Button>
              </div>

              {/* Footer text */}
              <p className="text-xs text-gray-400 mt-5 italic">
                We apologize for any inconvenience and look forward to welcoming you back!
              </p>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClosureNoticePopup;
