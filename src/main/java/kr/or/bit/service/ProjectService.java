package kr.or.bit.service;

import java.util.ArrayList;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.bit.dao.AlramDao;
import kr.or.bit.dao.CalendarDao;
import kr.or.bit.dao.CardCommentsDao;
import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.CardMemberDao;
import kr.or.bit.dao.ChatDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dao.FileDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dao.NoticeCommentsDao;
import kr.or.bit.dao.NoticeDao;
import kr.or.bit.dao.ProjectDao;
import kr.or.bit.dao.Project_memberDao;
import kr.or.bit.dto.project;
import kr.or.bit.dto.project_member;

/*
파일명: ProjectService.java
설명: 프로젝트 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-31 ~ 
작성자: 문지연,변재홍
*/

@Service
public class ProjectService {

	@Autowired
	private SqlSession sqlsession;

	// edit project title
	public void editProjectTitleService(project pro) {
		ProjectDao projectdao = sqlsession.getMapper(ProjectDao.class);
		projectdao.editProjectTitle(pro);
	}

	// create pie
	public void createPieService(project pro) {
		ProjectDao projectdao = sqlsession.getMapper(ProjectDao.class);
		projectdao.createPie(pro);
	}

	// create pie
	public ArrayList<project> getPieListService(String userEmail) {
		ProjectDao projectdao = sqlsession.getMapper(ProjectDao.class);
		ArrayList<project> proList = projectdao.getPieList(userEmail);
		return proList;
	}

	// get project title
	public String getProjectTitleService(int projectNum) {
		ProjectDao projectdao = sqlsession.getMapper(ProjectDao.class);
		String title = projectdao.getProjectTitle(projectNum);
		return title;
	}

	// 초대 승락시 이메일 중복 검
	public project_member isExistFromProjectService(int projectNum, String email) {
		Project_memberDao project_memberDao = sqlsession.getMapper(Project_memberDao.class);
		project_member pm = project_memberDao.isExistFromProject(projectNum, email);
		return pm;
	}

	// 초대 승락!!
	public void joinToPieAsTeamService(int projectNum, String email) {
		Project_memberDao project_memberDao = sqlsession.getMapper(Project_memberDao.class);
		project_memberDao.joinToPieAsTeam(projectNum, email);
	}

	// 프로젝트 삭제
	@Transactional(rollbackFor = Exception.class)
	public boolean deletePieService(int projectNum) throws Exception {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		CardMemberDao cmdao = sqlsession.getMapper(CardMemberDao.class);
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		FileDao fidao = sqlsession.getMapper(FileDao.class);
		AlramDao ardao = sqlsession.getMapper(AlramDao.class);
		CalendarDao calendao = sqlsession.getMapper(CalendarDao.class);
		Project_memberDao pmdao = sqlsession.getMapper(Project_memberDao.class);
		ProjectDao pdao = sqlsession.getMapper(ProjectDao.class);
		NoticeDao ndao = sqlsession.getMapper(NoticeDao.class);
		ChatDao chatdao = sqlsession.getMapper(ChatDao.class);
		NoticeCommentsDao ncdao = sqlsession.getMapper(NoticeCommentsDao.class);
		
		try {
			listdao.deleteKanbanListByProjectSeq(projectNum);
			ArrayList<Integer> cardNumbers = carddao.getCardSeqByProjectSeq(projectNum);
			
			for (int i = 0; i < cardNumbers.size(); i++) {
				comdao.deleteAllCardComm(cardNumbers.get(i));
				cmdao.deleteAllCardMem(cardNumbers.get(i));
				chkdao.deleteChkListByCardSeq(cardNumbers.get(i));
			}
			
			carddao.deleteKanbanCardByProjectSeq(projectNum);
			fidao.deleteFileByProjectSeq(projectNum);
			ardao.deleteAlarmByProjectSeq(projectNum);
			calendao.deleteCalendarByProjectSeq(projectNum);
			
			ArrayList<Integer> noticeSeqNumbers = ndao.getNoticeCommentsSeqByProjectSeq(projectNum);
			
			for (int k = 0; k < noticeSeqNumbers.size(); k++) {
				ncdao.deleteNoticeCommentsByNoticeSeq(noticeSeqNumbers.get(k));
			}
			
			ndao.deleteNoticeByProjectSeq(projectNum);
			
			ArrayList<Integer> chatSeqNumbers = chatdao.getChatSeqByProjectSeq(projectNum);
			
			for (int j = 0; j < chatSeqNumbers.size(); j++) {
				chatdao.deleteRoomList(chatSeqNumbers.get(j));
			}
			
			chatdao.deleteChatRoom(projectNum);
			pmdao.deletePmByProjectSeq(projectNum);
			pdao.deleteProjectByProjectSeq(projectNum);
		} catch (Exception e) {
			throw new Exception();
		}
		return true;
	}

}
