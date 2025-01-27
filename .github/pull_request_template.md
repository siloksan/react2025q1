1. Task: [React project setup. Class components. Error boundary.](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md)
2. Screenshot:
   ![image](https://github.com/siloksan/react2024q3/assets/107646198/70f2318b-0ce5-427a-b5e5-3ed73bfb4629)
3. Deploy: [deploy](https://react-star-trek.netlify.app/)
4. Done 2024-07-07 / deadline 2024-07-08
5. Score: 100/100

## Points

- [x] Eslint is set up, when lint command is run it doesn't produce any errors (if there are warnings score might be less) - 15 points
- [x] Prettier is set up, format:fix command fixes issues - 15 points
- [x] Husky is set up, linting is run on pre-commit - 10 points
- [x] Page is split into at least two sections, top one has Search input and "Search" button, main section displays the list of results from the selected api when page is opened for the first time (loader should be shown while app makes a call to the api) - 20 points
- [x] When user types something to the Search input and clicks "Search" button, a loader is displayed and the list is changed according to the response results for a provided search term - 15 points
- [x] The search term typed into the Search input is saved in the LS when user clicks on "Search" button (check it by closing the tab and open the app in the new one - the initial call should contain previously entered search term) - 15 points
- [x] Application is wrapped with ErrorBoundary, which logs error to a console and shows a fallback UI. There should be a button to throw an error - 10 points

## Penalties

- [ ] TypeScript isn't used: -95 points
- [ ] eslint-plugin-react-compiler isn't used or isn't configured to throw errors: -50 points
- [ ] Usage of any: -20 points per each
- [ ] Usage of ts-ignore: -20 points per each
- [ ] Direct DOM manipulations inside the React components: -50 points per each
- [ ] React hooks are used to get access to either state, or to the component lifecycle: -70 points
- [ ] Presence of code-smells (God-object, chunks of duplicate code), commented code sections: -10 points per each
- [ ] Usage of Redux or other state management libraries: -100 points
- [ ] Usage of component libraries, e.g. Material UI, Ant Design: -100 points
- [ ] Pull Request doesn't follow guideline (including checkboxes in Score): -10 points
