// ============================================================================
// GAME 1: Nature Guess — 5 Sets of 15 Questions
// High quality mix of Nigerian natural wonders, African treasures & world landmarks
// All images configured for /assets/nature/ in WebP format
// ============================================================================

const SET1 = [
  {
    "type": "image",
    "label": "Which famous rock is shown in this picture?",
    "subtitle": "Famous Nigerian landmark once featured on the old ₦100 note",
    "image": "/assets/nature/set1_q1.webp",
    "options": [
      "Zuma Rock, Niger State",
      "Olumo Rock, Ogun State",
      "Aso Rock, Abuja",
      "Idanre Hills, Ondo State"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which famous waterfall is shown here?",
    "subtitle": "A spectacular waterfall between Zambia and Zimbabwe",
    "image": "/assets/nature/set1_q2.webp",
    "options": [
      "Tugela Falls, South Africa",
      "Victoria Falls, Zambia/Zimbabwe",
      "Ouzoud Falls, Morocco",
      "Kalambo Falls, Zambia/Tanzania"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which Benin City landmark is shown?",
    "subtitle": "Historic royal residence of the Oba of Benin",
    "image": "/assets/nature/set1_q3.webp",
    "options": [
      "Benin National Museum",
      "Oba’s Palace",
      "Ogba Zoo",
      "Ramat Park"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which famous landmark is shown here?",
    "subtitle": "Iconic iron tower located in Paris",
    "image": "/assets/nature/set1_q4.webp",
    "options": [
      "Eiffel Tower, France",
      "Big Ben, England",
      "Leaning Tower of Pisa, Italy",
      "Arc de Triomphe, France"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which Nigerian landmark is shown?",
    "subtitle": "Historic rock formation overlooking Abeokuta",
    "image": "/assets/nature/set1_q5.webp",
    "options": [
      "Zuma Rock, Niger State",
      "Olumo Rock, Ogun State",
      "Aso Rock, Abuja",
      "Riyom Rock, Plateau State"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which Benin City landmark is shown?",
    "subtitle": "Edo State’s first flyover at Ramat Park",
    "image": "/assets/nature/set1_q6.webp",
    "options": [
      "Ramat Park Flyover",
      "Airport Road Flyover",
      "Ring Road Flyover",
      "Sapele Road Flyover"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which mountain is shown in this picture?",
    "subtitle": "Africa’s highest mountain, located in Tanzania",
    "image": "/assets/nature/set1_q7.webp",
    "options": [
      "Mount Kenya, Kenya",
      "Mount Elgon, Uganda/Kenya",
      "Mount Kilimanjaro, Tanzania",
      "Atlas Mountains, Morocco"
    ],
    "correct": 2,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which famous monument is shown here?",
    "subtitle": "White marble monument built in memory of a Mughal emperor’s wife",
    "image": "/assets/nature/set1_q8.webp",
    "options": [
      "Lotus Temple, India",
      "Taj Mahal, India",
      "India Gate, India",
      "Humayun’s Tomb, India"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which historic landmark is shown?",
    "subtitle": "Ancient earthworks surrounding the historic Benin Kingdom",
    "image": "/assets/nature/set1_q9.webp",
    "options": [
      "Benin Moat, Edo State",
      "Kano City Walls, Kano State",
      "Osun-Osogbo Grove, Osun State",
      "Ogbunike Caves, Anambra State"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which ancient structure is shown here?",
    "subtitle": "Ancient Roman arena once used for gladiatorial contests",
    "image": "/assets/nature/set1_q10.webp",
    "options": [
      "Pantheon, Italy",
      "Colosseum, Italy",
      "Roman Forum, Italy",
      "Circus Maximus, Italy"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which Nigerian landmark is shown?",
    "subtitle": "One of Abuja’s most recognizable religious landmarks",
    "image": "/assets/nature/set1_q11.webp",
    "options": [
      "National Mosque, Abuja",
      "National Ecumenical Centre, Abuja",
      "Lagos Central Mosque, Lagos",
      "Sultan Bello Mosque, Kaduna"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which famous desert is shown?",
    "subtitle": "The world’s largest hot desert",
    "image": "/assets/nature/set1_q12.webp",
    "options": [
      "Kalahari Desert, Southern Africa",
      "Namib Desert, Namibia",
      "Sahara Desert, North Africa",
      "Danakil Desert, East Africa"
    ],
    "correct": 2,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which attraction is shown in Benin City?",
    "subtitle": "Popular wildlife attraction with animals and nature trails",
    "image": "/assets/nature/set1_q13.webp",
    "options": [
      "Ogba Zoo and Nature Park",
      "Okomu National Park",
      "Lekki Conservation Centre",
      "Yankari National Park"
    ],
    "correct": 0,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which African landmark is shown?",
    "subtitle": "Famous flat-topped mountain overlooking Cape Town",
    "image": "/assets/nature/set1_q14.webp",
    "options": [
      "Mount Kenya, Kenya",
      "Table Mountain, South Africa",
      "Mount Elgon, Uganda",
      "Drakensberg Mountains, South Africa"
    ],
    "correct": 1,
    "timer": 12
  },
  {
    "type": "image",
    "label": "Which famous statue is shown here?",
    "subtitle": "Iconic statue overlooking Rio de Janeiro",
    "image": "/assets/nature/set1_q15.webp",
    "options": [
      "Christ the Redeemer, Brazil",
      "Statue of Liberty, USA",
      "Angel of Independence, Mexico",
      "The Motherland Calls, Russia"
    ],
    "correct": 0,
    "timer": 12
  }
];

const SET2 = [
  {
    "type": "image",
    "label": "What iconic natural monolith dominates the skyline of Abuja?",
    "subtitle": "A 400-meter monolith standing proudly behind the Presidential Complex",
    "options": [
      "Aso Rock, Abuja",
      "Zuma Rock, Suleja",
      "Olumo Rock, Abeokuta",
      "Kufena Hill, Zaria"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q1.webp"
  },
  {
    "type": "image",
    "label": "Name this famous snow-capped volcanic peak in Japan",
    "subtitle": "An active stratovolcano and sacred Japanese cultural icon",
    "options": [
      "Mount Fuji, Japan",
      "Mount Rainier, USA",
      "Mount Etna, Italy",
      "Mount Halla, South Korea"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q2.webp"
  },
  {
    "type": "image",
    "label": "Which scenic waterfall in Niger State is named after a local deity?",
    "subtitle": "Tributary of the River Niger with powerful wet-season torrents",
    "options": [
      "Gurara Waterfalls, Niger State",
      "Erin Ijesha Falls, Osun",
      "Owhrokpokpo Falls, Delta",
      "Agbokim Falls, Cross River"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q3.webp"
  },
  {
    "type": "image",
    "label": "What is the largest hot desert in the world?",
    "subtitle": "Spanning over 9 million square kilometers across North Africa",
    "options": [
      "Gobi Desert",
      "Sahara Desert",
      "Kalahari Desert",
      "Arabian Desert"
    ],
    "correct": 1,
    "timer": 10,
    "image": "/assets/nature/set2_q4.webp"
  },
  {
    "type": "image",
    "label": "Identify this vast salt flat located in Southwest Bolivia",
    "subtitle": "The world's largest salt flat, forming a natural mirror when flooded",
    "options": [
      "Salar de Uyuni, Bolivia",
      "Bonneville Salt Flats, USA",
      "Etosha Pan, Namibia",
      "Atacama Salt Flat, Chile"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q5.webp"
  },
  {
    "type": "image",
    "label": "Which highest peak in Nigeria is located in Taraba State?",
    "subtitle": "Towering at 2,419 meters along the Cameroon border on the Mambilla Plateau",
    "options": [
      "Chappal Waddi (Gangirwal)",
      "Shere Hills",
      "Dimlang Peak",
      "Kumbo Mountain"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q6.webp"
  },
  {
    "type": "image",
    "label": "Which breathtaking South American waterfall system straddles Argentina & Brazil?",
    "subtitle": "Comprising 275 individual waterfalls including the \"Devil's Throat\"",
    "options": [
      "Angel Falls",
      "Iguazu Falls",
      "Victoria Falls",
      "Kaieteur Falls"
    ],
    "correct": 1,
    "timer": 10,
    "image": "/assets/nature/set2_q7.webp"
  },
  {
    "type": "image",
    "label": "Which national park in Edo State preserves rare African white-throated monkeys?",
    "subtitle": "A pristine lowland rainforest sanctuary near Benin City",
    "options": [
      "Okomu National Park",
      "Yankari National Park",
      "Gashaka-Gumti National Park",
      "Chad Basin National Park"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q8.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic flat-topped mountain overlooking Cape Town",
    "subtitle": "One of the New 7 Wonders of Nature, often covered by a cloud \"tablecloth\"",
    "options": [
      "Table Mountain, South Africa",
      "Mount Kilimanjaro, Tanzania",
      "Sugarloaf Mountain, Brazil",
      "Lion's Head, South Africa"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q9.webp"
  },
  {
    "type": "image",
    "label": "Name this striking canyon in Arizona famed for its wavy sandstone walls",
    "subtitle": "A slot canyon on Navajo land formed by flash flooding and rainwater erosion",
    "options": [
      "Antelope Canyon, USA",
      "Grand Canyon, USA",
      "Bryce Canyon, USA",
      "Zion Canyon, USA"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q10.webp"
  },
  {
    "type": "image",
    "label": "Which ancient stone hills in Jos offer panoramic views of Plateau State?",
    "subtitle": "Rugged granitic hill range famous for mountain hiking and youth leadership camps",
    "options": [
      "Shere Hills, Plateau State",
      "Idanre Hills, Ondo State",
      "Doma Hills, Nasarawa",
      "Koma Hills, Adamawa"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q11.webp"
  },
  {
    "type": "image",
    "label": "What is the deepest lake in the world, holding 20% of Earth's unfrozen freshwater?",
    "subtitle": "An ancient rift lake located in southern Siberia, Russia",
    "options": [
      "Lake Baikal, Russia",
      "Lake Superior, USA/Canada",
      "Lake Tanganyika, Africa",
      "Lake Victoria, Africa"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q12.webp"
  },
  {
    "type": "image",
    "label": "Which serene lake resort in Niger State was created by damming the River Niger?",
    "subtitle": "Site of Nigeria's premier hydroelectric power reservoir and wildlife reserve",
    "options": [
      "Kainji Lake, Niger State",
      "Lake Chad, Borno",
      "Jabi Lake, Abuja",
      "Oguta Lake, Imo"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q13.webp"
  },
  {
    "type": "image",
    "label": "Identify the world's highest uninterrupted waterfall",
    "subtitle": "Falling 979 meters from the Auyán-tepui mountain in Venezuela",
    "options": [
      "Angel Falls, Venezuela",
      "Tugela Falls, South Africa",
      "Victoria Falls, Zambia",
      "Niagara Falls, USA"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set2_q14.webp"
  },
  {
    "type": "image",
    "label": "Which sacred mangrove grove and river lies in Osun State?",
    "subtitle": "UNESCO World Heritage forest along the Osun River dedicated to the fertility goddess",
    "options": [
      "Osun-Osogbo Sacred Grove",
      "Sukur Cultural Landscape",
      "Ngwo Pine Forest",
      "Millennium Park"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set2_q15.webp"
  }
];

const SET3 = [
  {
    "type": "image",
    "label": "Identify this dramatic sea stack rock off the coast of Iceland",
    "subtitle": "Black sand volcanic beaches and roaring North Atlantic waves",
    "options": [
      "Reynisfjara, Iceland",
      "Cliffs of Moher, Ireland",
      "Dover Cliffs, UK",
      "Twelve Apostles, Australia"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q1.webp"
  },
  {
    "type": "image",
    "label": "Which dramatic cascading waterfall is located in Nasarawa State, Nigeria?",
    "subtitle": "Towering at 150 meters, it is one of the highest waterfalls in West Africa",
    "options": [
      "Farin Ruwa Falls, Nasarawa",
      "Gurara Falls, Niger",
      "Kwa Falls, Cross River",
      "Matsirga Falls, Kaduna"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q2.webp"
  },
  {
    "type": "image",
    "label": "What is the largest freshwater lake by surface area in Africa?",
    "subtitle": "Shared by Uganda, Kenya, and Tanzania, and source of the White Nile",
    "options": [
      "Lake Victoria",
      "Lake Tanganyika",
      "Lake Malawi",
      "Lake Chad"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q3.webp"
  },
  {
    "type": "image",
    "label": "Name this unique cave and pine forest waterfall in Enugu State",
    "subtitle": "Features a natural limestone cave, streaming waters, and canopy of pines",
    "options": [
      "Awhum Waterfall & Cave, Enugu",
      "Ngwo Pine Forest & Cave",
      "Ogbunike Caves, Anambra",
      "Ezeagu Tourist Complex"
    ],
    "correct": 1,
    "timer": 12,
    "image": "/assets/nature/set3_q4.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic volcanic caldera in Tanzania",
    "subtitle": "The world's largest intact volcanic caldera, teeming with lion and rhino prides",
    "options": [
      "Ngorongoro Crater, Tanzania",
      "Serengeti Plains, Tanzania",
      "Maasai Mara, Kenya",
      "Amboseli Basin, Kenya"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q5.webp"
  },
  {
    "type": "image",
    "label": "Which ancient cave system in Anambra State has 317 stone steps leading down to it?",
    "subtitle": "UNESCO-recognized cave system with sacred streams and historical refuge tunnels",
    "options": [
      "Ogbunike Caves, Anambra",
      "Awhum Caves, Enugu",
      "Iho Eleru, Ondo",
      "Marshall Caves, Bauchi"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q6.webp"
  },
  {
    "type": "image",
    "label": "Identify this world-famous limestone fjord bay in Vietnam",
    "subtitle": "Thousands of towering limestone karsts and islets emerging from emerald waters",
    "options": [
      "Ha Long Bay, Vietnam",
      "Phang Nga Bay, Thailand",
      "Milford Sound, New Zealand",
      "Geirangerfjord, Norway"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q7.webp"
  },
  {
    "type": "image",
    "label": "Which famous confluence point in Nigeria is where the Niger and Benue rivers merge?",
    "subtitle": "Historic city once serving as the administrative capital of northern Nigeria",
    "options": [
      "Lokoja, Kogi State",
      "Makurdi, Benue State",
      "Jebba, Kwara State",
      "Onitsha, Anambra State"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q8.webp"
  },
  {
    "type": "image",
    "label": "What is the name of the massive sand dunes in Namibia, home to dead camel thorn trees?",
    "subtitle": "Sossusvlei in the Namib Desert, featuring surreal clay pans under red dunes",
    "options": [
      "Deadvlei / Sossusvlei, Namibia",
      "Rub' al Khali, Oman",
      "White Sands, USA",
      "Erg Chebbi, Morocco"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q9.webp"
  },
  {
    "type": "image",
    "label": "Which natural lake in Imo State is famous for its unique non-mixing blue and green waters?",
    "subtitle": "Formed at the confluence of the clear Oguta Lake and muddy Urashi River",
    "options": [
      "Oguta Lake, Imo State",
      "Agulu Lake, Anambra",
      "Jivani Lake, Adamawa",
      "Lake Chad, Borno"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q10.webp"
  },
  {
    "type": "image",
    "label": "What world-famous natural arch rock formation sits in Utah, USA?",
    "subtitle": "Free-standing 16-meter natural sandstone arch photographed around the globe",
    "options": [
      "Delicate Arch, Arches National Park",
      "London Bridge, Australia",
      "Durrow Arch, UK",
      "Pont d'Arc, France"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q11.webp"
  },
  {
    "type": "image",
    "label": "Which sprawling savanna park in Taraba & Adamawa is Nigeria's largest national park?",
    "subtitle": "Home to Chappal Waddi and endangered West African chimpanzees",
    "options": [
      "Gashaka-Gumti National Park",
      "Yankari National Park",
      "Kainji Lake Park",
      "Old Oyo National Park"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q12.webp"
  },
  {
    "type": "image",
    "label": "Identify this giant caldera active volcano in Hawaii",
    "subtitle": "One of the most active shield volcanoes on the planet",
    "options": [
      "Kilauea, Hawaii",
      "Mount Vesuvius, Italy",
      "Krakatoa, Indonesia",
      "Popocatépetl, Mexico"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q13.webp"
  },
  {
    "type": "image",
    "label": "Which scenic waterfall cascade near Kafanchan, Kaduna State drops into a natural pool?",
    "subtitle": "A popular tourist getaway fed by springs off the Kagoro Hills",
    "options": [
      "Matsirga Waterfalls, Kaduna",
      "Gurara Falls, Niger",
      "Assop Falls, Plateau",
      "Farin Ruwa, Nasarawa"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set3_q14.webp"
  },
  {
    "type": "image",
    "label": "What is the longest river in the world?",
    "subtitle": "Flowing over 6,650 kilometers through 11 northeastern African nations",
    "options": [
      "Nile River",
      "Amazon River",
      "Yangtze River",
      "Mississippi River"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set3_q15.webp"
  }
];

const SET4 = [
  {
    "type": "image",
    "label": "Identify this remarkable pink bioluminescent or salt lake in Senegal",
    "subtitle": "Renowned for its vibrant pink hue caused by Dunaliella salina algae and extreme salinity",
    "options": [
      "Lake Retba (Lac Rose), Senegal",
      "Dead Sea, Jordan",
      "Mono Lake, USA",
      "Lake Natron, Tanzania"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q1.webp"
  },
  {
    "type": "image",
    "label": "Which prominent hill formation in Kaduna served as defensive sanctuary for the Zazzau kingdom?",
    "subtitle": "Ancient granitic ridge near Zaria associated with legendary Queen Amina",
    "options": [
      "Kufena Hills, Zaria",
      "Shere Hills, Jos",
      "Doma Hills, Nasarawa",
      "Koma Hills, Adamawa"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q2.webp"
  },
  {
    "type": "image",
    "label": "Name this world-famous glacier fjord landscape in southwest New Zealand",
    "subtitle": "Carved by ancient glaciers and described by Rudyard Kipling as the \"Eighth Wonder of the World\"",
    "options": [
      "Milford Sound, New Zealand",
      "Geirangerfjord, Norway",
      "Kenai Fjords, Alaska",
      "Patagonian Icefield, Chile"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q3.webp"
  },
  {
    "type": "image",
    "label": "Which spectacular waterfall in Plateau State is located along the Jos-Kagoro road?",
    "subtitle": "Cascading over granitic rocks into an emerald forest pool popular with campers",
    "options": [
      "Assop Falls, Plateau State",
      "Kurra Falls, Plateau",
      "Gurara Falls, Niger",
      "Erin Ijesha Falls, Osun"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q4.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic volcanic peak in the Caucasus, the highest mountain in Europe",
    "subtitle": "Dormant twin-peaked volcano standing at 5,642 meters in Russia",
    "options": [
      "Mount Elbrus, Russia",
      "Mont Blanc, France/Italy",
      "Matterhorn, Switzerland",
      "Mount Olympus, Greece"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q5.webp"
  },
  {
    "type": "image",
    "label": "Which ancient cultural landscape in Adamawa is a UNESCO World Heritage Site?",
    "subtitle": "Features terraced stone hills, an ancient palace of the Hidi, and sacred stone paved roads",
    "options": [
      "Sukur Cultural Landscape, Adamawa",
      "Idanre Hills, Ondo",
      "Koma Hills, Adamawa",
      "Doma Hills, Nasarawa"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q6.webp"
  },
  {
    "type": "image",
    "label": "What is the largest living tree species on Earth by wood volume?",
    "subtitle": "Found in the Sierra Nevada mountains of California, like \"General Sherman\"",
    "options": [
      "Giant Sequoia",
      "Coast Redwood",
      "African Baobab",
      "Bristlecone Pine"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q7.webp"
  },
  {
    "type": "image",
    "label": "Which tropical river in Cross River State flows near the rainforest canopy and Kwa Falls?",
    "subtitle": "Known for oil palm estates, rapids, and pristine tropical biodiversity",
    "options": [
      "Kwa River, Cross River State",
      "Calabar River, Cross River",
      "Imo River, Abia",
      "Benue River, Benue"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q8.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic limestone natural arch in the Galápagos Islands or Malta (Azure Window style)",
    "subtitle": "Geological arch formed by marine erosion over millions of years",
    "options": [
      "Darwin's Arch / Sea Arch",
      "Delicate Arch",
      "Durrow Arch",
      "Rainbow Bridge"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q9.webp"
  },
  {
    "type": "image",
    "label": "Which famous mountain range separates the Iberian Peninsula from the rest of Europe?",
    "subtitle": "Forming a natural high mountain border between Spain and France",
    "options": [
      "Pyrenees",
      "Alps",
      "Carpathians",
      "Apennines"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q10.webp"
  },
  {
    "type": "image",
    "label": "Which dramatic inselberg in Plateau State is a famous solitary volcanic volcanic plug?",
    "subtitle": "Standing dramatically 176 meters above the savanna plains near Wase town",
    "options": [
      "Wase Rock, Plateau State",
      "Zuma Rock, Niger",
      "Riyom Rock, Plateau",
      "Aso Rock, Abuja"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q11.webp"
  },
  {
    "type": "image",
    "label": "What is the largest barrier reef in the Western Hemisphere?",
    "subtitle": "Stretching from the Yucatan Peninsula down past Belize, Guatemala, and Honduras",
    "options": [
      "Mesoamerican Barrier Reef",
      "Great Barrier Reef",
      "Red Sea Reef",
      "New Caledonia Reef"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q12.webp"
  },
  {
    "type": "image",
    "label": "Which park in Cross River State harbors Nigeria's oldest rainforest and rare gorillas?",
    "subtitle": "One of the oldest rainforests in Africa, home to Cross River Gorillas",
    "options": [
      "Cross River National Park",
      "Okomu National Park",
      "Gashaka-Gumti Park",
      "Yankari Game Reserve"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q13.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic volcanic caldera in Greece known for white-washed cliffside houses",
    "subtitle": "Formed by one of the largest volcanic eruptions in recorded history around 1600 BC",
    "options": [
      "Santorini Caldera, Greece",
      "Crete Island",
      "Mykonos Arch",
      "Rhodes Caldera"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set4_q14.webp"
  },
  {
    "type": "image",
    "label": "Which unique rock formation in Plateau State resembles balanced cooking pots?",
    "subtitle": "Famous perched boulder formation located along the Jos-Akwanga highway",
    "options": [
      "Riyom Rock, Plateau State",
      "Zuma Rock, Niger",
      "Idanre Hills, Ondo",
      "Kufena Hills, Kaduna"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set4_q15.webp"
  }
];

const SET5 = [
  {
    "type": "image",
    "label": "Name this stunning emerald lake in the Canadian Rockies famed for its glacial melt colour",
    "subtitle": "Fed by glaciers in Banff National Park with towering snow-capped peaks",
    "options": [
      "Lake Louise, Canada",
      "Lake Tahoe, USA",
      "Lake Como, Italy",
      "Crater Lake, USA"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q1.webp"
  },
  {
    "type": "image",
    "label": "Which state in Nigeria is home to the famous Obudu Mountain and Cable Car Resort?",
    "subtitle": "Sits at an elevation of 1,576 meters with sub-temperate climate in the Sankwala Mountains",
    "options": [
      "Cross River State",
      "Taraba State",
      "Plateau State",
      "Ondo State"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q2.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic rock peak towering over Rio de Janeiro, Brazil",
    "subtitle": "A monolithic granite-quartz peak jutting out into Guanabara Bay",
    "options": [
      "Sugarloaf Mountain, Brazil",
      "Corcovado, Brazil",
      "Morro de São Paulo, Brazil",
      "Pedra da Gávea, Brazil"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q3.webp"
  },
  {
    "type": "image",
    "label": "Which pristine warm spring in Bauchi State maintains a constant 31.1°C temperature?",
    "subtitle": "Crystal-clear warm water bubbling from limestone fissures in Yankari National Park",
    "options": [
      "Wikki Warm Spring, Bauchi",
      "Ikogosi Warm Spring, Ekiti",
      "Awhum Spring, Enugu",
      "Maiyaki Spring, Niger"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q4.webp"
  },
  {
    "type": "image",
    "label": "What is the largest island in the world that is not a continent?",
    "subtitle": "An autonomous Danish territory covered largely by an expansive ice sheet",
    "options": [
      "Greenland",
      "Madagascar",
      "Borneo",
      "New Guinea"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q5.webp"
  },
  {
    "type": "image",
    "label": "Which historical mountain community in Ondo State features ancient palaces atop massive rock hills?",
    "subtitle": "Inhabited for nearly a millennium before residents relocated down to the plain",
    "options": [
      "Idanre Hills, Ondo State",
      "Olumo Rock, Ogun State",
      "Igbetti Rock, Oyo State",
      "Efon Hills, Ekiti State"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q6.webp"
  },
  {
    "type": "image",
    "label": "Identify the iconic white limestone travertine terraces in Turkey",
    "subtitle": "Mineral-rich thermal waters flowing down gleaming terraces, known as the \"Cotton Castle\"",
    "options": [
      "Pamukkale, Turkey",
      "Huanglong, China",
      "Semuc Champey, Guatemala",
      "Mammoth Hot Springs, USA"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q7.webp"
  },
  {
    "type": "image",
    "label": "Which ancient lake basin in Borno State provides vital water to four Sahelian countries?",
    "subtitle": "Historically one of Africa's largest lakes, though dramatically shrunk since the 1960s",
    "options": [
      "Lake Chad",
      "Lake Turkana",
      "Lake Albert",
      "Lake Volta"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q8.webp"
  },
  {
    "type": "image",
    "label": "Name the highest mountain peak in the world above sea level",
    "subtitle": "Standing at 8,848.86 meters in the Himalayas along the border of Nepal and China",
    "options": [
      "Mount Everest",
      "K2",
      "Kangchenjunga",
      "Lhotse"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q9.webp"
  },
  {
    "type": "image",
    "label": "Which mangrove delta in southern Nigeria is one of the largest wetlands on the planet?",
    "subtitle": "Encompassing over 70,000 square kilometers where the Niger River fractures into the Atlantic",
    "options": [
      "Niger River Delta",
      "Congo Basin Delta",
      "Okavango Delta",
      "Zambezi Delta"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q10.webp"
  },
  {
    "type": "image",
    "label": "Identify this legendary inland delta in Botswana where seasonal floods vanish into desert sands",
    "subtitle": "A UNESCO World Heritage sanctuary for elephants, lions, and hippos in the Kalahari",
    "options": [
      "Okavango Delta, Botswana",
      "Niger Delta, Nigeria",
      "Danube Delta, Romania",
      "Sundarbans, India/Bangladesh"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q11.webp"
  },
  {
    "type": "image",
    "label": "Which scenic waterfall in Osun State features 7 tiers where each level presents a distinct challenge?",
    "subtitle": "Olumirin Waterfalls, legendary for cool pure waters discovered in ancient times",
    "options": [
      "Erin Ijesha (Olumirin) Waterfalls",
      "Agbokim Waterfalls",
      "Gurara Falls",
      "Farin Ruwa"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q12.webp"
  },
  {
    "type": "image",
    "label": "What is the largest island in Africa, world-famous for lemurs and baobab avenues?",
    "subtitle": "An isolated biodiversity hotspot in the Indian Ocean off the southeastern coast of Africa",
    "options": [
      "Madagascar",
      "Mauritius",
      "Seychelles",
      "Zanzibar"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q13.webp"
  },
  {
    "type": "image",
    "label": "Which national park in western Nigeria preserves the historic ruins of the Old Oyo Empire?",
    "subtitle": "Features archaeological treasures of Oyo-Ile and rich savanna wildlife habitats",
    "options": [
      "Old Oyo National Park, Oyo State",
      "Okomu National Park, Edo State",
      "Kainji Lake National Park, Niger",
      "Kamuku National Park, Kaduna"
    ],
    "correct": 0,
    "timer": 12,
    "image": "/assets/nature/set5_q14.webp"
  },
  {
    "type": "image",
    "label": "Identify this iconic volcanic peak in Italy that buried the ancient Roman city of Pompeii in 79 AD",
    "subtitle": "The only active volcano on mainland Europe to have erupted within the last hundred years",
    "options": [
      "Mount Vesuvius, Italy",
      "Mount Etna, Sicily",
      "Stromboli, Italy",
      "Mount Teide, Spain"
    ],
    "correct": 0,
    "timer": 10,
    "image": "/assets/nature/set5_q15.webp"
  }
];

module.exports = {
  set1: SET1,
  set2: SET2,
  set3: SET3,
  set4: SET4,
  set5: SET5
};
