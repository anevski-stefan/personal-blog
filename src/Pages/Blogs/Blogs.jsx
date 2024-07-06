import React, { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard/BlogCard';
import Navbar from '../../components/Navbar/Navbar';
import "./Blogs.css";
import { Pagination } from '@mui/material';
import supabase from '../../config/supabaseClient';
import Footer from '../../components/Footer/Footer';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    const fetchBlogs = async () => {
      const start = (page - 1) * blogsPerPage;
      const end = start + blogsPerPage - 1;

      const { data, error, count } = await supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .range(start, end);

      if (error) {
        setError('Could not fetch the blogs');
        setBlogs([]);
        console.error(error);
      } else {
        setBlogs(data);
        setPageCount(Math.ceil(count / blogsPerPage));
        setError(null);
      }
    };

    fetchBlogs();
  }, [page]);

  return (
    <div className='page'>
      <Navbar />
      <div className="blogs__wrapper">
        {error && (<p>{error}</p>)}
        {blogs && blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <p>No blogs available!</p>
        )}
      </div>
      <Pagination
        className="pagination"
        count={pageCount}
        page={page}
        onChange={(event, value) => setPage(value)}
        variant="outlined"
        shape="rounded"
        sx={{ display: 'flex', justifyContent: 'center' }}
      />
      <Footer />
    </div>
  );
}

export default Blogs;
