export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Student Management Portal',
  description: 'Student Management Application',
  navItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Help',
      href: '/help',
    },
    {
      label: 'Student',
      href: '/student',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  navMenuItems: [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'Help',
      href: '/help',
    },
    {
      label: 'Student',
      href: '/student',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ],
  links: {
    github: '',
    twitter: '',
    docs: '',
    discord: '',
    sponsor: '',
  },
};
