package kr.or.bit.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

/*
파일명: connectsocketHandler.java
설명: 메시지를 보낸 시점에, 채팅방과 프로젝트 메인에 적용되는 핸들러
작성일: 2021-01-17
기능구현: 도재구
*/
public class connectsocketHandler extends TextWebSocketHandler{
	
	//로그인한 전체 회원 관리
	private Map<String, HashMap<String,WebSocketSession>> usermap = SessionMaps.getUserMap();
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		String loginuser = getLoginUser(session);
		//기존에 존재한 회원인지에 대한 유무 검증,
		if (usermap.containsKey(loginuser)) { //기존에 존재해 Map에 저장되어 있었다면,
			usermap.get(loginuser).put(session.getId(),session); // 클라이언트 session값 저장
		//기존에 존재하지 않는 회원이라면 새로 map, list에 넣어줌
		}else {
			Map<String,WebSocketSession> list = new HashMap<String , WebSocketSession>(); 
			list.put(session.getId(),session); // 클라이언트의 sessionId와 session 객체를 Map에 저장한 후
			usermap.put(loginuser, (HashMap<String, WebSocketSession>) list); // usermap에 Put함으로써 새로운 채팅방 생성
		}
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		String loginuser = getLoginUser(session);
		for(Map.Entry m : usermap.get(loginuser).entrySet()) {
			WebSocketSession sess = (WebSocketSession) m.getValue(); 
			sess.sendMessage(message);
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {
		String loginuser = getLoginUser(session);
		usermap.get(loginuser).remove(session.getId());  // 채팅방에서 클라이언트라 접속을 끊으면, 참여중인 목록에서 session을 삭제한 후
	}

	public String getLoginUser(WebSocketSession session) {
		Map<String, Object> map = session.getAttributes();
		return (String) map.get("loginuser");
	}
}
