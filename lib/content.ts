/**
 * All homepage copy lives here, transcribed word-for-word from the current
 * barbadosmaritime.com homepage. Edit text in this file only, so the design
 * components never drift from the approved content.
 *
 * Internal hrefs mirror the existing WordPress page slugs where they are known;
 * any marked "confirm" should be checked against the live site's menu.
 */

export const contact = {
  openingHours: "Opening Hours of BMSR: Mon - Fri: 9am - 5pm.",
  phone: "+44 (0)207 636 5739",
  phoneHref: "tel:+442076365739",
  emergencyPhone: "+44 (0) 7494 116754",
  emergencyPhoneHref: "tel:+447494116754",
  email: "office@barbadosmaritime.com",
  linkedin: "https://www.linkedin.com/company/barbados-maritime-ship-registry/", // confirm
  address: [
    "Barbados Maritime Ship Registry",
    "Barbados High Commission",
    "1 Great Russell Street",
    "London, WC1B 3ND",
  ],
  mapEmbed:
    "https://www.google.com/maps?q=1+Great+Russell+Street,+London+WC1B+3ND&output=embed",
};

export const notice = {
  lead: "Navigational guidance for Barbadian",
  linkText: "flagged vessels operating in the Strait of Hormuz.",
  href: "/navigational-guidance",
};

export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };

// Dropdown children: confirm against the live site's menu before launch.
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "The BMSR",
    href: "/the-bmsr",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact us", href: "/contact-us" },
      { label: "Public Holidays", href: "/public-holidays" },
      { label: "Useful Links", href: "/useful-links" },
    ],
  },
  {
    label: "Registration",
    href: "/registration",
    children: [
      { label: "Registration Fees", href: "/registration-fees" },
      { label: "Yacht Registration", href: "/yacht-registration" },
    ],
  },
  // Sub-pages unknown (live site unreachable when this was built): add children to restore the dropdown.
  { label: "Seafarers", href: "/seafarers" },
  {
    label: "Inspections",
    href: "/inspections",
    children: [
      { label: "Nautical Inspectors", href: "/nautical-inspectors" },
      { label: "Recognised Organisations", href: "/recognised-organisations" },
    ],
  },
  { label: "Investigations", href: "/investigations" },
  {
    label: "Documents",
    href: "/documents",
    children: [
      { label: "Bulletins", href: "/bulletins" },
      { label: "Shipping Legislation", href: "/shipping-legislation" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Portal", href: "/portal" },
];

export type HeroSlide = {
  eyebrow: string;
  title: string[];
  cta: { label: string; href: string };
  image: string; // photo, also used as the video poster
  imageAlt: string;
  focus: string; // CSS object-position
  /** Optional MP4 background (for example a clip generated in Higgsfield); the photo shows until it plays. */
  video?: string;
};

// Hero slides reuse headings, buttons and photos that already appear on the homepage.
export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Barbados Maritime Ship Registry",
    title: ["Barbados Maritime", "Registration Fee"],
    cta: { label: "Registration Fee", href: "/registration-fees" },
    image: "/images/hero-ship.jpg",
    imageAlt: "Barbados-flagged vessel METSOVO, port of registry Bridgetown",
    focus: "62% 40%",
  },
  {
    eyebrow: "Barbados Maritime Ship Registry",
    title: ["Who We Are", "& What We Do"],
    cta: { label: "Learn More", href: "/about-us" },
    image: "/images/slides/slide-yacht.jpg",
    imageAlt: "Motor yacht under way at sea",
    focus: "62% 55%",
  },
  {
    eyebrow: "Barbados Maritime Ship Registry",
    title: ["Navigational guidance for Barbadian-flagged", "vessels operating in the Strait of Hormuz."],
    cta: { label: "Guidance", href: "/navigational-guidance" },
    image: "/images/slides/slide-sea.jpg",
    imageAlt: "Calm open sea under a clear sky",
    focus: "50% 55%",
  },
];

export const highlights = [
  { icon: "phone", label: "24/7 Emergency Service" },
  { icon: "heart", label: "Dedicated and Friendly" },
  { icon: "search", label: "Quality Driven Service" },
  { icon: "bookmark", label: "ISO9001 Accredited Company" },
  { icon: "messages", label: "Premium Ship Registry" },
  { icon: "user", label: "Appointed Nautical Inspectors" },
] as const;

