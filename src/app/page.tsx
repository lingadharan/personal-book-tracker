'use client'
import MainContent from "@/components/contents/mainContent";
import Tags from "@/components/tags";
import { SelectedTag } from "@/types/interfaces"
import { useState } from "react";

export default function Home() {
  const [selectedTag, setSelectedTag] = useState<SelectedTag>("dashboard")
  return (
    <div >
      <Tags setSelectedTag={setSelectedTag} selectedTag={selectedTag}/>
      <MainContent selectedTag={selectedTag}/>
    </div>
  );
}
