import React, {useState} from "react";
import "./App.css";
import StoreFinder from './components/storeFinder/storeFinder'
import Menu from './components/menu/menu'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
 

  // Creates an overarching empty state that looks for a store ID
  const [storeSelected, setStoreSelected] = useState({
    storeId: '',

});

  // If there is no store ID return the storeFinder component 
  return (
    <Router basename="/storeFinder">
      <div className='holder'>
      <Switch>
        <Route exact path="/menu/:id" >
          <Menu Id={storeSelected.storeId} callBack={() => setStoreSelected}></Menu>  
        </Route>
        <Route exact path='/store/:store'>
          <StoreFinder callBack={setStoreSelected}></StoreFinder>
        </Route>
        <Route path='/'>
          <StoreFinder callBack={setStoreSelected}></StoreFinder>
        </Route>
      </Switch>
    </div>
  </Router>
  );

}


export default App;

