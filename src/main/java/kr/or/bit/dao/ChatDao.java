package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.or.bit.dto.room;
import kr.or.bit.dto.roomlist;
import kr.or.bit.dto.user;

public interface ChatDao {
	
	 public List<user> chatUserList(Map<String, Object> chatUserListMap);
	 
	 public List<user> chatUserListByEmail(String[] user_array);
	 
	 public List<String> chatUserEmailListByEmailByOrder(String[] user_array);
	 
	 public List<user> selectedUserClose(Map<String, Object> map);
	 
	 public void insertChattingRoom(String chatting_room_name, int projectNum);
	 
	 public room getChattingRoomByName(String chatting_room_name);
	 
	 public void insertChattingRoomList(Map<String, Object> map);
	 
	 public List<room> getRoomList(Map<String, Object> getRoomListMap);
	 
	 public List<room> getRoomList2(Map<String, Object> getRoomListMap);
	 
	 public List<roomlist> getProfiles();
	 
	 public room getRoomListBySeq(int room_seq);
	 
	 public List<user> selectedUser(Map<String, Object> selectUserMap);
	 
	 public List<user> searchUser(Map<String, Object> searchUserMap);
	 
	 public List<user> searchAnotherUser(Map<String, Object> map);
	 
	 public void hideRoom(Map<String, Object> hideRoomMap);
	 
	 public void unhideRoom(Map<String, Object> unhideRoomMap);
	 
	 public void unhideAllRoom(int select);
	 
	 public void pushAlarm(Map<String, Object> pushAlarmMap);
	 
	 public void roomClosed(Map<String, Object> roomCloseMap);
	 
	 public void resetAlarm(Map<String, Object> resetAlarmMap);
	 
	 public int alarmIsNotNull(Map<String, Object> pushAlarmMap);
	 
	 public int pushAlarmNotMe(Map<String, Object> pushAlarmMap);
	 
	 public void checkalarm(Map<String, Object> checkAlarmMap);
	 
	 public List<Integer> checkalarmSidebarChecked(Map<String, Object> checkAlarmMap);
	 
	 public List<Integer> checkalarmSidebar(Map<String, Object> checkAlarmMap);
	 
	 public void roomClicked(Map<String, Object> checkAlarmMap);
	 
	 public void deleteRoomList(int chatting_room_seq);
	 
	 public void updateRoom(Map<String, Object> updateMap);
	 
	 public List<room> searchRoom(Map<String, Object> searchRoomMap);
	 
	 public List<room> getRoomListByProjectSeq(int projectNum);
	 
	 public List<String> getChattingRoomList(Map<String, Object> chattingRoomListMap);
	 
	 public List<roomlist> getChattingRoomList2(Map<String, Object> chattingRoomListMap);
	 
	 public List<roomlist> getChattingRoomUserListByRoomSeq(int chatting_room_seq);
	 
	 public List<roomlist> chatFileUpload(Map<String, Object> map);
	 
	 public ArrayList<Integer> getChatSeqByProjectSeq(int projectNum);
	 
	 public void deleteChatRoom(int projectNum);
}
