export const site = {
  name: "TERRANE",
  wordmark: "Terrane",
  city: "Tashkent",
  country: "Uzbekistan",
  district: "Yunusabad",
  email: "studio@terrane.uz",
  founded: 2016,
  tagline: "Architecture of ground, light, and duration.",
  promise: "Houses, interiors, and landscapes of lasting proportion.",
  description:
    "Terrane is an architecture studio in Tashkent. We design houses, interiors, and landscapes as one material condition — quiet, site-specific, and made to last.",
} as const;

export const nav = [
  { href: "/#work", label: "Work", id: "work" },
  { href: "/#trust", label: "Practice", id: "trust" },
  { href: "/#approach", label: "Approach", id: "approach" },
  { href: "/#studio", label: "Studio", id: "studio" },
  { href: "/#commission", label: "Commission", id: "commission" },
] as const;

export const trust = [
  {
    index: "01",
    title: "Scope first",
    text: "Agree what changes. Styling comes after the ground, the lives, and the constraints are named.",
  },
  {
    index: "02",
    title: "Approval gates",
    text: "Layout, material and cost wait for review. Nothing irreversible moves without a pause.",
  },
  {
    index: "03",
    title: "Change control",
    text: "New ideas are measured against the brief before they quietly enlarge the work.",
  },
  {
    index: "04",
    title: "Held after handover",
    text: "Final notes and open items stay documented. The project does not vanish at the last joint.",
  },
] as const;

export const disciplines = [
  {
    index: "01",
    title: "Houses",
    text: "New dwellings and careful extensions. Courtyard houses, hillside rooms, and compact urban homes organised around shade, air, and the day’s slow movement.",
  },
  {
    index: "02",
    title: "Interiors",
    text: "Rooms drawn as architecture, not decoration. Millwork, light wells, and the placement of a table. We keep what is already true and cut what is not.",
  },
  {
    index: "03",
    title: "Landscapes",
    text: "Walled gardens, courts, and dry-climate planting. Water is used sparingly and given a job: to cool, to reflect, to mark a threshold.",
  },
  {
    index: "04",
    title: "Reuse",
    text: "Warehouses, mahalla houses, and civic rooms given a second life. The existing fabric is the brief. We add only what the building cannot already do.",
  },
] as const;

export const approach = [
  {
    index: "01",
    title: "Site",
    text: "We begin on the ground. Climate, slope, neighbours, the tree that must stay, the lives already moving through the plot.",
  },
  {
    index: "02",
    title: "Measure",
    text: "Survey, light studies, and material samples from the region — rammed earth, lime, brick, mulberry, walnut. Proportion is found, not applied.",
  },
  {
    index: "03",
    title: "Draw",
    text: "Plans and sections first. Few images until the plan is true. Details at 1:20 so the builder can hold the idea in the hand.",
  },
  {
    index: "04",
    title: "Build",
    text: "We remain through construction. Joints, levels, and the colour of a wall are decided on site, in the light the rooms will actually receive.",
  },
  {
    index: "05",
    title: "Handover",
    text: "A decision log, material summary, and open-item list stay with the work so later questions have a place to land.",
  },
] as const;

export const control = [
  { index: "01", title: "Review", text: "See the choice in the room it belongs to." },
  { index: "02", title: "Approve", text: "Confirm before the next stage begins." },
  { index: "03", title: "Document", text: "Keep the agreed direction visible." },
] as const;

export type Project = {
  slug: string;
  index: string;
  title: string;
  type: string;
  location: string;
  year: string;
  cover: string;
  coverAlt: string;
  images: { src: string; alt: string }[];
  excerpt: string;
  goal: string;
  space: string;
  design: string;
  materials: string[];
  decisions: string[];
  brief: string;
  response: string;
  discipline: string;
};