// Short section labels (eyebrows). Each reuses wording that already appears on the site.
export const labels = {
  about: "About Us",
  press: "Press Statement",
  guidance: "Guidance",
  news: "News",
};

export const whoWeAre = {
  heading: ["Who We Are", "& What We Do"],
  paragraphs: [
    "Barbados Maritime Ship Registry offers the discerning ship operator a first-class personal service in all aspects of ship registration. We act as Executive Agents for and on behalf of the Barbados Government.",
    "White-listed in the Paris MOU, approved for the USCG QUALSHIP21 programme, and accredited to ISO9001, the BMSR provides a quality-driven service second to none.",
    "We provide a 24/7 emergency service, 365 days a year; urgent dispensation and exemptions may be dealt with outside of normal office hours, and the Principal Registrar may be contacted directly for help, advice and guidance. The whole team at BMSR is dedicated, friendly and helpful.",
  ],
  cta: { label: "Learn More", href: "/about-us" },
  image: "/images/slides/slide-yacht.jpg",
  imageAlt: "Motor yacht under way at sea",
  // Accreditations named in the second paragraph, shown as a credentials row.
  credentials: [
    { name: "Paris MOU", status: "White-listed" },
    { name: "USCG QUALSHIP21", status: "Approved" },
    { name: "ISO9001", status: "Accredited" },
  ],
};

export const pressStatement = {
  href: "/bulletins",
  linkText: "Read More",
  title:
    "BMSR Press Statement – Reported Seizure by Iranian Forces of Vessel JIN LI (ex-OCEAN KOI), IMO 9255933",
};

export const guidance = {
  heading:
    "Navigational guidance for Barbadian-flagged vessels operating in the Strait of Hormuz.",
  bulletins: [
    { title: "Bulletin 030 – ISPS Code Rev 1.0 :", linkText: "View Here", href: "/bulletins" },
    {
      title: "Bulletin 035 – Piracy and Armed Robbery Rev. 2.0:",
      linkText: "View Here",
      href: "/bulletins",
    },
  ],
  cta: { label: "Guidance", href: "/navigational-guidance" },
};

export const linkedinFollow = {
  heading: "Follow us on Linkedin for all of the latest updates",
  cta: "Click here to follow us",
};

// Body text is split around inline links so the original wording is preserved.
export const services = [
  {
    icon: "compass",
    title: "Nautical Inspectors",
    body: [
      "A network of Nautical Inspectors is available to carry out annual ship safety inspections and to assist ship operators whenever required. The list of Inspectors may be accessed here:",
    ],
    cta: { label: "Nautical Inspectors.", href: "/nautical-inspectors" },
  },
  {
    icon: "contact",
    title: "Shipping Legislation",
    body: [
      "Barbados has been a member of IMO since 1971, and has ratified many of the international ",
      { text: "conventions", href: "/shipping-legislation" },
      " that have been instrumental in shaping the world’s shipping legislation.",
    ],
    cta: { label: "Read More", href: "/shipping-legislation" },
  },
  {
    icon: "bulletins",
    title: "Bulletins",
    body: [
      "We provide regular ",
      { text: "bulletins", href: "/bulletins" },
      " to keep our clients and associates abreast of new developments, and work closely with all our ship owners and managers to help maintain a quality fleet.",
    ],
    cta: { label: "Read More", href: "/bulletins" },
  },
  {
    icon: "anchor",
    title: "Recognised Organisations",
    body: [
      "Ten Classification Societies that are members of IACS (International Association of Classification Societies), as well as several other recognised organisations, have been appointed to survey and issue statutory certificates on our behalf.",
    ],
    cta: { label: "Read More", href: "/recognised-organisations" },
  },
] as const;

// Descriptions appear on hover, as on the live site.
export const quickLinks = [
  {
    title: "Contact Us",
    icon: "phone",
    description: "We are here to help you with any queries you may have.",
    href: "/contact-us",
    image: "/images/slides/slide-beach-huts.jpg",
    alt: "Colourful beach huts under palm trees in Barbados",
  },
  {
    title: "Registration Fees",
    icon: "receipt",
    description: "View our fees for registration Here.",
    href: "/registration-fees",
    image: "/images/slides/slide-bridgetown.jpg",
    alt: "Boardwalk along the Careenage in Bridgetown",
  },
  {
    title: "Useful Links",
    icon: "link",
    description: "We have a number of connections and useful links just a click away.",
    href: "/useful-links",
    image: "/images/slides/slide-marina.jpg",
    alt: "Bridgetown waterfront promenade and marina",
  },
] as const;

