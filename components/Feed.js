import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CreatePost from './CreatePost';
import Posts from './Posts';

const Feed = () => {
	const { data: session } = useSession();

	useEffect(() => {
		const createUserIfNotExists = () => {
			var count = 0;

			const user = {
				email: session?.user.email,
				name: session?.user.name,
				profilePic: session?.user.image,
			};

			axios
				.get(
					process.env.NEXT_PUBLIC_API_URL +
						'/users' +
						'?email=' +
						user.email
				)
				.then((res) => {
					const foundUser = res.data;

					if (foundUser == undefined || foundUser.length == 0) {
						if (count == 0) {
							count++;
							axios
								.post(
									process.env.NEXT_PUBLIC_API_URL + '/users',
									user,
									{
										headers: { Accept: 'application/json' },
									}
								)
								.then((response) => {
									localStorage.setItem(
										'user_token',
										response.id
									);
								})
								.catch((err) => {
									console.log(err);
								});
						}
					} else {
						console.log(foundUser);
						localStorage.setItem('user_token', foundUser[0].id);
					}
				});
		};
		createUserIfNotExists();
	}, [session]);

	return (
		<div className='flex-grow h-screen pt-6 mr-6 overflow-y-auto'>
			<div className='mx-auto max-w-md md:max-w-xl lg:max-w-2xl'>
				<CreatePost></CreatePost>
				<Posts></Posts>
			</div>
		</div>
	);
};

export default Feed;
