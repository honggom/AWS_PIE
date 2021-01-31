package kr.or.bit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CardMemberDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dto.checkList;

/*
파일명: CheckListService.java
설명: 칸반 보드 모달에서 체크리스트 추가,수정,삭제 작업 후 db에 저장
작성일: 2021-01-05 ~ 
작성자: 문지연
*/

@Service
public class CheckListService {

	@Autowired
	private SqlSession sqlsession;

	// Get Last CheckList Seq
	public int getLastCheckSeqService() {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		int check_seq = chkdao.getLastCheckSeq();
		return check_seq;
	}

	// Insert CheckList
	public boolean insertCheckListService(HashMap<String, Object> checkListInfo) {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		chkdao.insertCheckList(checkListInfo);
		return true;
	}

	// Load Whole CheckList
	public ArrayList<checkList> loadWholeChkListService(int cardSeq) {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		ArrayList<checkList> chkList = new ArrayList<>();
		chkList = chkdao.loadCheckList(cardSeq);
		return chkList;
	}

	// Delete CheckList
	public void deleteChkListService(checkList chk) {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		int check_seq = chk.getCheck_seq();
		try {
			chkdao.deleteChkList(check_seq);
		} catch (Exception e) {
			throw e;
		}
	}

	// Edit checked status
	public void editCheckedStatusService(checkList chk) {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		chkdao.editCheckedStatus(chk);
	}
	
	// getCheckListByCardService
	public List<checkList> getCheckListByCardService(Map<String, Object> chkListMap) {
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		return chkdao.getCheckListByCard(chkListMap);
	}

}
