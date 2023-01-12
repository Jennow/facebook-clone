import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAllPost, selectPost } from '../public/src/features/postSlice';
import { addAllUser, selectUser } from '../public/src/features/userSlice';
import Post from './Post';

const Posts = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectPost);
	const users = useSelector(selectUser);

	useEffect(() => {
		const fetchData = () => {
			axios
				.get(process.env.NEXT_PUBLIC_API_URL + '/users')
				.then((response) => {
					console.log('POSTs');
					dispatch(addAllUser(response.data));
				})
				.then(
					axios
						.get(process.env.NEXT_PUBLIC_API_URL + '/posts')
						.then((response) => {
							dispatch(addAllPost(response.data));
						})
				);
		};
		fetchData();
	}, [dispatch]);

	return (
		<div>
			<div>
				{posts.map((post) => {
					let user = users.find((u) => u.id == post.userId);
					return (
						<Post
							key={post.id}
							post={post}
							user={user}></Post>
					);
				})}
			</div>
		</div>
	);
};

export default Posts;
