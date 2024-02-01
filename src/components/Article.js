import axios from 'axios';
import moment from 'moment';
import React from 'react';
import ReactQuill from 'react-quill';
import { Link, useParams } from 'react-router-dom';
import Comments from './Comments';
import './styles/article.css';
const url = process.env.REACT_APP_API_URL;

export default function Article() {
  const [article, setArticle] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`${url}/articles/${id}`)
      .then(async (res) => {
        res.data.article.date = moment(res.data.article.date).format('MMM Do YY');
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  if (!article) return <div>Loading...</div>;
  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>
        {article.author.userName}, {article.date}
      </p>
      <ReactQuill value={article.content} readOnly={true} theme="bubble" />
      <Comments articleID={id} />
    </div>
  );
}
