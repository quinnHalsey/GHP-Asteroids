const TOGGLE_ANIMATION = "TOGGLE_ANIMATION";

export const toggleAnimation = (paused) => {
  return {
    type: TOGGLE_ANIMATION,
    paused,
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
