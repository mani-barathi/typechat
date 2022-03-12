import React, { useState } from "react";
import axios from "../axios";
import { useAppSelector } from "../store/hooks";
import { ResponseData } from "../types";

interface NewGroupFormProps {
  closeFn: () => void;
}

const LeaveGroup: React.FC<NewGroupFormProps> = ({ closeFn }) => {
  const { chat } = useAppSelector((state) => state.currentChat);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    try {
      const { data } = await axios.post<ResponseData>(`/api/group/leave`, {
        groupId: chat?.id,
      });
      if (data.ok) {
        // dispatch action to remove the chat from chats[]
        // dispatch action set someother chat as the currentChat
      } else {
        setError(data.error!);
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <p className="mb-1">Are you sure to leave the group?</p>
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
        <button className="form-btn-danger" onClick={handleSubmit}>
          Leave
        </button>
      </div>
    </div>
  );
};

export default LeaveGroup;
