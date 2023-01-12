import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { HiOutlineVideoCamera } from 'react-icons/hi';
import { IoMdPhotos } from 'react-icons/io';
import { BsEmojiSmile } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { addPost } from '../public/src/features/postSlice';
import axios from 'axios';

const CreatePost = () => {
	const { data: session } = useSession();
	const inputRef = useRef(null);
	const hiddenFileInput = useRef(null);
	const [imageToPost, setImageToPost] = useState(null);
	const dispatch = useDispatch();

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	const removeImage = () => {
		setImageToPost(null);
	};

	const addImageToPost = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
			reader.onload = (e) => {
				setImageToPost(e.target.result);
			};
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!inputRef.current.value) return;
		const formData = new FormData();

		formData.append('file', imageToPost);
		formData.append('post', inputRef.current.value);
		formData.append('userid', localStorage.getItem('user_token'));

		axios
			.post(process.env.NEXT_PUBLIC_API_URL + '/posts', formData, {
				headers: { Accept: 'application/json' },
			})
			.then((response) => {
				inputRef.current.value = '';
				dispatch(addPost(response.data));
				removeImage();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='bg-white rounded-md shadow-md text-gray-500 p-2'>
			<div className='flex p-4 space-x-2 items-center'>
				<Image
					src={session?.user.image}
					alt={session?.user.name}
					width='40'
					height='40'
					className='rounded-full cursor-pointer'></Image>
				<form className='flex flex-1'>
					<input
						type='text'
						ref={inputRef}
						placeholder={`What's on your mind, ${
							session?.user.name.split(' ')[0]
						}?`}
						className='rounded-full h-12 flex-grow focus:outline-none bg-gray-100 px-4'></input>
				</form>
			</div>
			{imageToPost && (
				<div
					onClick={removeImage}
					className='flex items-center px-4 py-2 space-x-4 filter hover:brightness-110 transition duration-150 cursor-pointer'>
					<Image
						alt='Image Preview'
						src={imageToPost}
						className='h-10 object-contain'></Image>
					<RiDeleteBin6Line className='h-8 hover:text-red-500' />
				</div>
			)}
			<div className='flex justify-evenly py-2'>
				<div
					onClick={handleClick}
					className='flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md cursor-pointer'>
					<IoMdPhotos
						size={20}
						className='text-blue-500'
					/>
					<p className='font-semibold text-gray-600'>
						Photo or Video
					</p>
					<input
						onChange={addImageToPost}
						type='file'
						hidden
						accept='image/*'
						ref={hiddenFileInput}></input>
				</div>
				{/* <div className="flex items-center p-1 space-x-1 flex-grow justify-center hover:bg-gray-100 rounded-md cursor-pointer">
            <BsEmojiSmile 
                size={20}
                className="text-yellow-500"
            />
            <p className="font-semibold text-gray-600">Feeling/Activity</p>
        </div> */}
			</div>
			<div className='flex justify-evenly p-2'>
				<button
					className='rounded bg-purple-400 hover:bg-purple-500 text-white px-6 py-1 w-full'
					onClick={handleSubmit}>
					Post
				</button>
			</div>
		</div>
	);
};

export default CreatePost;
