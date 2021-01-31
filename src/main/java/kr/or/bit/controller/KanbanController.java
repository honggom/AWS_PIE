package kr.or.bit.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.card;
import kr.or.bit.dto.kanban;
import kr.or.bit.dto.list;
import kr.or.bit.service.KanbanService;
import kr.or.bit.util.KanbanSortHandler;

/*
파일명: KanbanController.java
설명: 칸반 보드에서 리스트와 카드 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-28 ~ 2021-01-
작성자: 문지연,변재홍
*/
@Controller
public class KanbanController {

	@Autowired
	private View jsonview;

	@Autowired
	private KanbanService kanbanservice;

	@RequestMapping(value = "kanbanboard.htm", method = RequestMethod.GET)
	public String home() {
		return "project/project_main";
	}

	// kanban update
	@ResponseBody
	@RequestMapping(value = "updateKanban.pie", method = RequestMethod.POST)
	public View updateKanban(@RequestBody kanban k, @RequestParam("projectNum") int projectNum, Model model) {
		List<list> kanban = k.getKanban();// 한 프로젝트의 전체 리트와 카드
		for (int i = 0; i < kanban.size(); i++) {

			HashMap<String, Object> listAndProjectNum = new HashMap<String, Object>();// db update시 파라미터 담을 해쉬맵

			listAndProjectNum.put("list", kanban.get(i));// 리스트 한개
			listAndProjectNum.put("projectNum", projectNum);// 프로젝트 번호

			kanbanservice.updateKanbanList(listAndProjectNum);// 리스트 업데이트

			ArrayList<card> cardList = kanban.get(i).getCardList();
			for (int j = 0; j < cardList.size(); j++) {
				HashMap<String, Object> cardAndProjectNum = new HashMap<String, Object>();// db update시 파라미터 담을 해쉬맵
				cardAndProjectNum.put("card", cardList.get(j));// 카드 한개
				cardAndProjectNum.put("projectNum", projectNum);// 프로젝트 번호

				kanbanservice.updateWholeCard(cardAndProjectNum);// 카드 업데이트
			}
		}
		model.addAttribute("success", "success");
		return jsonview;
	}

	// 해당 프로젝트의 해당되는 칸반 객체를 뷰에게 전달
	@RequestMapping(value = "loadKanban.pie", method = RequestMethod.POST)
	public View loadKanban(@RequestParam("projectNum") int projectNum, Model model) {

		ArrayList<card> cardlist = kanbanservice.loadWholeCard(projectNum);
		ArrayList<list> listList = kanbanservice.loadWholeList(projectNum);
		
		ArrayList<list> sortedList = KanbanSortHandler.kanbanSort(cardlist,listList);
		
		// 여기까지 오면 카드까지 정렬됨
		model.addAttribute("listList", sortedList);
		return jsonview;
	}

	// Make_kanban_List
	@ResponseBody
	@RequestMapping(value = "makeKanbanList.pie", method = RequestMethod.POST)
	public View makeKanbanList(@RequestBody list li, @RequestParam("projectNum") int projectNum, Model model) {

		HashMap<String, Object> listInfoAndProjectNum = new HashMap<String, Object>();// db update시 파라미터 담을 해쉬맵
		listInfoAndProjectNum.put("list", li);
		listInfoAndProjectNum.put("projectNum", projectNum);
		boolean check = kanbanservice.insertKanbanListService(listInfoAndProjectNum);

		if (check) {
			int getLiSeq = kanbanservice.getListSeqService(projectNum);
			model.addAttribute("data", getLiSeq);
			return jsonview;
		}
		model.addAttribute("data", false);
		return jsonview;
	}

	// get_Last_List_Num
	@ResponseBody
	@RequestMapping(value = "getLastListNum.pie", method = RequestMethod.POST)
	public View getLastListNum(@RequestParam("projectNum") int projectNum, Model model) {

		int lastNum = kanbanservice.getLastListNumService(projectNum);
		model.addAttribute("data", lastNum);
		return jsonview;
	}

	// Make_kanban_card
	@ResponseBody
	@RequestMapping(value = "makeKanbanCard.pie", method = RequestMethod.POST)
	public View makeKanbanCard(@RequestBody card c, @RequestParam("projectNum") int projectNum, Model model) {

		HashMap<String, Object> cardInfoAndProjectNum = new HashMap<String, Object>();// db update시 파라미터 담을 해쉬맵
		cardInfoAndProjectNum.put("card", c);
		cardInfoAndProjectNum.put("projectNum", projectNum);
		boolean check = kanbanservice.insertKanbanCardService(cardInfoAndProjectNum);

		if (check) {
			int getCardSeq = kanbanservice.getCardSeqService(projectNum);
			model.addAttribute("data", getCardSeq);
			return jsonview;
		}
		model.addAttribute("data", false);
		return jsonview;
	}

	// edit_list_title
	@ResponseBody
	@RequestMapping(value = "editKanbanListTitle.pie", method = RequestMethod.POST)
	public View editKanbanListTitle(@RequestBody list li, Model model) {
		kanbanservice.editKanbanListTitleService(li);
		model.addAttribute("data", "success");
		return jsonview;
	}

	// delete_list_card_checkList_cardMember_cardComments
	@ResponseBody
	@RequestMapping(value = "deleteKanbanList.pie", method = RequestMethod.POST)
	public View deleteKanbanList(@RequestBody list li, @RequestParam("projectNum") int projectNum, Model model) {
		try {
			kanbanservice.deleteKanbanListService(li);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		model.addAttribute("data", "success");
		return jsonview;
	}

	// delete_card_checkList_cardMember_cardComments
	@ResponseBody
	@RequestMapping(value = "deleteKanbanCard.pie", method = RequestMethod.POST)
	public View deleteKanbanCard(@RequestBody card ca, @RequestParam("projectNum") int projectNum, Model model) {
		try {
			kanbanservice.deleteKanbanCardService(ca);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		model.addAttribute("data", "success");
		return jsonview;
	}

	// edit_Card_title
	@ResponseBody
	@RequestMapping(value = "editKanbanCardTitle.pie", method = RequestMethod.POST)
	public View editKanbanCardTitle(@RequestBody card ca, Model model) {
		kanbanservice.editKanbanCardTitleService(ca);
		model.addAttribute("data", ca);
		return jsonview;
	}

	// update Card Content
	@ResponseBody
	@RequestMapping(value = "updateCardContent.pie", method = RequestMethod.POST)
	public View updateCardContent(@RequestBody card ca, Model model) {
		kanbanservice.updateCardContentService(ca);
		if(ca.getCard_content()=="") {
			model.addAttribute("data", " ");
			return jsonview;
		}
		model.addAttribute("data", ca);
		return jsonview;
	}

	//get Card Content
	@ResponseBody
	@RequestMapping(value = "getCardContent.pie", method = RequestMethod.POST)
	public List<card> getCardContent(@RequestParam("cardSeq") int cardSeq, Model model) {
		List<card> card = null;
		Map<String,Object> cardInfo = new HashMap<String,Object>();
		try {
			cardInfo.put("cardSeq", cardSeq);
			card = kanbanservice.getCardContentService(cardInfo);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return card;
	}

}
