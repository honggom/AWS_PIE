package kr.or.bit.dao;

import java.util.List;
import java.util.Map;

import kr.or.bit.dto.roomlist;

public interface MensionDao {
	
	public List<roomlist> getRoomListByRoomSeq(Map<String, Object> map);
	
}
