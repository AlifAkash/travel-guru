import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import Rooms from './Components/Rooms/Rooms';
import { createContext, useState } from 'react';
import fakeData from './Components/FakeData/FakeData';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import SignUp from './Components/SignUp/SignUp';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const BgImgContext = createContext();
export const UserContext = createContext();

function App() {

  const [bgImg, setBgImg] = useState(fakeData[0].img);

  const  [user, setUser] = useState({
    isSignIn: false,
    firstName: "",
    lastName: "",
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${bgImg}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        // paddingLeft: "20px",
        width: "99.70%",
        color: "white"
      }}
      className="App"
    >
      <UserContext.Provider value={[user, setUser]}>
      <BgImgContext.Provider value={[bgImg, setBgImg]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/place/:id">
            <PlaceDetails></PlaceDetails>
          </Route>
          <PrivateRoute path="/stay">
            <Rooms></Rooms>
          </PrivateRoute>
          <Route path ="/login">
            <Login></Login>
          </Route>
          <Route path="/signUp">
            <SignUp></SignUp>
          </Route>
          <Route path="*">
              <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      </BgImgContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
