package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.calendar;
import kr.or.bit.dto.user;

public interface CalendarDao {

	
	public void insertCalendar(calendar calendar);
	
	public List<calendar> getCalendarList(int project_seq);
	
	public List<calendar> getCalendarListKanban(String email,int project_seq);
	
	public calendar getCalendarListKanbanDetail(int card_seq);
	
	public void editCalendar(String start, String end, String id);
	
	public void deleteCalendar(int id);
	
	public void deleteCalendarKanban(int card_seq);
	
	public void updateCalendar(calendar calendar);
	
	public int getCalendarCount(int projectNum);
	
	public void deleteCalendarByProjectSeq(int projectNum);
	
	
}
