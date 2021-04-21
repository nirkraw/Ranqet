import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { fetchList } from "../../util/Endpoints/ListEP";
import { getFormattedDate } from "../../util/DateCalc";
import LoadingSpinner from "../Misc/LoadingSpinner";

export default function RannkingsHeader() {
  const match = useRouteMatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [listImg, setListImg] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListInfo();
  }, []);

  const getListInfo = async () => {
    try {
      const res = await fetchList(match.params.listId);
      setListImg(res.data.imageUrl);
      setTitle(res.data.title);
      setAuthor(res.data.createdBy.name);
      setAuthorId(res.data.createdBy.id);
      setDate(res.data.createdOn);
      setDescription(res.data.description);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="rankings-header-container justify-start-center">
      <div className="rankings-list-description">
        <h1 className="rankings-list-title">{title}</h1>
        <div className="rankings-author-and-date-container justify-start-center">
          <div
            className="rankings-list-author"
            onClick={() => history.push(`/profile/${authorId}`)}
          >
            <span>By: </span>
            <p>{author}</p>
            <span> ·</span>
          </div>
          <p className="rankings-list-created-date">{getFormattedDate(date)}</p>
        </div>
        <p className="rankings-list-description-text">{description}</p>
      </div>
      <div className="rankings-list-stats"></div>
      <div className="rankings-list-image-container justify-center-center">
        <img className="rankings-list-image" src={listImg} alt="list" />
      </div>
    </div>
  );
}