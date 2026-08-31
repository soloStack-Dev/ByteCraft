/**
 * LatestTransmissions.tsx
 * ------------------------------------------------------------------
 * "Latest Transmissions" project-card grid shared by the Home and
 * Blog pages. Each card shows a project thumbnail that highlights on
 * hover and links out to the project-preview URL.
 * ------------------------------------------------------------------
 */
"use client";

import Image from "next/image";
import { cardShadow } from "@/lib/styles";

/** Project preview URL linked from each Latest Transmission card. */
const PROJECT_PREVIEW_URL = "https://personal-mission-mu.vercel.app/projects";

/** Featured project transmissions shown in "Latest Transmissions". */
const PROJECTS = [
  {
    image: "/ProjectThumbnail/woodenArtist.png",
    alt: "ByteCraft v2.0 Release Notes",
    title: "ByteCraft v2.0 Release Notes",
    description:
      "Use modern stack to build scalable performance optimization based web applications.",
    date: "June 21, 2025",
  },
  {
    image: "/ProjectThumbnail/indian-voice-translater.png",
    alt: "Zero-Trust Workflows",
    title: "Zero-Trust Workflows",
    description:
      "Build AI powered web application integrate LLM (text to speech, speech to text, speech to speech) we use our Indian first Sarvam Intelligence.",
    date: "March 06, 2026",
  },
  {
    image: "/ProjectThumbnail/pattu-silk-saree-app.png",
    alt: "The Freelance Dev Ethos",
    title: "The Freelance Dev Ethos",
    description:
      "Building web application along with add attractive 3D animation, scroll animation and component animation improve the web out look.",
    date: "September 22, 2024",
  },
];

export function LatestTransmissions() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {PROJECTS.map((project, i) => (
        <a
          key={project.title}
          data-reveal
          data-reveal-delay={String(0.08 * i)}
          href={PROJECT_PREVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(244,166,193,0.4)]"
          style={{ boxShadow: cardShadow }}
        >
          {/* Image with hover highlight */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
            />
            {/* Hover glow highlight */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(to top, rgba(244,166,193,0.25) 0%, transparent 60%)",
              }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-[1.6] text-muted-foreground">
              {project.description}
            </p>
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.05em] text-faint">
              {project.date}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
