package kr.or.bit.dto;

import java.util.List;

import lombok.Data;

@Data
public class alram {
	private String nickName;
	private String title;
	private String state;
	private String alramTime;
	private String email;
	private int alramseq;
	private int project_seq;
	private int alramCount;
	private List<String> memberEmail;

}
