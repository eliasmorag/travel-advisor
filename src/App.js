import { CssBaseline, Grid } from "@material-ui/core";
import "./App.css";
import Header from "./components/header/header.component";
import List from "./components/list/list.component";
import Map from "./components/map/map.component";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
