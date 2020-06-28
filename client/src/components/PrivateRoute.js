import React from "react";

import {
  Route,
  Redirect
} from "react-router-dom";
import { Consumer } from "../Context";

const PrivateRoute = ({component: Component, ...rest}) => {
    
    return(
        //if authed, then rendering the component with all the props passed to it, other wise redirect to signin
        <Consumer>
            {
                context => (
                    <Route 
                        {...rest}
                        render={props => context.authUser ? (
                            <Component {...props} />
                        ): <Redirect to={{
                            pathname:'/signin',
                            state: {from: props.location} //save the current location into state to remember it
                        }} />
                    }
                    />
                )
            }
        </Consumer>

    )
}

export default PrivateRoute;