package kr.or.bit.controller;

import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.project;
import kr.or.bit.dto.project_member;
import kr.or.bit.service.ProjectService;
import kr.or.bit.service.UserService;

/*
파일명: ProjectController.java
설명: 프로젝트 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-31 ~ 
작성자: 문지연,변재홍
*/
@Controller
public class ProjectController {

	@Autowired
	private UserService userservice;

	@Autowired
	private View jsonview;

	@Autowired
	private ProjectService projectservice;

	// Edit project Title
	@ResponseBody
	@RequestMapping(value = "editProjectTitle.pie", method = RequestMethod.POST)
	public View editProjectTitle(@RequestBody project pro, Model model) {
		projectservice.editProjectTitleService(pro);
		model.addAttribute("data", "success");
		return jsonview;
	}
	//파이생성
	@RequestMapping(value = "createPIE.pie", method = RequestMethod.POST)
	public String createPIE(project pro) {
		projectservice.createPieService(pro);
		return "redirect:main.pie";
	}

	// 파이 버튼을 눌러서 해당 프로젝트로 이동 (프로젝트 넘버 가지고)
	@RequestMapping(value = "goToMain.pie", method = RequestMethod.GET)
	public String goToMain(@RequestParam("projectNum") int projectNum, HttpSession session) {
		session.setAttribute("projectNum", projectNum);
		return "project/project_main";
	}

	// 파이 버튼을 눌러서 해당 프로젝트로 이동 (프로젝트 넘버 가지고)
	@RequestMapping(value = "reKanban.pie", method = RequestMethod.GET)
	public String reKanban() {
		return "project/project_main";
	}

	// 프로젝트 번호 리턴하는 메소드
	@ResponseBody
	@RequestMapping(value = "getProjectNum.pie", method = RequestMethod.POST)
	public View getProjectNum(HttpSession session, Model model) {
		int pjNum = (int) session.getAttribute("projectNum");
		model.addAttribute("projectNum", pjNum);
		return jsonview;
	}

	// 로그인 후 해당 사용자에 파이 리스트 가져오기
	@ResponseBody
	@RequestMapping(value = "getPieList.pie", method = RequestMethod.POST)
	public View getPieList(@RequestParam("userEmail") String userEmail, Model model) {
		ArrayList<project> pieList = projectservice.getPieListService(userEmail);
		model.addAttribute("pieList", pieList);
		return jsonview;
	}

	// 프로젝트 타이틀 가져오기
	@ResponseBody
	@RequestMapping(value = "getProjectTitle.pie", method = RequestMethod.POST)
	public View getProjectTitle(@RequestParam("projectNum") int projectNum, Model model) {
		String title = projectservice.getProjectTitleService(projectNum);
		model.addAttribute("projectTitle", title);
		return jsonview;
	}

	// 팀원 초대하기
	@ResponseBody
	@RequestMapping(value = "invitePIE.pie", method = RequestMethod.POST)
	public View invitePIE(@RequestBody Map<String, Object> data, Model model) {
		int projectNum = (int) data.get("finalProjectNum");
		ArrayList<String> pies = (ArrayList<String>) data.get("finalPie");
		String fromWho = (String) data.get("finalFromWho");
		String fromProjectName = (String) data.get("finalFromProjectName");

		for (int i = 0; i < pies.size(); i++) {
			try {
				userservice.inviteEmail(pies.get(i), projectNum, fromWho, fromProjectName);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		model.addAttribute("data", "success");
		return jsonview;
	}

	// 초대 받기
	@RequestMapping(value = "joinToPie.pie", method = RequestMethod.GET)
	public String joinToPie(@RequestParam("projectNum") int projectNum, @RequestParam("email") String email) {
		project_member pm = projectservice.isExistFromProjectService(projectNum, email);
		if (pm == null) {
			try {
				projectservice.joinToPieAsTeamService(projectNum, email);
			} catch (Exception e) {
				return "etc/pleaseJoinFirst";
			}
			return "etc/successedToJoinPie";
			// 여기서 인서트
		} else {
			// 중복 중복
			return "etc/failedToJoinPie";
		}
	}

	// 프로젝트 삭제
	@ResponseBody
	@RequestMapping(value = "deletePie.pie", method = RequestMethod.POST)
	public View deletePie(@RequestParam("projectNum") int projectNum, Model model) throws Exception {
		boolean check = projectservice.deletePieService(projectNum);

		if (check) {
			model.addAttribute("data", "success");
			return jsonview;
		} else {
			model.addAttribute("data", "fail");
			return jsonview;
		}

	}
}
