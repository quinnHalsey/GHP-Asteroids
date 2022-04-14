const EARTH_TO_SCALE = "EARTH_TO_SCALE";
const DISTANCE_TO_SCALE = "DISTANE_TO_SCALE";
const TOGGLE_ANIMATION = "TOGGLE_ANIMATION";

const initialState = {
  earthToScale: false,
  distanceToScale: false,
  paused: false,
};

export const toggleAnimation = (paused) => {
  return {
    type: TOGGLE_ANIMATION,
    paused,
  };
};

export const earthToScale = (boolean) => {
  return {
    type: EARTH_TO_SCALE,
    earthToScale: boolean,
  };
};

export const animationReducer = (paused = false, action) => {
  switch (action.type) {
    case TOGGLE_ANIMATION:
      return action.paused;
    default:
      return paused;
  }
};
