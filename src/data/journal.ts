export type JournalPhoto = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
export type JournalEntry = {
  slug: string;
  name: string;
  city: string;
  country: string;
  location: string;
  dates: string;
  year: string;
  days: number;
  experienceLabel?: string;
  distance?: string;
  description: string;
  title: string;
  subtitle: string;
  story: string[];
  cover: JournalPhoto;
  chapters: { title: string; photos: JournalPhoto[] }[];
  tags: string[];
  official?: string;
};
function photo(
  file: string,
  alt: string,
  caption: string,
  width = 1536,
  height = 2048,
): JournalPhoto {
  return {
    src: "/gallery/devcon-8/" + file + ".webp",
    alt,
    caption,
    width,
    height,
  };
}
const group = photo(
  "09-devcon-attendee-group",
  "Attendees standing together behind the DEVCON VIII INDIA display.",
  "A group portrait at Devcon VIII.",
  2048,
  1536,
);
export const journal: JournalEntry[] = [
  {
    slug: "devcon-viii-india",
    name: "Devcon VIII India",
    city: "Mumbai",
    country: "India",
    location: "Jio World Centre, Bandra Kurla Complex",
    dates: "03–06 NOV",
    year: "2026",
    days: 4,
    experienceLabel: "Devcon experience.",
    distance: "1,400+ KM",
    description:
      "Devcon is the Ethereum Foundation’s global gathering for people building and researching decentralized systems.",
    title: "1,400+ KM FOR A REASON.",
    subtitle: "Devcon VIII India — Mumbai, 2026.",
    official: "https://devcon.org/en/",
    tags: ["Conference", "Community", "Travel"],
    cover: group,
    story: [
      "Some trips stay with you long after you get back.",
      "I travelled more than 1,400 km to Mumbai to be part of Devcon 8.",
      "For four days, I got to step away from my usual screen, be around people building in the Ethereum ecosystem, listen to ideas, explore the event spaces and experience the community in person.",
      "There were talks worth listening to, interesting things happening across the venue, conversations, new faces and plenty of little moments in between.",
      "I also got to explore a bit of Mumbai while I was there.",
      "Honestly, the best part was experiencing all of this in person. It's one thing to follow an ecosystem online, but being there gives you a completely different perspective.",
      "I came back with photographs, fresh ideas, new perspectives and memories that made the 1,400+ km journey worth it.",
      "Definitely one of those experiences I'll remember for a long time.",
    ],
    chapters: [
      {
        title: "The venue",
        photos: [
          photo(
            "01-devcon-stage-speaker",
            "A presenter speaking beside a projected slide on stage.",
            "From the stage.",
            484,
            636,
          ),
          photo(
            "02-devcon-auditorium",
            "Rows of auditorium seats facing the illuminated conference stage.",
            "A seat in the auditorium.",
          ),
          photo(
            "06-devcon-exhibition-floor",
            "Visitors exploring booths beneath the patterned exhibition hall ceiling.",
            "Across the exhibition floor.",
          ),
        ],
      },
      {
        title: "The people",
        photos: [
          group,
          photo(
            "04-devcon-community-floor",
            "Attendees gathered around tables across the event floor.",
            "The community floor.",
          ),
          photo(
            "05-community-mixer",
            "People gathered around tables at an informal evening mixer.",
            "At the mixer.",
          ),
          photo(
            "08-devcon-mascot-moment",
            "An attendee in costume surrounded by people inside the venue.",
            "A costume in the crowd.",
          ),
          photo(
            "11-devcon-roundtable",
            "A group discussion onstage in front of a projection screen.",
            "The roundtable.",
            1341,
            945,
          ),
        ],
      },
      {
        title: "The moments",
        photos: [
          photo(
            "10-devcon-talk-session",
            "A presenter facing a seated audience beside a session monitor.",
            "Inside a talk.",
            1417,
            945,
          ),
          photo(
            "07-devcon-floor-projection",
            "A bright circular projection on the floor between attendees’ shoes.",
            "At our feet.",
          ),
        ],
      },
      {
        title: "The city",
        photos: [
          photo(
            "03-mumbai-gateway-of-india",
            "The stone arches of Mumbai’s Gateway of India against a clouded sky.",
            "Gateway of India, Mumbai.",
          ),
          photo(
            "12-mumbai-food-moment",
            "Plates of food on a table during the Mumbai trip.",
            "A meal in Mumbai.",
            320,
            835,
          ),
        ],
      },
    ],
  },
];
