package kr.or.bit.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.FileDao;
import kr.or.bit.dto.file;

@Service
public class ChatFileService {
	
	@Autowired
	private SqlSession sqlsession;
	
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
}
