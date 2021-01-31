<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="./resources/js/file.js"></script>
</head>
<body>
	<div id="far fa-folder-open" class="right-sidebar-file">
		<!-- drag and drop image -->
		<div class="file-top-wrapper">
			<div class="file-top-icon-wrapper" id = "dropZone">
				<label for="input_file" style = "cursor: pointer;">
				<i class="fas fa-folder-plus file-top-icon"></i>
				</label>
				<div class="file-top-icon-letter">
					Drag and Drop
				</div>			
			</div>
		</div>
				<form name="uploadForm" id="uploadForm" enctype="multipart/form-data" method="get" accept-charset ="UTF-8">
				       <div class="upload-btn-wrapper">
           			   <input type="file" id="input_file" name="files" multiple style="display:none"/>
     				   </div>
				</form>
              		<div class = "new-file-wrapper">
              			
              		</div>
              	<input type="button" class="file-upload-btn" value="업로드">
		
		<!-- file search -->
		<div class="file-search-wrapper">
			<div class="file-search-item-wrapper">
				<div class="file-search-item-letter1">파일명 검색</div>
				<form action="#">
					<input id = "file-search-input" class="custom-file-search" type = "text" placeholder = "파일명">
				</form>
			</div>
			<div class="file-search-item-wrapper">
				<div class="file-search-item-letter2">확장자명 검색</div>
				<form action="#">
					<select name="#" id="select-box" class="custom-file-select">
						<option value="all">전체</option>
						<option value="pdf">pdf</option>
						<option value="ppt">ppt</option>
						<option value="pptx">pptx</option>
						<option value="txt">txt</option>
						<option value="hwp">hwp</option>
						<option value="png">png</option>
						<option value="doc">doc</option>
						<option value="docx">docx</option>
						<option value="xlsx">xlsx</option>
						<option value="xls">xls</option>
						<option value="jpg">jpg</option>
						<option value="jpeg">jpeg</option>
					</select>
				</form>
			</div>
		</div>
		<div id = "fileZone">
		</div>
		<div class = "page-btn-zone">
		</div>
	</div>
</body>
</html>