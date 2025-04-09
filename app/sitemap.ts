import { getAllScheme, getAllSubject, getAllTopics } from "@/utils/actions";
import { MetadataRoute } from "next";

interface Subject {
  id: string;
  name: string;
  short_name: string;
  short_desc: string;
  tags: string[];
}

interface Topic {
  id: string;
  title: string;
  short_desc: string;
  createdAt: Date;
  subject?: Subject | null;
  tags: string[];
}

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const subjects: Subject[] = await getAllSubject();
  const schemes = await getAllScheme();
  const topics = await getAllTopics("");
  const topicsInside: Topic[] = Array.isArray(topics)
    ? topics
    : topics.topics || [];

  const urls = subjects.map((subject) => ({
    url: `https://educationwithhamza.vercel.app/subject/${subject.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const schemesUrls = schemes.map((scheme) => ({
    url: `https://educationwithhamza.vercel.app/scheme/${scheme.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const topicUrls = topicsInside.map((topic) => ({
    url: `https://educationwithhamza.vercel.app/topic/${topic.id}`,
    lastModified: topic.createdAt.toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `https://educationwithhamza.vercel.app`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://educationwithhamza.vercel.app/subjects",
      changeFrequency: "daily",
      priority: 0.9,
    },

    {
      url: "https://educationwithhamza.vercel.app/contact",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://educationwithhamza.vercel.app/notes-pdf",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://educationwithhamza.vercel.app/gallery",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://educationwithhamza.vercel.app/scheme",
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...urls,
    ...topicUrls,
    ...schemesUrls,
  ];
}
