import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Signup from './Signup';
import Dashboard from './Dashboard';

export default function Layout() {
  return (
    <BrowserRouter>
      <Route exact path="/" >
        <Login />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup" >
        <Signup />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
    </BrowserRouter>
  );
}