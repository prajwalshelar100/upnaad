import {
  Instagram,
  Twitter,
  Youtube,
  Music2,
  Facebook,
  Linkedin,
  MessageCircle
} from 'lucide-react';

export default function SocialIcons() {
  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/upnaad/', label: 'Instagram' },
    { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029VbC3rw6LNSZvrYUgLD40', label: 'Whatsapp' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw', label: 'YouTube' },
    { icon: Music2, href: 'https://open.spotify.com/user/31lle7khoqvlaqco6dsujppwadky?si=61326e719cec4eae', label: 'Spotify' },
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61588349588320', label: 'Facebook' },
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
