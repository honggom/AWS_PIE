package kr.or.bit.service;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeUtility;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;
import org.springframework.ui.velocity.VelocityEngineUtils;

import kr.or.bit.dao.UserDao;
import kr.or.bit.dto.user;


/*
파일명: UserService.java
설명: 사용자 로그인, 회원가입, 비밀번호 관리 처리 서비스
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

@Service
public class UserService {

	@Autowired
	private SqlSession sqlsession;

	// 메일 전송 객체
	@Autowired
	private JavaMailSender mailSender;

	// 벨로시티 엔진
	@Autowired
	private VelocityEngineFactoryBean velocityEngineFactoryBean;

	// user insert (회원가입)
	public String insertUser(user u) {
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		try {
			userdao.insertUser(u);// db에 user insert
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "projectList";
	}

	// 이메일 중복 확인 서비스
	public user searchEmail(String email) {
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		user u = userdao.searchEmail(email);
		return u;
	}
 
	// 이메일 전송 서비스
	public void emailCertify(String email, int ranCheck) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		Map model = new HashMap();
		model.put("ranCheck", ranCheck);
		
		String mailBody = VelocityEngineUtils.mergeTemplateIntoString( // 보내는 이메일
				velocityEngineFactoryBean.createVelocityEngine(), "join.vm", "UTF-8", model);
		messageHelper.setFrom("jgdoh92@naver.com"); // 보내는사람 생략하거나 하면 정상작동을 안함
		messageHelper.setTo(email); // 받는사람 이메일
		messageHelper.setSubject(MimeUtility.encodeText("회원가입 이메일")); // 메일제목은 생략이 가능하다
		messageHelper.setText(mailBody, true);
		mailSender.send(message);
	}
	
	// 초대 이메일 전송 서비스
	public void inviteEmail(String email, int projectNum, String fromWho, String fromProjectName) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		Map model = new HashMap();
		model.put("projectNum", projectNum);
		model.put("email", email);
		model.put("fromWho", fromWho);
		model.put("fromProjectName", fromProjectName);
		String mailBody = VelocityEngineUtils.mergeTemplateIntoString( // 보내는 이메일
				velocityEngineFactoryBean.createVelocityEngine(), "invite.vm", "UTF-8", model);
		messageHelper.setFrom("jgdoh92@naver.com"); // 보내는사람 생략하거나 하면 정상작동을 안함
		messageHelper.setTo(email); // 받는사람 이메일
		messageHelper.setSubject(MimeUtility.encodeText("우리 파이에 팀이 되어줘 !")); // 메일제목은 생략이 가능하다
		messageHelper.setText(mailBody, true);
		mailSender.send(message);
	}
	
	// 비밀번호 변경 인증번호 전송 서비스
	// 메소드로 만들어서 하나로 만들어도 될 듯 (시간 남으면 수정)
	public void passwordCertify(String email, int ranCheck) throws Exception {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
		Map model = new HashMap();
		model.put("ran", ranCheck);
		String mailBody = VelocityEngineUtils.mergeTemplateIntoString( // 보내는 이메일
				velocityEngineFactoryBean.createVelocityEngine(), "password.vm", "UTF-8", model);
		//messageHelper.addInline("pass", file);
		messageHelper.setFrom("jgdoh92@naver.com"); // 보내는사람 생략하거나 하면 정상작동을 안함
		messageHelper.setTo(email); // 받는사람 이메일
		messageHelper.setSubject(MimeUtility.encodeText("비밀번호 변경 인증번호")); // 메일제목은 생략이 가능하다
		messageHelper.setText(mailBody, true);
		mailSender.send(message);
	}
	
	//비밀번호 변경 
	public String modifyPassword(user u) {
		UserDao userdao = sqlsession.getMapper(UserDao.class);
		try {
			userdao.modifyPassword(u);//비밀번호 변경
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "projectList";
	}
}
