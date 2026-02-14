# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

Option 1: Quick Test in CodeSandbox (Easiest)

Go to codesandbox.io
Click "Create Sandbox" → Choose "React"
Replace the contents of App.js with the builder code
It will run automatically!

Option 2: Run Locally with Create React App
Step 1: Create a new React app
bashnpx create-react-app react-builder
cd react-builder
Step 2: Install Lucide Icons (required dependency)
bashnpm install lucide-react
Step 3: Replace App.js

Copy the react-builder.jsx code
Replace the contents of src/App.js with it

Step 4: Run the app
bashnpm start
The builder will open in your browser at http://localhost:3000
Option 3: Run with Vite (Faster)
Step 1: Create a Vite project
bashnpm create vite@latest react-builder -- --template react
cd react-builder
Step 2: Install dependencies
bashnpm install
npm install lucide-react
Step 3: Replace App.jsx

Copy the react-builder.jsx code
Replace the contents of src/App.jsx with it

Step 4: Run the dev server
bashnpm run dev
Open the URL shown (usually http://localhost:5173)
Quick Start Script
Here's a complete script you can copy/paste in your terminal:
bash# Using Create React App
npx create-react-app my-builder
cd my-builder
npm install lucide-react
# Now copy react-builder.jsx contents to src/App.js
npm start
Or with Vite (faster):
bash# Using Vite
npm create vite@latest my-builder -- --template react
cd my-builder
npm install
npm install lucide-react
# Now copy react-builder.jsx contents to src/App.jsx
npm run dev
What You Need:

✅ Node.js (v14 or higher)
✅ npm or yarn
✅ The react-builder.jsx file I created

That's it! Once running, you can start building applications visually and exporting the code. Let me know if you hit any issues!
