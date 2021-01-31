package kr.or.bit.util;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import kr.or.bit.dao.UserDao;
import kr.or.bit.dto.user;


/*
파일명: LoginSuccessHandler.java
설명: 시큐리티 로그인 성공시 전처리 유틸
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
@Service
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	
	@Autowired
	private SqlSession sqlsession;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication auth)
			throws IOException, ServletException {
		
		HttpSession session = request.getSession();
		
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		user u = userdao.searchEmail(auth.getName());
		
		// security로 로그인한 사용자 닉네임 session에 할당
		session.setAttribute("nick", u.getNickName());
		
		// security로 로그인한 사용자 아이디 session에 할당
		session.setAttribute("loginuser", auth.getName());
		
		response.sendRedirect("main.pie");
	}
}