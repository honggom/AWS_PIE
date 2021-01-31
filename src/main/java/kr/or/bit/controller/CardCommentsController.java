package kr.or.bit.controller;

import java.util.ArrayList;
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

import kr.or.bit.dto.cardComments;
import kr.or.bit.dto.checkList;
import kr.or.bit.service.CardCommentsService;

/*
파일명: CardCommentsController.java
설명: 칸반 카드 모달 댓글 CRUD
작성일: 2021-01-17 ~ 
작성자: 문지연
*/

@Controller
public class CardCommentsController {

	@Autowired
	private View jsonview;

	@Autowired
	private CardCommentsService cardcomservice;

	// Insert card Comment
	@ResponseBody
	@RequestMapping(value = "insertComments.pie", method = RequestMethod.POST)
	public View insertComments(@RequestBody cardComments comm, Model model) {
		cardcomservice.insertCommentsService(comm);
		model.addAttribute("comments", comm);
		return jsonview;
	}
	
	//Load card Comments List
	@ResponseBody
	@RequestMapping(value="loadComments.pie", method= RequestMethod.POST)
	public View loadComments(@RequestParam("cardSeq") int cardSeq, Model model) {
		ArrayList<cardComments> commList = cardcomservice.loadCommentsService(cardSeq);
		for(int i=0; i<commList.size(); i++) {
			commList.get(i).setCard_seq(cardSeq);
		}
		model.addAttribute("commList",commList);
		return jsonview;
	}
	
	//delete Card Comment
	@ResponseBody
	@RequestMapping(value = "deleteCardComment.pie", method = RequestMethod.POST)
	public View deleteCardComment(@RequestParam("commSeq") int commSeq, Model model) {
		cardcomservice.deleteCardCommentService(commSeq);
		model.addAttribute("data", "success");
		return jsonview;
	}
	
	//edit Card Comment
	@ResponseBody
	@RequestMapping(value = "editCardComment.pie", method = RequestMethod.POST)
	public View editKanbanListTitle(@RequestBody cardComments comm, Model model) {
		cardcomservice.editCardCommentService(comm);
		model.addAttribute("data", "success");
		return jsonview;
	}
	
	//get myProfile&last comments sequence
	@ResponseBody
	@RequestMapping(value="getProAndSeq.pie", method = RequestMethod.POST)
	public List<cardComments> getMyProfile(@RequestParam("email") String email) {
		List<cardComments> proAndSeqList = null;
		Map<String, Object> proSeqInfo = new HashMap<String,Object>();
		try {
			proSeqInfo.put("email", email);
			proAndSeqList = cardcomservice.getProAndSeqService(proSeqInfo);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return proAndSeqList;
	}
	
	//count comments by card
	@ResponseBody
	@RequestMapping(value = "getTotalCommByCard.pie", method = RequestMethod.POST)
	public List<cardComments> getTotalCommByCard(@RequestParam("sessionEmail") String sessionEmail,
											HttpServletRequest request) {
		HttpSession httpsession = request.getSession();
		int projectNum = (int) httpsession.getAttribute("projectNum");
		List<cardComments> commList = null;
		Map<String, Object> commTotal = new HashMap<String, Object>();
		try {
			commTotal.put("projectNum", projectNum);
			commList = cardcomservice.getTotalCommByCardService(commTotal);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return commList;
	}


}
