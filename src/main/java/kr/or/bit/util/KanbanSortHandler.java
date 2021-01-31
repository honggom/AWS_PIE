package kr.or.bit.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

import kr.or.bit.dto.card;
import kr.or.bit.dto.list;


/*
파일명: KanbanSortHandler.java
설명: 칸반 카드 및 리스트 순서 정리해주는 유틸
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
public class KanbanSortHandler {
	
	public static ArrayList<list> kanbanSort(ArrayList<card> cardlist, ArrayList<list> listList){
		
		for (int i = 0; i < listList.size(); i++) {
			ArrayList<card> li = new ArrayList<card>();
			for (int j = 0; j < cardlist.size(); j++) {
				String order_num = cardlist.get(j).getCard_order_num();
				String result = order_num.substring(0, order_num.indexOf("-"));// " - " 대쉬를 중심으로 앞에 있는 글자들
				int resultInteger = Integer.parseInt(result);
				if (resultInteger == listList.get(i).getList_order_num()) {// 리스트의 오더 번호와 카드의 앞 자리 ex) "3-1" 에서는 3과 같으면
																			// li에 카드를 넣어줌
					li.add(cardlist.get(j));
				}
			}
			listList.get(i).setCardList(li);// 리스트 하나에 정렬번호가 같은 카드들이 들어있는 카드리스트를 삽입
		}

		Collections.sort(listList, new Comparator<list>() { // 리스트들을 정렬해줌
			@Override
			public int compare(list l1, list l2) {// 비교하는 대상 값
				if (l1.getList_order_num() < l2.getList_order_num()) {
					return -1;
				} else if (l1.getList_order_num() > l2.getList_order_num()) {
					return 1;
				}
				return 0;
			}
		});

		// 여기까지 오면 리스트는 리스트 order_num 순서에 맞게 정렬됨
		for (int i = 0; i < listList.size(); i++) {
			Collections.sort(listList.get(i).getCardList(), new Comparator<card>() {// 리스트의 카드를 정렬해줌
				@Override
				public int compare(card c1, card c2) {// 비교하는 대상 값
					if (Integer.parseInt(c1.getCard_order_num()
							.substring(c1.getCard_order_num().indexOf("-") + 1)) < Integer.parseInt(
									c2.getCard_order_num().substring(c2.getCard_order_num().indexOf("-") + 1))) {
						return -1;
					} else if (Integer.parseInt(c1.getCard_order_num()
							.substring(c1.getCard_order_num().indexOf("-") + 1)) > Integer.parseInt(
									c2.getCard_order_num().substring(c2.getCard_order_num().indexOf("-") + 1))) {
						return 1;
					}
					return 0;
				}
			});
		}
		
		return listList;
	}

}
