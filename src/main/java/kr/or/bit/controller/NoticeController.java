package kr.or.bit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.notice;
import kr.or.bit.service.NoticeCommentsService;
import kr.or.bit.service.NoticeService;

/*
파일명: NoticeController.java
설명: 게시판 
작성일: 2021-01-10 ~ 
작성자: 신동연
*/
@Controller
public class NoticeController {
	@Autowired
	private View jsonview;
	@Autowired
	private NoticeService noticeservice;
	@Autowired
	private NoticeCommentsService noticecommentsservice;
	//게시판 전체 게시물 수
	@ResponseBody
	@RequestMapping(value="noticeTotalNumber.pie", method = RequestMethod.POST)
	public View getNoticeTotalNumber(@RequestParam("project_seq") int project_seq,Model model) {
		int totalNumber = 0;
		try {
			totalNumber = noticeservice.getNoticeTotalNumber(project_seq);
			model.addAttribute("totalNumber", totalNumber);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
		
	}
	//게시물 등록
	@RequestMapping(value="noticeInsert.pie", method = RequestMethod.POST)
	public View noticeInsert(@RequestBody notice notice, Model model) {
		try {
			noticeservice.insertNotice(notice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
	}
	//게시물 리스트
	@ResponseBody
	@RequestMapping(value="noticeList.pie", method = RequestMethod.GET)
	public List<notice> noticeList(int project_seq, int page){
		List<notice> noticeList = null;
		int start = 0;
		start = (page*10)-10;
		try {
			noticeList = noticeservice.getNoticeList(project_seq,start);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return noticeList;
	}
	//게시물 상세보기
	@ResponseBody
	@RequestMapping(value="noticeDetail.pie", method = RequestMethod.GET)
	public notice noticeDatail(int notice_seq){
		notice noticeDetail = null;
		try {
			noticeDetail = noticeservice.getNoticeDatail(notice_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return noticeDetail;
	}
	//게시물 마지막 번호
	@ResponseBody
	@RequestMapping(value="lastNotice_seq.pie", method = RequestMethod.GET)
	public int lastNotice_seq(){
		int lastNotice_seq = 0;
		try {
			lastNotice_seq = noticeservice.lastNotice_seq();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lastNotice_seq;
	}
	//게시판 수정
	@ResponseBody
	@RequestMapping(value="noticeUpdate.pie", method = RequestMethod.POST)
	public View noticeUpdate(@RequestBody notice notice,Model model) {
		try {
			noticeservice.noticeUpdate(notice);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return jsonview;
	}
	//게시판 삭제
	@ResponseBody
	@RequestMapping(value="noticeDelete.pie", method = RequestMethod.POST)
	public String noticeDelete(int notice_seq) {
		try {
			noticecommentsservice.deleteAllNoticeComments(notice_seq); //게시판 삭제시 댓글도 모두삭제
			noticeservice.noticeDelete(notice_seq);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "a";
	}
	
}
