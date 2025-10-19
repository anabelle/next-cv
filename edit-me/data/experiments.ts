export interface Experiment {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  technologies: string[];
  /**
   * When true, this project will be emphasized as a full-width card
   * above the standard two-column grid.
   */
  featured?: boolean;
  /** Optional circular avatar image for social-style overlay */
  avatarUrl?: string;
}

export const experiments: Experiment[] = [
  {
    name: 'Pixel Survivor',
    description:
      'Autonomous AI agent that promotes art and sells pixels via Lightning Network payments. Built a full-stack system integrating Bitcoin payments, real-time canvas rendering, social context-aware AI-driven content generation, and self-improvement algorithms.',
    link: 'https://pixel.xx.kg',
    imageUrl: '/images/pixel.png',
    technologies: ['Autonomous AI Agent', 'Digital Art', 'Bitcoin', 'Nostr'],
    featured: true,
    avatarUrl: '/images/pixel_avatar.png',
  },
  {
    name: 'TetrisTwist',
    description:
      '3D Tetris‑style game in Three.js/WebGL with a lightweight physics loop, smooth transforms, and responsive controls.',
    link: 'https://tetristwist.heyanabelle.com',
    imageUrl: '/images/tetris.png',
    technologies: ['Three.js', 'WebGL', 'React', 'TypeScript'],
  },
  {
    name: 'Multiplayer Snake',
    description:
      'Real‑time multiplayer Snake with client‑server sync, collision handling, and persistent leaderboards.',
    link: 'https://snake.heyanabelle.com',
    imageUrl: '/images/snake.png',
    technologies: ['Socket.IO', 'Canvas API', 'Node.js', 'React'],
  },
];
