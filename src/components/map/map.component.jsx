import React from "react";
import { useMediaQuery } from "@material-ui/core";
import GoogleMapReact from "google-map-react";

import useStyles from "./map.styles";

const Map = ({ coordinates, setCoordinates, setBounds }) => {
  const classes = useStyles();

  // Set to false if larger than specified value
  const isMobile = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={{ lat: 37.419857, lng: -122.078827 }}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(event) => {
          console.log(event);
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          setBounds({ ne: event.marginBounds.ne, sw: event.marginBounds.sw });
        }}
        onChildClick={(child) => {
          console.log(child);
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
