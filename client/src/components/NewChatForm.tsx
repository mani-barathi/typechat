import React, { useRef, useState } from "react";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { newDirectChat, setCurrentChat } from "../store/actionCreators";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { SearchUser } from "../types";

interface NewChatFormProps {
  closeFn: () => void;
}

const NewChatForm: React.FC<NewChatFormProps> = ({ closeFn }) => {
  const dispatch = useAppDispatch();
  const { chats } = useAppSelector((state) => state.chats);
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const receiverName = inputRef.current!.value.toLowerCase();
    if (receiverName === user?.username) return;

    // receiver is already present in the chats, just set the currentChat to the receiver and return
    for (let chat of chats) {
      if (chat.username === receiverName) {
        dispatch(setCurrentChat(chat));
        return closeFn();
      }
    }

    try {
      const { data: resData } = await axios.get<SearchUser>(
        `/api/users/${receiverName}`
      );
      if (resData.ok) {
        dispatch(newDirectChat(resData.data!));
        dispatch(setCurrentChat(resData.data!));
        return closeFn();
      } else {
        setError(resData.error!);
      }
    } catch (e) {
      console.log("NewChatForm:", e);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <input
        ref={inputRef}
        type="text"
        className="form-input mb-2"
        placeholder="Enter a Username"
        required
        autoFocus
      />
      {error && (
        <div className="py-2 px-3 bg-red-200 text-red-800 rounded">{error}</div>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          className="form-btn-secondary mr-2"
          onClick={closeFn}
          disabled={loading}
        >
          Cancel
        </button>
        <button className="form-btn">Create</button>
      </div>
    </form>
  );
};

export default NewChatForm;
