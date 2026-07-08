import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-foreground/15 p-5">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="flex-1 text-sm leading-6 text-foreground/70">
        {project.summary}
      </p>
      <ul className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-foreground/15 px-2.5 py-0.5 text-xs text-foreground/70"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 text-sm font-medium">
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Repo ↗
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
