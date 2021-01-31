package kr.or.bit.service;

import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.bit.dao.UserDao;
import kr.or.bit.util.UploadPath;


/*
파일명: UserProfileService.java
설명: 유저 프로필 이미지 처리 서비스
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

@Service
public class UserProfileService{
	
	@Autowired
	private SqlSession sqlsession;

	//파일 업로드 서비스 
	public void profileUploadService(MultipartFile file, String email,HttpServletRequest request) {
		HttpSession session = request.getSession();
		
		String UPLOAD_PATH = session.getServletContext().getRealPath("/resources/profile");
		
		String fileOGName = file.getOriginalFilename();
	//	String UPLOAD_PATH = UploadPath.upload_path_profile();
		String fullName = UPLOAD_PATH+"/"+email+"_"+fileOGName;

			byte[] data;
			try {
				data = file.getBytes();
				//절대경로 + 파일이름 
				FileOutputStream fos = new FileOutputStream(fullName);
				
				//DB INSERT 
				profileUploadToDBMethod(email, fileOGName);
				
				//파일 업로드 
				fos.write(data);
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
	}
	
	//db에 프로필 정보 저장하는 메서드 
	public void profileUploadToDBMethod(String email, String fullName) {
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		userdao.profileUploadToDB(email, fullName);
	}
	
	//profile 리턴하는 서비
	public String getProfileService(String email){
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		String profile = userdao.getProfile(email);
		return profile;
	}
}