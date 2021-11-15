/*
 * @Author: 宝二
 * @Date: 2021-08-05 16:43:34
 * @LastEditTime: 2021-11-15 15:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /xn-h5-task-video/src/router.tsx
 */
import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home";

const PageRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default PageRouter;
