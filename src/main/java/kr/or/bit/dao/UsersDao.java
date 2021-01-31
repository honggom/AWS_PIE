package kr.or.bit.dao;

import java.util.List;

import kr.or.bit.dto.users;

public interface UsersDao {
	
	public List<users> getUserList (int project_seq);

}
