import { ExternalLink } from 'lucide-react';

const AnnouncementBar = () => {
  return (
    <div className="bg-gradient-to-r from-[hsl(160,80%,6%)] via-[hsl(160,70%,10%)] to-[hsl(160,80%,6%)] text-white text-[11px] sm:text-xs py-2 px-4 border-b border-accent/20 relative z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 font-inter">
        {/* Award Highlight */}
        <a
          href="https://www.agfg.com.au/restaurant/high-spirits-82604"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group hover:text-accent transition-colors duration-300"
        >
          <img 
            src="https://media1.agfg.com.au/images/rcawards/2026-media/badge.png" 
            alt="AGFG 2026 Badge" 
            className="h-6 w-6 rounded-full object-contain bg-white/10 p-0.5 shadow-[0_0_10px_rgba(203,161,53,0.3)] transition-transform duration-300 group-hover:scale-110"
          />
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-accent tracking-wide flex items-center gap-1">
              AGFG Readers' Choice Winner 2026
            </span>
            <span className="hidden sm:inline text-muted-foreground/60">•</span>
            <span className="text-slate-300 group-hover:text-accent-foreground transition-colors duration-300">
              Voted Bunbury's Luxury Fine Dining
            </span>
          </div>
          <ExternalLink className="w-3 h-3 text-muted-foreground/60 group-hover:text-accent transition-colors duration-300" />
        </a>
        
        {/* Quick Links */}
        <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
          {/* Uber Eats */}
          <a
            href="https://www.ubereats.com/au/store/high-spirits-indian-restaurant/XWZcSeKdV4Snw8JDlsLpyw?srsltid=AfmBOoqDkIjATvnqSw62LIyW79vJxVq4ITFZ9FvZiEdch4Wrh-OIjXXg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-accent transition-colors duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/>
            </svg>
            <span className="font-medium">Uber Eats</span>
          </a>
          
          {/* TripAdvisor */}
          <a
            href="https://www.tripadvisor.com/Restaurant_Review-g255364-d34217398-Reviews-High_Spirits-Bunbury_Western_Australia.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-accent transition-colors duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-green-500 group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm-4.5 13.5A2.5 2.5 0 0 1 5 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5zm4.5-5.25a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zm4.5 5.25A2.5 2.5 0 0 1 14 13a2.5 2.5 0 0 1 2.5-2.5 2.5 2.5 0 0 1 2.5 2.5 2.5 2.5 0 0 1-2.5 2.5z"/>
            </svg>
            <span className="font-medium">TripAdvisor</span>
          </a>

          {/* Google Reviews */}
          <a
            href="https://www.google.com/search?sca_esv=fba96cc439ef8eac&rlz=1C1MIZP_en-GBIN1164IN1165&sxsrf=APpeQnvIXK_5WTiDpeDTRvFhNm7obNKBiQ%3A1784098044445&q=High%20Spirits%20%E2%80%93%20Bunbury%E2%80%99s%20Luxury%20Indian%20Fine%20Dining&stick=H4sIAAAAAAAAAONgU1I1qDBKNEo1TLE0M7RMskxLNTC1AgoZmZimGRpYpqaZmFimGBksYjXzyEzPUAguyCzKLClWeNQwWcGpNC-ptKjyUcPMYgWf0gogU8EzLyUzMU_BLTMvVcElMy8zLx0ANr0yhWIAAAA&mat=CTnHQKHaJECX&ved=2ahUKEwjQ1LuRi9SVAxWxd2wGHfW2NWsQrMcEegQIMxAC"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-accent transition-colors duration-300 group"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current text-blue-400 group-hover:text-accent transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.428-2.519 4.114-5.137 4.114-3.478 0-6.3-2.822-6.3-6.3s2.822-6.3 6.3-6.3c1.637 0 3.125.626 4.256 1.646L21.3 4.675C19.034 2.554 15.937 1.2 12.24 1.2 6.2 1.2 1.2 6.2 1.2 12.24s5 11.04 11.04 11.04c6.31 0 11.04-4.44 11.04-11.04 0-.744-.06-1.464-.18-2.155H12.24z"/>
            </svg>
            <span className="font-medium">Google Reviews (5.0 ★)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
