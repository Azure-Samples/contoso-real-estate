import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Scenarios',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Implements an end-to-end real world use case in 7 scenarios.
      </>
    ),
  },
  {
    title: 'Specification',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Solution specification covers API, UI Components and Testing.
      </>
    ),
  },
  {
    title: 'Serverless on Azure',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        Signature showcase app for serverless solutions on Azure.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}