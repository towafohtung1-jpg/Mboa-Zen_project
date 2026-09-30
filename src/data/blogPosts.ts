// ─── src/data/blogPosts.ts ──────────────────────────────────────────────

export type BlogCategory = 'eat_smart' | 'move_smart' | 'mboa_stories';

export type BlogPost = {
  id: string;
  title: string;
  category: BlogCategory;
  summary: string;
  readTime: string;
  image?: string;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'eru_less_oil',
    title: 'Why Eru with Less Oil is Better Than Salad',
    category: 'mboa_stories',
    summary: 'Eru is a Cameroonian superfood. Here is why it beats foreign salads for your health and your pocket.',
    readTime: '3 min read',
    content: `Eru is one of Cameroon's most powerful foods. It is rich in fiber, vitamins, and minerals. When you cook it with less palm oil, it becomes one of the healthiest meals you can eat.

Why is it better than salad?

First, it is local. You can find eru in any market in the Southwest, Littoral, and beyond. You do not need to buy expensive foreign vegetables.

Second, it is filling. A small bowl of eru with water fufu keeps you full for hours. Salad leaves you hungry after 30 minutes.

Third, it is cultural. Eru connects you to your roots. It is not just food. It is heritage.

So next time you want something healthy, skip the salad. Cook eru with less oil. Add fish or kanda. Eat it with water fufu. Your body will thank you.`,
  },
  {
    id: 'achu_big_belle',
    title: 'How to Chop Achu and Not Get Big Belle',
    category: 'eat_smart',
    summary: 'Achu is delicious, but it can be heavy. Here is how to enjoy it without the belly.',
    readTime: '4 min read',
    content: `Achu is a Northwest favorite. The yellow soup, the pounded cocoyam, the kanda — it is a full experience.

But many people worry: will achu give me a big belle?

The answer is: not if you eat it smart.

Here are three tips:

1. Eat a small portion. Achu is heavy. You do not need a mountain of it. One small bowl is enough.

2. Add plenty of vegetables. The egusi pudding or njama-njama on the side helps you feel full without eating too much achu.

3. Eat it earlier in the day. If you eat achu at 9pm and sleep at 10pm, your body will store it as fat. Eat it for lunch instead.

Achu is not the enemy. Eating too much of it late at night is the enemy.

Enjoy your achu. Just eat smart.`,
  },
  {
    id: 'water_cheapest_medicine',
    title: 'Water: The Cheapest Medicine in Buea',
    category: 'eat_smart',
    summary: 'You do not need expensive drinks. Water is the best medicine you already have.',
    readTime: '3 min read',
    content: `In Buea, you can buy water for 100 FCFA. That same 100 FCFA buys you the best medicine in the world.

Water does three things for your body:

1. It flushes out toxins. Your kidneys need water to clean your blood. Without it, you get sick.

2. It keeps your joints moving. If you feel stiff in the morning, drink water. You will feel the difference.

3. It controls hunger. Many times, when you think you are hungry, you are actually thirsty. Drink a glass of water before you eat. You will eat less.

How much water should you drink?

At least 8 cups a day. More if you are in the sun or doing physical work.

Water is free. Water is cheap. Water is life.

Drink up.`,
  },
  {
    id: 'runner_vs_strong_vs_steady',
    title: 'Runner vs Strong vs Steady - Which One Be You?',
    category: 'mboa_stories',
    summary: 'Your body type tells you how to eat and how to move. Learn your archetype.',
    readTime: '4 min read',
    content: `Mboa-Zen has three archetypes: The Runner (Swift), The Warrior (Strong), and The Guardian (Steady).

Which one are you?

The Runner is slim, light, and fast. They burn energy quickly. They need high-energy foods like plantain, sweet potato, and pap. They do best with cardio — running, jumping, dancing.

The Warrior is solid, broad, and strong. They carry heavy things and work hard. They need protein — beans, fish, meat, eggs. They do best with strength training — push-ups, squats, lifting.

The Guardian is steady, balanced, and calm. They sit for long hours or work indoors. They need balanced meals with plenty of vegetables. They do best with gentle movement — walking, stretching, chair exercises.

Which one be you?

Take the quiz in the app. Learn your archetype. Then eat and move according to your type.

That is the Mboa-Zen way.`,
  },
  {
    id: 'morning_exercise_market',
    title: '5 Min Morning Exercise Before Market',
    category: 'move_smart',
    summary: 'You do not need a gym. Five minutes in the morning is enough to change your day.',
    readTime: '3 min read',
    content: `Before you go to market, before you start work, before you do anything — take 5 minutes.

Here is a simple routine:

1. Neck rolls — 30 seconds. Slowly roll your head left, then right.

2. Shoulder rolls — 30 seconds. Roll your shoulders forward, then backward.

3. Arm circles — 30 seconds. Stretch your arms out and make circles.

4. Torso twists — 30 seconds. Twist your upper body left and right.

5. Hip circles — 30 seconds. Put your hands on your hips and rotate.

6. Ankle rolls — 30 seconds. Lift each foot and roll your ankle.

7. Walking in place — 2 minutes. Walk in place, lifting your knees.

That is 5 minutes.

Do this every morning before market. Your body will feel lighter. Your mind will be clearer. Your day will be better.

No gym needed. Just you and 5 minutes.`,
  },
  {
    id: 'little_drop_ocean',
    title: 'Little Drop Makes Ocean: How 100 FCFA Per Day Saves Your Life',
    category: 'mboa_stories',
    summary: 'Small daily habits lead to big results. This is the Mboa-Zen philosophy.',
    readTime: '3 min read',
    content: `There is a Cameroonian proverb: "No rush, na small small water full drum."

That means: little by little, the drum fills with water.

Your health is the same.

You do not need to change everything at once. You do not need to eat perfectly every day. You do not need to exercise for hours.

You need to do small things every day.

One glass of water. One home workout. One local meal. One daily check-in.

That is it. That is Mboa-Zen.

Little drops make ocean.

So start today. Not tomorrow. Not next week. Today.

Drink one glass of water. Do one squat. Eat one vegetable.

That is enough. Tomorrow, do it again.

And over time, you will be healthier. Stronger. Calmer.

That is the promise of Mboa-Zen.

Little drops make ocean.`,
  },
];