/**
 * Types pour l'application kiwoor
 */

export type UserType = 'diaspora' | 'local' | '';

export interface FormData {
  // Champs communs
  fullName: string;
  email: string;
  phone: string;
  country: string;
  
  // Champs diaspora (employeur)
  jobType: string;
  location: string;
  salary: string;
  startDate: string;
  urgency: string;
  
  // Champs local (chercheur)
  experience: string;
  availability: string;
  hasReferences: string;
  
  // Feedback
  willingToPay: string;
  maxBudget: string;
  mainConcern: string;
  comments: string;
}

export interface Testimonial {
  name: string;
  location: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface JobType {
  value: string;
  label: string;
}

