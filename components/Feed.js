import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Feed = () => {
    const FACEBOOK_CLONE_ENDPOINT = "http://localhost:8080/api/v1/users";

    const [created, setCreated] = useState(false);
    
  const { data: session } = useSession();
  var count = 0;

    useEffect(() => {
        console.log('hääää')
        const createUserIfNotExists = () => {
        const user = {
            email: session?.user.email,
            name: session?.user.name,
            profilePic: session?.user.image
        }

        axios.get(FACEBOOK_CLONE_ENDPOINT + "?email=" + user.email)
            .then((res) => {
                const foundUser = res.data;
      
                if (foundUser == undefined || foundUser.length == 0) {
                    if (count == 0) {
                        count++;
                        axios.post(FACEBOOK_CLONE_ENDPOINT, user, {
                            headers: { Accept: "application/json"}
                        }).then((response) => {
                            localStorage.setItem("user_token", response.id)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                } else {
                    localStorage.setItem("user_token", foundUser[0].id)
                }
            })
        }
            createUserIfNotExists();
    }, []);



  return <div className="flex-grow h-screen pt-6 mr-6 overflow-y-auto">
    <div className="mx-auto max-w-md md:max-w-xl lg:max-w-2xl">
        <CreatePost></CreatePost>
        <Posts></Posts>
    </div>
  </div>;
};

export default Feed;
