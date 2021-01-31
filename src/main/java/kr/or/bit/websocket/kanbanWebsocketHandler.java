package kr.or.bit.websocket;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.user;
import kr.or.bit.service.KanbanService;

/*
파일명: kanbanWebsocketHandler.java
설명: 칸반 보드 내 카드, 리스트 이동 실시간 구현 websocket
작성일: 2021-01-08 ~
작성자: 문지연
*/

@Controller
public class kanbanWebsocketHandler extends TextWebSocketHandler{
		//로그인한 전체 회원 관리
		List<WebSocketSession> sessionList = new ArrayList<>();
		// 1대1
		Map<String, WebSocketSession>	userSessionsMap = new HashMap<>();
		ObjectMapper objectMapper = new ObjectMapper();

		//서버에 접속 성공했을때
		@Override
		public void afterConnectionEstablished(WebSocketSession session) {
			sessionList.add(session);
			String senderEmail = getEmail(session);
			userSessionsMap.put(senderEmail, session);
		}
		@Override
		protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
				for(WebSocketSession sess: sessionList) {
					sess.sendMessage(new TextMessage("kanban"));		
			}
		}
		@Override
		public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
			sessionList.remove(session);
		}
		private String getEmail(WebSocketSession session) {
			Map<String, Object> httpSession = session.getAttributes();
			user loginUser = (user)httpSession.get("user");
			
			if(loginUser == null) {
				return session.getId();
			}else {
				return loginUser.getEmail();
			}
				
		}
}