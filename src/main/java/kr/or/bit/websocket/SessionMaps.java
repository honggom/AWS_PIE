package kr.or.bit.websocket;

import java.util.HashMap;

import org.springframework.web.socket.WebSocketSession;

public class SessionMaps {
	
	private static HashMap<String, HashMap<String,WebSocketSession>> usermap =  new HashMap();
	private static HashMap<String, WebSocketSession> alarmusers  = new HashMap();
	
	
	public static HashMap getUserMap() {
		return usermap;
	}
	
	public static HashMap getAlarmusers() {
		return alarmusers;
	}
}
