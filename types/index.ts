export type AnimationVariants = {
  hidden: any;
  visible: any;
  exit?: any;
};

export type SectionProps = {
  className?: string;
  id?: string;
};

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}
