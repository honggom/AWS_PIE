package kr.or.bit.util;

import java.text.DecimalFormat;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.or.bit.dto.card;
import kr.or.bit.dto.list;
import kr.or.bit.dto.list_progress;
import kr.or.bit.service.PIEChartService;


/*
파일명: ChartCalculator.java
설명: 차트 진행률 계산 유틸
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
public class ChartCalculator {
	
	@Autowired
	private PIEChartService chartservice;
	
	public ArrayList<Object> listCal(ArrayList<list> sortedList){
		
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
		
		return ListProgress;
	}
}
