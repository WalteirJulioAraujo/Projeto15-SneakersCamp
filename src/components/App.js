import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Home.js";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import Cart from "./Cart.js";
import Navbar from "./Navbar.js";
import CartIcon from "./CartIcon.js";
import GlobalStyle from "../styles/GlobalStyles.js";
import UserContext from "../contexts/UserContext.js";
import CartContext from "../contexts/CartContext.js";
import data from "./data";

export default function App() {
  const [user, setUser] = useState(undefined);
  const [cart, setCart] = useState(data); //name,quantity,price,image,size
  const [amILoginOrSingup, setAmILoginOrSingup] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact>
                <Navbar />
                <Home />
                <CartIcon />
              </Route>
              <Route path="/login" exact>
                <LogIn setAmILoginOrSingup={setAmILoginOrSingup} />
              </Route>
              <Route path="/signup" exact>
                <SignUp setAmILoginOrSingup={setAmILoginOrSingup} />
              </Route>
              <Route path="/cart" exact>
                <Navbar />
                <Cart />
              </Route>
            </Switch>
          </BrowserRouter>
          <GlobalStyle amILoginOrSingup={amILoginOrSingup} />
        </CartContext.Provider>
      </UserContext.Provider>
    </>
  );
}
