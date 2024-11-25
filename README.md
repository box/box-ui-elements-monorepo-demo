# This monorepo is a collection of different applications that demostrates box-ui-elements in different frameworks.

## Getting Started

### Install dependencies

```bash
yarn install
```

## Check out the NextJs demo

### Navigate to the `apps/nextjs` directory and run the following commands:

```bash
yarn build && yarn start
```

Open [http://localhost:6061](http://localhost:6061) with your browser to see demos of the elements.

## Check out the Vite demo

### Navigate to the `apps/vite` directory and run the following commands:

```bash
yarn dev
```

Open [http://localhost:6061](http://localhost:6061) with your browser to see demos of the elements.

#### Note

Make sure to kill the port 6061 if you run both of the demos back to back.

## Things to know

- All the dependencies are hoisted to the root level `node_modules` folder. This is done to avoid duplication of dependencies across the packages.
- All the dependencies are required for box-ui-elements to be fully functional
- Packages is used for shared components across the apps that are not required to use for implementation
- Apps is used for the demo apps that are built using different frameworks
- We are using react 18 in all the demos
- We are using Turborepo to manage the monorepo which is listed as a devDependency in the root package.json
- All demos were generated from the respective frameworks' CLI
- Default global styles were deleted from the demos to avoid conflicts with the box-ui-elements styles
