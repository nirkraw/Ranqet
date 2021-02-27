import React, { useState, useEffect, useRef } from "react";
import "../styles/Comments.css";
import { formatUploadTime } from "../util/DateCalc";
import { useHistory, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "./Misc/LoadingSpinner";
import { fetchListComments, createComment } from "../util/Endpoints/CommentEP";
import { fetchUser } from "../util/Endpoints/UserEP";
import EmptyAvatar from "../assets/avatar.svg";

export default function Comments({ openModal }) {
  const history = useHistory();
  const match = useRouteMatch();
  const addCommentInput = useRef(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(EmptyAvatar);
  const [pageNum, setPageNum] = useState(0);
  const [currRows, setCurrRows] = useState(1);

  useEffect(() => {
    fetchComments();
    if (localStorage.getItem("userId")) fetchUserInfo();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetchListComments(match.params.listId, pageNum);
      setComments(res.data.comments);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser(localStorage.getItem("userId"));
      if (res.data.avatarUrl) setAvatarUrl(res.data.avatarUrl);
      setLoading(false);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const addComment = async () => {
    if (!newComment) return;
    try {
      await createComment(match.params.listId, {
        comment: newComment,
        userId: localStorage.getItem("userId"),
        sessionToken: localStorage.getItem("sessionToken"),
      });
      addCommentInput.current.value = "";
      setNewComment("");
      fetchComments();
      setCurrRows(1);
    } catch (err) {
      history.push(`/error/${err.message}`);
    }
  };

  const handleCommentChange = (e) => {
    if (localStorage.getItem("userId")) {
      const textareaLineHeight = 24;
      const previousRows = e.target.rows;
      e.target.rows = 1;
      const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

      if (currentRows === previousRows) {
        e.target.rows = currentRows;
      }

      setCurrRows(currentRows);
      setNewComment(e.target.value);
    } else openModal(["login"]);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div id="main-comments-container">
      <div id="add-comment-container">
        <div id="add-comment-image-container">
          <img
            id="comments-user-avatar-image"
            src={avatarUrl}
            alt="user-avatar"
          ></img>
        </div>
        <div id="add-comment-input-and-submit">
          <textarea
            className="textarea"
            maxLength="150"
            rows={currRows}
            placeholder="Add comment"
            onChange={handleCommentChange}
            ref={addCommentInput}
          />
          <button className="site-button" onClick={addComment}>
            Comment
          </button>
        </div>
      </div>
      <ul id="main-comments-ul">
        {comments.map((comment, i) => {
          const avatar = comment.authorAvatarUrl
            ? comment.authorAvatarUrl
            : EmptyAvatar;
          return (
            <li className="comment-item-container" key={i}>
              <div className="comments-image-container">
                <img
                  className="comments-image"
                  src={avatar}
                  alt="author"
                  onClick={() => history.push(`/profile/${comment.authorId}`)}
                />
              </div>
              <div className="comments-content-container">
                <div className="comment-author-created-container">
                  <h2
                    className="comment-author"
                    onClick={() => history.push(`/profile/${comment.authorId}`)}
                  >
                    {comment.authorName}
                  </h2>
                  <h3 className="comment-created">
                    {formatUploadTime(comment.createdOn)}
                  </h3>
                </div>
                <div className="comment-content">
                  <p>{comment.comment}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
