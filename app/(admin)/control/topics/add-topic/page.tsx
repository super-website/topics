import AddNewTopic from "@/components/AddNewTopic";
import { getAllSubject } from "@/utils/actions";

interface Subject {
  id: string;
  name: string;
  short_name: string;
  short_desc: string;
}

export default async function AddTopic() {
  const subjects: Subject[] = (await getAllSubject()) || [];

  return <AddNewTopic subjects={subjects} />;
}
