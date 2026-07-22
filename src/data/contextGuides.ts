export interface ContextGuide {
  id: string;
  icon: any;
  title: string;
  tagline: string;
  fullText: string;
}

export const CONTEXT_GUIDES: ContextGuide[] = [
  {
    id: 'dry_season',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_dry_season.png'),
    title: 'Dry Season Hydration',
    tagline: 'Stay hydrated during Harmattan winds',
    fullText:
      'During the dry season (November–February), the Harmattan winds pull moisture from your body faster than you notice.\n\n' +
      'Drink at least 8 glasses of water throughout the day, even if you do not feel thirsty. ' +
      'Warm lemongrass tea and fresh coconut water are traditional local options that support hydration and digestion.\n\n' +
      'Reduce heavily sweetened drinks, alcohol, and excess coffee, which can dehydrate you further.',
  },
  {
    id: 'rainy_season',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rainy_season.png'),
    title: 'Rainy Season Immunity',
    tagline: 'Support your body through humid months',
    fullText:
      'The rainy season (March–October) brings humidity, colder mornings, and higher risk of colds and flu.\n\n' +
      'Warm meals like pepper soup, ginger tea, and garlic-based dishes help support your immune system naturally. ' +
      'Include local greens such as njama-njama, eru, and pumpkin leaves for their vitamin and mineral content.\n\n' +
      'Keep your feet dry, get enough rest, and listen to your body when it asks for warmth.',
  },
  {
    id: 'active_day',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_active_day.png'),
    title: 'Active Day Recovery',
    tagline: 'After farm, field, or heavy work',
    fullText:
      'When you have spent a full day doing physical work — farming, walking long distances, carrying loads, or intense training — your body needs proper recovery.\n\n' +
      'Within 1–2 hours after your activity, eat a meal that combines carbohydrates (plantain, cassava, rice) with a protein source (fish, beans, groundnuts, or meat).\n\n' +
      'Hydrate steadily rather than drinking large amounts at once. Rest well overnight — recovery happens during sleep.',
  },
  {
    id: 'rest_day',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'),
    title: 'Rest Day Nutrition',
    tagline: 'Lighter meals for low-activity days',
    fullText:
      'On days when you are less active — sitting, working at a desk, or resting from training — your body needs less fuel than usual.\n\n' +
      'Focus on lighter meals: vegetables, moderate portions of carbohydrates, and lean protein. ' +
      'A large plate of njama-njama with a small side of yam is a better rest-day option than a heavy waterfufu meal.\n\n' +
      'Rest days are important for the body to repair and rebuild. Do not treat them as a reason to overeat.',
  },
];