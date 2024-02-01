import './App.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import ArticleList from './components/ArticleList';
import NewArticle from './components/NewArticle';
import React from 'react';
import Cookies from 'universal-cookie';
import Header from './components/Header';
import Article from './components/Article';
import EditArticle from './components/EditArticle';
import Signup from './components/Signup';

const cookies = new Cookies(null, { path: '/' });

export const AuthContext = React.createContext(null);

function App() {
  const [authToken, setAuthToken] = React.useState(null);
  const [userID, setUserID] = React.useState(null);

  const clearAuthCookies = () => {
    cookies.remove('authToken');
    cookies.remove('userID');
  };

  React.useEffect(() => {
    if (!authToken && cookies.get('authToken')) {
      setUserID(cookies.get('userID'));
      setAuthToken(cookies.get('authToken'));
      return;
    }
    if (!cookies.get('authToken') && authToken) {
      cookies.set('authToken', authToken);
      cookies.set('userID', userID);
    }
  }, [authToken, userID]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, userID, setUserID, clearAuthCookies }}>
      <BrowserRouter basename="/">
        <Header LoggedIn={Boolean(authToken)} />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/articles/:id" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
