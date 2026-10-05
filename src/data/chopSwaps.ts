// ─── src/data/chopSwaps.ts ──────────────────────────────────────────────

export type ChopSwap = {
  from: string;
  to: string;
  reason: string;
};

export const CHOP_SWAPS: Record<'runner' | 'warrior' | 'guardian', ChopSwap[]> = {
  // ─── RUNNER (Swift) ──────────────────────────────────────────────────
  // Slim body, fast metabolism, needs high energy. Focus: fuel without
  // empty calories, more nutrients per bite.
  runner: [
    { from: 'Fried plantain', to: 'Boiled plantain + groundnut', reason: 'Same money. Less oil. More energy.' },
    { from: 'Soda (50cl)', to: 'Water + lime', reason: 'Cheaper. Your kidneys thank you.' },
    { from: 'White bread + butter', to: 'Kumba bread + avocado', reason: 'Same filling. Better fat.' },
    { from: 'Puff-puff (3 pieces)', to: 'Boiled egg', reason: 'Same price. Protein keeps you full longer.' },
    { from: 'Fried rice', to: 'Jollof rice with vegetables', reason: 'Less oil. More vitamins.' },
    { from: 'Sweetened pap', to: 'Plain pap + milk', reason: 'Less sugar. Steady energy.' },
    { from: 'Fried dough (beignets)', to: 'Beans + bread', reason: 'Same money. More protein.' },
    { from: 'Energy drink', to: 'Fresh orange juice', reason: 'Real sugar from fruit. No crash.' },
    { from: 'White rice + fried fish', to: 'Jollof rice + grilled fish', reason: 'Less oil. Same taste.' },
    { from: 'Cake slice', to: 'Banana + groundnut', reason: 'Real food. Longer energy.' },
    { from: 'Fried eggs + white bread', to: 'Boiled eggs + Kumba bread', reason: 'Less oil. More protein per bite.' },
    { from: 'Sweet tea (3 spoons sugar)', to: 'Tea with 1 spoon sugar + honey', reason: 'Less sugar. Same sweetness.' },
    { from: 'Fried yam', to: 'Boiled yam + pepper sauce', reason: 'Same filling. No oil.' },
    { from: 'Biscuits (packet)', to: 'Roasted groundnut (small)', reason: 'Real protein. No additives.' },
    { from: 'Fried chicken', to: 'Grilled chicken', reason: 'Same meat. Less oil. More protein.' },
    { from: 'White bread + jam', to: 'Kumba bread + groundnut paste', reason: 'Less sugar. More protein.' },
    { from: 'Fizzy drink (33cl)', to: 'Coconut water', reason: 'Natural electrolytes. No additives.' },
    { from: 'Fried puff-puff', to: 'Boiled corn', reason: 'Same price. Real energy.' },
    { from: 'Chocolate spread on bread', to: 'Avocado on Kumba bread', reason: 'Less sugar. Better fat.' },
    { from: 'Fried fish + white rice', to: 'Grilled fish + jollof rice', reason: 'Less oil. More flavor.' },
    { from: 'Sweetened yoghurt', to: 'Plain yoghurt + honey', reason: 'Less sugar. Same creamy.' },
    { from: 'Fried meat pie', to: 'Boiled egg + Kumba bread', reason: 'Same filling. Less oil.' },
    { from: 'Cornflakes + sugar', to: 'Pap + groundnut', reason: 'Local energy. No additives.' },
    { from: 'Bottled juice (sweet)', to: 'Fresh mango slices', reason: 'Real fruit. Real vitamins.' },
    { from: 'Fried chin-chin', to: 'Roasted groundnut', reason: 'Same crunch. More protein.' },
    { from: 'Sugary porridge', to: 'Plain porridge + milk', reason: 'Less sugar. Steady energy.' },
    { from: 'Fried plantain chips', to: 'Boiled plantain', reason: 'Same base. Less oil.' },
    { from: 'Ice cream (cup)', to: 'Frozen banana + groundnut', reason: 'Real food. Same sweet.' },
    { from: 'Sweet bread (sliced)', to: 'Kumba bread', reason: 'Less sugar. More fiber.' },
    { from: 'Fried doughnut', to: 'Boiled egg + avocado', reason: 'Same money. Real fuel.' },
  ],

  // ─── WARRIOR (Strong) ────────────────────────────────────────────────
  // Solid body, physical work, needs protein and strength. Focus: muscle
  // recovery, satiety, sustained energy for hard labor.
  warrior: [
    { from: 'Fried plantain', to: 'Boiled plantain + beans', reason: 'Same money. More protein. More strength.' },
    { from: 'Soda (50cl)', to: 'Water + ginger', reason: 'Cheaper. Helps recovery.' },
    { from: 'White bread + butter', to: 'Kumba bread + groundnut paste', reason: 'Same filling. More protein.' },
    { from: 'Puff-puff (3 pieces)', to: 'Boiled eggs (2)', reason: 'Same price. Muscle food.' },
    { from: 'Fried rice', to: 'Rice + beans + grilled fish', reason: 'More protein. Less oil.' },
    { from: 'Sweetened pap', to: 'Pap + milk + groundnut', reason: 'More protein. Steady energy.' },
    { from: 'Fried dough (beignets)', to: 'Beans + bread', reason: 'Same money. Protein for work.' },
    { from: 'Energy drink', to: 'Fresh juice + groundnut', reason: 'Real energy. No crash.' },
    { from: 'White rice + fried meat', to: 'Jollof rice + grilled meat', reason: 'Less oil. Same protein.' },
    { from: 'Cake slice', to: 'Banana + groundnut', reason: 'Real food. Longer fuel.' },
    { from: 'Fried eggs + white bread', to: 'Boiled eggs + Kumba bread', reason: 'Less oil. More protein per bite.' },
    { from: 'Sweet tea (3 spoons sugar)', to: 'Tea with 1 spoon sugar + milk', reason: 'Less sugar. More protein.' },
    { from: 'Fried yam', to: 'Boiled yam + egg sauce', reason: 'Same filling. More protein.' },
    { from: 'Biscuits (packet)', to: 'Roasted groundnut (handful)', reason: 'Real protein. No additives.' },
    { from: 'Fried chicken', to: 'Grilled chicken + beans', reason: 'Same meat. More protein.' },
    { from: 'White bread + jam', to: 'Kumba bread + boiled egg', reason: 'Less sugar. Real food.' },
    { from: 'Fizzy drink (33cl)', to: 'Coconut water + groundnut', reason: 'Natural electrolytes. Protein.' },
    { from: 'Fried puff-puff', to: 'Boiled corn + groundnut', reason: 'Same price. Real fuel.' },
    { from: 'Chocolate spread on bread', to: 'Groundnut paste on Kumba bread', reason: 'More protein. Less sugar.' },
    { from: 'Fried fish + white rice', to: 'Grilled fish + beans + rice', reason: 'More protein. Less oil.' },
    { from: 'Sweetened yoghurt', to: 'Plain yoghurt + groundnut', reason: 'More protein. Less sugar.' },
    { from: 'Fried meat pie', to: 'Boiled eggs + Kumba bread', reason: 'Same filling. Protein for work.' },
    { from: 'Cornflakes + sugar', to: 'Pap + groundnut + milk', reason: 'Real energy. Protein.' },
    { from: 'Bottled juice (sweet)', to: 'Fresh mango + groundnut', reason: 'Real fruit. Real protein.' },
    { from: 'Fried chin-chin', to: 'Roasted groundnut + banana', reason: 'Same crunch. Real fuel.' },
    { from: 'Sugary porridge', to: 'Millet porridge + groundnut', reason: 'More protein. Steady energy.' },
    { from: 'Fried plantain chips', to: 'Boiled plantain + beans', reason: 'Same base. More protein.' },
    { from: 'Ice cream (cup)', to: 'Banana + groundnut + honey', reason: 'Real food. Real protein.' },
    { from: 'Sweet bread (sliced)', to: 'Kumba bread + boiled egg', reason: 'Less sugar. More protein.' },
    { from: 'Fried doughnut', to: 'Beans + Kumba bread', reason: 'Same money. Muscle fuel.' },
  ],

  // ─── GUARDIAN (Steady) ───────────────────────────────────────────────
  // Balanced, soft, steady. Focus: portion control, fiber, low glycemic,
  // less oil, less sugar.
  guardian: [
    { from: 'Fried plantain (big portion)', to: 'Boiled plantain (small) + vegetables', reason: 'Less oil. More fiber. Same filling.' },
    { from: 'Soda (50cl)', to: 'Water + cucumber slices', reason: 'Cheaper. Less sugar.' },
    { from: 'White bread + butter', to: 'Kumba bread + avocado (small)', reason: 'More fiber. Better fat.' },
    { from: 'Puff-puff (3 pieces)', to: 'Boiled egg + cucumber', reason: 'Same price. Less oil.' },
    { from: 'Fried rice (big plate)', to: 'Small jollof + plenty vegetables', reason: 'Less rice. More veg.' },
    { from: 'Sweetened pap', to: 'Plain pap + small milk', reason: 'Less sugar. Steady energy.' },
    { from: 'Fried dough (beignets)', to: 'Beans (small) + bread', reason: 'Same money. More fiber.' },
    { from: 'Sweet drink', to: 'Water + lime', reason: 'Zero sugar. Better body.' },
    { from: 'White rice + fried fish', to: 'Small rice + grilled fish + vegetables', reason: 'Less oil. More veg.' },
    { from: 'Cake slice', to: 'Apple + small groundnut', reason: 'Less sugar. More fiber.' },
    { from: 'Fried eggs + white bread', to: 'Boiled egg + Kumba bread (small)', reason: 'Less oil. Same filling.' },
    { from: 'Sweet tea (3 spoons sugar)', to: 'Green tea (no sugar)', reason: 'Zero sugar. Calm energy.' },
    { from: 'Fried yam (big)', to: 'Boiled yam (small) + vegetables', reason: 'Less oil. More fiber.' },
    { from: 'Biscuits (packet)', to: 'Cucumber slices + groundnut', reason: 'Less sugar. Real food.' },
    { from: 'Fried chicken', to: 'Grilled chicken (small) + salad', reason: 'Less oil. More veg.' },
    { from: 'White bread + jam', to: 'Kumba bread + avocado', reason: 'Less sugar. Better fat.' },
    { from: 'Fizzy drink (33cl)', to: 'Water + lemon', reason: 'Zero sugar. Hydrated.' },
    { from: 'Fried puff-puff', to: 'Boiled corn (small)', reason: 'Same price. Real food.' },
    { from: 'Chocolate spread on bread', to: 'Avocado on Kumba bread', reason: 'Less sugar. Better fat.' },
    { from: 'Fried fish + white rice', to: 'Grilled fish + vegetables', reason: 'Less rice. More veg.' },
    { from: 'Sweetened yoghurt', to: 'Plain yoghurt (small)', reason: 'Less sugar. Same creamy.' },
    { from: 'Fried meat pie', to: 'Boiled egg + cucumber', reason: 'Same filling. Less oil.' },
    { from: 'Cornflakes + sugar', to: 'Pap (small) + milk', reason: 'Less sugar. Steady energy.' },
    { from: 'Bottled juice (sweet)', to: 'Fresh cucumber + water', reason: 'Zero sugar. Hydrated.' },
    { from: 'Fried chin-chin', to: 'Roasted groundnut (small)', reason: 'Same crunch. Real food.' },
    { from: 'Sugary porridge', to: 'Plain porridge + small milk', reason: 'Less sugar. Steady energy.' },
    { from: 'Fried plantain chips', to: 'Boiled plantain (small)', reason: 'Same base. Less oil.' },
    { from: 'Ice cream (cup)', to: 'Frozen grapes or banana', reason: 'Real fruit. Less sugar.' },
    { from: 'Sweet bread (sliced)', to: 'Kumba bread (small)', reason: 'Less sugar. More fiber.' },
    { from: 'Fried doughnut', to: 'Boiled egg + cucumber', reason: 'Same money. Real food.' },
  ],
};

// ─── HELPER: Get today's swap for archetype ─────────────────────────────

export const getTodaySwap = (
  archetype: 'runner' | 'warrior' | 'guardian' | null
): ChopSwap | null => {
  if (!archetype) return null;
  const swaps = CHOP_SWAPS[archetype];
  if (!swaps || swaps.length === 0) return null;

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );

  return swaps[dayOfYear % swaps.length];
};