import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useAuth } from '../../hooks/AuthContext';

interface IRouteProps extends RouteProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}

const PrivateRoute: React.FC<IRouteProps> = ({isPrivate = false, component: Component, ...rest}) => {
  const { user } = useAuth();  
  return (<Route {...rest} render={({location})=>{
    return isPrivate === Boolean(user) ? (<Component />) : 
    (<Redirect to={{pathname: isPrivate ? '/login' : '/', state: { from: location}}}/>);
  }}/>);
}

export default PrivateRoute;