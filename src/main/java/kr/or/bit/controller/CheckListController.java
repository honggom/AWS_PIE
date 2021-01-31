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

import kr.or.bit.dto.checkList;
import kr.or.bit.service.CheckListService;

/*
파일명: CheckListController.java
설명: 칸반 보드 모달에서 체크리스트 추가,수정,삭제 작업 후 db에 저장
작성일: 2021-01-05 ~ 
작성자: 문지연
*/

@Controller
public class CheckListController {

	@Autowired
	private View jsonview;

	@Autowired
	private CheckListService checklistservice;

	// Get Last CheckList Num
	@ResponseBody
	@RequestMapping(value = "getLastCheckSeqNum.pie", method = RequestMethod.POST)
	public View getLastListNum(Model model) {
		int lastCheckSeq = checklistservice.getLastCheckSeqService();
		model.addAttribute("data", lastCheckSeq);
		return jsonview;
	}

	// Insert Check List
	@ResponseBody
	@RequestMapping(value = "insertCheckList.pie", method = RequestMethod.POST)
	public View insertCheckList(@RequestBody checkList chk, Model model) {
		HashMap<String, Object> checkListInfo = new HashMap<String, Object>();// db update시 파라미터 담을 해쉬맵
		checkListInfo.put("checkList", chk);
		boolean check = checklistservice.insertCheckListService(checkListInfo);
		if (check) {
			return jsonview;
		}
		model.addAttribute("data", false);
		return jsonview;
	}

	// Load CheckList
	@RequestMapping(value = "loadCheckList.pie", method = RequestMethod.POST)
	public View loadKanban(@RequestParam("cardSeq") int cardSeq, Model model) {

		ArrayList<checkList> chkList = checklistservice.loadWholeChkListService(cardSeq);
		for (int i = 0; i < chkList.size(); i++) {
			chkList.get(i).setCard_seq(cardSeq);
		}
		model.addAttribute("chkList", chkList);
		return jsonview;
	}

	// Delete CheckList
	@ResponseBody
	@RequestMapping(value = "deleteChkList.pie", method = RequestMethod.POST)
	public View deleteChkList(@RequestBody checkList chk, @RequestParam("cardSeq") int cardSeq, Model model) {
		checklistservice.deleteChkListService(chk);
		model.addAttribute("data", chk);
		return jsonview;
	}

	//Edit checked status
	@ResponseBody
	@RequestMapping(value = "editCheckedStatus.pie", method = RequestMethod.POST)
	public View editCheckedStatus(@RequestBody checkList chk, Model model) {
		checklistservice.editCheckedStatusService(chk);
		model.addAttribute("data", chk);
		return jsonview;
	}
	
	@ResponseBody
	@RequestMapping(value = "getCheckListByCard.pie", method = RequestMethod.POST)
	public List<checkList> getCheckListByCard(@RequestParam("sessionEmail") String sessionEmail,
											HttpServletRequest request) {
		HttpSession httpsession = request.getSession();
		int projectNum = (int) httpsession.getAttribute("projectNum");
		List<checkList> chkList = null;
		Map<String, Object> chkListMap = new HashMap<String, Object>();
		try {
			chkListMap.put("projectNum", projectNum);
			chkList = checklistservice.getCheckListByCardService(chkListMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return chkList;
	}
}
