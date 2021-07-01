import React, { useRef, useState } from "react";
import axios from "../axios";
import { SearchUser } from "../types";

interface NewChatFormProps {
  closeFn: () => void;
}

const NewChatForm: React.FC<NewChatFormProps> = ({ closeFn }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    setError("");

    const { data: resData } = await axios.get<SearchUser>(
      `/api/users/${inputRef.current!.value}`
    );
    if (resData.ok) {
      console.log(resData.data);
      // dispatch action
      return closeFn();
    } else {
      setError(resData.error!);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <input
        ref={inputRef}
        type="text"
        className="form-input mb-2"
        placeholder="Enter a Username"
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
        >
          Cancel
        </button>
        <button className="form-btn">Create</button>
      </div>
    </form>
  );
};

export default NewChatForm;
