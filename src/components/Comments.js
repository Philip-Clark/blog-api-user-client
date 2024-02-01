import axios from 'axios';
import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import './styles/comments.css';
const url = process.env.REACT_APP_API_URL;
const moment = require('moment');
export default function Comments() {
  const [comments, setComments] = React.useState([]);
  const { authToken, userID } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${url}/articles/${id}/comments`)
      .then((res) => {
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteComment = (id) => {
    axios
      .delete(`${url}/comments/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        console.log(res.message);
        setComments(comments.filter((comment) => comment._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    axios
      .post(
        `${url}/articles/${id}/comments`,
        { content: comment, articleID: id, author: userID },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        console.log(res.data);
        setComments([...comments, res.data.comment]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="comments">
      <h2>Comments</h2>
      {authToken ? (
        <form className="commentForm" onSubmit={handlePostComment}>
          <textarea type="text" name="comment" id="comment" />
          <button type="submit">Post Comment</button>
        </form>
      ) : (
        <div className="loginToPost">
          <p>Log in to post a comment</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="comment">
            <p className="commentUser">{comment.author.userName}</p>
            <p className="commentDate">{moment(comment.date).format('MMM Do YYYY, hh:mm A')}</p>
            {userID === comment.author._id && (
              <button className="commentDelete minor" onClick={() => deleteComment(comment._id)}>
                Delete
              </button>
            )}
            <div className="commentContent">
              {comment.content.split('\n').map((line, index) => (
                <p key={comment._id + '-' + index}>{line}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
