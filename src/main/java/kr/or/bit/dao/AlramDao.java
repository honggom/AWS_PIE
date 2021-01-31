package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.alram;
import kr.or.bit.dto.project_member;

public interface AlramDao {

	public void insertAlram(alram alram);
	
	public List<alram> getAlramList(String email,int project_seq);
	
	public int getAlramLastSeq();
	
	public void deleteAlram(int alrmaseq,String email);
	
	public List<String> projectMemberList(int project_seq);
	
	public void deleteAlarmByProjectSeq(int project_seq);

}