export const barbadosBanner = {
  image: "/images/barbados-sign.jpg",
  alt: "Road sign reading Barbados among palm fronds",
};

export const organisations = {
  heading: "Barbados Recognised Organisations",
  logos: [
    { name: "Lloyd’s Register", src: "/images/orgs/lloyds-register.png", w: 160, h: 90 },
    { name: "National Shipping Adjusters", src: "/images/orgs/national-shipping-adjusters.png", w: 165, h: 63 },
    { name: "OMCS Class", src: "/images/orgs/omcs-class.png", w: 160, h: 50 },
    { name: "Phoenix Register of Shipping", src: "/images/orgs/phoenix-register.png", w: 178, h: 58 },
    { name: "Polski Rejestr Statków", src: "/images/orgs/polski-rejestr-statkow.png", w: 110, h: 140 },
    { name: "RINA", src: "/images/orgs/rina.png", w: 120, h: 114 },
  ],
  cta: { label: "Find Out More", href: "/recognised-organisations" },
};

export const islandStats = [
  { value: 293, suffix: "k", label: ["People live", "in Barbados"] },
  { value: 50, suffix: "", label: ["Beaches", "around the island"] },
  { value: 8, suffix: "+", label: ["Hours", "of sunshine"] },
  { value: 493, suffix: "Km2", label: ["Size of", "Barbados"] },
];

// Full-width backdrop behind the Barbados stats: a ship-at-sea video, with the sea photo as poster/fallback.
// Clip: "Aerial Footage Of A Cargo Ship At Sea" by Alexander Bobrov, Pexels (free licence), 1280×720.
export const statsBackdrop: { poster: string; video?: string } = {
  poster: "/images/ship-at-sea-poster.jpg",
  video: "/videos/ship-at-sea.mp4",
};

export const bulletins = {
  heading: "Bulletins From Barbados Maritime",
  viewAll: { label: "View All", href: "/bulletins" },
  posts: [
    {
      title: "BMSR Posidonia 2026 – Thank You to everyone we met",
      excerpt: "We are pleased to announce our participation in Posidonia 2026.",
      author: "BMSR",
      date: "15th June 2026",
      dateTime: "2026-06-15",
      category: "News",
      image: "/images/bulletin-posidonia.jpg",
      href: "/bulletins",
    },
    {
      title:
        "BMSR Press Statement – Reported Seizure by Iranian Forces of Vessel JIN LI (ex-OCEAN KOI), IMO 9255933",
      excerpt: "We are pleased to announce our participation in Posidonia 2026.",
      author: "BMSR",
      date: "20th May 2026",
      dateTime: "2026-05-20",
      category: "News",
      image: "/images/bulletin-press-statement.jpg",
      href: "/bulletins",
    },
    {
      title: "BMSR Posidonia 2026",
      excerpt: "We are pleased to announce our participation in Posidonia 2026.",
      author: "BMSR",
      date: "15th May 2026",
      dateTime: "2026-05-15",
      category: "News",
      image: "/images/bulletin-posidonia.jpg",
      href: "/bulletins",
    },
    {
      title: "Celebrating One Year of Charlotte Kurner at BMSR",
      excerpt: "Celebrating One Year of Charlotte Kurner at BMSR",
      author: "BMSR",
      date: "9th January 2026",
      dateTime: "2026-01-09",
      category: "News",
      image: "/images/bulletin-charlotte-kurner.jpg",
      href: "/bulletins",
    },
  ],
};

export const stayConnected = {
  heading: "Stay Connected",
  nameLabel: "Your Name *",
  emailLabel: "Your Email *",
  submit: "Sign Up",
};

export const footer = {
  contactHeading: "Our Contact Details",
  linksHeading: "Important Links",
  officeHeading: "London Office",
  links: [
    { label: "The BMSR", href: "/the-bmsr" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact us", href: "/contact-us" },
    { label: "Useful Links", href: "/useful-links" },
    { label: "Bulletins", href: "/bulletins" },
    { label: "Public Holidays", href: "/public-holidays" },
    { label: "Yacht Registration", href: "/yacht-registration" },
    { label: "Registration Fees", href: "/registration-fees" },
  ],
  copyrightYear: 2026,
  privacy: { label: "Privacy & Cookies Policies", href: "/privacy-cookies-policies" },
};
