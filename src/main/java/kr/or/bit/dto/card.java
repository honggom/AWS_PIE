package kr.or.bit.dto;

import java.util.ArrayList;

import lombok.Data;

@Data
public class card {
	
	private String card_order_num;//카드 순서번호
	private String card_name;
	private String card_content;
	private int card_seq;//카드 고유번호 
	private ArrayList<checkList> chkList;
	private ArrayList<cardMember> cmList;
	private int project_seq;
	private ArrayList<cardComments> commList;
	
}
