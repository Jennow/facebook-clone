import axios from 'axios';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../public/src/features/postSlice';

const CreateComment = ({ postId, afterAddingComment }) => {
	const inputRef = useRef(null);
	const dispatch = useDispatch();
	const userId = localStorage.getItem('user_token');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputRef.current.value) return;

		const body = { comment: inputRef.current.value };
		axios
			.post(
				process.env.NEXT_PUBLIC_API_URL +
					'/posts' +
					'/' +
					postId +
					'/comments/' +
					userId,
				body,
				{
					headers: { Accept: 'application/json' },
				}
			)
			.then((response) => {
				dispatch(updatePost(response.data));
				afterAddingComment();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='w-full px-2'>
			<form className='w-full'>
				<textarea
					type='textarea'
					ref={inputRef}
					placeholder={`Write a comment`}
					className='w-full rounded-lg h-12 focus:outline-none bg-gray-100 px-3 py-2'></textarea>
			</form>
			<div className='flex justify-evenly py-2'>
				<button
					className='rounded bg-teal-400 hover:bg-teal-500 text-white px-6 py-1 w-full'
					onClick={handleSubmit}>
					Comment
				</button>
			</div>
		</div>
	);
};

export default CreateComment;
