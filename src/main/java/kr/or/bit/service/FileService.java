package kr.or.bit.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.bit.dao.FileDao;
import kr.or.bit.dto.file;
import kr.or.bit.util.UploadPath;


/*
파일명: FileService.java
설명: 파일 업로드, 다운로드 처리 서비스
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

@Service
public class FileService{
	
	@Autowired
	private SqlSession sqlsession;

	//파일 업로드 서비스 
	public boolean fileUploadService(ArrayList<MultipartFile> files, 
									int projectNum, 
									String nick,
									HttpServletRequest request) {
		HttpSession session = request.getSession();
		String UPLOAD_PATH = session.getServletContext().getRealPath("/resources/files");
		
		//String UPLOAD_PATH = UploadPath.upload_path_files();
		//파일 저장 경로 (프로젝트번호 기준)
		String specific_path = "/file_directory_project_seq_"+projectNum;
		
		File fileOb = new File(UPLOAD_PATH+specific_path);
		
		//폴더 존재 여부 
		if(fileOb.isDirectory()) {
			
		}else {
			fileOb.mkdir();
		}
		
		for(int i = 1; i <= (files.size()-1); i ++) {
			String fileOGName = files.get(i).getOriginalFilename();
	
			//파일 확장자 
			String ext = fileOGName.substring(fileOGName.lastIndexOf(".") + 1);
			String upload_file_name = "";
			
			file fi = new file();
			fi.setFile_uploaded_name(fileOGName);
			fi.setProject_seq(projectNum);
		
			if(isExistFileMethod(fi)) {
				fi.setFile_original_name(fileOGName);
				String dupelName = getDupledNameMethod(fi);
				
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
				f.setUpload_date(makeDate());
				f.setNickName(nick);
				
				fileUploadToDBMethod(f);
				
				data = files.get(i).getBytes();
				//절대경로 + 프로젝트번호 + 파일이름 
				FileOutputStream fos = new FileOutputStream(UPLOAD_PATH+specific_path+"/"+upload_file_name);
				//파일 업로드 
				fos.write(data);
				 
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
				return false;
			}
		}
		return true;
	}
	//마지막 번호 
	public int fileLastSeq() {
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		return filedao.fileLastSeq();
	}
	//게시판 파일 업로드
		public boolean fileUploadNoticeService(MultipartFile file, int projectNum, String nick,
											   HttpServletRequest request) {
			//String UPLOAD_PATH = UploadPath.upload_path_files();
			//파일 저장 경로 (프로젝트번호 기준)
			HttpSession session = request.getSession();
			String UPLOAD_PATH = session.getServletContext().getRealPath("/resources/files");
			String specific_path = "/file_directory_project_seq_"+projectNum;
			
			File fileOb = new File(UPLOAD_PATH+specific_path);
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
			
				if(isExistFileMethod(fi)) {
					fi.setFile_original_name(fileOGName);
					String dupelName = getDupledNameMethod(fi);
					
					
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
					f.setUpload_date(makeDate());
					f.setNickName(nick);
					
					fileUploadToDBMethod(f);
					
					data = file.getBytes();
					//절대경로 + 프로젝트번호 + 파일이름 
					FileOutputStream fos = new FileOutputStream(UPLOAD_PATH+specific_path+"/"+upload_file_name);
					//파일 업로드 
					fos.write(data);
					 
					fos.close();
				} catch (IOException e) {
					e.printStackTrace();
					return false;
				}
			
			return true;
		}
	//db에 파일 정보 저장하는 메서드 
	public boolean fileUploadToDBMethod(file fi) {
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		filedao.fileUploadToDB(fi);
		return true;
	}
	
	//파일 중복 여부 체크 메서드 
	public boolean isExistFileMethod(file fi) {
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		file file = filedao.isExistFile(fi);
		if(file != null) {
			return true;
		}else {
			return false;
		}
	}
	//파일 중복 이름 리턴 메서드  
	public String getDupledNameMethod(file fi) {
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		String fileName = filedao.getDupleName(fi);
		return fileName;
	}
	
	//시간 리턴하는 함수 
	public String makeDate() {
		String nowDateTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
		return nowDateTime;
	}
	
	//파일 리턴하는 서비스
	public ArrayList<file> getFileService(int projectNum, int start){
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFile(projectNum, start);
		return files;
	}
	
	//파일 리턴하는 서비스 (이름으로 검색)
	public ArrayList<file> getFileWithOGNameService(String file_og_name){
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFileWithOGName(file_og_name);
		return files;
	}
	
	//파일 리턴하는 서비스 (이름, 확장자)
	public ArrayList<file> getFileWithOGNameAndExtensionService(String file_og_name, String extension){
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFileWithOGNameAndExtension(file_og_name, extension);
		return files;
	}
	//파일 리턴하는 서비스 (확장자)
	public ArrayList<file> getFileWithExtensionService(String extension){
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		ArrayList<file> files = filedao.getFileWithExtension(extension);
		return files;
	}
	
	//파일 총 개수를 리턴해주는 서비스 
	public int getFileTotalNumberService(int projectNum){
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		int totalNumber = filedao.getFileTotalNumber(projectNum);
		return totalNumber;
		
	}
	//파일번호에 맞는 파일명 가져오기
	public String getFileSeqName(int file_seq) {
		FileDao filedao = sqlsession.getMapper(FileDao.class);
		return filedao.getFileSeqName(file_seq);
	}
}