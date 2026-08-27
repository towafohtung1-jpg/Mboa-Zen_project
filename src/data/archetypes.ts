export interface Archetype {
  id: string;
  name: string;           // Runner, Warrior, Guardian
  title: string;          // The Swift, The Strong, The Steady
  bodyType: string;       // Slim Body, Strong Body, Steady Body
  emoji: string;
  tree: string;           // Plantain, Iroko, Mango
  description: string;
  icon: string;           // Icon filename
}

export const ARCHETYPES: Archetype[] = [
  {
    id: 'runner',
    name: 'Runner',
    title: 'The Swift',
    bodyType: 'Slim Body',
    emoji: '🏃',
    tree: 'Plantain',
    description: 'Fast metabolism, high energy, burns through food quickly',
    icon: 'runner.png',
  },
  {
    id: 'warrior',
    name: 'Warrior',
    title: 'The Strong',
    bodyType: 'Strong Body',
    emoji: '💪',
    tree: 'Iroko',
    description: 'Solid build, physical strength, needs fuel for power',
    icon: 'warrior.png',
  },
  {
    id: 'guardian',
    name: 'Guardian',
    title: 'The Steady',
    bodyType: 'Steady Body',
    emoji: '🛡️',
    tree: 'Mango',
    description: 'Balanced, steady, needs consistent energy',
    icon: 'guardian.png',
  },
];

export const getArchetype = (id: string): Archetype | undefined => {
  return ARCHETYPES.find(a => a.id === id);
};

export const getArchetypeName = (id: string): string => {
  const archetype = getArchetype(id);
  return archetype ? `${archetype.name} (${archetype.title})` : id;
};

export default ARCHETYPES;