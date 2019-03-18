# \*\*\*\*

_Last Updated: 4 December 2018, Lilly Kwapisz_

## Table of Contents

- [Overview](#overview)
- [Build Tools and Dependencies](#build-tools-and-dependencies)
- [Installation](#installation)
- [Changing Branches](#changing-branches)
- [Running the Mock API Server](#running-the-mock-api-server)
- [Running the Development Server](#running-the-development-server)
- [Running Storybook](#running-storybook)
- [Running the Tests](#running-the-tests)
- [Folder Structure](#folder-structure)
- [SCSS Structure](#scss-structure)
- [Code Standards](#code-standards)
- [internationalisation (i18n)](#internationalisation)
- [Snapshot & Accessibility Testing](#snapshot-&-accessibility-testing)
- [Dev Tools](#dev-tools)

## Overview

This README outlines the details of collaborating and working on Alphero's React Boilerplate. The project is built using [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/docs/introduction/). Below are details about principles the project follows, getting up and running on your development machine and also includes testing and deployment details.

## Build Tools and Dependencies

The [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md) is extremely detailed and contains some of the information outlined below and more information about enhancing, extending and configuring the build tools.

The default build tools contain:

- React, JSX, Redux, and ES6 syntax support.
- Language extras beyond ES6 like the object spread operator.
- A dev server that lints for common errors.
- The ability to import CSS and image files directly from JavaScript.
- Autoprefixed CSS, so you don’t need -webkit or other prefixes.
- A build script to bundle JS, CSS, and images for production, with sourcemaps.
- An offline-first service worker and a web app manifest, meeting all the Progressive Web App criteria.

Dependency management is split between two main places:

- **Build Configuration Dependencies** - `node_modules/react-scripts/package.json`

  - As long as Create React App is not ['ejected'](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject), there should be no need to edit this file.
  - The build configuration and dependency list is managed by the Create React App team.
  - Refer to [Updating to New Releases](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#updating-to-new-releases) for how to update Create React App.
  - If for whatever reason greater configuration control is needed, then refer to [Ejecting Create React App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#npm-run-eject) for information about manual configuration - **Important!** please note, this is one way and can't be undone.

- **Development Dependencies** - `****/client/package.json`

  - These are the extra libraries we have added to enable various features and enhancements through development.
  - Installing libraries with npm or yarn using the `--save` or `--save-dev` flags should automatically update the package.json file.

## Installation

Follow the instructions below to pull down the repository.

1.  `git clone git@alphero.git.beanstalkapp.com:/alphero/alphero-react-boilerplate.git`
1.  `cd alphero-react-boilerplate`
1.  _(Might be required)_ You'll need Node 9.2+ to run this project. Run `nvm install node` and `nvm use node` to install and use the latest version of Node.
1.  _(Might be required)_ You'll also need Yarn 1.5.1+ to run this project. Run `brew install yarn` to install the latest version of yarn.
1.  Run `yarn install` to install dependencies required to run the API proxy server.
1.  `cd client`
1.  Run `yarn install` to install dependencies required to run the project.

## Running the app, with the Proxy Server

Once the dependencies are installed, in the main project directory, you can run:

### `yarn start`

This will run the React app (i.e. the thing in client/) and the API proxy server. Your project may need not need the proxy server, but it can be useful for bypassing browser CORS restrictions and rewriting cookies.

Open [http://localhost:3002](http://localhost:3002) to view the React app.

- The page will reload if you make edits.
- You will also see any lint errors in the console.
- This will also start watching for and compiling SASS changes.
- ^C will stop the server if necessary.

## Running Storybook

[React Storybook](https://storybook.js.org/basics/introduction/) is a UI development environment for React components. With it, you can visualize different states of UI components and develop them interactively. It also serves as a useful reference guide for what components exist in the project for re-use.

React Storybook runs outside of the app. So you can develop UI components in isolation without worrying about app specific dependencies and requirements. Once built you can include in the app to customize as per requirements and app data.

In a separate terminal tab or terminal window open the client project directory, and run:

### `yarn run storybook`

Then you can access your storybook from the browser.

## Running the tests

In a separate terminal tab or terminal window open the client project directory, and run:

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

## Folder Structure

React / Redux and Create React App do not dictate where files should live. Therefore to avoid a mess and inefficiency, some sort of pattern or methodology should be followed.

For smaller projects, arranging your files by type will suffice. However, on larger projects this can become clunky and a more modular approach is usually advisable.

This project follows the modular principles of the Redux [Ducks](https://github.com/erikras/ducks-modular-redux) enhanced with Redux [Re-Ducks](https://github.com/alexnm/re-ducks) patterns. However, rather than call modules 'ducks' we have re-labelled them 'modules'.

It is important to read the information contained in both links to ensure you can apply a consistent approach to the project build and ensure that it will continue to scale well.

The general outline is as below:

```
`****/
  bin/                            // Express server related
  client/
    node_modules/
    package.json
    public/
      index.html
      favicon.ico
      manifest.json
    .storybook                 // Storybook config files
      addons.js
      config.js
    src/
      redux/
        modules/
          example/              // module folder containing all redux / data / action handling
            actions.js
            constants.js
            index.js
            reducers.js
            reducers.test.js
            sagas.js
            selectors.js
            types.js
        styles/                        // SCSS shared between both Single Page Apps
        tools/                         // Various tools for things like i18n
          i18n/                        // Directory containing all localised translation JSON files
            en-nz.json
          utilities/                   // All handy utility functions for use within the client dir
        views/
          components/           // Presentational components (stateless / dumb / pure)
            example/
              _snapshots_       // Automatically generated snapshot files
              index.scss        // Component specific styles
              index.js
              index.test.js
          connectors/           // Smart components for mapping data from store to presentational components
            example/
              index.js
              index.test.js
          enhancers/            // Higher order components for enhancing components with shared functionality (replaces concept of mixins)
          pages/                // Main content views i.e. dashboard
            example/
              index.js
              index.test.js
          stories               // Storybook stories
        index.js
    server/
      mocks/                        // JSON files for express mocking
        example.js
      util/                         // Util functions for use within the server
        example.js
    tools/                          // Build tools, npm scripts etc
    .gitignore
    package.json                  // Express server related
    server.js                     // Express server related
    yarn.lock
    .env                          // Custom environment variables
```

## SCSS Structure

Within the project there is a styles folder that contains [AINT CSS](https://alphero.beanstalkapp.com/aintcss) which can be extended/edited as appropriate.<br>

## Code Standards

This project adheres to the standards laid out by Airbnb's [JavaScript Style Guide](https://github.com/airbnb/javascript) and [React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).

It is important to read the information contained in both links to ensure you can code to meet these standards as the Airbnb linting rules are installed as a dependency for the project and will catch code that fails the ruleset.

The pragmatic principles outlined in [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript) are also useful to keep in mind. Semantic code and explicit-ness is preferred.

This project also strives to conform to accessibility standards for [document structure and HTML markup](https://internetingishard.com/html-and-css/semantic-html/). [HTML Code Sniffer](http://squizlabs.github.io/HTML_CodeSniffer/) is a useful JavaScript bookmarklet to help audit the accessibility of the UI.

## Snapshot & Accessibility Testing

Within the Jest unit tests there is a utility provided to run an automated accessibility audit via aXe-core, we aim to reach WCAGAA conformance at a minimum and recommend making use of this utility wherever possible (usually shallow mounted components, aXe testing can be difficult with very deep components).

Snapshot testing is also available and you can expect there to be some previously established snapshots within the code base,
if you make a minor change, especially to a prop on a component and you run your tests and they return an error similar to
**Received value does not match stored snapshot** you will need to check the snapshot in question, ensure it is correct and update the snapshot via your command line via `yarn test -- -u`.

Any Storybook stories added will automatically generate a snapshot test.

## Internationalisation

We use [react-intl](https://github.com/yahoo/react-intl) for internationalisation, it comes with various components and utility functions for things such as printing dates, currency and strings all set to the locale we determine. Please use these utilities wherever possible.
All wording should be put into the en-nz.json (at a minimum, assuming there are no other translation files) with a specifically (yet modular if possible) named key, this means we have a single entry file where we can make simple changes to all strings and internationalise in future if needed.

## Dev Tools

Working with any JavaScript framework can be tricky without some ability to inspect what's going on. The following tools are absolute musts:

- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) is a Chrome DevTools extension for React. It allows you to inspect the React component hierarchies in the Chrome Developer Tools.
- [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) is a Chrome DevTools extension for Redux. It allows you to inspect that state held in the global Redux store and track / log actions as they happen in the app.

## Browser Support and Polyfills

This project makes use of modern JavaScript features that aren't support in older browsers (e.g. Internet Explorer). Polyfills from the [core-js library](https://github.com/zloirock/core-js) are used to allow the site to run on older browsers (tested in IE 11, other browsers may require further tweaking).

To avoid bloating the build, polyfills are only added for features that are used. To add a polyfill, find the relevant "CommonJS entry point" in the [core-js docs](https://github.com/zloirock/core-js) and add it as an import at the very top of `client/src/index.js`.

CSS features will be automatically prefixed to support the browsers specified in the `browserslist` section of `client/pacakage.json`