package kr.or.bit.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.bit.dao.MensionDao;
import kr.or.bit.dto.roomlist;

@Service
public class MensionService {
	
	@Autowired
	private SqlSession sqlsession;
	
	public List<roomlist> getRoomListByRoomSeq(Map<String, Object> map){
		MensionDao dao = sqlsession.getMapper(MensionDao.class);
		return dao.getRoomListByRoomSeq(map);
	}
}
