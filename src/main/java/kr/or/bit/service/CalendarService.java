package kr.or.bit.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CalendarDao;
import kr.or.bit.dto.calendar;

/*
파일명: CalendarService.java
설명: 캘린더 서비스 
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Service
public class CalendarService {
	@Autowired
	private SqlSession sqlsession;

	//캘린더 등록
	public void insertCalendar(calendar calendar)throws Exception{
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.insertCalendar(calendar);
	}
	//캘린더 리스트 
	public List<calendar> calendarList(int project_seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		return calendardao.getCalendarList(project_seq);
	}
	//칸반연동 캘린더 리스트 
	public List<calendar> calendarListKanban(String email,int project_seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		return calendardao.getCalendarListKanban(email,project_seq);
	}
	//칸반에서 캘린더 상세내용 보기
	public calendar calendarListKanbanDetail(int card_seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		return calendardao.getCalendarListKanbanDetail(card_seq);
	}
	//캘린더 Drag&Drop으로 날짜 수정
	public void calendarEdit(String start, String end, String id) {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.editCalendar(start,end,id);
	}
	//캘린더 삭제
	public void calendarDelete(int id) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.deleteCalendar(id);
	}
	//칸반카드 삭제시 캘린더 삭제
	public void calendarDeleteKandan(int card_seq) throws Exception {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.deleteCalendarKanban(card_seq);
	}
	//캘린더 수정
	public void calendarUpdate(calendar calendar) {
		CalendarDao calendardao = sqlsession.getMapper(CalendarDao.class);
		calendardao.updateCalendar(calendar);
	}
}
