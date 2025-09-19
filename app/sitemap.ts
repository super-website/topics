import {
  getPapers,
  getAllPdf,
  getAllScheme,
  getAllSubject,
  getAllTopics,
  getClass,
  getArticles,
} from "@/utils/actions";
import { MetadataRoute } from "next";

export const revalidate = 3600;

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
  const pdfs = await getAllPdf("", 100);
  const topicsInside: Topic[] = topics;
  const grades = await getClass();
  const papers = await getPapers();
  const articles = await getArticles();

  const urls = subjects.map((subject) => ({
    url: `https://educationwithhamza.vercel.app/subject/${subject.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const schemesUrls = schemes.map((scheme) => ({
    url: `https://educationwithhamza.vercel.app/scheme/${scheme.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const topicUrls = topicsInside.map((topic) => ({
    url: `https://educationwithhamza.vercel.app/topic/${topic.id}`,
    lastModified: topic.createdAt.toISOString(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const pdfUrls = pdfs.map((pdf) => ({
    url: `https://educationwithhamza.vercel.app/notes-pdf/${pdf.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const gradesUrl = grades.map((grade) => ({
    url: `https://educationwithhamza.vercel.app/grades/${grade.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const papersUrl = papers.map((paper) => ({
    url: `https://educationwithhamza.vercel.app/model-papers/${paper.id}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  }));

  const articlesUrl = articles.map((article) => ({
    url: `https://educationwithhamza.vercel.app/articles/${article.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
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
      lastModified: new Date().toISOString(),
    },

    {
      url: "https://educationwithhamza.vercel.app/contact",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://educationwithhamza.vercel.app/notes-pdf",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://educationwithhamza.vercel.app/grades",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://educationwithhamza.vercel.app/scheme",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },
    {
      url: "https://educationwithhamza.vercel.app/about-us",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },

    {
      url: "https://educationwithhamza.vercel.app/model-papers",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },

    {
      url: "https://educationwithhamza.vercel.app/articles",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },

    {
      url: "https://educationwithhamza.vercel.app/write",
      changeFrequency: "daily",
      priority: 0.9,
      lastModified: new Date().toISOString(),
    },

    ...urls,
    ...topicUrls,
    ...schemesUrls,
    ...pdfUrls,
    ...gradesUrl,
    ...papersUrl,
    ...articlesUrl,
  ];
}
