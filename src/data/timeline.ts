export interface TimelineEvent {
  id: string;
  year: string;
  descriptionHTML: string;
  progressMarker: number;
  topPercent: number;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'tl-1',
    year: '2024',
    descriptionHTML: 'Mulai kuliah <b>Informatika</b>',
    progressMarker: 0.10,
    topPercent: 6,
  },
  {
    id: 'tl-2',
    year: '2025',
    descriptionHTML: 'Membangun <b>MoneyTrek</b> & <b>ngePet</b>',
    progressMarker: 0.42,
    topPercent: 40,
  },
  {
    id: 'tl-3',
    year: '2026',
    descriptionHTML: 'Magang & proyek <b>Computer Vision</b>',
    progressMarker: 0.72,
    topPercent: 72,
  }
];
