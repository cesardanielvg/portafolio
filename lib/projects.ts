import fs from "fs";
import path from "path";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  tech: string[];
  repo?: string;
  demo?: string;
  date: string; // YYYY-MM
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function parseFrontmatter(raw: string): Record<string, string> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
  if (!match) return {};
  const fields: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    fields[key] = value;
  }
  return fields;
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => /\.mdx?$/.test(file));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
      const fields = parseFrontmatter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: fields.title ?? "",
        summary: fields.summary ?? "",
        tech: parseList(fields.tech),
        repo: fields.repo || undefined,
        demo: fields.demo || undefined,
        date: fields.date ?? "",
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
