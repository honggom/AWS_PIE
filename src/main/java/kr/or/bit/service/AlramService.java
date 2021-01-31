package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.AlramDao;
import kr.or.bit.dto.alram;

/*
파일명: AlramService.java
설명: 웹소켓 실시간 알람 서비스 
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Service
public class AlramService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//알람 저장
	public void insertAlram(alram alram)throws Exception{
		AlramDao alramdao = sqlsession.getMapper(AlramDao.class);
		alramdao.insertAlram(alram);
	}
	//안읽은 알람 리스트 
	public List<alram> alramList(String email,int project_seq) throws Exception {
	AlramDao alramdao = sqlsession.getMapper(AlramDao.class);
	return alramdao.getAlramList(email,project_seq);
	}
	//알람 마지막 번호 
	public int alramLastSeq() {
		AlramDao alramdao = sqlsession.getMapper(AlramDao.class);
		int alramLastSeq = alramdao.getAlramLastSeq();
		return alramLastSeq;
	}
	//알람 삭제
	public void alramDelete(int alramseq,String email) {
		AlramDao alramdao = sqlsession.getMapper(AlramDao.class);
		alramdao.deleteAlram(alramseq,email);
	}
	//프로젝트에 가입된 팀원 이메일
	public List<String> projectMemberList(int project_seq){
		AlramDao alramdao = sqlsession.getMapper(AlramDao.class);
		return alramdao.projectMemberList(project_seq);
	}
}
