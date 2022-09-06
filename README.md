## Requirements

[Node.js](https://nodejs.org/en/)

## Recommended IDE

-   VS Code
    -   Plugins:
        -   ESLint
        -   Prettier

## Getting started

1. Install Node.js
2. Clone repository
3. Run `npm install` in repository root
4. Run `npm start`

## Libraries

-   State management
    -   Redux
    -   Redux Toolkit
-   Styling
    -   Material UI
    -   CSS Modules
    -   Emotion CSS
-   Routing
    -   React Router
-   Linting
    -   ES Lint
    -   Prettier

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Structure

-   Components
    -   Contains components used in the application, different forms & buttons etc.
-   Features
    -   Contains a single feature (a page) which is comprised of components
-   Store
    -   Contains Redux store related functionality
    -   Each separate slice/reducer in its own folder
        -   Action: The functionality (e.g. a call to backend)
        -   Slice: What to do before and after the action has been dispatched/completed (e.g. add the action response to store)
        -   Types: Types used by the slice if not found elsewhere (e.g. state)
    -   Client
        -   Client to interface with the backend and set appropriate headers to calls etc.
-   Models
    -   TypeScript types used by the application (e.g. backend DTOs, other types used in application widely)
