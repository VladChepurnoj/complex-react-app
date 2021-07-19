import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ProfilePosts = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log("there was a problem");
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className='list-group'>
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const dateFormatted = `${
          date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()}`;

        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={post.author.avatar} />{" "}
            <strong>{post.title}</strong>{" "}
            <span className='text-muted small'>on {dateFormatted} </span>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfilePosts;
