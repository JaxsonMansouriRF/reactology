// Mocked Fortune 500 corporate events data
export const MOCKED_EVENTS = [
  {
    id: 1,
    title: 'Apple Annual Shareholder Meeting 2024',
    company: 'Apple Inc.',
    date: '2024-02-28',
    time: '10:00 AM PST',
    location: 'Steve Jobs Theater, Apple Park, Cupertino, CA',
    type: 'Shareholder Meeting',
    description:
      'Annual meeting to discuss company performance, future strategy, and shareholder voting on key corporate matters.',
    attendees: 500,
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Microsoft Build Developer Conference',
    company: 'Microsoft Corporation',
    date: '2024-05-21',
    time: '9:00 AM PST',
    location: 'Seattle Convention Center, Seattle, WA',
    type: 'Developer Conference',
    description:
      "Microsoft's annual developer conference featuring the latest in cloud computing, AI, and developer tools.",
    attendees: 7000,
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Amazon Web Services re:Invent 2024',
    company: 'Amazon.com Inc.',
    date: '2024-11-26',
    time: '8:00 AM PST',
    location: 'Las Vegas Convention Center, Las Vegas, NV',
    type: 'Technology Conference',
    description:
      "AWS's flagship cloud computing conference with keynotes, technical sessions, and networking opportunities.",
    attendees: 50000,
    status: 'completed',
  },
  {
    id: 4,
    title: 'Google I/O Developer Conference',
    company: 'Alphabet Inc.',
    date: '2024-05-14',
    time: '10:00 AM PST',
    location: 'Shoreline Amphitheatre, Mountain View, CA',
    type: 'Developer Conference',
    description:
      "Google's annual developer conference showcasing the latest in Android, AI, and Google Cloud technologies.",
    attendees: 6000,
    status: 'completed',
  },
  {
    id: 5,
    title: 'Tesla Battery Day 2024',
    company: 'Tesla Inc.',
    date: '2024-09-15',
    time: '2:00 PM PST',
    location: 'Gigafactory 1, Nevada',
    type: 'Product Launch',
    description:
      "Tesla's presentation on battery technology advancements and future electric vehicle innovations.",
    attendees: 240,
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'JPMorgan Chase Annual Investor Day',
    company: 'JPMorgan Chase & Co.',
    date: '2024-06-17',
    time: '8:30 AM EST',
    location: 'JPMorgan Chase Building, New York, NY',
    type: 'Investor Meeting',
    description:
      'Annual presentation to investors covering financial performance, strategic initiatives, and market outlook.',
    attendees: 300,
    status: 'completed',
  },
  {
    id: 7,
    title: 'Johnson & Johnson Innovation Summit',
    company: 'Johnson & Johnson',
    date: '2024-10-03',
    time: '9:00 AM EST',
    location: 'New Brunswick, NJ Campus',
    type: 'Innovation Summit',
    description:
      'Showcasing breakthrough healthcare innovations, pharmaceutical research, and medical device technologies.',
    attendees: 800,
    status: 'upcoming',
  },
  {
    id: 8,
    title: 'Walmart Sustainability Milestone Event',
    company: 'Walmart Inc.',
    date: '2024-04-22',
    time: '11:00 AM CST',
    location: 'Walmart Home Office, Bentonville, AR',
    type: 'Corporate Social Responsibility',
    description:
      "Celebrating Walmart's progress toward zero emissions and sustainable supply chain initiatives.",
    attendees: 150,
    status: 'completed',
  },
];

// Mock function to simulate API call
export const mockFetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: () => Promise.resolve(MOCKED_EVENTS),
      });
    }, 1500); // 1.5 second delay to simulate network request
  });
};
