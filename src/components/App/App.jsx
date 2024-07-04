import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blogs from '../../Pages/Blogs/Blogs'
import Home from '../../Pages/Home/Home'
import AddBlog from '../../Pages/AddBlog/AddBlog'
import EditBlog from '../../Pages/EditBlog/EditBlog'
import { FaRegEdit } from "react-icons/fa";
import BlogDetails from '../../Pages/BlogDetails/BlogDetails'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/:id" element={<BlogDetails />} /> 
        <Route path="blogs/:id/edit" element={<EditBlog />} /> 
        {/* <Route path="portfolio" element={<Portfolio />} /> */}
        {/* <Route path="about" element={<AboutMe />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
