"use client";

import { useState, useEffect } from "react";
import Board from "../BoardView";
import ProjectHeader from "@/app/projects/ProjectHeader";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

type ProjectProps = {
  params: Promise<{ id: string }>;
};

const Project = ({ params }: ProjectProps) => {
  const [id, setId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params; // Resolve the Promise
      setId(resolvedParams.id); // Set the `id`
    };

    resolveParams();
  }, [params]); // Dependency ensures the effect runs when `params` changes

  if (!id) {
    return <div>Loading...</div>; // Render loading state while `id` is being resolved
  }

  return (
    <div>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
