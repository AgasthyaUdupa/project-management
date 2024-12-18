import React from "react";
import ReusablePriorityPage from "../reuseablePriorityPage";
import { Priority } from "@/state/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default Urgent;