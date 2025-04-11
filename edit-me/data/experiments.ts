export interface Experiment {
  name: string;
  description: string;
  link: string;
  imageUrl: string;
  technologies: string[];
}

export const experiments: Experiment[] = [
  {
    name: 'TetrisTwist',
    description:
      "A 3D puzzle game combining Tetris mechanics with Rubik's Cube rotations and perspective shifts inspired by Fez.",
    link: 'https://tetristwist.heyanabelle.com',
    imageUrl: '/images/tetris.png',
    technologies: ['Three.js', 'WebGL', 'React', 'TypeScript'],
  },
  {
    name: 'Multiplayer Snake',
    description:
      'Real-time multiplayer implementation of the classic Snake game with competitive gameplay and leaderboards.',
    link: 'https://snake.heyanabelle.com',
    imageUrl: '/images/snake.png',
    technologies: ['Socket.IO', 'Canvas API', 'Node.js', 'React'],
  },
];
