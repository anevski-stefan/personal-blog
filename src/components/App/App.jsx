import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blogs from '../../Pages/Blogs/Blogs'
import Home from '../../Pages/Home/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="blogs" element={<Blogs />} />
        {/* <Route path="portfolio" element={<Portfolio />} /> */}
        {/* <Route path="about" element={<AboutMe />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
