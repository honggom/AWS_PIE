package kr.or.bit.websocket;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.bit.service.ChatService;

/*
파일명: chatReceivesocketHandler.java
설명: 메시지를 보낼 떄, 받는 사람의 경우 적용될 웹소켓핸들러
작성일: 2021-01-17
기능구현: 도재구
*/
public class chatReceivesocketHandler extends TextWebSocketHandler{
	
	@Autowired
	private ChatService chatservice;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
	
	}

	@Override
	public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
		Map<String, Object> pushAlarmMap = new HashMap<String, Object>();
		String select = getCurrentChatRoom(session);
		String loginuser = getLoginUser(session);
		pushAlarmMap.put("select", Integer.parseInt(select));
		pushAlarmMap.put("loginuser", loginuser);
		
		//대기하면서 DB와의 조회를 계속하다가
		while(true) {
			//보내는 쪽에서 알람을 보내게 되면
			if(chatservice.alarmIsNotNull(pushAlarmMap) != 0) {
				//채팅방이 ON 상태인 회원의 채팅방 알림은 울리지 않도록 합니다.
				chatservice.pushAlarmNotMe(pushAlarmMap);
				break;
			}
		}
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException  {

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
