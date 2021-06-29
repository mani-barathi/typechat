import jwtDecode from "jwt-decode";

let accessToken = "";

export const getAccessToken = () => accessToken;

export const setAccessToken = (t: string) => {
  accessToken = t;
};

export const isTokenExpired = () => {
  const { exp }: any = jwtDecode(accessToken);
  return new Date().getTime() > exp * 1000;
};

const baseUrl = "http://localhost:4000";

export const fetchNewTokens = async () => {
  if (!accessToken) return true;
  if (!isTokenExpired()) return true;

  try {
    const response = await fetch(`${baseUrl}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    const { ok, data, message } = await response.json();
    if (!ok) {
      console.log(message);
      alert("something went wrong try logging in again");
      return false;
    } else {
      setAccessToken(data.accessToken);
      return true;
    }
  } catch (err) {
    console.log("Error fetchNewTokens:", err);
    alert("something went wrong...try refreshing!");
    return false;
  }
};
