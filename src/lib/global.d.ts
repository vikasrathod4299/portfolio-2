interface NowPlaying {
  name: string;
  artist: string;
  isPlaying: boolean;
}

interface Experience {
  company: { name: string; url: string | null };
  position: string;
  startDate: string;
  endDate: string | null;
  descriptions: string[];
}

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

interface Post {
  title: string;
  slug: string;
  description?: string;
  date: Date;
  preview?: string;
  body?: string;
}
