import React, { useRef, useState } from "react";
import axios from "../axios";
import { newDirectChat, setCurrentChat } from "../store/actionCreators";
import { useAppDispatch } from "../store/hooks";
import { ResponseData } from "../types";

interface NewGroupFormProps {
  closeFn: () => void;
}

const NewGroupForm: React.FC<NewGroupFormProps> = ({ closeFn }) => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const name = inputRef.current?.value.trim();
    try {
      const { data: resData } = await axios.post<ResponseData>(
        `/api/group/create`,
        { name }
      );
      if (resData.ok) {
        resData.data.username = resData.data.name;
        dispatch(setCurrentChat(resData.data!));
        dispatch(newDirectChat(resData.data!));
        return closeFn();
      } else {
        setError(resData.error!);
      }
    } catch (e) {
      console.log("NewGroupChatForm:", e);
    }
    setLoading(false);
    inputRef.current!.value = "";
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        className="form-input mb-2"
        placeholder="Enter a New Group Name"
        required
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

export default NewGroupForm;
