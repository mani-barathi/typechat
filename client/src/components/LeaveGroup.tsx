import React, { useState } from "react";
import axios from "../axios";
import { removeChat, setCurrentChat } from "../store/actionCreators";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ResponseData } from "../types";

interface NewGroupFormProps {
  closeFn: () => void;
}

const LeaveGroup: React.FC<NewGroupFormProps> = ({ closeFn }) => {
  const dispatch = useAppDispatch();
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
        dispatch(removeChat(chat!));
        dispatch(setCurrentChat(null));
        closeFn();
      } else {
        setError(data.error!);
        setLoading(false);
      }
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
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
