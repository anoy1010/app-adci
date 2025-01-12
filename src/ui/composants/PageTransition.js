// PageTransition.js
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";

const PageTransition = () => {
  return (
    <Switch>
      <Route exact path="/dashboard">
        <CSSTransition in={true} timeout={300} classNames="fade" unmountOnExit>
          <div className="transition-opacity duration-300 opacity-0 fade-enter-active:opacity-100">
            <Dashboard />
          </div>
        </CSSTransition>
      </Route>
      {/* <Route exact path="/transactions">
        <CSSTransition in={true} timeout={300} classNames="fade" unmountOnExit>
          <div className="transition-opacity duration-300 opacity-0 fade-enter-active:opacity-100">
            <Transactions />
          </div>
        </CSSTransition>
      </Route>
      <Route exact path="/products">
        <CSSTransition in={true} timeout={300} classNames="fade" unmountOnExit>
          <div className="transition-opacity duration-300 opacity-0 fade-enter-active:opacity-100">
            <Products />
          </div>
        </CSSTransition>
      </Route>
      <Route exact path="/messages">
        <CSSTransition in={true} timeout={300} classNames="fade" unmountOnExit>
          <div className="transition-opacity duration-300 opacity-0 fade-enter-active:opacity-100">
            <Messages />
          </div>
        </CSSTransition>
      </Route> */}
    </Switch>
  );
};

export default PageTransition;
