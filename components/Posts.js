import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAllPost, selectPost } from "../public/src/features/postSlice";
import { addAllUser, selectUser } from "../public/src/features/userSlice";
import Post from "./Post";

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPost);
    const users = useSelector(selectUser);

    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/users";

    useEffect(() => {
        const fetchData = () => {
            axios.get(FACEBOOK_CLONE_ENDPOINT)
            .then((response) => {
                dispatch(addAllUser(response.data));
            })
            .then(
                axios.get("http://localhost:8080/api/v1/posts")
                .then((response) => {
                    dispatch(addAllPost(response.data));
                })
            );
        };
        fetchData();
    }, []);

  return <div>
    <div>
        {posts.map((post) => {
            let user = users.find((u) => u.id == post.userId)
            return (
                <Post key={post.id} post={post} user={user}></Post>
            )})
        }
    </div>
  </div>;
};

export default Posts;
