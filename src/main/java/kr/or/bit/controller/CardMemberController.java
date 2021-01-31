package kr.or.bit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.cardMember;
import kr.or.bit.dto.user;
import kr.or.bit.service.CardMemberService;

/*
파일명: CardMemberController.java
설명: 칸반 카드마다 담당자 설정 
작성일: 2021-01-10 ~ 
작성자: 문지연
*/

@Controller
public class CardMemberController {

	@Autowired
	private View jsonview;

	@Autowired
	private CardMemberService cardMemService;

	// Get Project Member List By ProjectNum
	@ResponseBody
	@RequestMapping(value = "getProjectMemList", method = RequestMethod.GET)
	public List<user> projectMemList(@RequestParam("sessionEmail") String sessionEmail,
			@RequestParam("cardSeq") int cardSeq, HttpServletRequest request) {
		// get Project Session
		HttpSession httpsession = request.getSession();
		int projectNum = (int) httpsession.getAttribute("projectNum");

		List<user> memberList = null;
		Map<String, Object> projectMemListMap = new HashMap<String, Object>();
		try {
			projectMemListMap.put("cardSeq", cardSeq);
			projectMemListMap.put("projectNum", projectNum);
			memberList = cardMemService.projectMemListService(projectMemListMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return memberList;
	}
	
	//getCardMemBySession
	@ResponseBody
	@RequestMapping(value = "getCardMemBySession.pie", method = RequestMethod.GET)
	public List<user> getCardMemBySession(@RequestParam("sessionEmail") String sessionEmail,
			HttpServletRequest request) {
		// get Project Session
		HttpSession httpsession = request.getSession();
		int projectNum = (int) httpsession.getAttribute("projectNum");

		List<user> mycardList = null;
		Map<String, Object> cardMemMap = new HashMap<String, Object>();
		try {
			cardMemMap.put("sessionEmail", sessionEmail);
			cardMemMap.put("projectNum", projectNum);
			mycardList = cardMemService.getCardMemBySessionService(cardMemMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return mycardList;
	}

	// Insert Card Member
	@ResponseBody
	@RequestMapping(value = "insertCardMem.pie", method = RequestMethod.POST)
	public View insertCheckList(@RequestBody cardMember cm, Model model) {
		HashMap<String, Object> cardMemInfo = new HashMap<String, Object>();
		cardMemInfo.put("cardMember", cm);
		boolean check = cardMemService.insertCardMemService(cardMemInfo);
		if (check) {
			model.addAttribute("data", cm);
			return jsonview;
		}
		model.addAttribute("data", false);
		return jsonview;
	}

	// get selected Member by Card
	@ResponseBody
	@RequestMapping(value = "showMemberByCard", method = RequestMethod.GET)
	public List<user> showMemberByCard(@RequestParam("cardSeq") int cardSeq) {

		List<user> cardMemList = null;
		Map<String, Object> selectedMemInfo = new HashMap<String, Object>();
		try {
			selectedMemInfo.put("cardSeq", cardSeq);
			cardMemList = cardMemService.showMemberByCardService(selectedMemInfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return cardMemList;
	}

	// DELETE SELECTED CARD MEMBER
	@ResponseBody
	@RequestMapping(value = "deleteCardMem.pie", method = RequestMethod.POST)
	public View deleteCardMem(@RequestBody cardMember cm, Model model) {
		cardMemService.deleteCardMemService(cm);
		model.addAttribute("data", cm);
		return jsonview;
	}

}
