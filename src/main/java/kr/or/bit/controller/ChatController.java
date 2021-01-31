package kr.or.bit.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.room;
import kr.or.bit.dto.roomlist;
import kr.or.bit.dto.user;
import kr.or.bit.service.ChatService;

@Controller
public class ChatController {
	
	@Autowired
	private ChatService chatservice;
	
	//채팅방 생성창에 파이원리스트 띄우기
	@ResponseBody
	@RequestMapping(value="/chat/members", method = RequestMethod.GET)
	public List<user> chatUserList(@RequestParam("sessionEmail") String sessionEmail,
									HttpServletRequest request){
		//프로젝트 번호 세션에서 가져오기
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
				
		List<user> memberList = null;
		Map<String, Object> chatUserListMap = new HashMap<String, Object>();
		try {
			chatUserListMap.put("sessionEmail", sessionEmail);
			chatUserListMap.put("projectNum", projectNum);
			memberList = chatservice.chatUserList(chatUserListMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	//채팅방 생성하기 버튼 클릭시 채팅방 생성하기
	@ResponseBody
	@RequestMapping(value="/chat/members", method = RequestMethod.POST)
	public Map<String, Object> makeRoom(String[] user_array, 
										HttpServletRequest request){
		//프로젝트 번호 세션에서 가져오기
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		String loginuser = (String)httpsession.getAttribute("loginuser");
		
		List<user> userList = null;
		List<room> roomList = null;
		List<roomlist> user_room_list = null;
		List<String> chattingRoomList = new ArrayList<>();
		List<String> user_arraylist = new ArrayList<>();
		Map<String, Object> chattingRoomListMap = new HashMap<String, Object>();
		Map<String, Object> getRoomListMap = new HashMap<String, Object>();
		Map<String, Object> insertMap = new HashMap<String, Object>();
		Map<String, Object> selectMap = new HashMap<String, Object>();
		try {
			
			user_arraylist = chatservice.chatUserEmailListByEmailByOrder(user_array);
			
			roomList = chatservice.getRoomListByProjectSeq(projectNum);
			//해당 프로젝트에 존재하는 모든 채팅방 중에 만들려고 하는 채팅방과 동일한 채팅방이 있는지 여부를 파악함
			for(int i=0; i < roomList.size(); i++) {
				chattingRoomListMap.put("room_num", roomList.get(i).getChatting_room_seq());
				chattingRoomListMap.put("projectNum", projectNum);
				chattingRoomList = chatservice.getChattingRoomList(chattingRoomListMap);
				
				//동일한 채팅방이 있으면
				if(Arrays.equals(chattingRoomList.toArray(), user_arraylist.toArray())) {
					
					Map<String, Object> unhideRoomMap = new HashMap<>();
					unhideRoomMap.put("loginuser", loginuser);
					unhideRoomMap.put("chatting_room_seq", roomList.get(i).getChatting_room_seq());
					chatservice.unhideRoom(unhideRoomMap);
					
					getRoomListMap.put("projectNum", projectNum);
					getRoomListMap.put("loginuser", loginuser);
					//채팅방 리스트 페이지에 바인딩
					roomList = chatservice.getRoomList(getRoomListMap);
					ArrayList<String> nicknames = new ArrayList<String>();
					
					String nickname = "";
					for(room room2 : roomList) {
						user_room_list = chatservice.getChattingRoomUserListByRoomSeq(room2.getChatting_room_seq());
						for(roomlist list : user_room_list) {
							nickname += "#" + list.getNickName();
						}
						if(nickname.length() > 15){
							nickname = nickname.substring(0,15) + "...";
						}
						nicknames.add(nickname);
						nickname = "";
					}
					
					//회원 이미지 불러오기
					List<roomlist> user_list = chatservice.getProfiles();
					List<room> room_list2 = chatservice.getRoomList(getRoomListMap);
					Map<Integer, Object> profile_map = new HashMap<>();
					for(int k=0; k < room_list2.size(); k++) {
						List<roomlist> profile_list = new ArrayList<>();
						for(int j=0; j < user_list.size(); j++) {
							if(room_list2.get(k).getChatting_room_seq() == user_list.get(j).getChatting_room_seq()) {
								profile_list.add(user_list.get(j));
							}
						}
						profile_map.put(room_list2.get(k).getChatting_room_seq(), profile_list);
					}
					
					selectMap.put("chat_room_list", roomList);
					selectMap.put("nicknames", nicknames);
					selectMap.put("profiles", profile_map);
					
					return selectMap;
				}
			}//동일한 채팅방이 없으면 아래 코드 실행하여 채팅방 생성
			
			// 선택된 파이원의 이메일 정보로 회원정보를 가져옴
			userList = chatservice.chatUserListByEmail(user_array);
			
			// 채팅방 이름 가공 (...추가)
			String chatting_room_name = "";
			int index = 0;
			for(user user : userList) {
				if(userList.size()-1 == index++) {
					chatting_room_name += user.getNickName();
				}else {
					chatting_room_name += user.getNickName() + ",";
				}
			}
			
			//해당 이름으로 채팅방 생성
			chatservice.insertChattingRoom(chatting_room_name, projectNum);
			
			getRoomListMap.put("projectNum", projectNum);
			getRoomListMap.put("loginuser", loginuser);
			//채팅방 리스트 페이지에 바인딩
			roomList = chatservice.getRoomList2(getRoomListMap);
			//생성한 채팅방 번호 추출
			for(int i=0; i < roomList.size(); i++) {
				if(i == roomList.size()-1) {
					insertMap.put("room_number", roomList.get(i).getChatting_room_seq());
				}
			}
			//채팅방 리스트 생성
			insertMap.put("user_array", user_array);
			insertMap.put("loginuser", loginuser);
			insertMap.put("chatting_room_name", chatting_room_name);
			chatservice.insertChattingRoomList(insertMap);
			
			ArrayList<String> nicknames = new ArrayList<String>();
			String nickname = "";
			for(room room2 : roomList) {
				user_room_list = chatservice.getChattingRoomUserListByRoomSeq(room2.getChatting_room_seq());
				for(roomlist list : user_room_list) {
					nickname += "#" + list.getNickName();
				}
				if(nickname.length() > 15){
					nickname = nickname.substring(0,15) + "...";
				}
				nicknames.add(nickname);
				nickname = "";
			}
			
			//회원 이미지 불러오기
			List<roomlist> user_list = chatservice.getProfiles();
			List<room> room_list2 = chatservice.getRoomList(getRoomListMap);
			Map<Integer, Object> profile_map = new HashMap<>();
			for(int k=0; k < room_list2.size(); k++) {
				List<roomlist> profile_list = new ArrayList<>();
				for(int j=0; j < user_list.size(); j++) {
					if(room_list2.get(k).getChatting_room_seq() == user_list.get(j).getChatting_room_seq()) {
						profile_list.add(user_list.get(j));
					}
				}
				profile_map.put(room_list2.get(k).getChatting_room_seq(), profile_list);
			}
			
			List<room> roomList2 = chatservice.getRoomList(getRoomListMap);
			
			getRoomListMap.put("chat_room_list", roomList2);
			getRoomListMap.put("nicknames", nicknames);
			getRoomListMap.put("profiles", profile_map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return getRoomListMap;
	}
	
	@ResponseBody
	@RequestMapping(value="/chat/members/select", method = RequestMethod.POST)
	public List<user> selectedUser(String[] select_user_array, HttpServletRequest request){
		
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		String loginuser = (String)httpsession.getAttribute("loginuser");
		
		Map<String, Object> selectUserMap = new HashMap<String, Object>();
		selectUserMap.put("select_user_array", select_user_array);
		selectUserMap.put("projectNum", projectNum);
		selectUserMap.put("loginuser", loginuser);
		
		List<user> memberList = null;
		try {
			memberList = chatservice.selectedUser(selectUserMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	//채팅방 생성창에 파이원 비동기 검색구현
	@ResponseBody
	@RequestMapping(value="/chat/members/search", method = RequestMethod.GET)
	public List<user> searchUser(HttpServletRequest request, 
								@RequestParam("sessionEmail") String sessionEmail,
								String nickName){
		
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		
		List<user> user_list = null;
		Map<String, Object> searchUserMap = new HashMap<String, Object>();
		try {
			searchUserMap.put("nickName", nickName);
			searchUserMap.put("projectNum", projectNum);
			searchUserMap.put("sessionEmail", sessionEmail);
			
			user_list = chatservice.searchUser(searchUserMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user_list;
	}
	
	//채팅방 생성창에 파이원 비동기 검색구현
	@ResponseBody
	@RequestMapping(value="/chat/members/search", method = RequestMethod.POST)
	public List<user> searchAnotherUser(HttpServletRequest request, 
										@RequestParam("sessionEmail") String sessionEmail, 
										String[] user_array, 
										String nickName){
		
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("nickName", nickName);
		map.put("user_array", user_array);
		map.put("projectNum", projectNum);
		map.put("sessionEmail", sessionEmail);
		
		List<user> memberList = null;
		try {
			memberList = chatservice.searchAnotherUser(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	//파이원 선택후 선택된 파이원 리스트에서 X버튼을 누르고 지울 때
	@ResponseBody
	@RequestMapping(value="/chat/members/close", method = RequestMethod.GET)
	public List<user> selectUser(	HttpServletRequest request, 
									@RequestParam("sessionEmail") String sessionEmail, 
									String[] user_array, 
									String nickName){
		
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("nickName", nickName);
		map.put("user_array", user_array);
		map.put("projectNum", projectNum);
		map.put("sessionEmail", sessionEmail);
		
		List<user> memberList = null;
		try {
			memberList = chatservice.selectedUserClose(map);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	//채팅방 리스트를 우측 사이드바에 띄우기 위한 데이터 전달
	@ResponseBody
	@RequestMapping(value="roomlistGet.pie", method = RequestMethod.GET)
	public Map<String, Object> chatRoomList(HttpServletRequest request){
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		String loginuser = (String)httpsession.getAttribute("loginuser");
		
		List<room> chat_room_list = null;
		List<roomlist> user_room_list = null;
		Map<String, Object> getRoomListMap = new HashMap<String, Object>();
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			
			getRoomListMap.put("projectNum", projectNum);
			getRoomListMap.put("loginuser", loginuser);
			chat_room_list = chatservice.getRoomList(getRoomListMap);
			
			ArrayList<String> nicknames = new ArrayList<String>();
			
			String nickname = "";
			for(room room : chat_room_list) {
				user_room_list = chatservice.getChattingRoomUserListByRoomSeq(room.getChatting_room_seq());
				for(roomlist list : user_room_list) {
					nickname += "#" + list.getNickName();
				}
				
				if(nickname.length() > 15){
					nickname = nickname.substring(0,15) + "...";
				}
				nicknames.add(nickname);
				nickname = "";
			}
			
			//회원 이미지 불러오기
			List<roomlist> user_list = chatservice.getProfiles();
			List<room> room_list = chatservice.getRoomList(getRoomListMap);
			Map<Integer, Object> profile_map = new HashMap<>();
			for(int i=0; i < room_list.size(); i++) {
				List<roomlist> profile_list = new ArrayList<>();
				for(int j=0; j < user_list.size(); j++) {
					if(room_list.get(i).getChatting_room_seq() == user_list.get(j).getChatting_room_seq()) {
						profile_list.add(user_list.get(j));
					}
				}
				profile_map.put(room_list.get(i).getChatting_room_seq(), profile_list);
			}
			
			map.put("chat_room_list", chat_room_list);
			map.put("nicknames", nicknames);
			map.put("profiles", profile_map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	//채팅방 숨기기 기능
	@ResponseBody
	@RequestMapping(value="roomlistPost.pie", method = RequestMethod.POST)
	public void hideRoom(HttpServletRequest request, @RequestParam("chatting_room_seq") int chatting_room_seq){
		HttpSession session = request.getSession();
		String loginuser = (String)session.getAttribute("loginuser");
		
		Map<String, Object> hideRoomMap = new HashMap<>();
		try {
			hideRoomMap.put("loginuser", loginuser);
			hideRoomMap.put("chatting_room_seq", chatting_room_seq);
			chatservice.hideRoom(hideRoomMap);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//채팅방 이름 수정
	@ResponseBody
	@RequestMapping(value="/chat/room", method = RequestMethod.GET)
	public void updateRoom(	@RequestParam("chatting_room_seq") int chatting_room_seq,
							@RequestParam("chatting_room_name") String chatting_room_name,
							HttpServletRequest request){
		HttpSession session = request.getSession();
		String loginuser = (String)session.getAttribute("loginuser");
		
		HashMap<String, Object> updateMap = new HashMap<String, Object>();
		try {
			updateMap.put("chatting_room_name", chatting_room_name);
			updateMap.put("chatting_room_seq", chatting_room_seq);
			updateMap.put("loginuser", loginuser);
			chatservice.updateRoom(updateMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	//우측 사이드바 채팅방 비동기 검색기능
	@ResponseBody
	@RequestMapping(value="/chat/room", method = RequestMethod.POST)
	public Map<String, Object> searchRoom(HttpServletRequest request, String searchKeyword){
		HttpSession httpsession = request.getSession();
		int projectNum = (int)httpsession.getAttribute("projectNum");
		String loginuser = (String)httpsession.getAttribute("loginuser");
		
		Map<String, Object> searchRoomMap = new HashMap<String, Object>();
		List<room> room_list = null;
		List<roomlist> user_room_list = null;
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			
			searchRoomMap.put("searchKeyword", searchKeyword);
			searchRoomMap.put("projectNum", projectNum);
			searchRoomMap.put("loginuser", loginuser);
			room_list = chatservice.searchRoom(searchRoomMap);
			
			ArrayList<String> nicknames = new ArrayList<String>();
			
			String nickname = "";
			for(room room : room_list) {
				user_room_list = chatservice.getChattingRoomUserListByRoomSeq(room.getChatting_room_seq());
				for(roomlist list : user_room_list) {
					nickname += "#" + list.getNickName();
				}
				if(nickname.length() > 15){
					nickname = nickname.substring(0,15) + "...";
				}
				nicknames.add(nickname);
				nickname = "";
			}
			
			//회원 이미지 불러오기
			List<roomlist> user_list = chatservice.getProfiles();
			//List<room> room_list2 = chatservice.getRoomList(searchRoomMap);
			Map<Integer, Object> profile_map = new HashMap<>();
			for(int i=0; i < room_list.size(); i++) {
				List<roomlist> profile_list = new ArrayList<>();
				for(int j=0; j < user_list.size(); j++) {
					if(room_list.get(i).getChatting_room_seq() == user_list.get(j).getChatting_room_seq()) {
						profile_list.add(user_list.get(j));
					}
				}
				profile_map.put(room_list.get(i).getChatting_room_seq(), profile_list);
			}
			
			map.put("chat_room_list", room_list);
			map.put("nicknames", nicknames);
			map.put("profiles", profile_map);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
	
	//우측 사이드바 채팅방 오픈
	@RequestMapping(value="/chat", method = RequestMethod.POST)
	public String openChatRoom(String select, String roomname, Model model, HttpServletRequest request){
		HttpSession session = request.getSession();
		
		//채팅방 참여자를 넣어줌
		//해당 채팅방의 참여자 리스트를 구함
		List<roomlist> user_room_list = null;
		user_room_list = chatservice.getChattingRoomUserListByRoomSeq(Integer.parseInt(select));
		
		//String 가공
		String nickname = "";
		for(roomlist list : user_room_list) {
			nickname += "#" + list.getNickName();
		}
		if(nickname.length() > 15){
			nickname = nickname.substring(0,15) + "...";
		}
		
		model.addAttribute("select", select);
		model.addAttribute("roomname", roomname);
		model.addAttribute("participants", nickname);
		model.addAttribute("user_room_list", user_room_list);
		model.addAttribute("loginuser", session.getAttribute("loginuser"));
		
		return "chat/chat";
	}
	
	@ResponseBody
	@RequestMapping(value="/chat/users", method = RequestMethod.GET)
	public List<roomlist> chatmembers(@RequestParam("select") int select){
		List<roomlist> room_list = null;
		try {
			room_list = chatservice.getChattingRoomUserListByRoomSeq(select);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return room_list;
	}
	
	
	@ResponseBody
	@RequestMapping(value="/chat/checkalarm", method = RequestMethod.POST)
	public int checkalarm(int select, HttpServletRequest request){
		HttpSession httpsession = request.getSession();
		String loginuser = (String)httpsession.getAttribute("loginuser");
		Map<String, Object> checkAlarmMap = new HashMap<String, Object>();
		int count = 0;
		
		try {
			checkAlarmMap.put("select", select);
			checkAlarmMap.put("loginuser", loginuser);
			chatservice.checkalarm(checkAlarmMap);
			List<Integer> alarm_count = chatservice.checkalarmSidebarChecked(checkAlarmMap);
			for(int i : alarm_count) {
				count += i;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
	@ResponseBody
	@RequestMapping(value="sidebar.pie", method = RequestMethod.GET)
	public int checkalarmSidebar(HttpServletRequest request){
		HttpSession httpsession = request.getSession();
		String loginuser = (String)httpsession.getAttribute("loginuser");
		int projectNum = (int)httpsession.getAttribute("projectNum");
		
		Map<String, Object> checkAlarmMap = new HashMap<String, Object>();
		int count = 0;
		
		try {
			checkAlarmMap.put("loginuser", loginuser);
			checkAlarmMap.put("projectNum", projectNum);
			List<Integer> alarm_count = chatservice.checkalarmSidebar(checkAlarmMap);
			
			for(int i : alarm_count) {
				count += i;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return count;
	}
	
}
