import "../../styles/ErrorPage.css";
import Homer from "../../assets/homer-simpsons-155238_1280.png";
import { useRouteMatch, useHistory} from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default function ErrorPage() {
  const history = useHistory();
  const match = useRouteMatch();
  if (!match.params.errorMessage) return null;
  if (match.params.errorMessage.includes(301)) return <LoadingSpinner />
  
    return (
      <div id="error-page-container">
        <h1 id="error-page-title">Woops! Something went wrong ):</h1>
        <div className="site-button-3" onClick={() => history.goBack()}>
          Try Again
        </div>
        <img id="error-image" src={Homer} alt="homer" />
        <p id="error-page-description">{match.params.errorMessage}</p>
      </div>
    );
}
