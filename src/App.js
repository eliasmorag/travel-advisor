import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getPlacesData } from "./api/travel-advisor-api";
import "./App.css";
import Header from "./components/header/header.component";
import List from "./components/list/list.component";
import Map from "./components/map/map.component";

const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});

  const [bounds, setBounds] = useState(null);

  // TODO: replace with context or Redux
  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);
      getPlacesData("restaurants", bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        setIsLoading(false);
      });
    }
  }, [bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={places}
            childClicked={childClicked}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
