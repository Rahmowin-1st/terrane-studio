export const site = {
  name: "TERRANE",
  wordmark: "Terrane",
  city: "Tashkent",
  country: "Uzbekistan",
  district: "Yunusabad",
  email: "studio@terrane.uz",
  founded: 2016,
  tagline: "Architecture of ground, light, and duration.",
  promise: "Houses, interiors and landscapes built around climate and proportion.",
  description:
    "Terrane designs houses, interiors and landscapes around climate, proportion and material.",
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
    text: "Define what changes before choosing how it looks.",
  },
  {
    index: "02",
    title: "Approval gates",
    text: "Approve layout, material and cost before commitment.",
  },
  {
    index: "03",
    title: "Change control",
    text: "Test every change against the brief.",
  },
  {
    index: "04",
    title: "Held after handover",
    text: "Leave decisions and open items documented.",
  },
] as const;

export const disciplines = [
  {
    index: "01",
    title: "Houses",
    text: "Homes shaped by shade, air, privacy and daily movement.",
  },
  {
    index: "02",
    title: "Interiors",
    text: "Interiors built from light, proportion and useful joinery.",
  },
  {
    index: "03",
    title: "Landscapes",
    text: "Courts and gardens designed for shade, water and dry climates.",
  },
  {
    index: "04",
    title: "Reuse",
    text: "Existing buildings kept where they work and changed only where needed.",
  },
] as const;

export const approach = [
  {
    index: "01",
    title: "Site",
    text: "Read climate, access, neighbours, trees and daily use.",
  },
  {
    index: "02",
    title: "Measure",
    text: "Measure the site, light and material before fixing proportion.",
  },
  {
    index: "03",
    title: "Draw",
    text: "Resolve plans and sections before visual polish.",
  },
  {
    index: "04",
    title: "Build",
    text: "Carry key details through construction and site decisions.",
  },
  {
    index: "05",
    title: "Handover",
    text: "Hand over the project with decisions, materials and open items clear.",
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
      "A family house organised as four courts for shade, air and privacy.",
    goal: "Fit three generations around usable courts.",
    space: "Long south-facing plot with heat, dust and a close western neighbour.",
    design: "Four linked courts organise arrival, water, kitchen and rest.",
    materials: ["Rammed earth walls", "Lime wash", "Mulberry timber roofs", "Still pool", "Deep openings"],
    decisions: [
      "Keep walking lines free of storage",
      "One timber family",
      "Openings deep enough to keep noon off the floor",
    ],
    brief:
      "A three-generation home needing shade, privacy and shared outdoor space.",
    response:
      "Four linked courts organise movement, shade and family life.",
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
      "A brick warehouse reused as a calm neighbourhood reading room.",
    goal: "Make a useful civic room that still feels local.",
    space: "Brick warehouse beside the canal with weak daylight at the rear.",
    design: "Keep the shell; align tables and shelves with daylight.",
    materials: ["Existing brick", "Oak tables", "Lime at the rear wall", "Warm 2700K lighting"],
    decisions: ["Open the rear only where structure already wanted it", "No decorative library language"],
    brief:
      "A local reading room for adults, children and community use.",
    response:
      "Keep the shell. Add daylight, long tables and simple oak shelving.",
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
      "A compact apartment reorganised around a new light well.",
    goal: "Bring daylight and calm into the centre of the plan.",
    space: "Compact apartment with a dark central corridor.",
    design: "A central light well and built-in oak storage reorganise the plan.",
    materials: ["Lime plaster", "Oak millwork", "Soft mineral floors"],
    decisions: ["Street room for work", "Inner rooms for rest", "Nothing open-plan for its own sake"],
    brief: "A compact home needing better daylight, storage and quiet rooms.",
    response:
      "Open the centre to light; use lime plaster and oak to unify the rooms.",
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
      "A walled garden rebuilt around shade, water and fruit trees.",
    goal: "Restore shade, water and a comfortable summer garden.",
    space: "Old walled garden with lost shade and irrigation.",
    design: "Repair the wall, restore the canal and plant canopy first.",
    materials: ["Existing baked brick", "Pomegranate, fig, mulberry", "Shallow canal"],
    decisions: ["Paths lower than beds so irrigation stays", "Canopy before ornament"],
    brief: "Restore water, shade and useful planting.",
    response:
      "Repair the wall, recut the canal and rebuild the canopy.",
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
      "A lightweight exhibition pavilion built from brick, timber and shade.",
    goal: "Create a fast, durable pavilion with a clear civic presence.",
    space: "Open edge-of-city site with wind and long views.",
    design: "A brick plinth anchors a deep-eaved timber roof with open sides.",
    materials: ["Brick plinth", "Timber roof", "Open sides for moving cloth"],
    decisions: ["Visitors walk through, not around", "Plinth can remain when the roof travels"],
    brief: "A seasonal textile pavilion that can be partly dismantled.",
    response:
      "Keep the plinth permanent; make the timber roof removable.",
    discipline: "Reuse",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

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
