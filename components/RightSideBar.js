import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Contact from './Contact';
import axios from 'axios';
import { addAllUser, selectUser } from '../public/src/features/userSlice';

const RightSideBar = () => {
	const dispatch = useDispatch();
	const [friends, setFriends] = useState(null);
	const allUsers = useSelector(selectUser);
	useEffect(() => {
		if (typeof window !== 'undefined' && friends == null) {
			const fetchData = () => {
				axios
					.get(process.env.NEXT_PUBLIC_API_URL + '/users')
					.then((response) => {
						console.log('SIDEBAR');
						dispatch(addAllUser(response.data));
					})
					.then(() => {
						setFriends(
							allUsers.filter(
								(user) => user.id != localStorage.user_token
							)
						);
					});
			};
			fetchData();
		}
	}, [friends, allUsers, dispatch]);

	return (
		<div className='hidden md:inline-flex flex-col pt-4 max-w-xl md:min-w-[200px] lg:min-w-[250px]'>
			<div className='flex items-center text-gray-500'>
				<p className='fex text-lg font-semibold flex-grow'>Users</p>
				<div className='flex space-x-1 px-2'>
					{/* <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                <RiVideoAddFill/>
            </div>
            <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                <BiSearch/>
            </div>
            <div className="rounded-full p-2 hover:bg-gray-200 cursor-pointer">
                <CgMoreAlt/>
            </div> */}
				</div>
			</div>
			{friends != null &&
				friends.map((friend) => (
					<Contact
						key={friend.id}
						src={friend.profilePic}
						name={friend.name}
						status='Online'></Contact>
				))}
		</div>
	);
};

export default RightSideBar;
