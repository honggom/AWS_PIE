package kr.or.bit.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import kr.or.bit.dto.cardComments;
import kr.or.bit.dto.user;

public interface CardCommentsDao {
	
	public void insertComments(cardComments comm);
	
	public ArrayList<cardComments> loadComments(int cardSeq);
	
	public void deleteCardComment(int commSeq);
	
	public void editCardComment(cardComments comm);
	
	public void deleteAllCardComm(int cardSeq);
	
	public List<cardComments> getProAndSeq(Map<String, Object> proSeqInfo);
	
	public List<cardComments> getTotalCommByCard(Map<String, Object> commTotal);
}
