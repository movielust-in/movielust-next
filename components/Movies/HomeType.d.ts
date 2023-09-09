export interface Carousel {
  id: string;
  type: 'movie' | 'tv';
  url: string;
  title: string;
  showAll?: string;
}
