import React, { useState, useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Comments from './Comments';
import './styles/editArticle.css';
const url = process.env.REACT_APP_API_URL;

export default function EditArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { authToken, userID } = useContext(AuthContext);
  const [article, setArticle] = React.useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${url}/articles/${id}`)
      .then((res) => {
        setArticle(res.data.article);
        setContent(res.data.article.content);
        setTitle(res.data.article.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  const handleSave = () => {
    axios
      .put(
        `${url}/articles/${article._id}`,
        { title, content, author: userID },
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${url}/articles/${article._id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="editArticle">
      <div className="editHeader">
        <button className="" onClick={handleSave} type="submit">
          Save
        </button>

        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

        <button className="minor" onClick={handleDelete} type="submit">
          Delete
        </button>
      </div>

      <div className="quill">
        <ReactQuill
          value={content}
          onChange={setContent}
          theme="snow"
          modules={modules}
          formats={formats}
        />
      </div>

      <Comments articleID={id} edit={true} />
    </div>
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const modules = {
  toolbar: [
    [{ size: [] }],
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ align: [] }],

    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'align',
  'color',
  'background',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];
