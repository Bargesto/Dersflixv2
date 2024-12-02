export interface Video {
  id: string;
  title: string;
  videoUrl: string;
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'embed';
  videoId: string;
  class: string;
  subject: string;
  userId: string;
  watched?: boolean;
  favorite?: boolean;
  createdAt?: Date;
}

export interface Category {
  class: string;
  subjects: string[];
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}