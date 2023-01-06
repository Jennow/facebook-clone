import React from "react";

const CommentItem = ({comment}) => {
  return <div>

  <div className="flex mb-1 mx-2">
    <img className="rounded-full w-8 h-8"
        src={comment.user.profilePic}
    />
    <div className="px-2 bg-gray-50 p-1 rounded-xl flex-grow ml-2 shadow-md">
        <p className="text-sm font-semibold">{comment.user.name}</p>
        <p className="text-sm pt-1 text-gray-500">{Buffer.from(comment.text, 'latin1').toString('utf8')}</p>
    </div>

  </div>
    <p className="text-xs text-gray-500 pb-2 text-right mr-2">{new Date(comment.timestamp).toLocaleString()}</p>

  </div>
  
  ;
};

export default CommentItem;
