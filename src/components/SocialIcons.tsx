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
    { 
      icon: Instagram, 
      href: 'https://www.instagram.com/upnaad/', 
      label: 'Instagram',
      color: "hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888]",
      shadow: "hover:shadow-[#bc1888]/20"
    },
    { 
      icon: MessageCircle, 
      href: 'https://whatsapp.com/channel/0029VbC3rw6LNSZvrYUgLD40', 
      label: 'Whatsapp',
      color: "hover:text-white hover:bg-[#25D366]",
      shadow: "hover:shadow-[#25D366]/20"
    },
    { 
      icon: Youtube, 
      href: 'https://www.youtube.com/channel/UCSOQzKtkWP3Wues4CA_m3Gw', 
      label: 'YouTube',
      color: "hover:text-white hover:bg-[#FF0000]",
      shadow: "hover:shadow-[#FF0000]/20"
    },
    { 
      icon: Music2, 
      href: 'https://open.spotify.com/user/31lle7khoqvlaqco6dsujppwadky?si=61326e719cec4eae', 
      label: 'Spotify',
      color: "hover:text-white hover:bg-[#1DB954]",
      shadow: "hover:shadow-[#1DB954]/20"
    },
    { 
      icon: Facebook, 
      href: 'https://www.facebook.com/profile.php?id=61588349588320', 
      label: 'Facebook',
      color: "hover:text-white hover:bg-[#1877F2]",
      shadow: "hover:shadow-[#1877F2]/20"
    },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-10 h-10 flex items-center justify-center rounded-xl 
            bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 
            text-text-secondary transition-all duration-300 transform hover:-translate-y-1 
            hover:border-transparent hover:shadow-xl ${social.color} ${social.shadow}
          `}
          aria-label={social.label}
        >
          <social.icon size={20} strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}
