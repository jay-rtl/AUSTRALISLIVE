export type NavigationItem = {
  label: string;
  href: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Events', href: '/events/' },
  { label: 'Contact', href: '/contact/' },
];

export const legalNavigation: NavigationItem[] = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
];
