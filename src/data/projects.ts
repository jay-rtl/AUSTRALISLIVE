import { previousShow } from './shows';
export type Project = {
  slug: string; title: string; category: string; year: string;
  shortDescription: string; coverImage: string; gallery: string[];
  seoTitle: string; seoDescription: string; ogImage?: string;
  order: number; content: string[];
};
export const projects: Project[] = [{
  slug: previousShow.id, title: previousShow.title, category: 'Previous show', year: '2026',
  shortDescription: previousShow.description, coverImage: previousShow.image, gallery: [],
  seoTitle: 'Nurse Even | Australis Live', seoDescription: previousShow.description,
  order: 1, content: [],
}];
