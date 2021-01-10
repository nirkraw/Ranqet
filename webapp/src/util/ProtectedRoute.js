import { Route, Redirect } from "react-router-dom";

export default function Protected({ component: Component, path, userId }) {
  return (
    <Route
      path={path}
      render={(props) => {
        return (userId ? <Component {...props} userId={userId} /> : <Redirect to="/login" />)
      }
      }
    />
  );
};
