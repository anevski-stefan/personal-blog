import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blogs from '../../Pages/Blogs/Blogs';
import Home from '../../Pages/Home/Home';
import AddBlog from '../../Pages/AddBlog/AddBlog';
import EditBlog from '../../Pages/EditBlog/EditBlog';
import BlogDetails from '../../Pages/BlogDetails/BlogDetails';
import AdminLogin from '../../Pages/AdminLogin/AdminLogin';
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'));
      setToken(data);
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        {token ? <Route path="blogs/add" element={<AddBlog />} /> : null}
        <Route path="blogs/:id" element={<BlogDetails />} />
        {token ? <Route path="blogs/:id/edit" element={<EditBlog />} /> : null}
        <Route path="admin" element={<AdminLogin setToken={setToken} />} />
        {/* <Route path="portfolio" element={<Portfolio />} /> */}
        {/* <Route path="about" element={<AboutMe />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
