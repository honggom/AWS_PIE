package kr.or.bit.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.alram;
import kr.or.bit.service.AlramService;
/*
파일명: AlramController.java
설명: 웹소켓 실시간 알람 컨트롤러 
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Controller
public class AlramController {
	@Autowired
	private AlramService alramservice;

	@Autowired
	private View jsonview;
	
	//안읽은 알람 리스트 
	@ResponseBody
	@RequestMapping(value = "alramList.pie", method = RequestMethod.GET)
	public List<alram> alramList(String email,int project_seq){
		List<alram> alramList = null;
		try {
			alramList = alramservice.alramList(email,project_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return alramList;	
	}
	
	//알람 저장
	@ResponseBody
	@RequestMapping(value = "alramInsert.pie", method = RequestMethod.POST)
	public View alarmInsert(@RequestBody alram alram,Model model) {
		List<String> memberEmail = alramservice.projectMemberList(alram.getProject_seq()); //프로젝트에 가입된 팀원 이메일
		memberEmail.remove(alram.getEmail());
		if(!memberEmail.isEmpty()) { //본인 외에 가입된 팀원이 있어야 알람저장가능
		alram.setMemberEmail(memberEmail);
		try {
			alramservice.insertAlram(alram);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
		}
		return jsonview;
	}
	
	//알람 마지막 번호 
	@ResponseBody
	@RequestMapping(value = "alramLastSeq.pie", method = RequestMethod.POST)
	public int alramLastSeq() {
	int alramLastSeq = 0;
	alramLastSeq = alramservice.alramLastSeq();
	return alramLastSeq;
	}
	
	//알람 삭제
	@ResponseBody
	@RequestMapping(value = "alramDelete.pie", method = RequestMethod.POST)
	public int deleteAlram(int alramseq,String email,int project_seq) {
	int alarmCount = 0;
	try {
		alramservice.alramDelete(alramseq,email);
		alarmCount = alramservice.alramList(email, project_seq).size();
	} catch (Exception e) {
		e.printStackTrace();
	}
		return alarmCount;
	}

}
