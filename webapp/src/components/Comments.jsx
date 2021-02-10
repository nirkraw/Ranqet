import React, { useState, useEffect } from "react";
import "../styles/Comments.css";
import { formatUploadTime } from "../util/DateCalc";
import { useHistory, useRouteMatch } from "react-router-dom";
import LoadingSpinner from "./Misc/LoadingSpinner";
import ErrorPage from "./Misc/ErrorPage";
import { fetchListComments, fetchUser, createComment } from "../util/Endpoints";
import EmptyAvatar from "../assets/avatar.svg";

export default function Comments() {
  const history = useHistory();
  const match = useRouteMatch();

  // const sampleComments = [
  //   {
  //     author: "James",
  //     authorAvatarUrl:
  //       "https://ranker-dev.s3.amazonaws.com/1611009362343-sax.jpeg",
  //     createdOn: "2021-05-19T04:03:05.087Z",
  //     content: "BRON IS SO OVERRATED UGH",
  //     authorId: "1f5b4fbb-b6e9-4aaa-bf7c-565f858b870a",
  //   },
  //   {
  //     author: "Burt",
  //     authorAvatarUrl:
  //       "https://ranker-dev.s3.amazonaws.com/1611009482913-longpianoshot.jpeg",
  //     createdOn: "2021-01-19T04:03:05.087Z",
  //     content:
  //       "Hell no bro are you out of your mind?? He's the best player all time",
  //     authorId: "1f5b4fbb-b6e9-4aaa-bf7c-565f858b870a",
  //   },
  // ];
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState(EmptyAvatar);
  const [pageNum, setPageNum] = useState(0);

  useEffect(() => {
    fetchComments();
    fetchUserInfo();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetchListComments(match.params.listId, pageNum);
      setComments(res.data.comments);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await fetchUser(localStorage.getItem("userId"));
      if (res.data.avatarUrl) setAvatarUrl(res.data.avatarUrl);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const addComment = async () => {
    try {
      await createComment(match.params.listId, {
        comment: newComment,
        userId: localStorage.getItem("userId"),
        sessionToken: localStorage.getItem("sessionToken"),
      });
      setNewComment("");
      fetchComments();
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <ErrorPage error={error} />;
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
            rows="2"
            maxlength="150"
            placeholder="Add comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addComment}>Comment</button>
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
                <p className="comment-content">{comment.comment}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
