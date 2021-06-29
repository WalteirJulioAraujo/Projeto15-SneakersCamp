import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home.js";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import Cart from "./Cart.js";
import Navbar from "./Navbar.js";
import GlobalStyle from "../styles/GlobalStyles.js";
import UserContext from "../contexts/UserContext.js";

export default function App() {
  return (
    <>
      <UserContext.Provider value="">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Navbar />
              <Home />
            </Route>
            <Route path="/login" exact component={LogIn} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/cart" exact component={(Navbar, Cart)} />
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </UserContext.Provider>
    </>
  );
}
