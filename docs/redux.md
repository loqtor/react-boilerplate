# Using Redux

This project follows the re-ducks structure and approach to implementing Redux-related things. Read the info in the [re-ducks repo](https://github.com/alexnm/re-ducks) for details on what things do and where things go.

Other docs you should look at are the [main Redux docs](https://redux.js.org/basics/basic-tutorial) and the [Redux-Sagas docs](https://redux-saga.js.org/), which we use for async behaviour (e.g. API requests).

For a guide on adding new Redux-related things (specifically getting data from an API) read on!

----

## Complete guide to adding a new Redux module

Let's imagine you're adding a feature that requires you to display data about planets. A new API has been added that returns information about a specific planet and you've created a component that is going to display that information. The next step is to create a new Redux module that makes this all happen.

Start by creating a new folder called `planets` within the `src/redux/modules` folder.

Folders within `modules` relate to individual concepts with the application (e.g. `user`, `shoppingCart`, `posts` etc.), and contain all the logic for managing the state of that _thing_ - fetching related data from an API, retrieving the data from the Redux store and modifying the Redux store state.

### Actions
We'll start by setting up an _action_ that our components can send to our Redux store to say they want some data to be fetched.

Under the hood an action is a plain JavaScript object that contains a _type_ and any data you want to provide to the store. The _type_ is how our store decides what it should do when it receives the action.

#### Definine the action types
We'll start by defining the action types for fetching planet data. We'll need a type that tells the store to fetch the data from the API, a type that will be used if the API request is successful and one for if the request fails.

- Create a file called `types.js` within you `planets` folder
- Add the following code:

```js
import { createTypes, async } from 'redux-action-creator';

export default createTypes([...async('FETCH_PLANET')], 'PLANETS');
```

We're using some utility function here that obscure things a little bit, but the result is that this file will export three type strings for us  - `FETCH_PLANETS`, `FETCH_PLANETS_SUCCESS` and `FETCH_PLANETS_FAIL`. These strings don't do anything special by themselves, but we'll use them throughout our code as a way of identifying what's going on with the Redux store. This sets us up nicely to implement things like API calls, where the initial action can result in success or failure states that we'll want to handle.

_See the [redux-action-creator](https://github.com/andy-shea/redux-action-creator) readme for details on what exactly the utility functions do._

#### Action Creator
Next we'll create an action creator. As mentioned earlier, an _action_ is a plain JavaScript object. An _action creator_ is a function that returns such an object. We could manually create action objects whenever we need them, but having a function lets us write less code and keep things consistent.

 - Create a file called _actions.js_ within your `planets` folder.
 - Add the following code:

```js
import { actionCreator } from 'redux-action-creator';
import types from './types';

const fetchPlanet = actionCreator(types.FETCH_PLANET, 'planetName');

export default {
  fetchPlanet,
};
```

This creates a function called `fetchPlanet` which accepts one parameter - an object with a property called "planetName". When called this function will return something like:

```js
// fetchPlanet({ planetName: 'Saturn' }) would return:
{
  type: "PLANETS_FETCH_PLANET",
  payload: {
    planetName: "Saturn",
  }
}
```

Later we'll call this action creator function from our components and pass the result (the action) through to the store (this is called _dispatching_ an action). But first we need to set the store up to do something when it receives the action.

### Sagas

We use [Redux-Saga](https://redux-saga.js.org/) to perform async things, like API requests. Saga-related code is built using JavaScript Generator functions. These can be difficult to get you head around and we're not going to explain them in too much detail here. Have a read of _[The Basics of ES6 Generators](https://davidwalsh.name/es6-generators)_ to understand them better.

#### API Call

We'll start by quickly making a function that calls our API. How exactly this works will depend on the API you're integrating with.

- Create a file called `api.js` in your `planets` folder
- Add the following code (or whatever is necessary to call your API - as long as the `fetchPlanet` function returns a promise):

```js
import makeRequest from '../../../tools/utilities/ajax';

const fetchPlanet = planetName => makeRequest(`/planet/${planetName}`, 'get', null);

export default {
  fetchPlanet,
};
```

#### Saga

Now we'll set up a saga that listens for our _FETCH_PLANET_ action by doing the following:

- Create a file called `sagas.js` within your `planets` folder
- Add the following code:

```js
import { takeEvery } from 'redux-saga/effects';

import types from './types';

function* fetchPlanet(action) {
  // We'll fill this in shortly
}

export function* planetSaga() {
  yield takeEvery(types.FETCH_PLANET, fetchPlanet);
}

export default planetSaga;

```

The key line in this code is the `yield takeEvery(...)`. This says "every time we see a "FETCH_PLANET" action, call the fetchPlanet function.

Now we'll fill in the `fetchPlanet` function to call the API, using the function we created in the _api.js_ file:


```js
import { takeEvery, call, put } from 'redux-saga/effects';

import api from './api';
import types from './types';

function* fetchPlanet(action) {
  // Get the data we passed through when creating the action
  const { planetName } = action.payload;

  try {
    // Call our API, using a yield to wait for it to return before moving on to the rest of the function
    const response = yield call(api.fetchPlanet, planetName);

    // Once we have an API response, send a "success" action to the store, with the data the API returned
    yield put({ type: types.FETCH_PLANET_SUCCESS, payload: response });
  } catch (error) {
    // If anything goes wrong, send a "fail" action instead
    yield put({ type: types.FETCH_PLANET_FAIL, payload: error });
  }
}

export function* planetSaga() {
  yield takeEvery(types.FETCH_PLANET, fetchPlanet);
}

export default planetSaga;
```

And that's our saga complete! We're almost at the end of setting this all up.

### Reducers

At this stage we've set things up so that we can create an action that, when dispatched to the store, will cause our API to be called, with success and failure actions triggered depending on the result. Now we need to save the result of the API call to our store's state so our components can read it. Redux uses things called _reducers_ to modify the state of the store.

Reducers are functions that are called whenever an action is triggered. Within the reducer we'll check if the action type is something we understand, and if it is update the state of the store appropriately. Whatever we return from the reducer will become the new state of the store.

To implement this:

- Create a file called `reducers` within your `planets` folder
- Add the following code:

```js
import types from './types';

export const initialState = {
  planets: {},
  isLoading: false,
};

const reducerPlanet = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PLANET:
      // When we trigger the initial FETCH event set the state to loading
      return {
        ...state,
        isLoading: true,
      };
    case types.FETCH_PLANET_SUCCESS:
      // This action is triggered from our saga. We update the state with the data the API returned
      return {
        ...state,
        isLoading: false,
        planets[action.payload.planetName]: action.payload,
      };
    case types.FETCH_PLANET_FAIL:
      // This is also triggered by our saga, when the API request fails.
      // Exactly what you do here will depend on how your application is handling errors
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducerPlanet;
```

The `reducerPlanet` function takes in the current state of the store and an action - the very same actions that we'll dispatch from our components and that our saga triggers.

It then checks what the type of the action is. For the initial `FETCH_PLANET` action we simply update the state to say that we're loading something. When we see `FETCH_PLANET_SUCCESS` the action payload will be the result of the API request, since that's what we set our saga up to pass through. We add that data into the state (via the object we return from the function), allowing the rest of the app to access it.

### Selectors

Now we need to create a function that our components can use to get data the data we just set on the store. This is called a _selector_.

At its most basic a selector can be thought of as a utility function for accessing deep properties of the state object. More complex selectors (e.g. ones that compute values based on the state) should use the [reselect](https://github.com/reduxjs/reselect) package to ensure things remain efficient.

For this example we'll create a simple selector, called `getPlanet`, that returns the data for a specific planet:

- Create a file called `selectors.js` within your `planets` folder
- Add the following code:

```js
const getPlanet = (state, planetName) => state.planets.planets[planetName];

export default {
  getPlanet,
};
```

### Connecting it to the store

The final step before we're ready to use our new actions and selectors is to connect everything to the Redux store.

- Make a file called `index.js` within your planets folder
- Add the following code:

```js
import reducerPlanets from './reducers';

export { default as typesPlanets } from './types';
export { default as selectorsPlanets } from './selectors';
export { default as actionsPlanets } from './actions';
export { default as sagasPlanets } from './sagas';

export default reducerPlanets;
```

This will let us import bits of the Planets Redux module from elsewhere in our app with a line like `import { selectorsPlanets } from '../redux/modules/planets'`.

Next open the `modules/index.js` file and add a line like this, which exports our planet reducer:
```js
export { default as planets } from './planets';
```

We also need to add our planet saga in with all the other sagas. This is done in the `modules/sagas.js` file. Open that file up and update it so that your planetsSaga is included in the `yield all([...])` call:

```js
import { fork, all } from 'redux-saga/effects';
import { userSaga } from './user/sagas';
import { planetsSaga } from './planets/sagas'; // add this line

export default function* root() {
  yield all([fork(userSaga), fork(planetsSaga)]); // ...and add the `fork(planetsSaga)` call here
}
```

And we're done! The `redux/index.js` file should already be set up to automatically consume the things you just exported and connect them to the Redux store, so there's nothing more we need to do here.

### Connecting our component

Our final step (for real this time) is to connect our React component to the Redux store, allowing it to ask for planet data to be fetched (using our _FETCH_PLANET_ action) and reading the loaded data (via our _getPlanet_ selector).

We typically do this using a _connector_. A connector is a component created using [Redux's connect function](https://react-redux.js.org/introduction/basic-tutorial#connecting-the-components). It wraps our actual component and passes data from the store and functions that dispatch store actions through to the component (as props).

Let's imagine we have a component called _PlanetCard_ that displays data about a planet. We'll create a corresponding connector that passes it two things: a function that dispatches our FETCH_PLANET action and any data that the store has about the planet.

- Create a file `src/views/connectors/PlanetCard/index.js`
- Add the following code:

```js
import { connect } from 'react-redux';

import { actionsPlanets, selectorsPlanets } from '../../../redux/modules/planets';

import { PlanetCard } from '../../components/PlanetCard';

const mapStateToProps = (state, props) => ({
  planet: selectorsPlanets.getPlanet(state, props.planetName),
});

const mapDispatchToProps = (dispatch, props) => ({
  loadPlanet() {
    const planetName = { props };
    return dispatch(actionsPlanets.fetchPlanet({ planetName }));
  },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PlanetCard);
```

The `mapStateToProps` function is where we extract data from the store that the component needs. See the [Redux _mapStateToProps_ documentation](https://react-redux.js.org/using-react-redux/connect-mapstate) for details of what it does.

The `mapDispatchToProps` function is where we define functions that dispatch actions on the store. See the [Redux _mapDispatchToProps_ documentation](https://react-redux.js.org/using-react-redux/connect-mapdispatch) for details of what it does.

The result of this is that our base _PlanetCard_ component will now receive two extra props: `planet` (data about the specified planet, once it's been loaded) and `loadPlanet` (a function that dispatches the `FETCH_PLANET` action). Exactly what you do with those inside your component is up to you, so we won't cover that here.

You can now use your connected component in your app! For our example here, this might look something like:

```js
import ConnectedPlanetCard from '../../connectors/PlanetCard';

// Somewhere within a `render` method:
<ConnectedPlanetCard planetName="Saturn" />
```

This will render our underlying `PlanetCard` component, passing in three props:

- `planetName`: the same prop that we passed to `ConnectedPlanetCard` ("Saturn" in this case)
- `planet`: data from the store about the planet (this will be undefined until you trigger a `FETCH_PLANET` action)
- `loadPlanet` a function that, when called, will dispatch the `FETCH_PLANET` action (with the `planetName` you passed to the connected component in the payload)