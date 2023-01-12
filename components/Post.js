import Image from 'next/image';
import React, { useState } from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegCommentAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updatePost } from '../public/src/features/postSlice';
import CreateComment from './CreateComment';
import CommentItem from './CommentItem';

const Post = ({ post, user }) => {
	const [commentsExpanded, setCommentsExpanded] = useState(false);
	const [writeCommentMode, setWriteCommentMode] = useState(false);
	const [hover, setHover] = useState(false);
	const { data: session } = useSession();

	const dispatch = useDispatch();
	const handleMouseIn = () => {
		setHover(true);
	};

	const handleMouseOut = () => {
		setHover(false);
	};

	const afterAddingComment = () => {
		setWriteCommentMode(false);
	};

	const addLike = () => {
		const userId = localStorage.getItem('user_token');

		axios
			.post(
				process.env.NEXT_PUBLIC_API_URL +
					'/posts' +
					'/' +
					post.id +
					'/likes/' +
					userId,
				{
					headers: { Accept: 'application/json' },
				}
			)
			.then((response) => {
				dispatch(updatePost(response.data));
			})
			.catch((error) => {
				console.log(error);
			});
	};

	if (user == null) {
		user = session.user;
		user.profilePic = session.user.image;
	}

	return (
		<div
			key={post.id}
			className='flex flex-col'>
			<div className='bg-white rounded-md p-4 mt-6'>
				<div className='flex items-center space-x-2'>
					<Image
						className='rounded-full w-10 h-10'
						alt={user.name}
						src={user.profilePic}
						objectFit='cover'
						width={100}
						height={100}
					/>
					<div>
						<p className='font-medium'>{user.name}</p>
						<p className='text-xs text-gray-500'>
							{new Date(post.timestamp).toLocaleString()}
						</p>
					</div>
				</div>
				<p className='pt-4'>
					{Buffer.from(post.post, 'latin1').toString('utf8')}
				</p>
			</div>
			{post.image != null && (
				<div className='relative h-60 md:h-96 bg-white'>
					<Image
						alt='Post Image'
						fill
						objectFit='cover'
						src={post.image}></Image>
				</div>
			)}

			<div className='flex gap-2 bg-white p-2 b border-b relative'>
				<div className='flex space-x-1 relative'>
					<div className='bg-blue-400 rounded-full items-center'>
						<FiThumbsUp
							onMouseOver={handleMouseIn.bind(this)}
							onMouseOut={handleMouseOut.bind(this)}
							className='text-white text-xs m-1'
						/>
					</div>
					<p className='text-xs text-gray-400 mt-1'>
						{post.likes.length}
					</p>
				</div>
				{post.likes.length > 0 && (
					<div
						className={`absolute bg-black bg-opacity-70 rounded-lg px-1 text-white text-sm top-7 ${
							hover ? 'block' : 'hidden'
						}`}>
						{post.likes.map((user) => (
							<p key={user.id}>{user.name}</p>
						))}
					</div>
				)}

				<div className='flex gap-1'>
					<div
						onClick={(e) => setCommentsExpanded(true)}
						className='flex bg-purple-400 rounded-full hover:bg-purple-400 cursor-pointer items-center'>
						<FaRegCommentAlt className='text-white text-xs m-1' />
					</div>
					<p className='text-xs text-gray-400 mt-1'>
						{post.comments?.length ? post.comments.length : 0}
					</p>
				</div>
			</div>

			{commentsExpanded &&
				post.comments != null &&
				post.comments.length > 0 && (
					<div className='flex flex-col bg-white p-2 b border-b'>
						{post.comments.map((comment) => (
							<CommentItem
								key={comment.id}
								comment={comment}></CommentItem>
						))}
					</div>
				)}

			<div className='flex items-center justify-center bg-white p-2'>
				<div
					onClick={() => addLike()}
					className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
					<FiThumbsUp className='h-4' />
					<p className='text-xs sm:text-base'>Like</p>
				</div>
				<div
					onClick={(e) => {
						setWriteCommentMode(true), setCommentsExpanded(true);
					}}
					className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 rounded-xl cursor-pointer'>
					<FaRegCommentAlt className='h-4' />
					<p className='text-xs sm:text-base'>Comment</p>
				</div>
			</div>

			{writeCommentMode && (
				<div className='flex gap-2 bg-white p-2 b border-b'>
					<CreateComment
						afterAddingComment={afterAddingComment}
						userId={user.id}
						postId={post.id}
					/>
				</div>
			)}
		</div>
	);
};

export default Post;
