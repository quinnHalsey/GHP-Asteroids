const SET_SINGLE_ASTEROID = "SET_SINGLE_ASTEROID";

export const setSingleAsteroid = (asteroid) => {
  return {
    type: SET_SINGLE_ASTEROID,
    asteroid,
  };
};

const singleAsteroidReducer = (asteroid = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_ASTEROID:
      return action.asteroid;
    default:
      return asteroid;
  }
};

export default singleAsteroidReducer;
