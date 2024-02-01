import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import ArticleListItem from './ArticleListItem';
import { useNavigate } from 'react-router-dom';
import './styles/articleList.css';

const url = process.env.REACT_APP_API_URL;

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [articlesUpdated, setArticlesUpdated] = useState(0);
  const { userID } = useContext(AuthContext);
  const navigate = useNavigate();

  const renderArticles = () => {
    if (
      articles.length === 0 ||
      articles.filter((article) => article.status === 'published').length === 0
    )
      return <p>No articles</p>;

    return articles
      .toSorted((a, b) => new Date(b.date) - new Date(a.date))
      .filter((article) => article.status === 'published')
      .map((article) => {
        return (
          <ArticleListItem
            key={article._id}
            article={article}
            setArticlesUpdated={setArticlesUpdated}
            articlesUpdated={articlesUpdated}
          />
        );
      });
  };

  useEffect(() => {
    console.log(url);
    axios
      .get(`${url}/articles`)
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [articlesUpdated]);

  return <div className="articleList">{renderArticles()}</div>;
};

export default ArticleList;
