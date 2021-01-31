package kr.or.bit.websocket;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

/*
파일명: chatHandShakeInterceptor.java
설명: 채팅 웹소켓이 실행될 때 먼저 적용될 인터셉터
	채팅방 정보와 유저 이메일 정보를 이곳에서 미리 저장합니다.
작성일: 2021-01-17
기능구현: 도재구
*/
public class chatHandShakeInterceptor extends HttpSessionHandshakeInterceptor{
	  
    @Override
    public boolean beforeHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
    	
    	ServletServerHttpRequest ssreq = (ServletServerHttpRequest) request;
    	HttpServletRequest req= ssreq.getServletRequest();
       
        // 파라미터로 입력된 attributes에 put을 하면 
        // WebSocketSession에 자동으로 저장되어 Chat class에서 활용 가능
        attributes.put("select", req.getParameter("select"));
        attributes.put("loginuser", req.getSession().getAttribute("loginuser"));
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
  
    @Override
    public void afterHandshake(ServerHttpRequest request,
            ServerHttpResponse response, WebSocketHandler wsHandler,
            Exception ex) {
  
        super.afterHandshake(request, response, wsHandler, ex);
    }
  
}
