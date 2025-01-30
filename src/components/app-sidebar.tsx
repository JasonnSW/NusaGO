"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { usePlaceContext } from "@/features/peta/context/PlaceContext";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionItemContent } from "@/components/AccordionItemContent";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { StatisticsAccordion } from "./StatisticDropDown";
import { SECTIONS, SectionId } from "@/data/section-data";

export function AppSidebar() {
  const { photoUrl, address } = usePlaceContext();
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);

  return (
    <Sidebar className="space-y-24">
      <SidebarHeader className="flex flex-col space-y-2 h-auto">
        <PlaceInfo photoUrl={photoUrl} address={address} />
      </SidebarHeader>
      <Separator className="w-full h-[2px] mt-4" />
      <SidebarContent className="mx-7 my-6">
        <Accordion
          type="single"
          collapsible
          className="rounded-3xl border"
          onValueChange={(value) => {
            if (["emissions", "land-cover", "vegetations"].includes(value)) {
              setActiveSection(value as SectionId); 
            } else {
              setActiveSection(null);
            }
          }}
        >
          {SECTIONS.map((section) => (
            <AccordionSection
              key={section.id}
              id={section.id}
              title={section.title}
              icon={section.icon}
              items={section.items}
            />
          ))}
        </Accordion>
      </SidebarContent>
      {activeSection && (
        <StatisticsAccordion
          items={
            SECTIONS.find((section) => section.id === activeSection)?.items ||
            []
          }
          sectionId={activeSection}
        />
      )}
    </Sidebar>
  );
}

function PlaceInfo({
  photoUrl,
  address,
}: {
  photoUrl: string | null;
  address: string | null;
}) {
  return (
    <div className="flex flex-col space-y-4">
      {photoUrl ? (
        <div className="w-full h-auto">
          <Image
            src={photoUrl}
            className="object-contain"
            alt="Place Photo"
            width={400}
            height={200}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-x-4">
          <Skeleton className="h-[200px] w-[300px]" />
        </div>
      )}
      {address ? (
        <span className="pl-6 text-xl font-bold text-black">{address}</span>
      ) : (
        <Skeleton className="ml-4 mt-4 h-6 w-[200px] " />
      )}
    </div>
  );
}

function AccordionSection({
  id,
  title,
  icon,
  items,
}: {
  id: SectionId;
  title: string;
  icon: string;
  items: string[];
}) {
  return (
    <AccordionItem value={id} className="mx-4">
      <AccordionTrigger className="flex items-center space-x-2">
        <Image src={icon} alt={title} width={20} height={20} />
        <span className="text-neutral-dark_active font-semibold">{title}</span>
      </AccordionTrigger>
      <AccordionContent>
        <AccordionItemContent title={title} items={items} />
      </AccordionContent>
    </AccordionItem>
  );
}
