import { Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  title: string;
  description?: string;
  hashtags?: string[];
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function ShareButtons({
  title,
  description = '',
  hashtags = [],
  showLabel = false,
  size = 'md'
}: ShareButtonsProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  const text = `${title}${description ? ': ' + description : ''}${hashtags.length > 0 ? ' ' + hashtags.map(tag => '#' + tag).join(' ') : ''}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  };

  const handleShare = (platform: string) => {
    const links: Record<string, string> = shareLinks;
    if (links[platform]) {
      window.open(links[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {showLabel && <span className="text-xs text-muted-foreground">Share:</span>}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`${sizeClasses[size]} hover:bg-blue-500/10`}
          onClick={() => handleShare('facebook')}
          title="Share on Facebook"
        >
          <Facebook className={`${iconSizeClasses[size]} text-blue-600`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${sizeClasses[size]} hover:bg-blue-400/10`}
          onClick={() => handleShare('twitter')}
          title="Share on Twitter"
        >
          <Twitter className={`${iconSizeClasses[size]} text-blue-400`} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`${sizeClasses[size]} hover:bg-blue-700/10`}
          onClick={() => handleShare('linkedin')}
          title="Share on LinkedIn"
        >
          <Linkedin className={`${iconSizeClasses[size]} text-blue-700`} />
        </Button>
      </div>
    </div>
  );
}
