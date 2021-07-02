export const getPrivateChatRoomIds = (
  senderName: string,
  receiverName: string
) => {
  const receiverRoomId = `${receiverName}-${senderName}`;
  const senderRoomId = `${senderName}-${receiverName}`;
  return { receiverRoomId, senderRoomId };
};
