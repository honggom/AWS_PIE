package kr.or.bit.dao;

import java.util.ArrayList;

import kr.or.bit.dto.file;

public interface FileDao {
	
	public void fileUploadToDB(file fi);
	
	public ArrayList<file> getFile(int projectNum, int start);
	
	public ArrayList<file> getFileWithOGName(String file_og_name);
	
	public ArrayList<file> getFileWithOGNameAndExtension(String file_og_name, String extension);
	
	public ArrayList<file> getFileWithExtension(String extension);
	
	public Integer getFileTotalNumber(int projectNum);
	
	public file isExistFile(file fi);
	
	public String getDupleName(file fi);
	
	public int fileLastSeq();
	
	public String getFileSeqName(int file_seq);
	
	public void deleteFileByProjectSeq(int projectNum);
}
