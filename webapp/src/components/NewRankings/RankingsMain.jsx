import "../../styles/NewRankings.css";
import Comments from "../Comments";
import RankingsHeader from "./RannkingsHeader";
import GlobalRankings from "./GlobalRankings";
import PersonalRankings from "./PersonalRankings";

export default function Rankings() {

  return (
    <div className="rankings-main-container column-start">
      <RankingsHeader />
      <div className="rankings-ranking-container justify-start">
        <GlobalRankings />
        <PersonalRankings />
      </div>
      <Comments />
    </div>
  );
}
