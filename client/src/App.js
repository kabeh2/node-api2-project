import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Add from "./pages/Add";
import { Container } from "reactstrap";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Container className="py-5">
        <Switch>
          <Route path="/add" component={Add} />
          <Route exact path="/:id" component={Home} />
          <Route
            path="/404"
            render={() => <h1>Error 404: Page Doesn't Exist!</h1>}
          />
          <Route exact path="/" component={Home} />
          <Redirect to="/404" />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
