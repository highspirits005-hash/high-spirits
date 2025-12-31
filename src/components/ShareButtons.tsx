import React from "react";

type Props = {
  url?: string;
  title?: string;
};

const ShareButtons: React.FC<Props> = ({ url = typeof window !== 'undefined' ? window.location.href : '', title = 'Check this out' }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {}
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <button onClick={handleShare} className="btn-sm rounded-md px-3 py-1 bg-muted/80">
        Share
      </button>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground">Facebook</a>
      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" className="text-sm text-muted-foreground">Twitter</a>
    </div>
  );
};

export default ShareButtons;
