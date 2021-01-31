package kr.or.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.bit.dto.users;
import kr.or.bit.service.UsersService;
/*
파일명: UsersController.java
설명: 가입된 팀원 목록 컨트롤러
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Controller
public class UsersController {
	
	@Autowired
	UsersService usersservice;
	//팀원 정보가져오기
	@ResponseBody
	@RequestMapping (value= "usersList.pie", method = RequestMethod.GET)
	public List<users> usersList(int project_seq){
		List<users> usersList = null;
		try {
			usersList = usersservice.usersList(project_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return usersList;
	}
}
