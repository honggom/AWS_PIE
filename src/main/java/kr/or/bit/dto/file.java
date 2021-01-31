package kr.or.bit.dto;

import lombok.Data;

@Data
public class file {
	
	private int file_seq;				//파일 시퀀스
	private int project_seq; 		//저장된 프로젝트 번호 
	private String file_original_name;  //원래 이름 
	private String file_uploaded_name;  //저장된 이름 
	private String extension;			//확장자 명 
	private String upload_date;			//저장된 시간(날짜)
	private String nickName;

}
