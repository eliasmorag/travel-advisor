import React from "react";

import useStyles from "./place-details.styles";

const PlaceDetails = ({ place }) => {
  const classes = useStyles();

  return <h1>{place.name}</h1>;
};

export default PlaceDetails;
