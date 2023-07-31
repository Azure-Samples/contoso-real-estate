/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  guideSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Define',
      items: [{type: 'autogenerated', dirName: '01-define'}],
    },
    {
      type: 'category',
      label: 'Develop',
      items: [{type: 'autogenerated', dirName: '02-develop'}],
    },
    {
      type: 'category',
      label: 'Deploy',
      items: [{type: 'autogenerated', dirName: '03-deploy'}],
    },
    {
      type: 'category',
      label: 'DevOps',
      items: [{type: 'autogenerated', dirName: '04-devops'}],
    },
    'glossary',
  ],

  toolsSidebar: [{type: 'autogenerated', dirName: '05-devtools'}],

  trainingSidebar: [{type: 'autogenerated', dirName: '99-training'}],

  /*
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
