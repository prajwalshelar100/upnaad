import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Music2, 
  Facebook, 
  Linkedin 
} from 'lucide-react';

export default function SocialIcons() {
  const socials = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Music2, href: 'https://spotify.com', label: 'Spotify' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <div className="flex items-center gap-5">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent transition-all duration-300 hover:-translate-y-1"
          aria-label={social.label}
        >
          <social.icon size={22} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
