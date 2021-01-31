package kr.or.bit.dao;

import java.util.ArrayList;

import kr.or.bit.dto.project_member;

public interface Project_memberDao {
	
	public project_member isExistFromProject(int projectNum, String email);
	
	public void joinToPieAsTeam(int projectNum, String email);
	
	public int getMemberCount(int projectNum);
	
	public ArrayList<project_member> getMember(int projectNum);
	
	public void deletePmByProjectSeq(int projectNum);
}


 