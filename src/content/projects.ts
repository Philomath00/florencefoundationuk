// Florence Foundation programme data. Source: Florence Foundation Narrative.
// Status values: 'Ongoing' (described in present tense), 'Active appeal'
// (currently seeking donations), 'Planned' (described as future intent).

export type ProjectActivity = { t: string; d: string; s: "Ongoing" | "Active appeal" | "Planned" };
export type ProjectPhoto = { src: string; pos: string; alt: string };

export type Project = {
  slug: string;
  cat: string;
  word: string;
  title: string;
  summary: string;
  img: string;
  pos: string;
  alt: string;
  hero: string;
  heroPos: string;
  heroAlt: string;
  tint: "lav" | "coral";
  amount: string;
  amountLabel: string;
  lead: string;
  overview: string;
  problem: string;
  objectives: string[];
  activities: ProjectActivity[];
  beneficiaries: string;
  quote: string;
  photos: ProjectPhoto[];
  give: "meals" | "sponsor" | "donate";
};

export const projects: Project[] = [
  {
    slug: "food-aid",
    cat: "Poverty Alleviation & Food Aid",
    word: "Hunger",
    title: "Fighting Hunger, Restoring Hope",
    summary: "Food assistance and hunger relief that helps reduce the immediate burden of food insecurity.",
    img: "/images/food-aid.jpg",
    pos: "50% 25%",
    alt: "A young boy in a striped T-shirt holds a cup of food handed to him by an adult",
    hero: "/images/enjoy-a-meal.jpg",
    heroPos: "50% 20%",
    heroAlt: "A volunteer serves a cup of food to a woman in an orange patterned top",
    tint: "lav",
    amount: "£2",
    amountLabel: "Support a fresh hot meal for £2.",
    lead: "We support vulnerable individuals and families through food assistance and hunger relief initiatives, helping reduce the immediate burden of food insecurity.",
    overview: "The Poverty Alleviation project aims to reduce hunger and food insecurity through both immediate and longer-term interventions. Taking part in hunger relief shows compassion and solidarity with people suffering from poverty.",
    problem: "Hunger is one of the most urgent challenges facing families living in poverty. Worldwide, more than 828 million people go hungry.",
    objectives: [
      "Reduce the immediate burden of food insecurity",
      "Provide healthy meals and food parcels to impoverished families",
      "Combine immediate relief with longer-term interventions",
    ],
    activities: [
      { t: "Fresh Hot Meals (FHM)", d: "Weekly fresh hot meals for individuals in need in Nigeria and across Africa.", s: "Active appeal" },
      { t: "Food parcel support", d: "Food parcels for impoverished families facing hardship.", s: "Active appeal" },
    ],
    beneficiaries: "Individuals and families facing hunger and food insecurity in Nigeria and across Africa.",
    quote: "Together, let us strive to make a difference and alleviate the suffering of those less fortunate in our global community.",
    photos: [
      { src: "/images/enjoy-a-meal.jpg", pos: "50% 15%", alt: "A volunteer serves a cup of food to a woman" },
      { src: "/images/children-group.jpg", pos: "50% 30%", alt: "A group of children gathered together outdoors" },
    ],
    give: "meals",
  },
  {
    slug: "child-sponsorship",
    cat: "Child Sponsorship",
    word: "Children",
    title: "Helping Children Thrive",
    summary: "Support for children's essential needs, wellbeing, and access to opportunities for a better future.",
    img: "/images/help-a-child.jpg",
    pos: "50% 20%",
    alt: "A young child in a blue T-shirt looks down at a cup being handed to him",
    hero: "/images/children-four.jpg",
    heroPos: "50% 30%",
    heroAlt: "Young children in colourful dresses stand close together outdoors",
    tint: "coral",
    amount: "£5",
    amountLabel: "Child sponsorship from £5 per month.",
    lead: "Through child sponsorship, we seek to support children's essential needs, wellbeing, and access to opportunities that help them build a better future.",
    overview: "Sponsoring a child through Florence Foundation helps give them access to nutritious meals, a loving and caring home, good hygiene and sanitation, and much more.",
    problem: "Children growing up in poverty often go without the essentials and opportunities that other children rely on.",
    objectives: [
      "Access to nutritious meals",
      "A loving and caring home",
      "Good hygiene and sanitation",
      "The same opportunities other children have",
    ],
    activities: [
      { t: "Monthly child sponsorship", d: "£5 a month helps a sponsored child live well, eat well, and have a roof over their head.", s: "Active appeal" },
    ],
    beneficiaries: "Children supported through the Florence Foundation sponsorship programme.",
    quote: "Our aim is to give them the opportunities that other children have.",
    photos: [
      { src: "/images/children-two.jpg", pos: "50% 20%", alt: "Two children, one with an arm around the other" },
      { src: "/images/children-four.jpg", pos: "50% 25%", alt: "Young children standing close together" },
    ],
    give: "sponsor",
  },
  {
    slug: "education",
    cat: "Education",
    word: "Learning",
    title: "Education Opens Doors to Opportunity",
    summary: "Schooling support, tutoring, reading clubs, literacy programmes, and community learning.",
    img: "/images/children-two.jpg",
    pos: "45% 20%",
    alt: "Two children, one with an arm around the other, look at the camera",
    hero: "/images/children-group.jpg",
    heroPos: "50% 30%",
    heroAlt: "A group of children, many in school uniforms, gathered outdoors",
    tint: "lav",
    amount: "£5",
    amountLabel: "A month could help send a child to pre-school or pay for additional tuition.",
    lead: "We aim to expand educational opportunities through support for schooling, additional tutoring, reading clubs, literacy programmes, and community learning initiatives.",
    overview: "Education is extremely important to every child's development, academically, emotionally, and physically. We will do our utmost to ensure our children attend schools of a high calibre and, when necessary, receive private tutoring.",
    problem: "Educational inequality limits opportunity for children and adults in the communities we serve.",
    objectives: [
      "Access to high-calibre schooling",
      "Additional tutoring where needed",
      "Support for gifted children",
      "Improved literacy for children and adults",
    ],
    activities: [
      { t: "Pre-schools", d: "Running pre-schools in and around the communities we work within.", s: "Planned" },
      { t: "Support for gifted children", d: "Additional tuition for gifted children.", s: "Planned" },
      { t: "Children's reading clubs", d: "Encouraging reading from an early age.", s: "Planned" },
      { t: "Adult education and literacy classes", d: "Learning opportunities for adults in the community.", s: "Planned" },
      { t: "Community library", d: "A shared library for the communities we serve.", s: "Planned" },
    ],
    beneficiaries: "Children, gifted pupils, and adults seeking education and literacy support.",
    quote: "Education is extremely important in the development of every child.",
    photos: [
      { src: "/images/children-group.jpg", pos: "50% 30%", alt: "A group of children in school uniforms" },
      { src: "/images/child-slate.png", pos: "50% 30%", alt: "A smiling young boy holds up a chalk slate" },
    ],
    give: "donate",
  },
  {
    slug: "womens-empowerment",
    cat: "Women's Empowerment",
    word: "Women",
    title: "Empowering Women, Strengthening Communities",
    summary: "Practical life skills, knowledge, and independence for women and their families.",
    img: "/images/women-certificates.jpg",
    pos: "38% 10%",
    alt: "A group of women in purple sashes celebrate, holding certificates",
    hero: "/images/women-machines.jpg",
    heroPos: "50% 25%",
    heroAlt: "Women in purple sashes look over rows of boxed sewing machines",
    tint: "coral",
    amount: "",
    amountLabel: "",
    lead: "Our women's empowerment initiatives focus on practical life skills, knowledge, independence, and opportunities that help women provide for themselves and their families.",
    overview: "Our training programmes provide women with the tools and knowledge they need to be independent, safe, and secure within their homes and the wider community.",
    problem: "Many women lack valuable life skills that would empower them to provide better care for themselves and their families.",
    objectives: [
      "Independence and financial security",
      "Safety and security at home and in the community",
      "Practical, marketable life skills",
    ],
    activities: [
      { t: "Skill-building workshops", d: "Workshops that help women develop into stronger, more independent women.", s: "Ongoing" },
    ],
    beneficiaries: "Women and girls, and the families they support.",
    quote: "Helping women develop into stronger, more independent women.",
    photos: [
      { src: "/images/women-machines.jpg", pos: "50% 20%", alt: "Women look over boxed sewing machines" },
      { src: "/images/sewing-machines.jpg", pos: "50% 10%", alt: "Rows of boxed sewing machines" },
    ],
    give: "donate",
  },
  {
    slug: "clean-water",
    cat: "Clean Water for All",
    word: "Water",
    title: "Clean Water. Healthier Communities.",
    summary: "Sustainable community water solutions, including wells and pumps.",
    img: "/images/clean-water.png",
    pos: "62% 50%",
    alt: "A child drinks from a hand-operated water pump",
    hero: "/images/clean-water.png",
    heroPos: "55% 45%",
    heroAlt: "A child drinks from a hand-operated water pump",
    tint: "lav",
    amount: "",
    amountLabel: "",
    lead: "Our clean water campaign seeks to improve access to safe drinking water through sustainable community water solutions, including wells and pumps.",
    overview: "Water wells and pumps are simple yet effective tools that can make a world of difference. With your support, we can dig wells and install pumps where access to clean water is limited or non-existent.",
    problem: "In Nigeria and other parts of Africa, access to clean water remains a luxury rather than a basic human right. Without it, communities face health risks, economic hardship, and daily challenges.",
    objectives: [
      "A reliable source of safe drinking water close to home",
      "Reduced health risks from unsafe water",
      "Long-term, sustainable community solutions",
    ],
    activities: [
      { t: "Water wells and pumps", d: "Digging wells and installing pumps in communities with limited access to clean water.", s: "Active appeal" },
    ],
    beneficiaries: "Families and communities in Nigeria and across Africa without reliable access to clean water.",
    quote: "You're not just donating money; you're investing in the health, wellbeing, and future of entire communities.",
    photos: [],
    give: "donate",
  },
  {
    slug: "healthcare",
    cat: "Healthcare Solutions",
    word: "Health",
    title: "Improving Health. Protecting Lives.",
    summary: "Maternal and child health, community health education, and access to essential care.",
    img: "/images/health-check-portrait.jpg",
    pos: "55% 10%",
    alt: "An older woman in a patterned head wrap has her blood pressure taken",
    hero: "/images/health-check.jpg",
    heroPos: "50% 20%",
    heroAlt: "A man in a blue jacket fits a blood pressure cuff on a seated older woman",
    tint: "coral",
    amount: "",
    amountLabel: "",
    lead: "Our healthcare priorities include maternal and child health, community health education, access to essential care, nutrition, family planning, and women's reproductive health and rights.",
    overview: "We work to improve the health and wellbeing of women and their families, enhancing healthcare access and knowledge.",
    problem: "Barriers prevent many women from accessing health services and realising their sexual and reproductive health and rights.",
    objectives: [
      "Improve maternal and child health",
      "Expand access to essential care and immunisations",
      "Meet the unmet need for family planning",
      "Promote gender equality and women's rights",
    ],
    activities: [
      { t: "Community health programmes", d: "Combating illness, expanding immunisations, offering nutritional aid, and delivering basic curative care.", s: "Ongoing" },
      { t: "Maternal and child health", d: "Antenatal and postnatal care.", s: "Ongoing" },
      { t: "Family planning solutions", d: "Working with partners to provide family planning to people who need it.", s: "Planned" },
      { t: "SRHR education and advocacy", d: "Community education that challenges FGM, early marriage, and teenage pregnancy.", s: "Ongoing" },
    ],
    beneficiaries: "Women, girls, children, and families in the communities we serve.",
    quote: "We enhance healthcare access and knowledge, saving lives.",
    photos: [
      { src: "/images/health-talk.jpg", pos: "60% 10%", alt: "A man speaks to a seated group of women" },
      { src: "/images/health-check.jpg", pos: "50% 10%", alt: "A blood pressure check" },
    ],
    give: "donate",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function relatedProjects(slug: string, count = 3) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return [];
  return Array.from({ length: count }, (_, k) => projects[(i + k + 1) % projects.length]);
}

export const giveCta: Record<Project["give"], { label: string; href: string }> = {
  meals: { label: "Support Meals", href: "/support#meals" },
  sponsor: { label: "Sponsor a Child", href: "/support#sponsor" },
  donate: { label: "Donate Now", href: "/support#donate" },
};
