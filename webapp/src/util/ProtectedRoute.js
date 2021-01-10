import { Route, Redirect } from "react-router-dom";

export const Protected = ({ component: Component, path, userId }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        userId ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
