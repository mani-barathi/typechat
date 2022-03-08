import React, { useRef, useState } from "react";
import axios from "../axios";
import { useAuth } from "../contexts/AuthContext";
import { useAppSelector } from "../store/hooks";
import { ResponseData } from "../types";

interface NewGroupFormProps {
  closeFn: () => void;
}

const NewGroupMemberForm: React.FC<NewGroupFormProps> = ({ closeFn }) => {
  const { user } = useAuth();
  const { chat } = useAppSelector((state) => state.currentChat);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<String | Boolean>(false);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    const name = inputRef.current?.value.trim().toLowerCase();
    if (user?.username === name) {
      return setError("You can't add yourself to the group");
    }
    try {
      const { data } = await axios.post<ResponseData>(`/api/group/add`, {
        name,
        groupId: chat?.id,
      });
      if (data.ok) {
        setSuccess(`${name} added to group`);
        inputRef.current!.value = "";
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError(data.error!);
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
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
      {success && (
        <div className="py-2 px-3 bg-green-200 text-green-800 rounded">
          {success}
        </div>
      )}
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
        <button className="form-btn">Add</button>
      </div>
    </form>
  );
};

export default NewGroupMemberForm;
