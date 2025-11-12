import data from './events-placeholder-images.json';

export type EventImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  title?: string;
  location?: string;
};

export const EventPlaceHolderImages: EventImagePlaceholder[] = data.eventImages;
