export type TourDate = { month: string; day: string; city: string; date: string; ticketUrl?: string };
export type Show = {
  id: string; title: string; artist: string; subtitle: string; status: string;
  description: string; image: string; imageWidth: number; imageHeight: number;
  imageAlt: string; sourceUrl: string; dates: TourDate[];
};

export const tourTickets = 'https://collections.humanitix.com/lakas-tama-australia-new-zealand-tour-2026';
export const referenceSite = 'https://www.strictlyepicstudio.com/';
export const referenceFacebook = 'https://www.facebook.com/StrictlyEpicStudio/';

// Dates supplied by the client; 2026 and Australian ticket destinations verified
// against the official poster and the collection linked from Strictly Epic Studio.
export const nextShow: Show = {
  id: 'lakas-tama', title: 'LAKAS TAMA', artist: 'Repakol Band',
  subtitle: 'Australia & New Zealand Tour 2026', status: 'Next show',
  description: 'Noel Palomo and Miniong Cervantes take the stage with the Repakol Band for a celebration of Pinoy rock and the music of Tunog Kalye.',
  image: '/images/shows/lakas-tama.webp', imageWidth: 1200, imageHeight: 1697,
  imageAlt: 'Official Lakas Tama Australia and New Zealand Tour 2026 poster featuring Repakol Band',
  sourceUrl: referenceSite,
  dates: [
    { month: 'Nov', day: '21', city: 'Christchurch', date: '2026-11-21' },
    { month: 'Nov', day: '22', city: 'Auckland', date: '2026-11-22' },
    { month: 'Nov', day: '27', city: 'Perth', date: '2026-11-27', ticketUrl: 'https://events.humanitix.com/lakas-tama-aus-and-nz-tour-2026-perth' },
    { month: 'Nov', day: '29', city: 'Melbourne', date: '2026-11-29', ticketUrl: 'https://events.humanitix.com/lakas-tama-aus-and-nz-tour-2026-melbourne' },
    { month: 'Dec', day: '04', city: 'Sydney', date: '2026-12-04', ticketUrl: 'https://events.humanitix.com/lakas-tama-aus-and-nz-tour-2026-sydney' },
    { month: 'Dec', day: '06', city: 'Brisbane', date: '2026-12-06', ticketUrl: 'https://events.humanitix.com/lakas-tama-aus-and-nz-tour-2026-brisbane' },
  ],
};

export const previousShow: Show = {
  id: 'nurse-even', title: 'Nurse Even', artist: 'This is BULLSHIFT',
  subtitle: 'Australia Tour 2026', status: 'Previous show',
  description: 'Four cities. A shared sense of humour. Nurse Even brought This is BULLSHIFT to audiences in Sydney, Melbourne, Brisbane and Perth.',
  image: '/images/shows/nurse-even.webp', imageWidth: 1600, imageHeight: 800,
  imageAlt: 'Official Nurse Even This is BULLSHIFT Sydney tour artwork',
  sourceUrl: 'https://events.humanitix.com/nurse-even-this-is-bullshift-sydney',
  dates: [
    { month: 'Aug', day: '20', city: 'Sydney', date: '2026-08-20' },
    { month: 'Aug', day: '21', city: 'Melbourne', date: '2026-08-21' },
    { month: 'Aug', day: '22', city: 'Brisbane', date: '2026-08-22' },
    { month: 'Aug', day: '23', city: 'Perth', date: '2026-08-23' },
  ],
};
