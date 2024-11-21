"use client";
import React from "react";
import { HeroHighlight, Highlight } from "./ui/her-highlights";
interface ClientFormProps {
  children: React.ReactNode;
}
const ClientForm = ({ children }: ClientFormProps) => {
  return (
    <HeroHighlight className="h-full w-full">
      <Highlight className="text-black dark:text-white">{children}</Highlight>
    </HeroHighlight>
  );
};

export default ClientForm;
