import { useLayoutEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const useCheckUserAvailable = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (!loading) return;
    if (user) {
      history.replace("/");
    } else {
      setLoading(false);
    }
  }, [user, history, loading]);

  return loading;
};

export default useCheckUserAvailable;
