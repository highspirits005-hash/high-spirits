import React, { useState } from 'react';
import { Calendar, AlertCircle, X, ChevronRight } from 'lucide-react';

interface ClosureNoticeBannerProps {
  onOpenModal?: () => void;
}

const ClosureNoticeBanner: React.FC<ClosureNoticeBannerProps> = ({ onOpenModal }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-[#0a3d31] via-[#146854] to-[#0a3d31] text-white border-b border-[#FBBF24]/30 py-2.5 px-4 text-xs sm:text-sm relative z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5 overflow-hidden text-ellipsis whitespace-nowrap mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1.5 bg-[#FBBF24] text-black text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
            <AlertCircle className="w-3 h-3 text-black" />
            Notice
          </span>
          <span className="font-medium text-gray-100">
            High Spirits will be <strong className="text-[#FBBF24] font-bold">CLOSED tomorrow, Sunday 16th August</strong>. Reopening Mon 17th Aug.
          </span>
        </div>

        {onOpenModal && (
          <button
            onClick={onOpenModal}
            className="hidden md:inline-flex items-center gap-1 text-[#FBBF24] hover:text-white font-semibold text-xs transition-colors shrink-0 underline underline-offset-2"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ClosureNoticeBanner;
