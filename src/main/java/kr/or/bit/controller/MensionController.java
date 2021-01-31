package kr.or.bit.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.bit.dto.roomlist;
import kr.or.bit.service.MensionService;

@RestController
public class MensionController {

	@Autowired
	private MensionService mensionservice;
	
	@RequestMapping(value="/mension", method = RequestMethod.GET)
	public List<roomlist> getRoomList(	int chatting_room_seq,
										String sender_email,
										HttpServletRequest request) throws IOException {
		
		HttpSession session = request.getSession();
		String loginuser = (String)session.getAttribute("loginuser");
		Map<String, Object> map = new HashMap<>();
		map.put("chatting_room_seq", chatting_room_seq);
		map.put("sender_email", sender_email);
		List<roomlist> roomlist = mensionservice.getRoomListByRoomSeq(map);
		
		return roomlist;
	}
	
}
