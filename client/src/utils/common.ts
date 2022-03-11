export const getAvatarUrl = (username: string) => {
  return `https://ui-avatars.com/api/?name=${username}&background=D5F5E3`;
};

export const formatTime = (time: any): string => {
  let dObj;
  if (isNaN(time)) {
    dObj = new Date(time);
  } else {
    dObj = new Date(parseInt(time));
  }
  const t = dObj.toLocaleTimeString().split(" ");
  const date = dObj.toDateString().split(" ");
  const period = t[1];
  const temp = t[0].split(":", 2);
  return `${date[0]} ${date[1]} ${date[2]} ${temp[0]}:${temp[1]} ${period}`;
};

export const formatDate = (dateTime: any): String => {
  let dObj;
  if (isNaN(dateTime)) {
    dObj = new Date(dateTime);
  } else {
    dObj = new Date(parseInt(dateTime));
  }
  const t = dObj.toLocaleTimeString().split(" ");
  const period = t[1];
  const temp = t[0].split(":", 2);
  const dateString = dObj.toDateString();
  const timeString = `${temp[0]}:${temp[1]} ${period}`;
  return new Date().toLocaleDateString() === dObj.toLocaleDateString()
    ? timeString
    : dateString;
};
