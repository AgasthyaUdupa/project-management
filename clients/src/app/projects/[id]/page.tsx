"use client";

import { useState } from "react";
import Board from "../BoardView";
import ProjectHeader from "@/app/projects/ProjectHeader";
import List from "../ListView";
import Timeline from "../TimelineView";
import Table from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

// Ensure type compatibility
interface PageProps {
  params: {
    id: string;
  };
}

const Project = (props: PageProps | Promise<PageProps>) => {
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  // Handle `params` synchronously or asynchronously
  const [resolvedParams, setResolvedParams] = useState<PageProps["params"] | null>(null);

  // Resolve params if necessary
  if ("then" in props) {
    props.then((resolved) => {
      setResolvedParams(resolved.params);
    });
  } else {
    setResolvedParams(props.params);
  }

  // Prevent rendering until `params` are resolved
  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const { id } = resolvedParams;

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
