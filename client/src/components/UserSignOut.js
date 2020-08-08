import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";

//handle sign out and redirect to main page
export default ({context}) => {
  const { actions } = context;

  useEffect(() => {
    actions.signOut();
  });
  
  return <Redirect to="/" />;
};