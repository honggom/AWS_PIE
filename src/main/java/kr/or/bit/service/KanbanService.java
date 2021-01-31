package kr.or.bit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.bit.dao.CardCommentsDao;
import kr.or.bit.dao.CardDao;
import kr.or.bit.dao.CardMemberDao;
import kr.or.bit.dao.CheckListDao;
import kr.or.bit.dao.ListDao;
import kr.or.bit.dto.card;
import kr.or.bit.dto.list;

/*
파일명: KanbanService.java
설명: 칸반 보드에서 리스트와 카드 추가,수정,삭제 및 정렬 작업 후 db에 저장
작성일: 2020-12-28 ~ 2021-01-07
작성자: 문지연,변재홍
*/

@Service
public class KanbanService {

	@Autowired
	private SqlSession sqlsession;

	// 칸반 리스트 업데이트 (한개씩)
	public boolean updateKanbanList(HashMap<String, Object> listAndProjectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		listdao.updateKanbanList(listAndProjectNum);
		return true;
	}

	// 전체 카드 업데이트 (한개씩)
	public boolean updateWholeCard(HashMap<String, Object> cardAndProjectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		carddao.updateWholeCard(cardAndProjectNum);
		return true;
	}

	// 전체 카드 리턴
	public ArrayList<card> loadWholeCard(int projectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		ArrayList<card> cardlist = new ArrayList<>();
		cardlist = carddao.loadWholeCard(projectNum);
		return cardlist;
	}

	// 전체 리스트 리턴
	public ArrayList<list> loadWholeList(int projectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		ArrayList<list> listList = new ArrayList<>();
		listList = listdao.loadWholeList(projectNum);
		return listList;
	}

	// 칸반 리스트 추가
	public boolean insertKanbanListService(HashMap<String, Object> listInfoAndProjectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		listdao.insertKanbanList(listInfoAndProjectNum);
		return true;
	}

	// 칸반 리스트 seq 가져오기
	public int getListSeqService(int projectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		int list_seq = listdao.getListSeq(projectNum);
		return list_seq;
	}

	// 칸반 리스트 seq 가져오기
	public int getLastListNumService(int projectNum) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		int list_seq = listdao.getLastListNum(projectNum);
		return list_seq;
	}

	// 칸반 카드 추가
	public boolean insertKanbanCardService(HashMap<String, Object> cardInfoAndProjectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		carddao.insertKanbanCard(cardInfoAndProjectNum);
		return true;
	}

	// 칸반 카드 seq 가져오기
	public int getCardSeqService(int projectNum) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		int card_seq = carddao.getCardSeq(projectNum);
		return card_seq;
	}

	// edit Kanban List Title
	public void editKanbanListTitleService(list li) {
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		listdao.editKanbanListTitle(li);
	}

	// Delete Kanban List, Card and CheckList_CardMem_CardComments
	@Transactional(rollbackFor=Exception.class)
	public void deleteKanbanListService(list li) throws Exception {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		ListDao listdao = sqlsession.getMapper(ListDao.class);
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		CardMemberDao cmdao = sqlsession.getMapper(CardMemberDao.class);
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);

		ArrayList<card> cardList = li.getCardList();
		int list_seq = li.getList_seq();

		try {
			for (int i = 0; i < cardList.size(); i++) {
				int cardSeq = cardList.get(i).getCard_seq();
				comdao.deleteAllCardComm(cardSeq);
				cmdao.deleteAllCardMem(cardSeq);
				chkdao.deleteChkListByCardSeq(cardSeq);// delete chkList
				carddao.deleteKanbanCard(cardSeq); // delete Card
			}
			listdao.deleteKanbanList(list_seq); // delete List
		} catch (Exception e) {
			throw new Exception(); // 시점에 트랜잭션 감지하고 있다가 롤백 처리
		}
	}

	// Delete Card_CheckList_CardMem_CardComments
	@Transactional(rollbackFor=Exception.class)
	public void deleteKanbanCardService(card ca) throws Exception {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		CheckListDao chkdao = sqlsession.getMapper(CheckListDao.class);
		CardMemberDao cmdao = sqlsession.getMapper(CardMemberDao.class);
		CardCommentsDao comdao = sqlsession.getMapper(CardCommentsDao.class);
		int card_seq = ca.getCard_seq();

		try {
			comdao.deleteAllCardComm(card_seq);
			chkdao.deleteChkListByCardSeq(card_seq);
			cmdao.deleteAllCardMem(card_seq);
			carddao.deleteKanbanCard(card_seq);
		} catch (Exception e) {
			throw new Exception(); 
		}
	}

	// Edit Card Title
	public void editKanbanCardTitleService(card ca) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		carddao.editKanbanCardTitle(ca);
	}

	// Update Card Content
	public void updateCardContentService(card ca) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		carddao.updateCardContent(ca);
	}

	// get Card ContentService
	public List<card> getCardContentService(Map<String,Object> cardInfo) {
		CardDao carddao = sqlsession.getMapper(CardDao.class);
		return carddao.getCardContent(cardInfo);
	}
}