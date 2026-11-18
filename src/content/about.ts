export const aboutAreas = [
  { title: "Poverty Alleviation & Food Aid", desc: "Food assistance and hunger relief, including Fresh Hot Meals, for individuals and families facing hardship.", href: "/projects/food-aid", lav: true },
  { title: "Child Sponsorship", desc: "Support for children's essential needs, wellbeing, and access to opportunities.", href: "/projects/child-sponsorship", lav: false },
  { title: "Education", desc: "Schooling support, tutoring, reading clubs, literacy programmes, and community learning.", href: "/projects/education", lav: true },
  { title: "Women's Empowerment", desc: "Practical life skills, knowledge, and independence that help women provide for their families.", href: "/projects/womens-empowerment", lav: false },
  { title: "Clean Water for All", desc: "Sustainable community water solutions, including wells and pumps.", href: "/projects/clean-water", lav: true },
  { title: "Healthcare Solutions", desc: "Maternal and child health, community health education, nutrition, and access to essential care.", href: "/projects/healthcare", lav: false },
].map((a, i) => ({ ...a, n: String(i + 1).padStart(2, "0") }));

export const aboutImpact = [
  { n: "01", title: "Listening to communities", text: "Understanding real needs before responding." },
  { n: "02", title: "Collaborating with local partners", text: "Developing solutions together with the communities we serve." },
  { n: "03", title: "Immediate humanitarian assistance", text: "Food, care, and essential support for people facing hardship." },
  { n: "04", title: "Sustainable community solutions", text: "Working towards lasting improvements in community wellbeing." },
  { n: "05", title: "Dignity and self-reliance", text: "Creating opportunities for education and empowerment." },
  { n: "06", title: "Transparency and accountability", text: "Responsible humanitarian action guides everything we do." },
];

export const team = [
  { name: "Atinuke Adesanya", role: "Founder", img: "/images/team-atinuke.jpg", pos: "50% 20%", alt: "Portrait of Atinuke Adesanya", word: "Empower", tint: "rgba(106,98,214,0.7)", offset: "0px" },
  { name: "Yetunde Odunsi", role: "Coordinator", img: "/images/team-yetunde.jpg", pos: "50% 30%", alt: "Portrait of Yetunde Odunsi", word: "Uplift", tint: "rgba(242,132,143,0.75)", offset: "72px" },
  { name: "Joy Adesanya", role: "Volunteer Member", img: "/images/team-joy.webp", pos: "50% 15%", alt: "Portrait of Joy Adesanya", word: "Hope", tint: "rgba(106,98,214,0.7)", offset: "32px" },
];
