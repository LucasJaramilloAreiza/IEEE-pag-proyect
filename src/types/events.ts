export type EventType = "SUMMIT" | "CONFERENCE" | "WORKSHOP" | "HACKATHON" | "VISIT" | "MEETING" | "STANDARD";

export interface Speaker {
  id: string;
  name: string;
  role: string;
  photoUrl?: string;
  bio?: string;
}

export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  pdfUrl?: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: EventType;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  description: string;
  overview?: string;
  themes?: string;
  impact?: string;
  conclusion?: string;
  tags?: string[];
  hosts?: string[];
  imageUrl?: string;
  gallery?: string[];
  link?: string;
  papers?: Paper[];
  speakers?: Speaker[];
}

