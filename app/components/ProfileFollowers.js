import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingDotsIcon from "./LoadingDotsIcon";

const ProfileFollowers = () => {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log("there was a problem");
      }
    }
    fetchPosts();
  }, [username]);

  if (isLoading) return <LoadingDotsIcon />;
  return (
    <div className='list-group'>
      {posts.map((follower, index) => {
        return (
          <Link
            key={index}
            to={`/profile/${follower.username}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={follower.avatar} />{" "}
            {follower.username}
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileFollowers;
