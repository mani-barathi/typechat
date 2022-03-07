import { Chat } from "../types";

export const getPrivateChatRoomIds = (
  senderName: string,
  receiverName: string
) => {
  const receiverRoomId = `${receiverName}-${senderName}`;
  const senderRoomId = `${senderName}-${receiverName}`;
  return { receiverRoomId, senderRoomId };
};

export const mergeChatArrays = (
  directChats: Chat[],
  groupChats: Chat[]
): Chat[] => {
  const allChats = [];
  let i = 0,
    j = 0;
  let arr1Len = directChats.length;
  let arr2Len = groupChats.length;

  while (i < arr1Len && j < arr2Len) {
    if (directChats[i].createdAt! < groupChats[j].createdAt!) {
      allChats.push(groupChats[j]);
      j++;
    } else {
      allChats.push(directChats[i]);
      i++;
    }
  }

  while (i < arr1Len) {
    allChats.push(directChats[i]);
    i++;
  }

  while (j < arr2Len) {
    allChats.push(groupChats[j]);
    j++;
  }
  return allChats;
};
