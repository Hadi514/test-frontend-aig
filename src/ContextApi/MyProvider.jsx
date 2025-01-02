import { useEffect, useState } from "react";
import MyContext from "./MyContext";
import PropTypes from "prop-types";

const MyProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [filterPosts, setFilterPosts] = useState([]);
  const [uniqueCategory, setUniqueCategory] = useState(new Set());
  const [blogCounting, setBlogCounting] = useState("")
  const [uploadedResumes, setUploadedResumes] = useState([])
  const [resumeCounting, setResumeCounting] = useState("")
  const apiUrl = import.meta.env.VITE_API_URL;

  const Getallposts = async () => {
    await fetch(`${apiUrl}/api/blog/getallposts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        const newCategory = new Set(data.map((post) => post.category));
        setUniqueCategory(newCategory);
        if (newCategory.size > 0) {
          setCategory([...newCategory][0]);
        }
      });
  };

  const countBlog = async () => {
    const res = await fetch(`${apiUrl}/api/blog/blogCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setBlogCounting(data)
  }

  const getAllResumes = async () => {
    const res = await fetch(`${apiUrl}/api/resume/getResumes`, {
      method: "GET"
    })
    const data = await res.json()
    setUploadedResumes(data)
  }

  const countResume = async () => {
    const res = await fetch(`${apiUrl}/api/resume/resumeCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setResumeCounting(data)
  }

  useEffect(() => {
    Getallposts();
    getAllResumes();
    countResume()
    countBlog()
  }, [])

  useEffect(() => {
    if (category === null) {
      setFilterPosts([]);
    } else {
      const filterpost = posts.filter((post) => post.category === category);
      setFilterPosts(filterpost);
    }
    
  }, [category, posts]);

  return (
    <MyContext.Provider value={{ filterPosts, posts, uniqueCategory, setCategory, blogCounting, uploadedResumes, resumeCounting }}>
      {children}
    </MyContext.Provider>
  )
}

export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};