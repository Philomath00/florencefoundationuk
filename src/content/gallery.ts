// Gallery albums grouped by year. This is the static fallback; once Supabase
// is connected, the admin Gallery module will manage these records and this
// file is only used as seed data / local fallback.

export type GalleryItem = { src: string; alt: string; ratio: string };
export type GalleryAlbum = { year: string; title: string; items: GalleryItem[] };

const base = "/images/gallery/";

function album(
  year: string,
  title: string,
  prefix: string,
  ids: string[],
  alts: string[],
  ratios: string[],
): GalleryAlbum {
  return {
    year,
    title,
    items: ids.map((id, i) => ({
      src: base + prefix + id + ".jpg",
      alt: alts[i] || "Florence Foundation community outreach",
      ratio: ratios[i] || "4/3",
    })),
  };
}

export const galleryAlbums: GalleryAlbum[] = [
  album(
    "2009",
    "Community Outreach",
    "2009-",
    ["1", "3", "5", "6", "7"],
    [
      "A group of children in school uniforms smile together outdoors",
      "Children in school uniforms gathered together in an open yard",
      "Children laughing and posing together outside a building site",
      "Women gathered under a tent around a table during a workshop",
      "People queue under a tent beside cool boxes of food",
    ],
    ["4/3", "4/3", "4/3", "4/3", "4/3"],
  ),
  album(
    "2015",
    "Grace & Mercy Project (GAMP)",
    "gamp-2015-",
    ["96", "97", "101", "102", "104", "105", "107"],
    [
      "Guests unveil sewing machines at a ceremony",
      "Sewing machines revealed beneath a white cloth",
      "A graduate in cap and gown receives a certificate",
      "A graduate shakes hands with a guest beside a sewing machine",
      "A graduate stands with guests holding a certificate",
      "A graduate in cap and gown is congratulated beside a sewing machine",
      "A graduate poses with two guests holding certificates",
    ],
    ["3/2", "3/2", "3/2", "3/2", "3/2", "3/2", "4/5"],
  ),
  album(
    "2018",
    "Grace & Mercy Project (GAMP)",
    "gamp-2018-",
    ["1", "2", "3", "5", "6", "7"],
    [
      "A large community gathering seated under white tents",
      "Two women stand together under a tent",
      "A volunteer records details at a registration table",
      "Food containers with orange and purple lids prepared for distribution",
      "A volunteer takes a blood pressure reading at a health check table",
      "Volunteers run a health check station under a tent",
    ],
    ["3/2", "3/2", "3/2", "3/2", "3/2", "3/2"],
  ),
];

// Home page gallery preview grid (subset used on the homepage masonry).
export const galleryPreview: GalleryItem[] = [
  { src: "/images/women-certificates.jpg", ratio: "4/3", alt: "A group of women in purple sashes celebrate, holding up certificates" },
  { src: "/images/health-check-portrait.jpg", ratio: "3/4", alt: "An older woman in a patterned head wrap has her blood pressure taken" },
  { src: "/images/children-four.jpg", ratio: "4/3", alt: "Young children in colourful dresses stand close together outdoors" },
  { src: "/images/women-machines.jpg", ratio: "16/10", alt: "Women in purple sashes look over rows of boxed sewing machines" },
  { src: "/images/health-check.jpg", ratio: "4/3", alt: "A man in a blue jacket fits a blood pressure cuff on a seated older woman" },
  { src: "/images/goods-fabric.jpg", ratio: "1/1", alt: "A woman in a red and gold patterned dress holds up a length of fabric" },
  { src: "/images/children-two.jpg", ratio: "4/5", alt: "Two children, one with an arm around the other, look at the camera" },
  { src: "/images/health-talk.jpg", ratio: "16/10", alt: "A man in a blue jacket speaks to a seated group of women in head wraps" },
  { src: "/images/goods-clothing.jpg", ratio: "4/3", alt: "People look through donated clothing laid out under a canopy" },
  { src: "/images/sewing-machines.jpg", ratio: "16/10", alt: "Rows of boxed sewing machines wrapped in plastic" },
];
