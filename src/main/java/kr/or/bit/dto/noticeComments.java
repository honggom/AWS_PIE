package kr.or.bit.dto;

import lombok.Data;

@Data
public class noticeComments {
	private String email;
	private int notice_seq;
	private int notice_comments_seq;
	private String comments;
	private String reg_date;
	private int edited;
	private String nickName;
	private String profile;
}
