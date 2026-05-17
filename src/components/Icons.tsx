import React from 'react';

type IconProps = {
  className?: string;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const PowerArmIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M8 13.5c1.8-2.1 3.4-2.6 5.2-1.4l1.2.8" />
    <path d="M14.4 12.9c.5-1.5 1.4-2.6 2.8-3.4" />
    <path d="M16.9 9.6l2.7 2.6c.8.8.8 2.1-.1 2.8l-2.4 2.1c-1.3 1.1-3 1.8-4.8 1.8H8.9c-2.4 0-4.4-1.6-4.9-3.9" />
    <path d="M4 15c1.1-.7 2.2-1.1 3.3-1.2" />
    <path d="M10.8 8.2l1.6-3.4c.3-.7 1.1-1 1.8-.7.7.3 1 1.1.7 1.8l-1.3 3" />
  </svg>
);

export const ArrowBackIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M15 6l-6 6 6 6" />
    <path d="M9 12h11" />
    <path d="M5 12h.01" />
  </svg>
);

export const PlayIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M8 5.5v13l10-6.5-10-6.5Z" />
  </svg>
);

export const PauseIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M9 5v14" />
    <path d="M15 5v14" />
  </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const ResetIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M4 12a8 8 0 0 1 13.6-5.7" />
    <path d="M18 3v5h-5" />
    <path d="M20 12a8 8 0 0 1-13.6 5.7" />
    <path d="M6 21v-5h5" />
  </svg>
);

export const SleepIcon: React.FC<IconProps> = ({ className }) => (
  <svg {...iconProps} className={className} aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
