import Map from "./components/Map/Map";
import MapContainer from "./components/Map/MapContainer";
import UploadImages from "./components/UploadImages";
import AddEventForm from "./components/AddEventForm";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { getCurrentUser } from "./store/session";
import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import SplashPage from "./components/SplashPage/SplashPage";
import MainPage from "./components/MainPage/MainPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    loaded && (
      <>
        <Switch>
          <AuthRoute exact path="/" component={SplashPage} />
          <Route path="/map-test" component={MapContainer} />;
          {/* <ProtectedRoute path="/upload-image-test" component={UploadImages} /> */}
          <ProtectedRoute
            exact
            path="/upload-image-test"
            component={AddEventForm}
          />
          <ProtectedRoute exact path="/main" component={MainPage} />
        </Switch>
      </>
    )
  );
}

export default App;
