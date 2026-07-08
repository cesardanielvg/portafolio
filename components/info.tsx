import Link from "next/link";
import { getProjects } from "@/lib/projects";
import ProjectCard from "@/components/project-card";

export default function Info() {
  const projects = getProjects();

  return (
    <div className="flex flex-col gap-12 py-8">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Cesar Vergara</h1>
        <p className="text-foreground/70">
          Full Stack Engineer — backend and cloud-based solutions across
          healthcare, insurance, and enterprise systems.
        </p>
        <div className="flex flex-wrap gap-4 text-sm font-medium">
          <a href="mailto:cesardanielvg@proton.me" className="hover:underline">
            cesardanielvg@proton.me
          </a>
          <Link href="/cv" className="hover:underline">
            View CV →
          </Link>
        </div>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
