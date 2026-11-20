export const recipes = [
  {
    id: 1,
    name: "Crispy Masala Dosa & Chutney",
    tamilName: "மொறுமொறுப்பான மசாலா தோசை & தேங்காய் சட்னி",
    category: "Breakfast",
    time: 25,
    veg: true,
    costInr: 45,
    calories: "320 kcal",
    macros: { protein: "9g", carbs: "52g", fat: "8g" },
    pantryTags: ["rice", "potato", "coconut", "curry leaves", "ghee"],
    image:
      "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Fermented rice & urad dal batter",
      "Boiled & spiced mashed potatoes",
      "Fresh grated coconut",
      "Mustard seeds & curry leaves",
      "Roasted chana dal",
      "Pure cow ghee"
    ],
    steps: [
      "Heat a seasoned cast-iron tawa on medium-high flame and sprinkle a few drops of water.",
      "Pour a ladleful of batter and swirl outward into a thin, crisp circle.",
      "Drizzle 1 tsp ghee around the edges and roast until golden brown.",
      "Place warm potato masala in the center, fold, and serve with fresh coconut chutney."
    ],
    tamilSteps: [
      "இரும்பு தோசைக் கல்லை மிதமான தீயில் சூடாக்கி சிறிது தண்ணீர் தெளிக்கவும்.",
      "ஒரு கரண்டி மாவை ஊற்றி மெல்லிய வட்டமாகத் தேய்க்கவும்.",
      "ஓரங்களில் 1 டீஸ்பூன் நெய் விட்டு பொன்னிறமாகும் வரை வேகவிடவும்.",
      "நடுவில் உருளைக்கிழங்கு மசாலா வைத்து மடித்து தேங்காய் சட்னியுடன் பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Millet & Less Oil",
        calories: "250 kcal",
        time: 20,
        swapNote: "Replaced white rice batter with Ragi-Millet batter and used cold-pressed sesame oil."
      },
      protein: {
        label: "Paneer Bhurji Stuffing",
        calories: "410 kcal",
        time: 25,
        swapNote: "Added 100g grated spiced paneer inside the potato masala (+16g protein)."
      },
      quick: {
        label: "12-Min Podi Dosa",
        calories: "280 kcal",
        time: 12,
        swapNote: "Skipped potato boiling—spread roasted idli podi & ghee directly on crisp dosa."
      }
    }
  },
  {
    id: 2,
    name: "Hyderabadi Veg Dum Biryani",
    tamilName: "ஹைதராபாத் காய்கறி தம் பிரியாணி",
    category: "Lunch",
    time: 45,
    veg: true,
    costInr: 85,
    calories: "430 kcal",
    macros: { protein: "11g", carbs: "68g", fat: "13g" },
    pantryTags: ["rice", "potato", "carrot", "yogurt", "mint", "onion"],
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Aged long-grain Basmati rice",
      "Diced carrots, beans & potatoes",
      "Hung curd & fresh mint",
      "Crispy golden fried onions",
      "Saffron soaked in warm milk",
      "Whole aromatic spices"
    ],
    steps: [
      "Marinate mixed vegetables in yogurt, mint, fried onions, and biryani spices.",
      "Parboil soaked Basmati rice with whole spices until 70% cooked.",
      "Layer rice over marinated vegetables and drizzle saffron milk on top.",
      "Seal tightly and cook on low dum heat for 20 minutes until fluffy."
    ],
    tamilSteps: [
      "நறுக்கிய காய்கறிகளை தயிர், புதினா, வறுத்த வெங்காயம் மற்றும் மசாலாவுடன் ஊறவைக்கவும்.",
      "ஊறவைத்த பாஸ்மதி அரிசியை முழு மசாலா பொருட்களுடன் 70% வேகவைக்கவும்.",
      "காய்கறிகளின் மீது அரிசியைப் பரப்பி மேலே குங்குமப்பூ பால் ஊற்றவும்.",
      "பாத்திரத்தை இறுக்கமாக மூடி குறைந்த தீயில் 20 நிமிடம் தம் போட்டு இறக்கவும்."
    ],
    remixes: {
      healthy: {
        label: "Brown Basmati & Cauliflower",
        calories: "340 kcal",
        time: 40,
        swapNote: "50/50 riced cauliflower + Basmati rice with zero fried ghee."
      },
      protein: {
        label: "Soya Chunk & Paneer Biryani",
        calories: "470 kcal",
        time: 45,
        swapNote: "Added marinated soya chunks & paneer cubes (24g protein)."
      },
      quick: {
        label: "15-Min Pressure Cooker Pulao",
        calories: "410 kcal",
        time: 15,
        swapNote: "One-pot 2-whistle pressure cooker method with caramelized onions."
      }
    }
  },
  {
    id: 3,
    name: "Paneer Butter Masala",
    tamilName: "பன்னீர் பட்டர் மசாலா",
    category: "Dinner",
    time: 35,
    veg: true,
    costInr: 110,
    calories: "460 kcal",
    macros: { protein: "18g", carbs: "24g", fat: "32g" },
    pantryTags: ["paneer", "tomato", "butter", "cashew", "garam masala"],
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Fresh malai paneer cubes",
      "Ripe tomato puree",
      "Soaked cashew nut paste",
      "Unsalted white butter",
      "Kasuri methi & garam masala",
      "Kashmiri red chili powder"
    ],
    steps: [
      "Soak paneer cubes in warm salted water for 10 minutes so they stay soft.",
      "Simmer tomato puree with butter and Kashmiri chili powder until glossy.",
      "Whisk in smooth cashew paste and crushed kasuri methi on low heat.",
      "Fold in paneer cubes and simmer gently for 4 minutes before serving."
    ],
    tamilSteps: [
      "பன்னீர் துண்டுகளை வெதுவெதுப்பான உப்பு நீரில் 10 நிமிடம் ஊறவைக்கவும்.",
      "தக்காளி விழுது, வெண்ணெய் மற்றும் காஷ்மீரி மிளகாய்த்தூள் சேர்த்து கொதிக்கவிடவும்.",
      "அரைத்த முந்திரி விழுது மற்றும் கஸ்தூரி மேத்தி சேர்த்து குறைந்த தீயில் கிளறவும்.",
      "பன்னீர் துண்டுகளைச் சேர்த்து 4 நிமிடங்கள் மெதுவாக வேகவைத்து பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Low-Fat Yogurt Gravy",
        calories: "310 kcal",
        time: 30,
        swapNote: "Swapped heavy butter & cashews for hung curd and grilled low-fat paneer."
      },
      protein: {
        label: "Tofu & Paneer Power Bowl",
        calories: "440 kcal",
        time: 35,
        swapNote: "Combined high-protein firm tofu with paneer for 28g protein per bowl."
      },
      quick: {
        label: "15-Min Skillet Paneer",
        calories: "390 kcal",
        time: 15,
        swapNote: "Used crushed tomatoes and toasted melon seeds for an instant creamy base."
      }
    }
  },
  {
    id: 4,
    name: "Chettinad Pepper Chicken",
    tamilName: "செட்டிநாடு மிளகு கோழி வறுவல்",
    category: "Lunch",
    time: 40,
    veg: false,
    costInr: 135,
    calories: "490 kcal",
    macros: { protein: "36g", carbs: "14g", fat: "31g" },
    pantryTags: ["chicken", "pepper", "onion", "tomato", "curry leaves"],
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Tender bone-in chicken",
      "Freshly cracked black pepper",
      "Pearl shallots & ripe tomatoes",
      "Roasted fennel & coriander seeds",
      "Fresh curry leaves",
      "Cold-pressed gingelly oil"
    ],
    steps: [
      "Dry-roast black peppercorns, fennel, and coriander seeds until fragrant, then grind.",
      "Sauté pearl shallots and curry leaves in gingelly oil until caramelized.",
      "Add chicken and roasted spice masala, searing on high heat for 5 minutes.",
      "Cover and simmer until tender and coated in a dark, aromatic pepper gravy."
    ],
    tamilSteps: [
      "மிளகு, சோம்பு மற்றும் தனியாவை வாசனை வரும் வரை வறுத்து பொடிக்கவும்.",
      "நல்லெண்ணெயில் சின்ன வெங்காயம் மற்றும் கறிவேப்பிலை சேர்த்து பொன்னிறமாக வதக்கவும்.",
      "கோழி மற்றும் அரைத்த மசாலா சேர்த்து அதிக தீயில் 5 நிமிடம் வதக்கவும்.",
      "மூடி வைத்து கோழி நன்கு வெந்து மிளகு மசாலா சேரும் வரை சமைக்கவும்."
    ],
    remixes: {
      healthy: {
        label: "Grilled Pepper Chicken Breast",
        calories: "340 kcal",
        time: 30,
        swapNote: "Used skinless chicken breast with 1 tsp cold-pressed gingelly oil."
      },
      protein: {
        label: "Double Chicken Roast",
        calories: "540 kcal",
        time: 40,
        swapNote: "Extra lean chicken portion with roasted curry-leaf pepper crust (48g protein)."
      },
      quick: {
        label: "15-Min Boneless Pepper Fry",
        calories: "380 kcal",
        time: 15,
        swapNote: "Cut chicken into bite-size strips for rapid high-heat pan searing."
      }
    }
  },
  {
    id: 5,
    name: "Sourdough Avocado Egg Toast",
    tamilName: "அவகேடோ & முட்டை டோஸ்ட்",
    category: "Breakfast",
    time: 15,
    veg: false,
    costInr: 95,
    calories: "340 kcal",
    macros: { protein: "16g", carbs: "28g", fat: "19g" },
    pantryTags: ["egg", "bread", "avocado", "lemon", "olive oil"],
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Artisanal sourdough slices",
      "Ripe Hass avocado",
      "Farm-fresh eggs",
      "Crushed red chili flakes",
      "Extra virgin olive oil & lemon"
    ],
    steps: [
      "Toast thick sourdough slices until golden and crisp on both sides.",
      "Mash ripe avocado with fresh lemon juice, sea salt, and olive oil.",
      "Gently poach eggs in simmering water for 3 minutes until whites are set.",
      "Layer avocado over warm toast, top with poached egg, and finish with chili flakes."
    ],
    tamilSteps: [
      "பிரட் துண்டுகளை இருபுறமும் பொன்னிறமாக டோஸ்ட் செய்யவும்.",
      "பழுத்த அவகேடோவை எலுமிச்சை சாறு, உப்பு மற்றும் ஆலிவ் எண்ணெயுடன் மசிக்கவும்.",
      "கொதிக்கும் நீரில் முட்டைகளை 3 நிமிடங்கள் மெதுவாக வேகவைக்கவும்.",
      "டோஸ்ட் மீது அவகேடோ தடவி, மேலே முட்டை மற்றும் மிளகாய்த் துகள்கள் தூவி பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Multigrain & Egg White",
        calories: "260 kcal",
        time: 12,
        swapNote: "Swapped to sprouted multigrain toast with herb-whipped avocado."
      },
      protein: {
        label: "Triple Egg & Greek Yogurt",
        calories: "430 kcal",
        time: 15,
        swapNote: "Added extra poached egg + Greek yogurt spread (27g protein)."
      },
      quick: {
        label: "8-Min Fried Egg Smash",
        calories: "330 kcal",
        time: 8,
        swapNote: "Pan-fried sunny-side egg directly while bread toasts."
      }
    }
  },
  {
    id: 6,
    name: "Herb Garlic Butter Salmon",
    tamilName: "பூண்டு & மூலிகை சால்மன் வறுவல்",
    category: "Dinner",
    time: 20,
    veg: false,
    costInr: 185,
    calories: "410 kcal",
    macros: { protein: "34g", carbs: "4g", fat: "28g" },
    pantryTags: ["fish", "garlic", "butter", "lemon"],
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Fresh Atlantic salmon fillet",
      "Crushed garlic cloves",
      "Herb-infused butter",
      "Fresh rosemary & thyme",
      "Charred lemon wedges"
    ],
    steps: [
      "Pat salmon fillets dry and season generously with sea salt and cracked pepper.",
      "Sear skin-side down in a hot skillet for 4 minutes until crisp.",
      "Flip, add butter, crushed garlic, rosemary, and thyme, and baste continuously.",
      "Serve immediately with charred lemon wedges."
    ],
    tamilSteps: [
      "மீன் துண்டுகளை உலரத் துடைத்து உப்பு மற்றும் மிளகுத்தூள் தடவவும்.",
      "சூடான வாணலியில் தோல் பகுதி கீழே இருக்குமாறு 4 நிமிடம் பொரிக்கவும்.",
      "திருப்பிப் போட்டு வெண்ணெய், பூண்டு, மூலிகைகள் சேர்த்து மேலே ஊற்றி வேகவிடவும்.",
      "வறுத்த எலுமிச்சை துண்டுகளுடன் சூடாகப் பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Lemon Steamed Herb Fillet",
        calories: "310 kcal",
        time: 15,
        swapNote: "Replaced butter with extra virgin olive oil and steamed asparagus."
      },
      protein: {
        label: "King-Cut Omega Steak",
        calories: "490 kcal",
        time: 20,
        swapNote: "250g thick fillet cut delivering 44g clean protein."
      },
      quick: {
        label: "10-Min Air-Fryer Garlic Salmon",
        calories: "370 kcal",
        time: 10,
        swapNote: "Brushed with garlic-herb oil and air-fried at 200°C for 9 minutes."
      }
    }
  },
  {
    id: 7,
    name: "Filter Coffee Panna Cotta",
    tamilName: "பில்டர் காபி பன்னா கோட்டா",
    category: "Dessert",
    time: 25,
    veg: true,
    costInr: 65,
    calories: "290 kcal",
    macros: { protein: "5g", carbs: "26g", fat: "18g" },
    pantryTags: ["coffee", "milk", "cream", "sugar"],
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Strong South Indian coffee decoction",
      "Chilled heavy cream",
      "Organic cane sugar",
      "Vegetarian agar-agar",
      "Madagascar vanilla extract"
    ],
    steps: [
      "Whisk agar-agar into cold cream and let bloom for 5 minutes.",
      "Warm the cream with organic sugar until dissolved without boiling.",
      "Stir in freshly brewed filter coffee decoction and vanilla extract.",
      "Pour into ramekins and chill until silky and set."
    ],
    tamilSteps: [
      "குளிர்ந்த கிரீமில் அகர்-அகர் சேர்த்து 5 நிமிடம் ஊறவைக்கவும்.",
      "கிரீமுடன் நாட்டுச் சர்க்கரை சேர்த்து கொதிக்காமல் கரையும் வரை சூடாக்கவும்.",
      "புதிய பில்டர் காபி டிகாஷன் மற்றும் வெண்ணிலா எசன்ஸ் சேர்த்து கலக்கவும்.",
      "சிறிய கிண்ணங்களில் ஊற்றி குளிரவைத்து பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Coconut Milk & Jaggery",
        calories: "195 kcal",
        time: 20,
        swapNote: "Light coconut milk + palm jaggery instead of heavy dairy cream."
      },
      protein: {
        label: "Greek Yogurt Mocha Mousse",
        calories: "230 kcal",
        time: 10,
        swapNote: "Whisked espresso decoction into strained Greek yogurt (15g protein)."
      },
      quick: {
        label: "10-Min Whipped Coffee Cream",
        calories: "260 kcal",
        time: 10,
        swapNote: "Instant chilled mocha whip layered with crushed biscuits."
      }
    }
  },
  {
    id: 8,
    name: "Mediterranean Chickpea Bowl",
    tamilName: "கொண்டைக்கடலை காய்கறி சாலட் பவுல்",
    category: "Lunch",
    time: 18,
    veg: true,
    costInr: 60,
    calories: "360 kcal",
    macros: { protein: "15g", carbs: "44g", fat: "14g" },
    pantryTags: ["chickpeas", "cucumber", "tomato", "lemon", "olive oil"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    ingredients: [
      "Crispy spiced chickpeas",
      "English cucumber & cherry tomatoes",
      "Crumbled feta & Kalamata olives",
      "Creamy lemon-tahini dressing",
      "Fresh chopped parsley"
    ],
    steps: [
      "Toss chickpeas with olive oil, cumin, and smoked paprika, then roast until crisp.",
      "Dice cucumber, halve cherry tomatoes, and chop fresh flat-leaf parsley.",
      "Whisk tahini, lemon juice, garlic, and warm water into a silky dressing.",
      "Assemble greens, warm chickpeas, feta, and olives, and drizzle dressing over."
    ],
    tamilSteps: [
      "வேகவைத்த கொண்டைக்கடலையை ஆலிவ் எண்ணெய், சீரகம் மற்றும் மிளகாய்த்தூள் சேர்த்து வறுக்கவும்.",
      "வெள்ளரிக்காய், தக்காளி மற்றும் கொத்தமல்லி தழையை பொடியாக நறுக்கவும்.",
      "எலுமிச்சை சாறு, பூண்டு மற்றும் எள் விழுது சேர்த்து சுவையான சாஸ் தயாரிக்கவும்.",
      "அனைத்தையும் ஒன்றாகக் கலந்து மேலே எலுமிச்சை சாஸ் ஊற்றி பரிமாறவும்."
    ],
    remixes: {
      healthy: {
        label: "Zero-Oil Sprouted Sundal Bowl",
        calories: "270 kcal",
        time: 12,
        swapNote: "Steamed sprouted chickpeas with raw mango, coconut & lemon."
      },
      protein: {
        label: "Double Chickpea & Edamame",
        calories: "420 kcal",
        time: 18,
        swapNote: "Boosted with roasted soya nuts & feta for 24g plant protein."
      },
      quick: {
        label: "7-Min Pantry Chickpea Toss",
        calories: "330 kcal",
        time: 7,
        swapNote: "No-roast crisp cucumber, tomato & spiced boiled chana toss."
      }
    }
  }
];
