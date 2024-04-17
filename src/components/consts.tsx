const brands = [
  "Abadal",
  "Abarth",
  "Abbott-Detroit",
  "ABT",
  "AC",
  "Acrea",
  "Acura",
  "AD TRAMONTANA",
  "Adler",
  "Afeela",
  "AION",
  "Aixam",
  "AIWAYS",
  "Al Melling",
  "Aleko",
  "Alfa Romeo",
  "Alke",
  "ALLARD",
  "Alpina",
  "Alpine",
  "Alta",
  "Alvis",
  "AMC",
  "AM General",
  "AMILCAR",
  "Amp\u00e8re",
  "Amphicar",
  "ANAIG",
  "Apal",
  "Apex Motors",
  "Apollo",
  "Aptera Motors",
  "Arash",
  "Arcfox",
  "Ariel",
  "Armstrong Siddeley",
  "ARO",
  "Arrinera",
  "Artega",
  "Ascari",
  "ASKOK LEYLAND",
  "Askam",
  "Aspark",
  "Aston Martin",
  "Atalanta",
  "Auburn",
  "Audi",
  "Audi Sport",
  "Austin",
  "Austin Healey",
  "Auto Union",
  "Autobacs",
  "Autobianchi",
  "AUVERLAND",
  "AVTOGAZ",
  "Axon Automotive",
  "BAC",
  "BAIC Motor",
  "Baojun",
  "BEE AUTOMOBILES",
  "Bellier",
  "Bentley",
  "Berkeley",
  "Berliet",
  "Bertone",
  "BharatBenz",
  "Bitter",
  "Bizzarrini",
  "Bluecar",
  "BMW",
  "BMW M Motorsport",
  "BOLLEE",
  "Bollor\u00e9",
  "BONGARINI",
  "Booxt",
  "Borgward",
  "Bowler",
  "Brabus",
  "Brammo",
  "Bremach",
  "Brilliance",
  "Bristol",
  "Brooke Cars",
  "BSH",
  "Bufori",
  "Bugatti",
  "Buick",
  "BURBY S",
  "BYD",
  "Cadillac",
  "Caparo",
  "Carbodies",
  "Carbontech",
  "Carlsson",
  "CARVER",
  "Casalini",
  "Caterham",
  "Cg",
  "Changan",
  "Changfeng",
  "Chatenet",
  "CHAUSSON",
  "Chenard Et Walcker",
  "Chery",
  "Chevrolet",
  "China Automobile",
  "Chrysler",
  "Citro\u00ebn",
  "Cizeta",
  "CLENET",
  "Cole",
  "Commuter Cars",
  "Connaught",
  "Corre La Licorne",
  "Corvette",
  "Coste",
  "Courb",
  "Cupra",
  "Curbee",
  "Dacia",
  "Daewoo",
  "DAF",
  "Daihatsu",
  "Daimler",
  "Dallara",
  "Dangel",
  "Darmont",
  "Dartz",
  "Datsun",
  "David Brown",
  "DE DION BOUTON",
  "De Fremond",
  "De La Chapelle",
  "De Soto",
  "De Tomaso",
  "Delage",
  "Delahaye",
  "DeLorean MC",
  "DENZA",
  "Deronda",
  "Detroit Electric",
  "Deutsch-Bonnet DB",
  "Devel Sixteen",
  "Devalliet",
  "Devinci",
  "Devon",
  "DFSK",
  "Diatto",
  "DINA",
  "DKW",
  "Dodge",
  "Dodge Viper",
  "Dongfeng",
  "Donkervoort",
  "Donnet",
  "Dr Motor",
  "Due",
  "Duesenberg",
  "DS",
  "EADON GREEN",
  "Eagle",
  "Ebro",
  "EDAG",
  "Edsel",
  "Eicher",
  "Elemental",
  "Elfin",
  "ELV",
  "Elva",
  "EMBUGGY",
  "Englon",
  "Erad",
  "ERF",
  "Estrima",
  "Eterniti",
  "EXAGON MOTORS",
  "Excalibur",
  "Facel Vega",
  "Fam Automobiles",
  "Faraday Future",
  "Faralli & Mazzanti",
  "Farbio",
  "FAW",
  "Ferrari",
  "Fiat",
  "Fioravanti",
  "Fisker",
  "Foden",
  "Force Motors",
  "Ford",
  "Ford Mustang",
  "FORNASARI",
  "Foton",
  "FPV",
  "Franklin",
  "Freightliner",
  "FSO",
  "FUSO",
  "Gac Gonow",
  "GAC Group",
  "Gac Motor",
  "Gardner Douglas",
  "GAZ",
  "Geely",
  "General Motors",
  "Genesis",
  "Geo",
  "Gilbern",
  "Gillet",
  "Ginetta",
  "Glas",
  "GM General Motors",
  "GMC",
  "GME",
  "Gonow",
  "Goupil",
  "GRANDIN",
  "Great Wall",
  "Grecav",
  "Grinnall",
  "GTA Motor",
  "Gumpert",
  "Hafei",
  "Haima",
  "Haval",
  "Hawtai",
  "Healey",
  "Helem",
  "Hennessey",
  "Heuliez",
  "Hillman",
  "Hindustan Motors",
  "Hino",
  "Hispano-Suiza",
  "Holden",
  "Hommell",
  "Honda",
  "Hongki",
  "HOPIUM",
  "Horch",
  "Hotchkiss",
  "Howmet",
  "HSV",
  "Hudson",
  "Humber",
  "Hummer",
  "Hupmobile",
  "Hycan",
  "Hyundai",
  "IC Bus",
  "IH",
  "IKCO",
  "Imperial",
  "Industrias Kaiser Argentina",
  "Ineos",
  "Infiniti",
  "Innocenti",
  "INNOTECH",
  "Intermeccanica",
  "International Harvester Company IHC",
  "International Trucks",
  "INVICTA",
  "Irizar",
  "Isdera",
  "Iso",
  "Iso Rivolta",
  "Isuzu",
  "Italcar",
  "Iveco",
  "JAC",
  "Jaguar",
  "Jawa",
  "JBA Motors",
  "Jdm simpa",
  "Jeep",
  "Jensen",
  "Ji Yue",
  "Jiayuan",
  "JMC",
  "Kaiser",
  "Kamaz",
  "Karma",
  "Kassbohrer Setra",
  "Kate",
  "Keating",
  "Kenworth",
  "Kia",
  "Koenigsegg",
  "KTM",
  "Lada",
  "Lagonda",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Landwind",
  "Lantana",
  "Laraki",
  "Leapmotor",
  "LDV",
  "LEVC",
  "Lexus",
  "Leyland",
  "Lifan",
  "LIGHTYEAR",
  "Ligier",
  "Lister",
  "Lloyd",
  "Lincoln",
  "LITTLE",
  "Lobini",
  "Lola",
  "Loremo",
  "Lotus",
  "Lucid",
  "Lumeneo",
  "Luxgen",
  "Lynk & Co",
  "Mack",
  "Mahindra",
  "MAN",
  "Mansory",
  "Marcadier",
  "Marcos",
  "Marlin",
  "MARTIN",
  "Marussia",
  "Maruti Suzuki",
  "Maserati",
  "Mastretta",
  "Mathis",
  "Matra",
  "Maxus",
  "Maybach",
  "MAZ",
  "Mazda",
  "Mazzanti",
  "McLaren",
  "Mdi",
  "Mega",
  "Melkus",
  "Melling",
  "Mercedes-AMG",
  "Mercedes-Benz",
  "Mercury",
  "Merkur",
  "Messerschmitt",
  "MEV Mills Extreme Vehicles",
  "MEV My Electric Vehicle",
  "Meyers Manx",
  "MG",
  "Mia Electric",
  "MICRO",
  "Microcar",
  "Microdrive",
  "MINAUTO",
  "Mini",
  "Mitsubishi",
  "Mitsubishi Fuso",
  "Mitsuoka",
  "Mlt",
  "MK Sportscars",
  "Mobilize",
  "Moke",
  "MONICA",
  "Monteverdi",
  "Morgan",
  "Morris",
  "Mosler",
  "Mpm Motors",
  "Munro",
  "Mvs",
  "Mygale",
  "N74",
  "NamX",
  "Nanjing",
  "Nash",
  "Navistar",
  "NECKAR",
  "Nevs",
  "Newteon",
  "NEWYARK",
  "Nissan",
  "Noble",
  "Nosmoke",
  "Noun Electric",
  "NSU",
  "Numexia",
  "Oldsmobile",
  "Oltcit",
  "Opel",
  "ORA",
  "OSCA",
  "OSI",
  "Oullim Spirra",
  "Paccar",
  "PACKARD",
  "Pagani",
  "Panhard",
  "Panoz",
  "Panther",
  "Pegaso",
  "Perana",
  "Perodua",
  "Peterbilt",
  "Peugeot",
  "PGO",
  "Piaggio",
  "Pierce-Arrow",
  "Pilbeam",
  "Pininfarina",
  "Plymouth",
  "Polestar",
  "POLSKI",
  "Pontiac",
  "Porsche",
  "Praga",
  "Premier",
  "Prodrive",
  "Proton",
  "Protoscar",
  "Qoros",
  "Quant",
  "Radical",
  "RAM",
  "Rambler",
  "Ranz",
  "RCB",
  "Realm",
  "Reliant",
  "Renault",
  "Renault Samsung",
  "Renault Sport",
  "Renault Trucks",
  "Ren\u00e9 Bonnet",
  "Reva",
  "Reynard",
  "Rezvani",
  "Riley",
  "Rimac",
  "Rinspeed",
  "RIVIAN",
  "Roewe",
  "Rolls-Royce",
  "Ronart",
  "Rosengart",
  "Rossion",
  "Rover",
  "RUF",
  "Russo-baltique",
  "Saab",
  "SAIC Motor",
  "Saipa",
  "Saleen",
  "SALICA",
  "Salmson",
  "Samsung",
  "Santana",
  "Saturn",
  "SAVEL",
  "Saviem",
  "Sbarro",
  "Scania",
  "Scion",
  "Scout Motors",
  "Seat",
  "Secma",
  "Seres",
  "Setra",
  "Shelby",
  "Shuanghuan",
  "Simca",
  "Singer",
  "Sisu",
  "SIVAX",
  "\u0160koda",
  "Smart",
  "SMS",
  "SONO MOTORS",
  "Soueast",
  "Sovamag",
  "Spectre",
  "Spyker",
  "Srt",
  "SsangYong",
  "SSC North America",
  "Sterling",
  "Studebaker",
  "Stutz",
  "Subaru",
  "Suffolk Sportscars",
  "Sunbeam",
  "Suncar",
  "Suzuki",
  "Talbot",
  "Tata",
  "Tatra",
  "Tauro",
  "TAZZARI",
  "TechArt",
  "\u200b\u200bTeilhol",
  "Tesla",
  "The London Taxi Company",
  "Think",
  "Toyota",
  "Toyota Crown",
  "Trabant",
  "Tramontana",
  "Trion",
  "Triumph",
  "Troller",
  "TVR",
  "UAZ",
  "UD",
  "Ultima",
  "Umm",
  "Vaillante",
  "Van Hool",
  "VANDEN PLAS",
  "Vandenbrink",
  "Vauxhall",
  "VAZ",
  "Vector",
  "Velam",
  "Vencer",
  "Venturi",
  "Venucia",
  "Veritas",
  "Vespa",
  "Vinfast",
  "Virago",
  "Volkswagen",
  "VOLTEIS",
  "Volvo",
  "W Motors",
  "Wallys Car",
  "Wanderer",
  "Wartburg",
  "WEBER",
  "Western Star",
  "Westfield",
  "Wiesmann",
  "Willys-Overland",
  "WOLSELEY",
  "Wuling",
  "XEV",
  "Xiali",
  "Xiamen Golden Dragon",
  "Xiaomi",
  "Xinkai",
  "XINYANG",
  "XPeng",
  "Yulon",
  "Zagato",
  "ZAP",
  "Zarooq Motors",
  "Zastava",
  "ZAZ",
  "Zeekr",
  "ZENN",
  "Zenos",
  "Zenvo",
  "Zotye",
  "123",
  "4 Stroke",
  "9FF",
];
const fuels = ["SP95", "SP98", "E85", "GPL", "Gazole", "Électrique"];
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");

export { brands, alphabet, numbers, fuels };
