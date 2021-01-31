package kr.or.bit.websocket;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import kr.or.bit.service.ChatService;

/*
파일명: chatsocketHandler.java
설명:  채팅방에 입장한 회원의 소켓을 저장하고, 메시지를 보낼때 타게되는 웹소켓 핸들러
작성일: 2021-01-17
기능구현: 도재구
*/
public class chatsocketHandler extends TextWebSocketHandler{
		
		@Autowired
		private ChatService chatservice;
		
		private Map<String, HashMap<String,WebSocketSession>> selectmap = SessionMaps.getUserMap();
		
		@Override
		public void afterConnectionEstablished(WebSocketSession session) throws Exception {
			// 입장한 채팅방 이름 꺼내와 변수에 저장 
			String select = getCurrentChatRoom(session);
		
			//채팅방이 기존에 존재했던 방인지에 대한 유무 검증
			if (selectmap.containsKey(select)) { //기존에 존재해 Map에 저장되어 있었다면,
				selectmap.get(select).put(session.getId(),session); // 클라이언트 session값 저장
				
			} else {
				Map<String,WebSocketSession> list = new HashMap<String , WebSocketSession>(); 
				list.put(session.getId(),session); // 클라이언트의 sessionId와 session 객체를 Map에 저장한 후
				selectmap.put(select, (HashMap<String, WebSocketSession>) list); // usermap에 Put함으로써 새로운 채팅방 생성
			}
		}

		@Override
		public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
			//'|' 이 문자가 있으면 => 메시지를 보낼때
			if(message.getPayload().toString().indexOf("|") != -1) {
				String select = getCurrentChatRoom(session);
				
				for(Map.Entry m : selectmap.get(select).entrySet()) { // 메시지가 입력된 채팅방에 있는 클라이언트에게만 메시지 전송
					WebSocketSession sess = (WebSocketSession) m.getValue();
					sess.sendMessage(message);
				}
			
			//메시지를 보내고 나서 다시 한번 더 이곳을 타게됩니다.
			}else {
				Map<String, Object> pushAlarmMap = new HashMap<String, Object>();
				String select = getCurrentChatRoom(session);
				String loginuser = getLoginUser(session);
				
				chatservice.unhideAllRoom(Integer.parseInt(select));
				pushAlarmMap.put("select", Integer.parseInt(select));
				pushAlarmMap.put("loginuser", loginuser);
				chatservice.pushAlarm(pushAlarmMap);

				// 메시지가 입력된 채팅방에 있는 클라이언트에게만 메시지 전송
				for(Map.Entry m : selectmap.get(select).entrySet()) {
					WebSocketSession sess = (WebSocketSession) m.getValue();
					sess.sendMessage(message);
				}
			}
		}
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status)  {
			try {
				// 입장한 채팅방 이름 꺼내와 변수에 저장 
				String select = getCurrentChatRoom(session);
				String loginuser = getLoginUser(session);
				
				//CHATTINGROOMLIST clicked 컬럼 0 -> 1
				Map<String, Object> roomCloseMap = new HashMap<String, Object>();
				roomCloseMap.put("select", select);
				roomCloseMap.put("loginuser", loginuser);
				chatservice.roomClosed(roomCloseMap);
				
				//세션 종료
				selectmap.get(select).remove(session.getId());  
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			
		}

		
		
		//채팅방의 정보를 받아오는 함수
		public String getCurrentChatRoom(WebSocketSession session) {
			Map<String, Object> map = session.getAttributes();
			return (String) map.get("select");
		}
		public String getLoginUser(WebSocketSession session) {
			Map<String, Object> map = session.getAttributes();
			return (String) map.get("loginuser");
		}
}
