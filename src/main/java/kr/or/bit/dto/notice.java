package kr.or.bit.dto;

import lombok.Data;

@Data
public class notice {
	
	private String title;
	private String content;
	private int notice_seq;
	private int project_seq;
	private String nickName;
	private String email;
	private String writeDate;
	private String filename;
	private int file_seq;
}
