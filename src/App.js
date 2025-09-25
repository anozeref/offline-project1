import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sukses from './pages/Sukses';
import { Rekap } from './pages';
import { Manage } from './pages';


function App() {
  return (
    <BrowserRouter>
      <main>
<Switch>
  <Route path="/" component={Home} exact />
  <Route path="/Sukses" component={Sukses} exact />
  <Route path="/rekap" component={Rekap} exact />
    <Route path="/ManageStock" component={Manage} exact />
</Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
