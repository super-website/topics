import EditTopic from "@/components/EditTopic";
import { getAllSubject, getSingleTopic } from "@/utils/actions";
import React from "react";

interface Subject {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
  short_desc: string;
  long_desc: string;
  subjectId: string;
  subject?: {
    id: string;
    name: string;
    short_name: string;
    short_desc: string;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const subjects: Subject[] = (await getAllSubject()) || [];
  const { id } = params;
  const topic: Topic | null = await getSingleTopic(id);

  return <EditTopic subjects={subjects} topic={topic || undefined} />;
}
