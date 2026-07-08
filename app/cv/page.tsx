import type { Metadata } from "next";
import { summary, experience, education, skills } from "@/lib/cv";

export const metadata: Metadata = {
  title: "CV",
};

export default function CvPage() {
  return (
    <div className="flex flex-col gap-10 py-8 print:gap-6 print:py-0">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">Cesar Vergara</h1>
        <p className="text-foreground/70">Full Stack Engineer</p>
        <p className="text-sm leading-6 text-foreground/80">{summary}</p>
        <a
          href="mailto:cesardanielvg@proton.me"
          className="text-sm font-medium hover:underline"
        >
          cesardanielvg@proton.me
        </a>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Experience</h2>
        {experience.map((job) => (
          <article key={`${job.company}-${job.period}`} className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium">
                {job.role} · {job.company}
              </h3>
              <span className="text-sm text-foreground/70">{job.period}</span>
            </div>
            <ul className="list-disc pl-5 text-sm leading-6 text-foreground/80">
              {job.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Education</h2>
        {education.map((entry) => (
          <div
            key={entry.degree}
            className="flex flex-wrap items-baseline justify-between gap-2"
          >
            <p className="font-medium">
              {entry.degree} · {entry.school}
            </p>
            <span className="text-sm text-foreground/70">{entry.period}</span>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-sm text-foreground/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
