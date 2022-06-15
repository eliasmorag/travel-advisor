import React from "react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import GoogleMapReact from "google-map-react";
import { Rating } from "@material-ui/lab";

import useStyles from "./map.styles";

const Map = ({ coordinates, setCoordinates, setBounds, places }) => {
  const classes = useStyles();

  // Set to false if larger than specified value
  const isDesktop = useMediaQuery("(min-width:600px)");

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
      >
        {places.length &&
          places
            .filter((place) => place.latitude && place.longitude)
            .map((place, i) => (
              <div
                className={classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}
              >
                {!isDesktop ? (
                  <LocationOnOutlinedIcon color="primary" fontSize="large" />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      className={classes.typography}
                      variant="subtitle2"
                      gutterBottom
                    >
                      {" "}
                      {place.name}
                    </Typography>
                    <img
                      className={classes.pointer}
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                      }
                      alt={place.name}
                    />
                    <Rating
                      name="read-only"
                      size="small"
                      value={Number(place.rating)}
                      readOnly
                    />
                  </Paper>
                )}
              </div>
            ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
