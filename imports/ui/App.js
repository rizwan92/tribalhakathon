import React, { Component } from 'react';
import { Route,Redirect,Switch } from 'react-router-dom';
import { Session } from 'meteor/session';
import  MainLayout  from './layouts/MainLayout';
import  AdminLayout  from './layouts/AdminLayout';
export default class App extends Component {

  render(){
   return (
     <div>
      <Switch>
            <Route exact path="/" component={MainLayout} />
            <Route exact path="/home" component={MainLayout} />
            <Route exact path="/home/project" component={MainLayout} />
            <Route exact path="/admin" component={AdminLayout} />
            <Route exact path="/admin/home" component={AdminLayout} />
            <Route exact path="/admin/project" component={AdminLayout} />
            <Route exact path="/admin/district" component={AdminLayout} />
            <Route exact path="/admin/tsparea" component={AdminLayout} />
            <Route exact path="/admin/department" component={AdminLayout} />
            <Route exact path="/admin/scheme" component={AdminLayout} />
            <Route exact path="/admin/projectallotment" component={AdminLayout} />
            <Route component={NoMatch}/>
        </Switch>
     </div>
   )
 }
}
const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)
