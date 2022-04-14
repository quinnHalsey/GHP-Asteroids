import React from "react";

const SingleAsteroid = ({ asteroid }) => {
  const missDistance = Number(
    asteroid.close_approach_data[0].miss_distance.kilometers
  ).toFixed(2);
  const diameter =
    asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2);
  const closeApproach =
    asteroid.close_approach_data[0].close_approach_date_full;
  const velocity = Number(
    asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
  ).toFixed(2);
  return (
    <div id="single-asteroid-info">
      <h1>{asteroid.name}</h1>
      {asteroid.is_potentially_hazardous_asteroid ? (
        <p className="hazard">
          <strong>Potentially Hazardous</strong>
        </p>
      ) : (
        <p className="non-hazard">
          <strong>Not Hazardous</strong>
        </p>
      )}
      <div className="details-list">
        <p>Miss Distance: {missDistance}km</p>
        <p>Close Approach: {closeApproach}</p>
        <p>Diameter: {diameter}m</p>
        <p>Velocity: {velocity}km/s</p>
      </div>
    </div>
  );
};

export default SingleAsteroid;
