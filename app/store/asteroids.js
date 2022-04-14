import Axios from "axios";
import regenerator from "regenerator-runtime/runtime";

const apiKey = "wkojjdAHb00oQ2lTPmFNXob4MynVBnyJ9efXjY8d";

const GET_ASTEROIDS = "GET_ASTEROIDS";

const getAsteroids = (asteroids) => {
  console.log(asteroids, "asteroids after thunks");
  return {
    type: GET_ASTEROIDS,
    asteroids,
  };
};

export const fetchAsteroids = (date) => {
  console.log("inside fetch asteroids");
  return async function (dispatch) {
    const { data } = await Axios.get(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`
    );
    const asteroids = data.near_earth_objects[date].filter((asteroid) => {
      return (
        Number(asteroid.close_approach_data[0].miss_distance.kilometers) <=
        11000000
      );
    });
    dispatch(getAsteroids(asteroids));
  };
};

export default function asteroidsReducer(asteroids = [], action) {
  switch (action.type) {
    case GET_ASTEROIDS:
      return action.asteroids;
    default:
      return asteroids;
  }
}
