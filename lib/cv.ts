export type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export const summary =
  "Proactive and detail-oriented Full Stack Engineer with a strong focus on backend and cloud-based solutions, bringing experience across healthcare, insurance, and enterprise systems.";

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "Slalom",
    period: "Dec 2024 — Present",
    highlights: [
      "MWCIA (Insurance) — cloud migration and modernization of legacy applications to Azure. Stack: .NET Framework, ASP, Azure, MSSQL.",
      "Inspira (Healthcare / Benefits Management) — development of a health benefits management application covering savings plans and spending benefits. Stack: React, Node.js, PostgreSQL.",
    ],
  },
  {
    role: "Software Engineer, Consultant",
    company: "Apex Systems",
    period: "Jan 2023 — Dec 2024",
    highlights: [
      "GMR (Global Medical Response) — modernization of legacy systems feeding a dispatching system for private medical flight operations; performed assessment and knowledge transfer across a large set of systems.",
      "Secured over 450 endpoints by fixing authorization/authentication configurations and implementing security remediations advised by internal audit.",
      "Developed quoting features for Commercial Medical Escorts end to end, from design to deployment. Stack: .NET Framework 4.8, .NET 5/8, Angular 14, MSSQL, Azure DevOps.",
      "BCBS AZ (Healthcare / Insurance) — developed and supported a microservices platform delivering correspondence and benefits/payment documentation to customers and providers.",
      "Handled production incidents with triage, technical analysis, and long-term fixes; migrated solutions to newer .NET and raised SonarQube security/quality metrics to standard. Stack: Azure Functions, .NET 6/8, Kubernetes, Terraform, Jenkins, MSSQL.",
    ],
  },
  {
    role: "Software Developer Engineer",
    company: "Intel Corporation",
    period: "Oct 2019 — Dec 2022",
    highlights: [
      "EMA (Endpoint Management Assistance) — developed and supported end-to-end remote manageability solutions for vPro processors, across backend and frontend.",
      "Designed the implementation for Azure Active Directory integration.",
      "Acted as Scrum lead, supporting team collaboration and target dates; started as intern (Oct 2019 — Mar 2021) participating in architecture, refinement, and test design. Stack: C#, C/C++, .NET Framework, React, MSSQL, GitLab CI/CD.",
    ],
  },
  {
    role: "Part-time Software Engineer",
    company: "TIE",
    period: "Jun 2019 — Sep 2019",
    highlights: [
      "Supported custom desktop and web solutions connecting client flows with SAP Business One. Stack: Visual Basic/C#, ASP.NET, MSSQL, HTML, JavaScript.",
    ],
  },
];

export const education: Education[] = [
  {
    degree: "Computer Engineering",
    school: "Universidad de Guadalajara — CUCEI",
    period: "Dec 2021",
  },
  {
    degree: "Automatic Control and Instrumentation Technologist",
    school: "Centro de Enseñanza Técnica Industrial",
    period: "Dec 2016",
  },
];

export const skills: string[] = [
  "C# / .NET",
  "TypeScript",
  "React",
  "Angular",
  "Node.js",
  "MSSQL / PostgreSQL",
  "Azure",
  "Kubernetes",
  "Terraform",
  "REST APIs / GraphQL",
  "Agile / Scrum",
  "Unit testing",
];
