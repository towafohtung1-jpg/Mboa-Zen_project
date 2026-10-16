// ─── src/data/blogPosts.ts ──────────────────────────────────────────────

export type BlogCategory = 'eat_smart' | 'move_smart' | 'mboa_stories';

export type BlogPost = {
  id: string;
  title: string;
  title_pidgin: string;
  title_fr: string;
  category: BlogCategory;
  summary: string;
  summary_pidgin: string;
  summary_fr: string;
  readTime: string;
  image?: string;
  content: string;
  content_pidgin: string;
  content_fr: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'eru_less_oil',
    title: 'Why Eru with Less Oil is Better Than Salad',
    title_pidgin: 'Why Eru with Less Oil Fine Pass Foreign Salad',
    title_fr: "Pourquoi l'Eru avec Moins d'Huile est Meilleur que la Salade",
    category: 'mboa_stories',
    summary: 'Eru is a Cameroonian superfood. Here is why it beats foreign salads for your health and your pocket.',
    summary_pidgin: 'Eru na correct superfood for Cameroon. See why e pass foreign salad for health and for your pocket.',
    summary_fr: "L'eru est un superaliment camerounais. Voici pourquoi il bat les salades étrangères pour votre santé et votre porte-monnaie.",
    readTime: '3 min read',
    content: `Eru is one of Cameroon's most powerful foods. It is rich in fiber, vitamins, and minerals. When you cook it with less palm oil, it becomes one of the healthiest meals you can eat.\n\nWhy is it better than salad?\n\nFirst, it is local. You can find eru in any market in the Southwest, Littoral, and beyond. You do not need to buy expensive foreign vegetables.\n\nSecond, it is filling. A small bowl of eru with water fufu keeps you full for hours. Salad leaves you hungry after 30 minutes.\n\nThird, it is cultural. Eru connects you to your roots. It is not just food. It is heritage.\n\nSo next time you want something healthy, skip the salad. Cook eru with less oil. Add fish or kanda. Eat it with water fufu. Your body will thank you.`,
    content_pidgin: `Eru na one of the most powerful chop for Cameroon. E full with fiber, vitamins, and minerals. When you cook am with small palm oil, e dey turn to one of the healthiest chop you fit chop.\n\nWhy e fine pass salad?\n\nFirst, na local chop. You fit see eru for any market for Southwest, Littoral, and everywhere. You no need buy expensive foreign greens.\n\nSecond, e dey hold belly. Small bowl of eru and water fufu go keep you full for hours. Salad leaf go leave you with hunger after 30 minutes.\n\nThird, na culture. Eru dey join you to your roots. E no be just chop. Na pure heritage.\n\nSo next time you wan chop healthy, pass that salad. Cook eru with less oil. Add fish or kanda. Chop am with water fufu. Your body go tank you.`,
    content_fr: `L'eru est l'un des aliments les plus puissants du Cameroun. Il est riche en fibres, vitamines et minéraux. Quand vous le cuisinez avec moins d'huile de palme, il devient l'un des repas les plus sains que vous puissiez manger.\n\nPourquoi est-il meilleur que la salade ?\n\nPremièrement, c'est local. Vous pouvez trouver de l'eru dans n'importe quel marché du Sud-Ouest, du Littoral et au-delà. Vous n'avez pas besoin d'acheter des légumes étrangers coûteux.\n\nDeuxièmement, il rassasie. Un petit bol d'eru avec du water fufu vous tient rassasié pendant des heures. La salade vous laisse affamé après 30 minutes.\n\nTroisièmement, c'est culturel. L'eru vous relie à vos racines. Ce n'est pas juste de la nourriture. C'est un héritage.\n\nDonc la prochaine fois que vous voulez quelque chose de sain, sautez la salade. Cuisinez l'eru avec moins d'huile. Ajoutez du poisson ou du kanda. Mangez-le avec du water fufu. Votre corps vous remerciera.`,
  },
  {
    id: 'achu_big_belle',
    title: 'How to Chop Achu and Not Get Big Belle',
    title_pidgin: 'How to Chop Achu Make Big Belle No Hold You',
    title_fr: "Comment Manger l'Achu Sans Grossir du Ventre",
    category: 'eat_smart',
    summary: 'Achu is delicious, but it can be heavy. Here is how to enjoy it without the belly.',
    summary_pidgin: 'Achu sweet die, but e fit heavy for belly. See how you fit chop am without big belly.',
    summary_fr: "L'achu est délicieux, mais il peut être lourd. Voici comment en profiter sans le ventre.",
    readTime: '4 min read',
    content: `Achu is a Northwest favorite. The yellow soup, the pounded cocoyam, the kanda — it is a full experience.\n\nBut many people worry: will achu give me a big belle?\n\nThe answer is: not if you eat it smart.\n\nHere are three tips:\n\n1. Eat a small portion. Achu is heavy. You do not need a mountain of it. One small bowl is enough.\n\n2. Add plenty of vegetables. The egusi pudding or njama-njama on the side helps you feel full without eating too much achu.\n\n3. Eat it earlier in the day. If you eat achu at 9pm and sleep at 10pm, your body will store it as fat. Eat it for lunch instead.\n\nAchu is not the enemy. Eating too much of it late at night is the enemy.\n\nEnjoy your achu. Just eat smart.`,
    content_pidgin: `Achu na high-class chop for Northwest. That yellow soup, pounded cocoyam, and kanda — na full setup experience.\n\nBut plenty people dey fear: achu go give me big belly?\n\nThe answer na: e no go give you if you chop am with sense.\n\nSee three tips here:\n\n1. Chop small portion. Achu heavy well-well. You no need mountain of achu. One small bowl do.\n\n2. Add plenty greens. Egusi pudding or njama-njama for side go make you full without chopping too much achu.\n\n3. Chop am early for day. If you chop achu for 9pm go sleep for 10pm, your body go store am like fat. Chop am for afternoon time instead.\n\nAchu no be enemy. Chopping too much late for night na the enemy.\n\nEnjoy your achu. Just chop am with sense.`,
    content_fr: `L'achu est un favori du Nord-Ouest. La soupe jaune, le macabo pilé, le kanda — c'est une expérience complète.\n\nMais beaucoup de gens s'inquiètent : l'achu va-t-il me donner un gros ventre ?\n\nLa réponse est : pas si vous le mangez intelligemment.\n\nVoici trois conseils :\n\n1. Mangez une petite portion. L'achu est lourd. Vous n'avez pas besoin d'une montagne. Un petit bol suffit.\n\n2. Ajoutez beaucoup de légumes. Le pudding d'egusi ou le njama-njama à côté vous aide à vous sentir rassasié sans manger trop d'achu.\n\n3. Mangez-le plus tôt dans la journée. Si vous mangez de l'achu à 21h et dormez à 22h, votre corps le stockera comme graisse. Mangez-le au déjeuner à la place.\n\nL'achu n'est pas l'ennemi. En manger trop tard le soir est l'ennemi.\n\nProfitez de votre achu. Mangez juste intelligemment.`,
  },
  {
    id: 'water_cheapest_medicine',
    title: 'Water: The Cheapest Medicine in Buea',
    title_pidgin: 'Water: The Cheapest Medicine for Buea',
    title_fr: "L'Eau : Le Médicament le Moins Cher à Buea",
    category: 'eat_smart',
    summary: 'You do not need expensive drinks. Water is the best medicine you already have.',
    summary_pidgin: 'You no need expensive drink. Water na the best medicine wey you already get.',
    summary_fr: "Vous n'avez pas besoin de boissons coûteuses. L'eau est le meilleur médicament que vous avez déjà.",
    readTime: '3 min read',
    content: `In Buea, you can buy water for 100 FCFA. That same 100 FCFA buys you the best medicine in the world.\n\nWater does three things for your body:\n\n1. It flushes out toxins. Your kidneys need water to clean your blood. Without it, you get sick.\n\n2. It keeps your joints moving. If you feel stiff in the morning, drink water. You will feel the difference.\n\n3. It controls hunger. Many times, when you think you are hungry, you are actually thirsty. Drink a glass of water before you eat. You will eat less.\n\nHow much water should you drink?\n\nAt least 8 cups a day. More if you are in the sun or doing physical work.\n\nWater is free. Water is cheap. Water is life.\n\nDrink up.`,
    content_pidgin: `For Buea, you fit buy water for 100 FCFA. That same 100 FCFA dey buy you the best medicine for whole world.\n\nWater dey do three things for your body:\n\n1. E dey wash bad things comot. Your kidney need water for clean blood. Without am, body go catch sickness.\n\n2. E dey make body joint move fine. If body stiff you for morning, drink water. You go feel the difference.\n\n3. E dey control hunger. Plenty times, when you think say hunger dey hold you, na water thirst dey catch you. Drink one glass water before you chop. You go chop small.\n\nHow much water you suppose drink?\n\nAt least 8 cups every day. More if sun dey shine or you dey do hard work.\n\nWater no get cost. Water cheap. Water na life.\n\nDrink am well.`,
    content_fr: `À Buea, vous pouvez acheter de l'eau pour 100 FCFA. Ces mêmes 100 FCFA vous achètent le meilleur médicament du monde.\n\nL'eau fait trois choses pour votre corps :\n\n1. Elle élimine les toxines. Vos reins ont besoin d'eau pour nettoyer votre sang. Sans elle, vous tombez malade.\n\n2. Elle garde vos articulations mobiles. Si vous vous sentez raide le matin, buvez de l'eau. Vous sentirez la différence.\n\n3. Elle contrôle la faim. Souvent, quand vous pensez avoir faim, vous avez en fait soif. Buvez un verre d'eau avant de manger. Vous mangerez moins.\n\nCombien d'eau devriez-vous boire ?\n\nAu moins 8 verres par jour. Plus si vous êtes au soleil ou faites un travail physique.\n\nL'eau est gratuite. L'eau est bon marché. L'eau c'est la vie.\n\nBuvez.`,
  },
  {
    id: 'runner_vs_strong_vs_steady',
    title: 'Runner vs Strong vs Steady - Which One Be You?',
    title_pidgin: 'Runner vs Warrior vs Guardian — Which One Be You?',
    title_fr: 'Coureur vs Guerrier vs Gardien — Lequel Êtes-Vous ?',
    category: 'mboa_stories',
    summary: 'Your body type tells you how to eat and how to move. Learn your archetype.',
    summary_pidgin: 'Your body setup dey show how you suppose chop and move. Learn your body type today.',
    summary_fr: 'Votre type de corps vous dit comment manger et comment bouger. Apprenez votre archétype.',
    readTime: '4 min read',
    content: `Mboa-Zen has three archetypes: The Runner (Swift), The Warrior (Strong), and The Guardian (Steady).\n\nWhich one are you?\n\nThe Runner is slim, light, and fast. They burn energy quickly. They need high-energy foods like plantain, sweet potato, and pap. They do best with cardio — running, jumping, dancing.\n\nThe Warrior is solid, broad, and strong. They carry heavy things and work hard. They need protein — beans, fish, meat, eggs. They do best with strength training — push-ups, squats, lifting.\n\nThe Guardian is steady, balanced, and calm. They sit for long hours or work indoors. They need balanced meals with plenty of vegetables. They do best with gentle movement — walking, stretching, chair exercises.\n\nWhich one be you?\n\nTake the quiz in the app. Learn your archetype. Then eat and move according to your type.\n\nThat is the Mboa-Zen way.`,
    content_pidgin: `Mboa-Zen get three body type: The Runner (Swift), The Warrior (Strong), and The Guardian (Steady).\n\nWhich one be you?\n\nThe Runner slim, light, and fast. E dey burn energy fast-fast. E need heavy power chop like plantain, sweet potato, and pap. E dey do fine with cardio — running, jumping, and dancing.\n\nThe Warrior strong, broad, and solid. E dey lift heavy things and do hard work. E need muscle chop — beans, fish, meat, and eggs. E dey do fine with strength training — push-ups, squats, and lifting.\n\nThe Guardian steady, balanced, and calm. E dey sit long hours or work inside house. E need balanced chop with plenty greens. E dey do fine with small-small exercise — walking, stretching, and chair workout.\n\nWhich one be you?\n\nTake the quiz inside app. Learn your body type. Then chop and move according to your type.\n\nNa so Mboa-Zen flow dey go.`,
    content_fr: `Mboa-Zen a trois archétypes : Le Coureur (Rapide), Le Guerrier (Fort) et Le Gardien (Stable).\n\nLequel êtes-vous ?\n\nLe Coureur est mince, léger et rapide. Il brûle l'énergie rapidement. Il a besoin d'aliments énergétiques comme le plantain, la patate douce et la bouillie. Il réussit mieux avec le cardio — courir, sauter, danser.\n\nLe Guerrier est solide, large et fort. Il porte des choses lourdes et travaille dur. Il a besoin de protéines — haricots, poisson, viande, œufs. Il réussit mieux avec la musculation — pompes, squats, soulever.\n\nLe Gardien est stable, équilibré et calme. Il reste assis de longues heures ou travaille à l'intérieur. Il a besoin de repas équilibrés avec beaucoup de légumes. Il réussit mieux avec un mouvement doux — marcher, s'étirer, exercices sur chaise.\n\nLequel êtes-vous ?\n\nFaites le quiz dans l'app. Apprenez votre archétype. Puis mangez et bougez selon votre type.\n\nC'est la voie Mboa-Zen.`,
  },
  {
    id: 'morning_exercise_market',
    title: '5 Min Morning Exercise Before Market',
    title_pidgin: '5 Min Morning Exercise Before Market',
    title_fr: "5 Min d'Exercice le Matin Avant le Marché",
    category: 'move_smart',
    summary: 'You do not need a gym. Five minutes in the morning is enough to change your day.',
    summary_pidgin: 'You no need gym setup. Five minutes for morning do for change your whole day.',
    summary_fr: "Vous n'avez pas besoin de salle de sport. Cinq minutes le matin suffisent pour changer votre journée.",
    readTime: '3 min read',
    content: `Before you go to market, before you start work, before you do anything — take 5 minutes.\n\nHere is a simple routine:\n\n1. Neck rolls — 30 seconds. Slowly roll your head left, then right.\n\n2. Shoulder rolls — 30 seconds. Roll your shoulders forward, then backward.\n\n3. Arm circles — 30 seconds. Stretch your arms out and make circles.\n\n4. Torso twists — 30 seconds. Twist your upper body left and right.\n\n5. Hip circles — 30 seconds. Put your hands on your hips and rotate.\n\n6. Ankle rolls — 30 seconds. Lift each foot and roll your ankle.\n\n7. Walking in place — 2 minutes. Walk in place, lifting your knees.\n\nThat is 5 minutes.\n\nDo this every morning before market. Your body will feel lighter. Your mind will be clearer. Your day will be better.\n\nNo gym needed. Just you and 5 minutes.`,
    content_pidgin: `Before you go market, before work start, before you do anything — take 5 minutes.\n\nSee simple routine here:\n\n1. Neck roll — 30 seconds. Roll your head slow-slow left, then right.\n\n2. Shoulder roll — 30 seconds. Roll shoulder forward, then backward.\n\n3. Arm circles — 30 seconds. Stretch hands out make you roll am round-round.\n\n4. Torso twists — 30 seconds. Turn upper body left and right.\n\n5. Hip circles — 30 seconds. Put hands for waist make you spin am.\n\n6. Ankle rolls — 30 seconds. Lift foot one by one make you turn ankle.\n\n7. Walking for one place — 2 minutes. March for place while you dey lift knees.\n\nNa just 5 minutes be that.\n\nDo am every morning before market. Your body go feel light. Your head go clear fine. Your day go set high-class.\n\nNo gym needed. Just you and 5 minutes.`,
    content_fr: `Avant d'aller au marché, avant de commencer le travail, avant de faire quoi que ce soit — prenez 5 minutes.\n\nVoici une routine simple :\n\n1. Rotations du cou — 30 secondes. Roulez lentement la tête à gauche, puis à droite.\n\n2. Rotations des épaules — 30 secondes. Roulez les épaules vers l'avant, puis vers l'arrière.\n\n3. Cercles de bras — 30 secondes. Étirez les bras et faites des cercles.\n\n4. Torsions du torse — 30 secondes. Tournez le haut du corps à gauche et à droite.\n\n5. Cercles de hanches — 30 secondes. Mains sur les hanches et tournez.\n\n6. Rotations des chevilles — 30 secondes. Levez chaque pied et roulez la cheville.\n\n7. Marche sur place — 2 minutes. Marchez sur place en levant les genoux.\n\nCela fait 5 minutes.\n\nFaites-le chaque matin avant le marché. Votre corps se sentira plus léger. Votre esprit sera plus clair. Votre journée sera meilleure.\n\nPas de salle de sport nécessaire. Juste vous et 5 minutes.`,
  },
  {
    id: 'little_drop_ocean',
    title: 'Little Drop Makes Ocean: How 100 FCFA Per Day Saves Your Life',
    title_pidgin: 'Small Water Full Drum: How 100 FCFA Per Day Saves Your Life',
    title_fr: 'Petite Goutte Fait Océan : Comment 100 FCFA par Jour Sauve Votre Vie',
    category: 'mboa_stories',
    summary: 'Small daily habits lead to big results. This is the Mboa-Zen philosophy.',
    summary_pidgin: 'Small daily habits dey bring heavy results. Na the main Mboa-Zen sense be that.',
    summary_fr: 'Les petites habitudes quotidiennes mènent à de grands résultats. C\'est la philosophie Mboa-Zen.',
    readTime: '3 min read',
    content: `There is a Cameroonian proverb: "No rush, na small small water full drum."\n\nThat means: little by little, the drum fills with water.\n\nYour health is the same.\n\nYou do not need to change everything at once. You do not need to eat perfectly every day. You do not need to exercise for hours.\n\nYou need to do small things every day.\n\nOne glass of water. One home workout. One local meal. One daily check-in.\n\nThat is it. That is Mboa-Zen.\n\nLittle drops make ocean.\n\nSo start today. Not tomorrow. Not next week. Today.\n\nDrink one glass of water. Do one squat. Eat one vegetable.\n\nThat is enough. Tomorrow, do it again.\n\nAnd over time, you will be healthier. Stronger. Calmer.\n\nThat is the promise of Mboa-Zen.\n\nLittle drops make ocean.`,
    content_pidgin: `Cameroonian proverb dey say: "No rush, na small small water full drum."\n\nE mean say: small-small, water go fill the whole drum.\n\nYour health na same thing.\n\nYou no need change everything one time. You no need chop perfect every day. You no need workout for long hours.\n\nYou just need do small things every day.\n\nOne glass water. One home exercise. One local chop. One daily check-in.\n\nNa all. Na Mboa-Zen be that.\n\nSmall drops dey make ocean.\n\nSo start today. No be tomorrow. No be next week. Today.\n\nDrink one glass water. Do one squat. Chop one green.\n\nThat one do. Tomorrow, do am again.\n\nOver time, you go dey healthier, stronger, and calm down pass before.\n\nNa the promise of Mboa-Zen be that.\n\nSmall water full drum.`,
    content_fr: `Il y a un proverbe camerounais : « Pas de précipitation, c'est petit à petit que l'eau remplit le tambour. »\n\nCela signifie : petit à petit, le tambour se remplit d'eau.\n\nVotre santé est pareille.\n\nVous n'avez pas besoin de tout changer d'un coup. Vous n'avez pas besoin de manger parfaitement chaque jour. Vous n'avez pas besoin de faire de l'exercice pendant des heures.\n\nVous avez besoin de faire de petites choses chaque jour.\n\nUn verre d'eau. Un entraînement à la maison. Un repas local. Un bilan quotidien.\n\nC'est tout. C'est Mboa-Zen.\n\nLes petites gouttes font l'océan.\n\nAlors commencez aujourd'hui. Pas demain. Pas la semaine prochaine. Aujourd'hui.\n\nBuvez un verre d'eau. Faites un squat. Mangez un légume.\n\nC'est assez. Demain, faites-le encore.\n\nEt avec le temps, vous serez plus sain. Plus fort. Plus calme.\n\nC'est la promesse de Mboa-Zen.\n\nLes petites gouttes font l'océan.`,
  },
];