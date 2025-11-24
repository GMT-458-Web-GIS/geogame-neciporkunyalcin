const cities = [
  {
    name: "Barcelona",
    country: "Spain",
    lat: 41.3851,
    lon: 2.1734,
    hint: "This city is home to a world-famous football club that plays in red and blue and dominated Europe around 2009–2015.",
    difficulty: 5
  },
  {
    name: "Madrid",
    country: "Spain",
    lat: 40.4168,
    lon: -3.7038,
    hint: "In this capital city, a white-shirted club has won more Champions League titles than any other team.",
    difficulty: 5
  },
  {
    name: "Munich",
    country: "Germany",
    lat: 48.1351,
    lon: 11.5820,
    hint: "A dominant German club from this city often wins the Bundesliga and once completed a historic sextuple.",
    difficulty: 5
  },
  {
    name: "Dortmund",
    country: "Germany",
    lat: 51.5136,
    lon: 7.4653,
    hint: "This city’s yellow-and-black club is famous for its huge standing terrace called the 'Yellow Wall'.",
    difficulty: 6
  },
  {
    name: "London",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    hint: "This city has hosted the Summer Olympics three times and is home to many famous Premier League clubs.",
    difficulty: 5
  },
  {
    name: "Manchester",
    country: "United Kingdom",
    lat: 53.4808,
    lon: -2.2426,
    hint: "Two rival clubs from this city wear sky blue and red and have both won the Champions League.",
    difficulty: 5
  },
  {
    name: "Liverpool",
    country: "United Kingdom",
    lat: 53.4084,
    lon: -2.9916,
    hint: "A club from this port city made a legendary Champions League comeback in Istanbul in 2005.",
    difficulty: 6
  },
  {
    name: "Istanbul",
    country: "Türkiye",
    lat: 41.0082,
    lon: 28.9784,
    hint: "This city lies on two continents and has several big football clubs with very intense derbies.",
    difficulty: 5
  },
  {
    name: "Ankara",
    country: "Türkiye",
    lat: 39.9334,
    lon: 32.8597,
    hint: "This inland city is the capital of its country and the place where many national team decisions are made.",
    difficulty: 5
  },
  {
    name: "Trabzon",
    country: "Türkiye",
    lat: 41.0015,
    lon: 39.7178,
    hint: "A club from this Black Sea city broke a long title drought by winning the national league again in the 2020s.",
    difficulty: 6
  },
  {
    name: "Rome",
    country: "Italy",
    lat: 41.9028,
    lon: 12.4964,
    hint: "Two rival clubs from this ancient capital share an Olympic stadium and play in a fiery derby.",
    difficulty: 5
  },
  {
    name: "Milan",
    country: "Italy",
    lat: 45.4642,
    lon: 9.1900,
    hint: "Two clubs from this city in northern Italy have together won over ten European Cups/Champions League titles.",
    difficulty: 5
  },
  {
    name: "Turin",
    country: "Italy",
    lat: 45.0703,
    lon: 7.6869,
    hint: "A black-and-white striped club from this city dominated its domestic league throughout the 2010s.",
    difficulty: 5
  },
  {
    name: "Paris",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    hint: "A star-studded club from this capital has dominated Ligue 1 since a Qatari takeover.",
    difficulty: 5
  },
  {
    name: "Marseille",
    country: "France",
    lat: 43.2965,
    lon: 5.3698,
    hint: "A team from this Mediterranean port city is the only French side to have officially won the Champions League.",
    difficulty: 6
  },
  {
    name: "Lyon",
    country: "France",
    lat: 45.7640,
    lon: 4.8357,
    hint: "A club from this city won seven Ligue 1 titles in a row in the 2000s.",
    difficulty: 5
  },
  {
    name: "Amsterdam",
    country: "Netherlands",
    lat: 52.3676,
    lon: 4.9041,
    hint: "A club here is famous for 'Total Football' and has won four European Cups/Champions League titles.",
    difficulty: 5
  },
  {
    name: "Rotterdam",
    country: "Netherlands",
    lat: 51.9244,
    lon: 4.4777,
    hint: "A team from this port city became the first Dutch club to win the European Cup in 1970.",
    difficulty: 6
  },
  {
    name: "Porto",
    country: "Portugal",
    lat: 41.1579,
    lon: -8.6291,
    hint: "A club from this northern Portuguese city won the Champions League in 2004 under a young José Mourinho.",
    difficulty: 5
  },
  {
    name: "Lisbon",
    country: "Portugal",
    lat: 38.7223,
    lon: -9.1393,
    hint: "This capital hosts a fierce rivalry between an eagle-branded club and a green-and-white club known for its academy.",
    difficulty: 5
  },
  {
    name: "Buenos Aires",
    country: "Argentina",
    lat: -34.6037,
    lon: -58.3816,
    hint: "This city is home to one of the world’s most intense football derbies between clubs from La Boca and Núñez.",
    difficulty: 6
  },
  {
    name: "Rosario",
    country: "Argentina",
    lat: -32.9442,
    lon: -60.6505,
    hint: "This Argentine city’s academies produced several famous forwards, including a left-footed global star.",
    difficulty: 6
  },
  {
    name: "Sao Paulo",
    country: "Brazil",
    lat: -23.5505,
    lon: -46.6333,
    hint: "A white-shirted club from this megacity has won the Copa Libertadores and the Club World Cup three times.",
    difficulty: 6
  },
  {
    name: "Rio de Janeiro",
    country: "Brazil",
    lat: -22.9068,
    lon: -43.1729,
    hint: "This city is known for the Maracanã stadium and clubs like one associated with a legendary number 10.",
    difficulty: 5
  },
  {
    name: "Porto Alegre",
    country: "Brazil",
    lat: -30.0346,
    lon: -51.2177,
    hint: "Two rival clubs from this southern Brazilian city have both won the Copa Libertadores.",
    difficulty: 6
  },
  {
    name: "Mexico City",
    country: "Mexico",
    lat: 19.4326,
    lon: -99.1332,
    hint: "This city hosted two World Cup finals, both won by South American national teams.",
    difficulty: 5
  },
  {
    name: "Guadalajara",
    country: "Mexico",
    lat: 20.6597,
    lon: -103.3496,
    hint: "A club here is famous for using only domestic players while staying one of the country’s most popular teams.",
    difficulty: 6
  },
  {
    name: "New York",
    country: "USA",
    lat: 40.7128,
    lon: -74.0060,
    hint: "This metropolitan area has teams in all major US sports, even if some play across the river in New Jersey.",
    difficulty: 5
  },
  {
    name: "Los Angeles",
    country: "USA",
    lat: 34.0522,
    lon: -118.2437,
    hint: "This city has multiple NBA and MLB titles and has hosted (and will host again) the Summer Olympics.",
    difficulty: 5
  },
  {
    name: "Chicago",
    country: "USA",
    lat: 41.8781,
    lon: -87.6298,
    hint: "An NBA team from this city dominated the 1990s with Michael Jordan.",
    difficulty: 4
  },
  {
    name: "Boston",
    country: "USA",
    lat: 42.3601,
    lon: -71.0589,
    hint: "The NBA team from this city has one of the highest championship counts and a historic rivalry with a team from Los Angeles.",
    difficulty: 5
  },
  {
    name: "Miami",
    country: "USA",
    lat: 25.7617,
    lon: -80.1918,
    hint: "This coastal city’s NBA team formed a 'Big Three' with LeBron James in the early 2010s.",
    difficulty: 4
  },
  {
    name: "Toronto",
    country: "Canada",
    lat: 43.6532,
    lon: -79.3832,
    hint: "This Canadian city’s NBA team won its first title in 2019 with Kawhi Leonard.",
    difficulty: 4
  },
  {
    name: "Montreal",
    country: "Canada",
    lat: 45.5017,
    lon: -73.5673,
    hint: "The ice hockey team from this city has more Stanley Cups than any other NHL franchise.",
    difficulty: 6
  },
  {
    name: "Vancouver",
    country: "Canada",
    lat: 49.2827,
    lon: -123.1207,
    hint: "This Pacific city hosted the 2010 Winter Olympics and has an NHL team in blue and green.",
    difficulty: 5
  },
  {
    name: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lon: 139.6503,
    hint: "This city has hosted the Summer Olympics twice and has a very popular professional baseball league.",
    difficulty: 5
  },
  {
    name: "Osaka",
    country: "Japan",
    lat: 34.6937,
    lon: 135.5023,
    hint: "This Japanese city has successful baseball and football clubs and is near major sumo events.",
    difficulty: 5
  },
  {
    name: "Seoul",
    country: "South Korea",
    lat: 37.5665,
    lon: 126.9780,
    hint: "This capital hosted the 1988 Summer Olympics and is strong in football and eSports.",
    difficulty: 5
  },
  {
    name: "Busan",
    country: "South Korea",
    lat: 35.1796,
    lon: 129.0756,
    hint: "A coastal city in South Korea known for a very passionate baseball fanbase.",
    difficulty: 6
  },
  {
    name: "Beijing",
    country: "China",
    lat: 39.9042,
    lon: 116.4074,
    hint: "This city hosted the 2008 Summer Olympics and later became the first to also host the Winter Games.",
    difficulty: 5
  },
  {
    name: "Shanghai",
    country: "China",
    lat: 31.2304,
    lon: 121.4737,
    hint: "This huge Chinese metropolis has football clubs that signed many high-profile foreign players.",
    difficulty: 5
  },
  {
    name: "Sydney",
    country: "Australia",
    lat: -33.8688,
    lon: 151.2093,
    hint: "This harbor city hosted the 2000 Summer Olympics and has strong rugby and cricket culture.",
    difficulty: 5
  },
  {
    name: "Melbourne",
    country: "Australia",
    lat: -37.8136,
    lon: 144.9631,
    hint: "Often called the sporting capital of its country, this city hosts the Australian Open and a Formula 1 race.",
    difficulty: 5
  },
  {
    name: "Perth",
    country: "Australia",
    lat: -31.9523,
    lon: 115.8613,
    hint: "A western Australian city known for Australian rules football and cricket at a stadium by the river.",
    difficulty: 6
  },
  {
    name: "Auckland",
    country: "New Zealand",
    lat: -36.8485,
    lon: 174.7633,
    hint: "This New Zealand city has strong rugby culture, but the famous national team is based in the capital.",
    difficulty: 5
  },
  {
    name: "Wellington",
    country: "New Zealand",
    lat: -41.2865,
    lon: 174.7762,
    hint: "The capital of a country whose national rugby team, the All Blacks, has won multiple Rugby World Cups.",
    difficulty: 5
  },
  {
    name: "Moscow",
    country: "Russia",
    lat: 55.7558,
    lon: 37.6173,
    hint: "This city hosted the 1980 Summer Olympics and the 2018 World Cup final.",
    difficulty: 5
  },
  {
    name: "Saint Petersburg",
    country: "Russia",
    lat: 59.9311,
    lon: 30.3609,
    hint: "A club from this northern Russian city plays in blue and white and often appears in European competitions.",
    difficulty: 6
  },
  {
    name: "Athens",
    country: "Greece",
    lat: 37.9838,
    lon: 23.7275,
    hint: "This ancient capital hosted the first modern Olympics and again in 2004.",
    difficulty: 4
  },
  {
    name: "Glasgow",
    country: "Scotland",
    lat: 55.8642,
    lon: -4.2518,
    hint: "Two clubs from this Scottish city contest the famous 'Old Firm' derby.",
    difficulty: 5
  },
  {
    name: "Edinburgh",
    country: "Scotland",
    lat: 55.9533,
    lon: -3.1883,
    hint: "This capital city hosts the 'Edinburgh derby' between Hearts and Hibernian.",
    difficulty: 6
  },
  {
    name: "Cape Town",
    country: "South Africa",
    lat: -33.9249,
    lon: 18.4241,
    hint: "This coastal city hosted World Cup matches in 2010, including a semifinal at a stadium near the sea.",
    difficulty: 5
  },
  {
    name: "Johannesburg",
    country: "South Africa",
    lat: -26.2041,
    lon: 28.0473,
    hint: "The 2010 World Cup final was played in this South African city.",
    difficulty: 5
  },
  {
    name: "Doha",
    country: "Qatar",
    lat: 25.2854,
    lon: 51.5310,
    hint: "This Middle Eastern city hosted the 2022 World Cup final.",
    difficulty: 5
  },
  {
    name: "Istanbul (historic peninsula)",
    country: "Türkiye",
    lat: 41.0100,
    lon: 28.9600,
    hint: "In this historic area of a transcontinental city, a yellow-and-red club is famous for its very loud stadium.",
    difficulty: 6
  },
  {
    name: "Istanbul (Asian side)",
    country: "Türkiye",
    lat: 40.9800,
    lon: 29.0700,
    hint: "On this side of a bridge-connected city, a yellow-and-navy club plays its home matches near the sea.",
    difficulty: 6
  }
];
