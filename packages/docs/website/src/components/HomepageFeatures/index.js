import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

// GitHub Octicons
// See: https://github.com/primer/octicons/tree/main/lib/octicons_react
import {
  CopilotIcon,
  MarkGithubIcon,
  CloudIcon,
  PeopleIcon,
  WorkflowIcon,
  RocketIcon,
  CodespacesIcon,
} from "@primer/octicons-react";

const FeatureList = [
  {
    title: "Open Source",
    icon: (
      <a href="https://github.com/Azure-Samples/contoso-real-estate/fork">
        <MarkGithubIcon size="large" aria-label="GitHub" />
      </a>
    ),
    description: <> Fork the reference implementation. Then use the guide to explore it. </>,
  },
  {
    title: "AI Assistance",
    icon: (
      <a href="https://github.com/features/copilot">
        <CopilotIcon size="large" aria-label="GitHub Copilot" />
      </a>
    ),
    description: <>Activate GitHub Copilot. Use it to author, explain and explore, application code.</>,
  },
  {
    title: "Dev Environments",
    icon: (
      <a href="npm install --save @docusaurus/plugin-sitemap">
        <CodespacesIcon size="large" aria-label="Seamless local & remote development with Codespaces" />
      </a>
    ),
    description: <>Activate GitHub Codespaces. Get a consistent dev environment everywhere.</>,
  },
  {
    title: "Extensible Scenarios",
    icon: (
      <a href="/define/scenarios">
        <PeopleIcon size="large" aria-label="User Stories as Design Specification" />
      </a>
    ),
    description: <>Define and prioritize scenarios to drive iterative development & extensibility.</>,
  },
  {
    title: "Composable Architecture",
    icon: (
      <a href="/define/architecture">
        <WorkflowIcon size="large" aria-label="Composable Architecture with building blocks" />
      </a>
    ),
    description: <>Drive API-first design with a composable architecture for optimal flexibility.</>,
  },
  {
    title: "Cloud-native Deployment",
    icon: (
      <a href="https://azure.microsoft.com/en-us/solutions/cloud-native-apps">
        <CloudIcon size="large" aria-label="Cloud-native apps with Azure" />
      </a>
    ),
    description: <>Build on managed Azure services and enterprise-grade tools for scalablility.</>,
  },
];

function Feature({ title, description, icon }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">{icon}</div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <div>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
          {/*
          <div className="row">
            {ServicesList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
            */}
        </div>
      </section>
    </div>
  );
}
