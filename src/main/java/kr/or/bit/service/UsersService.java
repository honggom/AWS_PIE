package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.UsersDao;
import kr.or.bit.dto.users;
/*
파일명: UsersService.java
설명: 가입 팀원 목록 서비스
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Service
public class UsersService {
	@Autowired
	private SqlSession sqlsession;
	//팀원 정보가져오기
	public List<users> usersList(int project_seq) throws Exception{
		UsersDao usersdao = sqlsession.getMapper(UsersDao.class);
		return usersdao.getUserList(project_seq);
	}

	
}
