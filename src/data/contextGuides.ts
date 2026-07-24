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
    title: 'After A Hard Day',
    tagline: 'Recovery after farm, field, or heavy work',
    fullText:
      'When you have spent a full day doing physical work — farming, walking long distances, carrying loads, or intense training — your body needs proper recovery.\n\n' +
      'Within 1–2 hours after your activity, eat a meal that combines carbohydrates (plantain, cassava, rice) with a protein source (fish, beans, groundnuts, or meat).\n\n' +
      'Hydrate steadily rather than drinking large amounts at once. Rest well overnight — recovery happens during sleep.',
  },
  {
    id: 'rest_day',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_rest_day.png'),
    title: 'Quiet Day Eating',
    tagline: 'Lighter meals for low-activity days',
    fullText:
      'On days when you are less active — sitting, working at a desk, or resting from training — your body needs less fuel than usual.\n\n' +
      'Focus on lighter meals: vegetables, moderate portions of carbohydrates, and lean protein. ' +
      'A large plate of njama-njama with a small side of yam is a better rest-day option than a heavy waterfufu meal.\n\n' +
      'Rest days are important for the body to repair and rebuild. Do not treat them as a reason to overeat.',
  },
  {
    id: 'roadside_choices',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_roadside_choices.png'),
    title: 'Eating From Vendors',
    tagline: 'Eating smart when you buy food on the go',
    fullText:
      'For many Cameroonians — taxi drivers, builders, teachers, market vendors, students — daily meals come from roadside food stands and small canteens, not from home cooking.\n\n' +
      'When choosing bought food, favor grilled or boiled options over deep-fried ones when both are available. A piece of grilled fish with plantain will serve your body better than the same portion of fried chicken with fried potato.\n\n' +
      'Ask for extra vegetables when possible — a spoonful of greens or a small salad on the side transforms an ordinary plate into a more balanced meal, often at little or no extra cost.\n\n' +
      'Drink water rather than sweetened drinks with your meal. This one habit, repeated daily, has a bigger long-term impact on your health than most people realize.',
  },
  {
    id: 'cheap_add_ons',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_cheap_add_ons.png'),
    title: 'Small Foods That Help',
    tagline: 'Simple additions that improve any bought meal',
    fullText:
      'You do not need to cook a full meal to eat better. Small, cheap add-ons transform whatever you buy into something more nourishing.\n\n' +
      'Keep a banana, an orange, or a handful of groundnuts with you during the day. Adding fresh fruit or nuts to any bought meal boosts fiber, vitamins, and healthy fats without needing a kitchen.\n\n' +
      'A bottle of water carried from home costs less than a sachet of juice and does far more for your body. Refill it during the day.\n\n' +
      'A boiled egg from a street vendor adds real protein to a starchy meal like bread, plantain, or rice at a very low price.\n\n' +
      'These small habits are more powerful than any single perfect meal. Consistency matters more than perfection.',
  },
  {
    id: 'fasting_period',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_fasting_period.png'),
    title: 'Fasting Period Nutrition',
    tagline: 'Eating well during Ramadan, Lent, or personal fasts',
    fullText:
      'Fasting is a meaningful practice for many Cameroonians, whether during Ramadan, Lent, or personal spiritual disciplines. How you eat during the non-fasting hours matters as much as the fast itself.\n\n' +
      'Break your fast gently. Start with water and a small light food such as fruit, dates, or a small portion of pap before moving to a heavier meal. Suddenly eating a large meal on an empty stomach strains your digestion.\n\n' +
      'Prioritize water and hydrating foods (fruit, vegetables, soups) during the eating window, especially in hot weather. Dehydration during a fast can cause more discomfort than hunger itself.\n\n' +
      'Include a source of protein (fish, eggs, beans, groundnuts, meat) in your main meal to sustain energy through the next fasting period. Complex carbohydrates like cassava, yam, and plantain also help.\n\n' +
      'If you are managing a health condition such as diabetes, high blood pressure, or pregnancy, please consult a qualified health professional before adjusting your fasting practice.',
  },
  {
    id: 'budget_meals',
    icon: require('../../assets/Graphics/UI_vectors_icon_set/guide_budget_meals.png'),
    title: 'Household Budget Meals',
    tagline: 'Eating healthy when money is tight',
    fullText:
      'Healthy eating does not require expensive foods. Some of the most nourishing meals in Cameroon are also the most affordable.\n\n' +
      'Beans are one of the best protein sources available, and they cost very little. A pot of beans with a small piece of fish or a boiled egg feeds a family well and provides real nutrition.\n\n' +
      'Local vegetables such as njama-njama, eru, waterleaf, and pumpkin leaves are widely available in markets, often at low prices, and provide vitamins and minerals that expensive imported foods cannot replace.\n\n' +
      'Groundnuts, plantain, cassava, and sweet potato are affordable, filling, and versatile. A meal built around these staples plus a small portion of protein and vegetables is both budget-friendly and genuinely healthy.\n\n' +
      'Cooking in slightly larger portions and eating leftovers reduces daily food costs and saves preparation time.',
  },
];