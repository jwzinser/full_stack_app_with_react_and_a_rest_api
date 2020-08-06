import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "./global.css";
import Header from "./components/Header";
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from './components/CreateCourse';
import UpdateCourse from "./components/UpdateCourse";
import UserSignOut from "./components/UserSignOut";
import UnhandledError from './components/UnhandledError';
import withContext from "./Context";

// context
const HeaderWithContext = withContext(Header);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

//set up routes to each component
export default () => (
  <Router>
    <HeaderWithContext />
    <div>
      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path='/courses/create' component={CreateCourseWithContext} />
        <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} /> 
        <Route exact path='/courses/:id' component={CourseDetailWithContext} /> 
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/error" component={UnhandledError} />
      </Switch>
    </div>
  </Router>
);