import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./Home.js";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import Cart from "./Cart.js";
import Navbar from "./Navbar.js";
import GlobalStyle from "../styles/GlobalStyles.js";
import UserContext from "../contexts/UserContext.js";

export default function App() {

  const [ user, setUser ] = useState(undefined);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Navbar />
              <Home />
            </Route>
            <Route path="/login" exact>
              <LogIn/>
            </Route>
            <Route path="/signup" exact component={SignUp} />
            <Route path="/cart" exact component={(Navbar, Cart)} />
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </UserContext.Provider>
    </>
  );
}
