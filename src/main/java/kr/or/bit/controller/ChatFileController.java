package kr.or.bit.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import kr.or.bit.dto.file;
import kr.or.bit.service.ChatFileService;
import kr.or.bit.util.UploadPath;

@RestController
public class ChatFileController {

	@Autowired
	private ChatFileService chatfileservice;
	
	@RequestMapping(value="/chat/file", method = RequestMethod.POST)
	public String uploadFile(@RequestParam("file") MultipartFile file, 
							 @RequestParam("email") String email,
							 HttpServletRequest request) throws IOException {
		
		HttpSession session = request.getSession();
		int projectNum = (int)session.getAttribute("projectNum");
		String nickname = (String)session.getAttribute("nick");
		
		String upload_path = session.getServletContext().getRealPath("/resources/files");
		//boolean check = chatservice.file
		//파일 저장 경로 (프로젝트번호 기준)
		String specific_path = "/file_directory_project_seq_"+projectNum;
		File fileOb = new File(upload_path+specific_path);
		
		//폴더 존재 여부 
		if(fileOb.isDirectory()) {
			
		}else {
			fileOb.mkdir();
		}
		
			String fileOGName = file.getOriginalFilename();
	
			//파일 확장자 
			String ext = fileOGName.substring(fileOGName.lastIndexOf(".") + 1);
			String upload_file_name = "";
			
			file fi = new file();
			fi.setFile_uploaded_name(fileOGName);
			fi.setProject_seq(projectNum);
		
			if(chatfileservice.isExistFileMethod(fi)) {
				fi.setFile_original_name(fileOGName);
				String dupelName = chatfileservice.getDupledNameMethod(fi);
				
				
				//파일 이름 뒤에 @ 붙여준 후 업로드 진행 
				dupelName = dupelName.substring(0, dupelName.indexOf("."));
				upload_file_name = dupelName+"1."+ext;
			}else {
				upload_file_name = fileOGName;
			}
			
			byte[] data;
			try {
				file f = new file();
				
				f.setFile_original_name(fileOGName);
				f.setFile_uploaded_name(upload_file_name);
				f.setProject_seq(projectNum);
				f.setExtension(ext);
				f.setUpload_date(chatfileservice.makeDate());
				f.setNickName(nickname);
				
				chatfileservice.fileUploadToDBMethod(f);
				
				data = file.getBytes();
				//절대경로 + 프로젝트번호 + 파일이름 
				FileOutputStream fos = new FileOutputStream(upload_path+specific_path+"/"+upload_file_name);
				//파일 업로드 
				fos.write(data);
				 
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
				return "fail";
			}
			
		return "success";
		
	}
	
	@RequestMapping(value = "/chat/file/download", method = RequestMethod.GET)
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
}
