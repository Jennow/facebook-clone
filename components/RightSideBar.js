import React, { useEffect, useState } from "react";
import { RiVideoAddFill } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { CgMoreAlt } from "react-icons/cg";
import Contact from "./Contact";
import axios from "axios";

const RightSideBar = () => {
    
    const [friends, setFriends] = useState([]);
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/users";

    useEffect(() => {
        if (typeof window !== 'undefined' && friends.length == 0) {
            axios.get(FACEBOOK_CLONE_ENDPOINT)
            .then((response) => {
                const allUsers = response.data;
                setFriends(allUsers.filter((user) => user.id != localStorage.user_token));
            })
        }
    },[]);

    
    return <div className="hidden md:inline-flex flex-col pt-4 max-w-xl md:min-w-[200px] lg:min-w-[250px]">
    <div className="flex items-center text-gray-500">
        <p className="fex text-lg font-semibold flex-grow">Users</p>
        <div className="flex space-x-1 px-2">
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
    {friends.map((friend) => <Contact key={friend.id}
        src={friend.profilePic}
        name={friend.name}
        status="Online"></Contact>
    )}
  </div>;
};

export default RightSideBar;
