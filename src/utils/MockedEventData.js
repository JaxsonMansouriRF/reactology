export const MOCKED_EVENT_DATA = [
  {
    id: 1,
    name: 'Global Leadership Summit',
    date: '2026-07-22',
    location: 'Hilton Midtown, New York',
    description: 'Annual summit for executives to discuss global strategy and innovation.',
    rsvp: false,
  },
  {
    id: 2,
    name: 'Tech Innovation Expo',
    date: '2026-08-18',
    location: 'Moscone Center, San Francisco',
    description: 'Showcase of emerging technologies and networking for Fortune 500 partners.',
    rsvp: true,
  },
  {
    id: 3,
    name: 'Corporate Social Responsibility Forum',
    date: '2026-09-12',
    location: 'JW Marriott, Chicago',
    description: 'Forum focused on sustainability initiatives and community impact.',
    rsvp: false,
  },
];

export function mockFetchEvents() {
  return new Promise((resolve) => {
    // Simulate network delay of 1000ms
    setTimeout(() => {
      // Simulate success, returning our data
      // resolve({
      //   ok: true,
      //   json: () => Promise.resolve(MOCKED_EVENT_DATA),
      // });
      // OPTIONAL: To simulate an error, uncomment the line below and comment out resolve()
      // resolve({
      //   ok: false,
      //   status: 500,
      //   statusText: 'Internal Server Error',
      // });
    }, 1000);
  });
}
