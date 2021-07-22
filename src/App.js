import './App.css';
import Header from './component/Header/Header';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Manage from './component/Manage/Manage';
import NotFound from './component/NotFound/NotFound';
import ProductDetail from './component/ProductDetail/ProductDetail';
import LogIn from './component/LogIn/LogIn';
import Shipment from './component/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';

export const userContext = createContext();


function App() {
  const [loggedInUser , setLoggedInUser] = useState({});
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h4>Email:{loggedInUser.email}</h4>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/review">
            <Review></Review> 
          </Route>
          <PrivateRoute path="/manage">
            <Manage></Manage>
          </PrivateRoute>
          <Route path="/login">
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/shipment">
            <Shipment></Shipment>
          </PrivateRoute>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path = "/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
           <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>


    </userContext.Provider>
  );
}

export default App;
