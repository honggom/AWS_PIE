package kr.or.bit.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.CardCommentsDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dto.cardComments;
import kr.or.bit.dto.checkList;

/*
파일명: CardCommentsService.java
설명: 칸반 카드 모달 댓글 CRUD
작성일: 2021-01-17
작성자: 문지연
*/

@Service
public class CardCommentsService {

	@Autowired
	private SqlSession sqlsession;

	// Insert CheckList
	public boolean insertCommentsService(cardComments comm) {
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		comdao.insertComments(comm);
		return true;
	}
	
	// Load card Comments 
	public ArrayList<cardComments> loadCommentsService(int cardSeq){
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		ArrayList<cardComments> commList = new ArrayList<>();
		commList = comdao.loadComments(cardSeq);
		return commList;
	}
	
	//Delete Card Comment
	public void deleteCardCommentService(int commSeq) {
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		try {
			comdao.deleteCardComment(commSeq);
		}catch (Exception e) {
			throw e;
		}
	}
	
	//edit Card Comment
	public void editCardCommentService(cardComments comm) {
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		comdao.editCardComment(comm);
	}
	
	//get myProfile&last comments sequence
	public List<cardComments> getProAndSeqService(Map<String, Object> proSeqInfo) {
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		return comdao.getProAndSeq(proSeqInfo); 
	}
	
	//getTotalCommByCardService
	public List<cardComments> getTotalCommByCardService(Map<String, Object> commTotal) {
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		return comdao.getTotalCommByCard(commTotal);
	}
	

}
