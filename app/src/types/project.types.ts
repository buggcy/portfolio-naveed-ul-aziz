export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  modalImage?: string;
  category?: string;
  year?: string;
  tags?: string[];
  link?: string;
  imagePosition?: string;
  url: string;
}

