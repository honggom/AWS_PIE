package kr.or.bit.dto;

import lombok.Data;

@Data
public class cardComments {
	private String email;
	private int card_seq;
	private int comments_seq;
	private String comments;
	private String reg_date;
	private int edited;
	private String nickName;
	private String profile;
	private int total;
}