export const projects: Project[] = [
  {
    slug: "house-of-four-courts",
    index: "01",
    title: "House of Four Courts",
    type: "Private residence",
    location: "Samarkand",
    year: "2024",
    cover:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
    coverAlt: "Courtyard residence with deep eaves and warm masonry.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
        alt: "Interior court with still water and timber soffit.",
      },
      {
        src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
        alt: "Deep doorway opening onto a gravel court.",
      },
      {
        src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80",
        alt: "Evening light on earth-toned walls.",
      },
    ],
    excerpt:
      "A family house re-drawn as four courts: arrival, water, kitchen, and sleep. Rammed earth, lime, and mulberry timber.",
    goal: "Hold three generations without spectacle. Shade, air, and usable courts before display.",
    space: "Edge-of-city plot, long south face, neighbour to the west. Dust and noon heat first.",
    design: "A chain of courts rather than a single object. Arrival gravel; water under a tree; kitchen to a working yard.",
    materials: ["Rammed earth walls", "Lime wash", "Mulberry timber roofs", "Still pool", "Deep openings"],
    decisions: [
      "Keep walking lines free of storage",
      "One timber family",
      "Openings deep enough to keep noon off the floor",
    ],
    brief:
      "A family of seven asked for a house that could hold three generations without spectacle. Dust, heat, and shade were the first constraints.",
    response:
      "The plan is a chain of courts. Walls are rammed earth, roofs timber, openings deep. Nothing is shown that the family would not use.",
    discipline: "Houses",
  },
  {
    slug: "qorasuv-reading-room",
    index: "02",
    title: "Qorasuv Reading Room",
    type: "Cultural interior",
    location: "Tashkent",
    year: "2023",
    cover:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1800&q=80",
    coverAlt: "Reading room with long tables and high windows.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80",
        alt: "Long tables under industrial windows.",
      },
      {
        src: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80",
        alt: "Shelves as furniture against brick.",
      },
      {
        src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
        alt: "Quiet reading tables in north light.",
      },
    ],
    excerpt:
      "A neighbourhood library made from a brick warehouse. Long tables, north light, and rooms that invite staying.",
    goal: "A civic room that still feels like the neighbourhood — not a photographed set.",
    space: "Former warehouse beside the Qorasuv canal. Good bones, poor light at the back.",
    design: "Keep brick, arched windows, timber roof. Tables run with the light. Shelves as furniture.",
    materials: ["Existing brick", "Oak tables", "Lime at the rear wall", "Warm 2700K lighting"],
    decisions: ["Open the rear only where structure already wanted it", "No decorative library language"],
    brief:
      "A small civic client wanted tables, shelves, a quiet room for children, and a place that would still feel local.",
    response:
      "We kept the brick and the roof. New oak tables run with the light. The room is for reading, not for being photographed.",
    discipline: "Reuse",
  },
  {
    slug: "chorsu-apartment",
    index: "03",
    title: "Chorsu Apartment",
    type: "Interior",
    location: "Tashkent",
    year: "2025",
    cover:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1800&q=80",
    coverAlt: "Compact apartment with pale plaster and oak millwork.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1600&q=80",
        alt: "Oak millwork around a compact living room.",
      },
      {
        src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
        alt: "Light well treated as a small inner court.",
      },
      {
        src: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
        alt: "Built-in bench and quiet plaster.",
      },
    ],
    excerpt:
      "Ninety-two square metres reorganised around a light well. A small inner court, oak millwork, and rooms that share air.",
    goal: "More calm than square metres. Light in the centre, not only at the street.",
    space: "Late-Soviet block near Chorsu. Corridor of small rooms.",
    design: "Cut a light well and treat it as a court. Millwork holds books, beds, a folding table.",
    materials: ["Lime plaster", "Oak millwork", "Soft mineral floors"],
    decisions: ["Street room for work", "Inner rooms for rest", "Nothing open-plan for its own sake"],
    brief: "A pair of writers asked for calm. Light arrived only at the street face.",
    response:
      "A light well through the centre. Surfaces lime and oak. The street room works; the inner rooms rest.",
    discipline: "Interiors",
  },
  {
    slug: "sitora-garden",
    index: "04",
    title: "Sitora Garden",
    type: "Landscape",
    location: "Bukhara",
    year: "2022",
    cover:
      "https://images.unsplash.com/photo-1558904541-efde05914c21?auto=format&fit=crop&w=1800&q=80",
    coverAlt: "Walled garden with a still canal and fruit trees.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80",
        alt: "Garden canal and planting beds.",
      },
      {
        src: "https://images.unsplash.com/photo-1463554050456-f2ed7d3fec36?auto=format&fit=crop&w=1600&q=80",
        alt: "Fruit trees against a garden wall.",
      },
      {
        src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=80",
        alt: "Brick path set lower than planted beds.",
      },
    ],
    excerpt:
      "A walled garden restoring shade and water. Fruit trees, a still canal, and brick that already knew the climate.",
    goal: "Fruit, quiet, and a place to sit in August.",
    space: "Private garden behind an old house. Water and shade had been lost.",
    design: "Repair the wall, recut a shallow canal, plant for canopy first.",
    materials: ["Existing baked brick", "Pomegranate, fig, mulberry", "Shallow canal"],
    decisions: ["Paths lower than beds so irrigation stays", "Canopy before ornament"],
    brief: "The garden had lost its water and most of its shade.",
    response:
      "Wall repaired, canal recut, canopy first. The garden is a room without a roof.",
    discipline: "Landscapes",
  },
  {
    slug: "fergana-pavilion",
    index: "05",
    title: "Fergana Pavilion",
    type: "Public building",
    location: "Fergana",
    year: "2021",
    cover:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1800&q=80",
    coverAlt: "Timber and brick pavilion in late light.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        alt: "Open timber structure against a landscape.",
      },
      {
        src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
        alt: "Brick plinth and deep eaves.",
      },
      {
        src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
        alt: "Shade doing the work of walls.",
      },
    ],
    excerpt:
      "A small exhibition pavilion for textile crafts. Brick plinth, timber roof, and shade that does the work of walls.",
    goal: "A room that can be built quickly and still feel like a building.",
    space: "A field at the edge of the city. Wind and a long view.",
    design: "Brick plinth holds the ground. Deep-eaved timber roof makes the shade. Sides open.",
    materials: ["Brick plinth", "Timber roof", "Open sides for moving cloth"],
    decisions: ["Visitors walk through, not around", "Plinth can remain when the roof travels"],
    brief: "Seasonal exhibition of Fergana textiles needed a room that could be taken down if required.",
    response:
      "A brick plinth and a travelling roof. Shade does the work of walls.",
    discipline: "Reuse",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const principals = [
  {
    name: "Nilufar Karimova",
    role: "Principal, architecture",
    text: "Leads the houses and public rooms. The work is concerned with climate, courtyard, and the plan as a social instrument.",
  },
  {
    name: "Jasur Rahimov",
    role: "Principal, interiors and landscape",
    text: "Leads interiors, gardens, and the making of rooms. The studio’s material library is held in his hand first.",
  },
] as const;

export const projectTypes = [
  { value: "house", label: "House" },
  { value: "interior", label: "Interior" },
  { value: "landscape", label: "Landscape" },
  { value: "reuse", label: "Adaptive reuse" },
  { value: "other", label: "Other" },
] as const;

export const budgets = [
  { value: "explore", label: "Still defining" },
  { value: "25-50", label: "$25k–$50k" },
  { value: "50-100", label: "$50k–$100k" },
  { value: "100-250", label: "$100k–$250k" },
  { value: "250+", label: "$250k+" },
] as const;
