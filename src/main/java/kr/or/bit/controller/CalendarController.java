package kr.or.bit.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.calendar;
import kr.or.bit.service.CalendarService;
/*
파일명: CalendarController.java
설명: 캘린더 컨트롤러  
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Controller
public class CalendarController {
	@Autowired
	private CalendarService calendarservice;

	@Autowired
	private View jsonview;
	
	//캘린더 페이지 이동
	@RequestMapping(value = "fullcalendar.htm", method = RequestMethod.GET)
	public String home() {
		return "project/calendar_main";
	}
	
	//캘린더 등록
	@ResponseBody
	@RequestMapping(value = "calendarInsert.pie", method = RequestMethod.POST)
	public View calendarInsert(@RequestBody calendar calendar, Model model) {
		try {
			calendarservice.insertCalendar(calendar);
		} catch (Exception e) {
			e.printStackTrace();
		}
			return jsonview;
	}
	
	//캘린더 수정
	@ResponseBody
	@RequestMapping(value = "calendarUpdate.pie", method = RequestMethod.POST)
	public View calendarUpdate(@RequestBody calendar calendar, Model model) {
		try {
			calendarservice.calendarUpdate(calendar);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;

	}
	
	//캘린더 리스트 
	@ResponseBody
	@RequestMapping(value = "calendarList.pie", method = RequestMethod.GET)
	public List<calendar> calendarList(int project_seq) {
		List<calendar> calendarList = null;
		try {
			calendarList = calendarservice.calendarList(project_seq);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return calendarList;
	}
	
	//칸반보드 연동 캘린더 등록
	@ResponseBody
	@RequestMapping(value = "calendarListKanban.pie", method = RequestMethod.GET)
	public List<calendar> calendarListKanban(String email,int project_seq) {
		List<calendar> calendarListKanban = null;
		try {
			calendarListKanban = calendarservice.calendarListKanban(email,project_seq);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return calendarListKanban;
	}
	
	//칸반에서 캘린더 상세내용 보기
	@ResponseBody
	@RequestMapping(value = "calendarListKanbanDetail.pie", method = RequestMethod.GET)
	public calendar calendarListKanbanDetail(int card_seq) {
		calendar calendarListKanbanDetail = null;
		try {
			calendarListKanbanDetail = calendarservice.calendarListKanbanDetail(card_seq);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return calendarListKanbanDetail;
	}
	
	//캘린더 Drag&Drop으로 날짜 수정
	@ResponseBody
	@RequestMapping(value = "calendarEdit.pie", method = RequestMethod.POST)
	public void calendarEdit(String start, String end, String id) {
		try {
			SimpleDateFormat org_format = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss", Locale.ENGLISH);
			SimpleDateFormat new_format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date startformat = org_format.parse(start);
			Date endformat = org_format.parse(end);
			start = new_format.format(startformat);
			end = new_format.format(endformat);

			calendarservice.calendarEdit(start, end, id);
			
		} catch (Exception e) {
			
		}

	}
	
	//캘린더 삭제
	@ResponseBody
	@RequestMapping(value = "calendarDelete.pie", method = RequestMethod.POST)
	public void calendarDelete(int id) {
		try {
			calendarservice.calendarDelete(id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//칸반카드 삭제시 캘린더 삭제
	@ResponseBody
	@RequestMapping(value = "calendarDeleteKanban.pie", method = RequestMethod.POST)
	public void calendarDeleteKanban(int card_seq) {
		try {
			calendarservice.calendarDeleteKandan(card_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
