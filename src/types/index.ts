export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Script {
  id: number;
  title: string;
  content: string;
  date: string;
  userId?: number;
}

export interface Slide {
  order: number;
  title: string;
  text: string;
}

export interface ScriptDetail extends Script {
  slides: Slide[];
}

export interface PracticeSession {
  id: number;
  scriptId: number;
  audioUrl?: string;
  feedback?: PracticeFeedback;
  createdAt: string;
}

export interface PracticeFeedback {
  score: number;
  paceComment: string;
  clarityComment: string;
  suggestions: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
}
