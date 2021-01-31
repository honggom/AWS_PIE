package kr.or.bit.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import kr.or.bit.dto.file;
import kr.or.bit.service.FileService;
import kr.or.bit.util.UploadPath;

/*
파일명: FileController.java
설명: 파일함 관련 파일 업로드 및 다운로드 컨트롤러
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
@Controller
public class FileController {
	
	@Autowired
	private View jsonview;
	
	@Autowired
	private FileService fileservice;
	
	//파일 저장 컨트롤러
	@ResponseBody
	@RequestMapping(value = "file.pie", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("files") ArrayList<MultipartFile> files,
							 @RequestParam("projectNum") int projectNum,
							 @RequestParam("nick") String nick,
							 HttpServletRequest request) throws IOException {
		
		boolean check = fileservice.fileUploadService(files, projectNum, nick, request);
		
		if(check) {
			return "success";
		}else {
			return "fail";
		}
  }
    //게시판 파일 업로드
	@ResponseBody
	@RequestMapping(value = "fileNotice.pie", method = RequestMethod.POST)
	public int uploadFileNotice(@RequestParam("noticefile") MultipartFile file,
							 @RequestParam("projectNum") int projectNum,
							 @RequestParam("nick") String nick,
							 HttpServletRequest request) throws IOException {
		boolean check = fileservice.fileUploadNoticeService(file, projectNum, nick,request);
		int fileLastSeq = fileservice.fileLastSeq();
		if(check) {
			return fileLastSeq;
		}else {
			return 0;
		}
  }
	//파일 토탈 갯수 리턴 컨트로러 
	@ResponseBody
	@RequestMapping(value = "getFileTotalNumber.pie", method = RequestMethod.POST)
	public View getFileTotalNumber(@RequestParam("projectNum") int projectNum,
						 		   Model model) throws IOException {
		int totalNumber = fileservice.getFileTotalNumberService(projectNum);
		model.addAttribute("totalNumber", totalNumber);
	
		return jsonview;
  }
	
	//파일 리턴 컨트롤러  
	@ResponseBody
	@RequestMapping(value = "showFile.pie", method = RequestMethod.POST)
	public View showFile(@RequestParam("projectNum") int projectNum,
						 @RequestParam("page") int page,
						 Model model) throws IOException {
		int start = 0;
		start = (page*5)-5;
		
		ArrayList<file> files = fileservice.getFileService(projectNum, start);
		model.addAttribute("files", files);
	
		return jsonview;
  }
	//파일 이름으로 검색 리턴 컨트롤러   
	@ResponseBody
	@RequestMapping(value = "fileSerchWithName.pie", method = RequestMethod.POST)
	public View fileSerchWithName(@RequestBody file fileName, Model model) throws IOException {
		
		if(!fileName.getExtension().equals("all") && !fileName.getFile_original_name().equals("")) {
			ArrayList<file> files = fileservice.getFileWithOGNameAndExtensionService(fileName.getFile_original_name(), fileName.getExtension());
			model.addAttribute("files", files);
			return jsonview;
			
		}else if(fileName.getFile_original_name().equals("")){
			ArrayList<file> files = fileservice.getFileWithExtensionService(fileName.getExtension());
			model.addAttribute("files", files);
			return jsonview;
			
		}else {
			ArrayList<file> files = fileservice.getFileWithOGNameService(fileName.getFile_original_name());
			model.addAttribute("files", files);
			return jsonview;
		}
  }
	
	//파일 다운로드 컨트롤러 
	//다운받을 파일 이름 받고 DownloadView로 이동
	@RequestMapping(value = "fileDownload.pie", method = RequestMethod.GET)
	public ModelAndView download(@RequestParam("project_seq")int project_seq,
								 @RequestParam("file_uploaded_name")String file_uploaded_name,
								 ModelAndView mv,
								 HttpServletRequest request) {
		HttpSession session = request.getSession();
		String upload_path = session.getServletContext().getRealPath("/resources/files");
		String fullPath = upload_path + "/file_directory_project_seq_"+project_seq + "/" + file_uploaded_name;

		File file = new File(fullPath);
		
		mv.setViewName("downloadView");
		mv.addObject("downloadFile", file);
		return mv;
	}
	//파일번호에 맞는 파일명 가져오기
	@ResponseBody
	@RequestMapping(value = "getFileSeqName.pie", method = RequestMethod.POST)
	public String getFileSeqName(int file_seq) {
		String file_uploaded_name = null;
		file_uploaded_name = fileservice.getFileSeqName(file_seq);
		return file_uploaded_name;
	}
}
