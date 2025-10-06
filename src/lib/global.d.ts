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
      id: string;
      title: string;
      slug: string;
      date: string;
      tags: string[];
      description: string;
      cover?: string;
      published: boolean;
      author: string;
      readingTime: number | null;
      url?: string;
      content?: Array<Record<string, any>>;
}