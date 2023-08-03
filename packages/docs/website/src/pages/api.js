import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import SwaggerUI from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css';


export default function App() {

    const {siteConfig} = useDocusaurusContext();
    return (
      <Layout
        title={`OpenAPI Specification for Contoso Real Estate`}
        description="Documentation auto-generated for the OpenAPI YAML using swagger-ui-react">
        <main>
            <SwaggerUI url="yml/openapi.yaml" />
        </main>
      </Layout>
    );
  }
