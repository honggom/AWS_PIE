package kr.or.bit.controller;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.card;
import kr.or.bit.dto.cardMember;
import kr.or.bit.dto.list;
import kr.or.bit.dto.list_progress;
import kr.or.bit.dto.member_progress;
import kr.or.bit.dto.project_member;
import kr.or.bit.service.KanbanService;
import kr.or.bit.service.PIEChartService;
import kr.or.bit.util.KanbanSortHandler;


/*
파일명: PIEChartController.java
설명: 차트 진행률 리턴 및 처리 컨트롤러
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
@Controller
public class PIEChartController {
	
	@Autowired
	private PIEChartService chartservice;
	
	@Autowired
	private KanbanService kanbanservice;
	
	@Autowired
	private View jsonview;
	
	@RequestMapping(value = "chart.pie", method = RequestMethod.GET)
	public String goToChart(@RequestParam("projectNum") int projectNum){
				return "chart/chart_main";
		}
	
	/*파이규모 차트*/
	//리스트 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getListCount.pie", method = RequestMethod.POST)
	public View getListCount(@RequestParam("projectNum") int projectNum, Model model){
				int list_count = chartservice.getListCountService(projectNum);
				model.addAttribute("list_count",list_count);
				return jsonview; 
		}
	
	//카드 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCardCount.pie", method = RequestMethod.POST)
	public View getCardCount(@RequestParam("projectNum") int projectNum, Model model){
				int card_count = chartservice.getCardCountService(projectNum);
				model.addAttribute("card_count",card_count);
				return jsonview; 
		}
	
	//체크리스트 개수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCheckListCount.pie", method = RequestMethod.POST)
	public View getCheckListCount(@RequestParam("projectNum") int projectNum, Model model){
				int checklist_count = chartservice.getCheckListCountService(projectNum);
				model.addAttribute("checklist_count",checklist_count);
				return jsonview; 
		}
	
	//멤버 수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getMemberCount.pie", method = RequestMethod.POST)
	public View getMemberCount(@RequestParam("projectNum") int projectNum, Model model){
				int member_count = chartservice.getMemberCountService(projectNum);
				model.addAttribute("member_count",member_count);
				return jsonview; 
		}
	
	//캘린더 수 가져오기 
	@ResponseBody
	@RequestMapping(value = "getCalendarCount.pie", method = RequestMethod.POST)
	public View getCalendarCount(@RequestParam("projectNum") int projectNum, Model model){
				int calendar_count = chartservice.getCalendarCountService(projectNum);
				model.addAttribute("calendar_count",calendar_count);
				return jsonview; 
		}
	/*파이규모 끝*/
	
	
	/*전체 진행도 시작*/
	//전체 진행도 가져오기 및 계산하기
	@ResponseBody
	@RequestMapping(value = "getTotalProgress.pie", method = RequestMethod.POST)
	public View getTotalProgress(@RequestParam("projectNum") int projectNum, Model model){
				int checklist_total_count = chartservice.getCheckListCountService(projectNum);
				int checklist_checked_count = chartservice.getCheckListCheckedCountService(projectNum);
				int checklist_unchecked_count = chartservice.getCheckListUnCheckedCountService(projectNum);
				
				//소수점 두자리까지 포맷
				DecimalFormat form = new DecimalFormat("#.##");
				
				String done = form.format(((double)checklist_checked_count/(double)checklist_total_count)*100);
				String inProgress = form.format(((double)checklist_unchecked_count/(double)checklist_total_count)*100);

				Map<String, Object> progress = new HashMap<>();
				progress.put("done", done);
				progress.put("inProgress", inProgress);
				model.addAttribute("progress",progress);
				return jsonview; 
		}
	/*전체 진행도 끝*/
	
	/*리스트 진행도 시작*/
	//리스트 진행도 가져오기
	@RequestMapping(value = "getListProgress.pie", method = RequestMethod.POST)
	public View getListProgress(@RequestParam("projectNum") int projectNum, Model model) {
		ArrayList<card> cardlist = kanbanservice.loadWholeCard(projectNum);
		ArrayList<list> listList = kanbanservice.loadWholeList(projectNum);
		ArrayList<list> sortedList = KanbanSortHandler.kanbanSort(cardlist,listList);
		ArrayList<Object> ListProgress = new ArrayList<>();
		
		for(int i = 0; i <sortedList.size(); i++) {
			ArrayList<card> tempCardList = sortedList.get(i).getCardList();
			
			int total_check_list_count = 0;
			int total_checked_list_count = 0;
			
			for(int j = 0; j < tempCardList.size(); j++) {
				int total_checkList_count_by_card_seq = chartservice.getTotalCheckListByCardSeqService(tempCardList.get(j).getCard_seq());
				int total_checkList_checked_count_by_card_seq = chartservice.getTotalCheckedCheckListByCardSeqService(tempCardList.get(j).getCard_seq());
				total_check_list_count += total_checkList_count_by_card_seq;
				total_checked_list_count += total_checkList_checked_count_by_card_seq;
			}
			
			DecimalFormat form = new DecimalFormat("#.##");
			String done = form.format(((double)total_checked_list_count/(double)total_check_list_count)*100);
			list_progress lp = new list_progress();
			lp.setList_name(sortedList.get(i).getList_name());
			lp.setDone(done);
			ListProgress.add(lp);
		}
		model.addAttribute("list_progress", ListProgress);
		return jsonview;
	}
	/*리스트 진행도 끝*/
	
	
	/*멤버 진행도 가져오기*/
	//멤버 진행도 가져오기 
	@ResponseBody
	@RequestMapping(value = "getMemberProgress.pie", method = RequestMethod.POST)
	public View getMemberProgress(@RequestParam("projectNum") int projectNum, Model model){
					ArrayList<project_member> members = chartservice.getMemberService(projectNum);
					ArrayList<member_progress> mpList = new ArrayList<member_progress>();
					
					for(int i = 0; i < members.size(); i++) {
						member_progress mp = new member_progress();
						String email = chartservice.getNickNameByEmailService(members.get(i).getEmail());
						
						int total_count = 0;
						int done_count = 0;
						
						ArrayList<Integer> card_seq_numbers = chartservice.getCardSeqByProjectNumService(projectNum, members.get(i).getEmail());
						
						for(int j = 0; j < card_seq_numbers.size(); j++) {
							total_count	+= chartservice.getTotalCheckListByCardSeqService(card_seq_numbers.get(j));
							done_count += chartservice.getTotalCheckedCheckListByCardSeqService(card_seq_numbers.get(j));
						}
						DecimalFormat form = new DecimalFormat("#.##");
						String done = form.format(((double)done_count/(double)total_count)*100);
						mp.setEmail(email);
						mp.setDone(done);
						mpList.add(mp);
					}
					model.addAttribute("mp", mpList);
					
				return jsonview; 
		}
	/*멤버 진행도 끝*/
	
	//프로젝트 번호와 사용자 이름으로 진행률 리턴하는 컨트롤러
	@ResponseBody
	@RequestMapping(value = "getProgressByNameAndProjectSeq.pie", method = RequestMethod.POST)
	public View getProgressByNameAndProjectSeq(@RequestParam("projectNum") int projectNum, Model model,
											   @RequestParam("name") String name){
				int total_count = 0;
				int done_count = 0;
				
				double hundred = 100;
				
				ArrayList<Integer> card_seq_numbers = chartservice.getCardSeqByProjectNumService(projectNum, name);
				
				for(int j = 0; j < card_seq_numbers.size(); j++) {
					total_count	+= chartservice.getTotalCheckListByCardSeqService(card_seq_numbers.get(j));
					done_count += chartservice.getTotalCheckedCheckListByCardSeqService(card_seq_numbers.get(j));
				}
				DecimalFormat form = new DecimalFormat("#.##");
				String done = form.format(((double)done_count/(double)total_count)*100);
				member_progress mp = new member_progress();
				
				mp.setEmail(name);
				mp.setDone(done);
				
				if(total_count != 0) {
					double doneDouble = Double.parseDouble(done);
					double inpro = hundred-doneDouble;
					String lastInpro = form.format(inpro);
					mp.setInProgress(lastInpro);
				}
				model.addAttribute("mp", mp);
		
				return jsonview; 
		}
	
}












