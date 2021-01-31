package kr.or.bit.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CalendarDao;
import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.CardMemberDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dao.Project_memberDao;
import kr.or.bit.dao.UserDao;
import kr.or.bit.dto.project_member;

/*
파일명: PIEChartService.java
설명: 차트 진행률 처리 서비스
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
@Service
public class PIEChartService {
	
	@Autowired
	private SqlSession sqlsession;
	
	//리스트 총 개수 리턴 서비스
	public int getListCountService(int projectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		int list_count = listdao.getlListCount(projectNum);
		return list_count;
	}
	//카드 총 개수 리턴 서비스
	public int getCardCountService(int projectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		int card_count = carddao.getlCardCount(projectNum);
		return card_count;
	}
	//체크리스트 총 개수 리턴 서비스
	public int getCheckListCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_count = checklistdao.getlCheckListCount(projectNum);
		return checklist_count;
	}
	//체크리스트 체크된 개수 리턴 서비스
	public int getCheckListCheckedCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_checked_count = checklistdao.getCheckListCheckedCount(projectNum);
		return checklist_checked_count;
	}
	//체크리스트 체크안된 개수 리턴 서비스
	public int getCheckListUnCheckedCountService(int projectNum) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_unchecked_count = checklistdao.getCheckListUnCheckedCount(projectNum);
		return checklist_unchecked_count;
	}
	//멤버 수 리턴 서비스
	public int getMemberCountService(int projectNum) {
		Project_memberDao pmdao = sqlsession.getMapper(Project_memberDao.class);
		int member_count = pmdao.getMemberCount(projectNum);
		return member_count;
	}
	//캘린더 수 리턴 서비스 
	public int getCalendarCountService(int projectNum) {
		CalendarDao cdao = sqlsession.getMapper(CalendarDao.class);
		int calendar_count = cdao.getCalendarCount(projectNum);
		return calendar_count;
	}
	//카드 시퀀스로 체크리스트 개수 검색
	public int getTotalCheckListByCardSeqService(int card_seq) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_count = checklistdao.getTotalCheckListByCardSeq(card_seq);
		return checklist_count;
	}
	//카드 시퀀스로 체크된 체크리스트 개수 검색
	public int getTotalCheckedCheckListByCardSeqService(int card_seq) {
		CheckListDao checklistdao = sqlsession.getMapper(CheckListDao.class);
		int checklist_count = checklistdao.getTotalCheckedCheckListByCardSeq(card_seq);
		return checklist_count;
	}
	//멤버 리스트 가져오기
	public ArrayList<project_member> getMemberService(int projectNum){
		Project_memberDao pmdao = sqlsession.getMapper(Project_memberDao.class);
		ArrayList<project_member> members = pmdao.getMember(projectNum);
		return members;
	}
	//멤버 이메일로 카드 시퀀스들 가져오기 
	public ArrayList<Integer> getCardSeqByMemberEmailService(String email){
		CardMemberDao cdmdao = sqlsession.getMapper(CardMemberDao.class);
		ArrayList<Integer> cdmem = cdmdao.getCardSeqByMemberEmail(email);
		return cdmem;
	}
	//멤버 이메일로 닉네임 가져오기 
	public String getNickNameByEmailService(String email){
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		String nickName = userdao.getNickNameByEmail(email);
		return nickName;
	}
	//프로젝트 번호로 카스 시퀀스 가져오기 
	public ArrayList<Integer> getCardSeqByProjectNumService(int projectNum, String name){
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		HashMap<String, Object> hm = new HashMap<String, Object>();
		hm.put("projectNum", projectNum);
		hm.put("name", name);
		ArrayList<Integer> card_seqs = carddao.getCardSeqByProjectNum(hm);
		return card_seqs;
	}
	
	
}
