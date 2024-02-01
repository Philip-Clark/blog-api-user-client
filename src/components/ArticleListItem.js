import './styles/articleListItem.css';
import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../App';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
const url = process.env.REACT_APP_API_URL;

export default function ArticleListItem({ article, articlesUpdated, setArticlesUpdated }) {
  const { authToken } = useContext(AuthContext);

  const dateFormatted = moment(article.date).format('MMM Do YY');
  const navigate = useNavigate();

  return (
    <Link className="articleListItem" to={`/articles/${article._id}`}>
      <div className="details">
        <h2>{article.title}</h2>
        <p>
          {article.author.userName}, {dateFormatted}, ({article.status})
        </p>
      </div>
    </Link>
  );
}

ArticleListItem.propTypes = {
  article: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      userName: PropTypes.string.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  articlesUpdated: PropTypes.number.isRequired,
  setArticlesUpdated: PropTypes.func.isRequired,
};
