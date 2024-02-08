import React from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Message = ({ item }) => {
  const user = useSelector((state) => state.user);

  return (
    <div className="m-4">
      <div
        className={`px-3 py-2 max-w-[70%] mt-2 rounded-lg ${
          item.senderId === user._id
            ? "bg-background self-end"
            : "bg-primary self-start"
        }`}
      >
        <p
          className={`font-poppinsMedium ${
            item.senderId === user._id ? "text-gray-600" : "text-gray-100"
          }`}
        >
          {item.text}
        </p>
      </div>
      <p
        className={`font-poppins text-xs mt-2 ${
          item.senderId === user._id ? "self-end" : "self-start"
        }`}
      >
        {format(item.date)}
      </p>
    </div>
  );
};

export default Message;
