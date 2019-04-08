/**
 * * Create: 2018.06.04
 *	 @author 오경은
 *	 Page: 사전관리 - 토픽관리
 */

$(document).ready(function(){
	// 달력 오늘날짜로 강제 변경
	dateSetting();	
	// 도메인 목록 로딩
	getTopicManagementDomainList();
	// 토픽 목록 로딩
	//getBrandTopicList();		
	// 도메인 선택시 분류식 가져옴
	$("#domainList").on("click", "li", getFolderTree);	
	// 분류식 선택시 목록을 그림
	$("#classificationList").on("click", "li", selectClassification);	
	// 엑셀 다운로드
	$("#topicDownload").on("click", downloadEvent);		
	// 검색갯수 선택
	$("#SizeNum li").on("click", selectSize);
	// 전체체크
	$("#checkAll").on("click", allCheck);	
	$("#checkAll2").on("click", allCheck);
	// 페이지 선택 이벤트
	$(".paging.mid").on("click", "a", pageEvent);
	// 미디어 선택
	$("#media li").on("click", selectMedia);	
	// 조회버튼 클릭 ( 날짜 설정 시  )
	$("#readSentiment").on("click", clickReadBtn);
	
	// 불용어 등록버튼 클릭
	$(".qnaDetailBox .stopBtn").on("click", stopWord);
	// 불용어해제 버튼 클릭
	$(".stopBtnArea .stopCancelBtn").on("click", cancelStopword);
	// 불용어조회 라디오버튼 클릭 이벤트
	$("[name=radioTopic]").on("click", function(){
		getBrandTopicList();
	});	
})

var issueTopicList = [];
var brandTopicList = [];
var topicList = [];
var totalCount = [];
var filterTopic = [];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
var domainList = [];
var classificationData = [];
var total;
 
//도메인 리스트 로딩
function getTopicManagementDomainList(){
	var param = { 
			domainId: null,
			levelFlag: "N"
	}
	
	$.ajax({
		url: '/comrest/domainInfoList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
			domainList = data;
			data.sort(function(a, b) {
				return a.domainName < b.domainName ? -1 : a.domainName > b.domainName ? 1 : 0;
			});			
			drawDomainList(domainList);		
			pushEventAction();				
		},
		error : function(request,status,error){
			console.log(error);
		}
	});
}

//로딩 후 도메인 목록을 그림
function drawDomainList(scrapList){
	var sourceHtml = $("#topicManagementDomainList").html();
	var template = Handlebars.compile(sourceHtml);
	var domainList = [];
	
	for (var i in scrapList) {
		if(i <= scrapList){		
			domainList.push(scrapList[i]);
		}
	}	
	var data = {list: domainList};
	var html = template(data);
	$("#domainList").html(html);		
}

// 도메인 선택시 분류식 가져옴
function getFolderTree(){
	var param = { domainId: $(this).children().data("id") }
	
	$.ajax({
		url: '/comrest/folderTreeInfo',
		type: 'POST',
		data: param,
		dataType : 'json',
		success: function(data){	
			classificationData = data;	
			data.sort(function(a, b) {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
			});		
			drawClassification(classificationData);	
			pushEventAction();
		},
		error : function(request,status,error){
			console.log(error);
		}
	});	
}

// 분류식 목록을 그린다
function drawClassification(scrapList){
	var sourceHtml = $("#getClassificationList").html();
	var template = Handlebars.compile(sourceHtml);
	var classificationList = [];
	
	for (var i in scrapList) {
		if (i <= scrapList){		
			classificationList.push(scrapList[i]);
		}
	}	
	var data = {list: classificationList};
	var html = template(data);
	$("#classificationList").html(html);
}

//브랜드토픽 목록을 호출한다
function getBrandTopicList(){
	var param = {
			media: "M", // 필수
			from: "",   // 필수
			to: "",     // 필수
			keyWord: "",
			query: "",
			offset: 0,  // 필수
			size: "",   // 필수
			folderId: $("#rule").data("fid"),
			taxonomyFilter: "",
			stopType: "",
			flag: "B",
			excelYn: ""
	}
	
	var from = $(".fromArea").text(); 	
	var to = $(".toArea").text();
	param.from = AdminUtil.specialCharRemove(from);
	param.to = AdminUtil.specialCharRemove(to);
	param.media = $("#topMedia").data("media");
	param.size = $("input[name=periodRadio]:checked").val();
	
	if ($("input[name=radioTopic]").eq(1).prop("checked")){	
		param.flag = "S";
		param.stopType = "brand";
	}	
	
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		async : false,
		dataType: 'json',
		success: function(data){
			console.log(data);
			brandTopicList = [];
			brandTopicList = data;
			totalCount = data.totalCount;
			pushEventAction();		
					
			// 주제어 일때
			if (param.flag == "B"){
				$(".tbl-list").show();
				$(".tbl-list2").hide();
				$(".stopCancelBtn").hide();
				drawBrandTopicList(brandTopicList.list, 1, $("input[name=periodRadio]:checked").val()); 					
			// brand불용어 일때
			} else if (param.flag == "S" && param.stopType == "brand"){ 
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".stopCancelBtn").show();
				drawStopWordList(brandTopicList.list, 1, $('input[name="periodRadio"]:checked').val());	
			}
			drawPaging(totalCount, 1, 10);			
		},
		error: function(request, status, error){
			console.log(error);
		}
	});		
}

// 브랜드토픽 목록을 그린다
function drawBrandTopicList(scrapList, cur, offset){
	pushEventAction();	
	if(cur == undefined) {
		cur = 1;		
	}
	
	if(offset == undefined) {
		offset = $('input:radio[name="periodRadio"]:checked').val();		
	}
	
	var sourceHtml = $("#topicManagementList").html();
	var template = Handlebars.compile(sourceHtml);
	var pageStart = 0;
	var pageEnd = 0;
	topicList = [];
	
	pageStart = (cur - 1) * offset ;
	pageEnd = cur * offset;
	
	$('#selectTopicList').show();
	$('.tbl-list .NoneDataBox').remove();
	
	if (scrapList !== null && scrapList.length > 0) {		
		if (pageEnd > scrapList.length) {
			pageEnd = scrapList.length;
		}
		
		for (var i in scrapList) {
			if( pageStart <=i && pageEnd > i ){
				topicList.push(scrapList[i] );
			}
		}
		
		var data = {list: topicList};
		var html = template(data);
		$("#selectTopicList").html(html);
	
	} else {
		$('#selectTopicList').hide();
		$('.tbl-list').append('<div class="NoneDataBox">조회결과가 없습니다.</div>');
	}
		
	$('.tbl-list table').show();
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);
}

//원문목록 하단 페이징화면을 그린다.
function drawPaging(data, cur, offset){
	var startNum = 1;
	var endNum = 5;
	if (cur == undefined){
		cur = 1;
	}
	if (offset == undefined){
		offset = $('input:radio[name="periodRadio"]:checked').val();
	}	

	startNum = Math.ceil(cur / offset) * offset - (offset-1);
	endNum = Math.ceil(cur / offset) * offset;
	var pageTotal = Math.ceil(data /offset);
	var pageArr = [];
	
	if (endNum > pageTotal){
		endNum = pageTotal;
	}
	for (var i = startNum; i <= endNum; i++) {
		pageArr.push(i);
	}
	
	var sourceHtml = $("#topicListpage").html();
	var template = Handlebars.compile(sourceHtml);
	var hdata= {
			list :pageArr,
			cur:cur,
			total : Math.ceil(data / offset)
	};
	var html = template(hdata);
	$(".paging.mid").html(html);
}

//페이지선택 이벤트
function pageEvent(e){
    e.preventDefault();
    var text = $(e.target).text();
    var cur = parseInt($(".paging a.on").text());
    var offset = $("input[name=periodRadio]:checked").val();
    var pageTotal = Math.ceil(totalCount / offset);
       
    // 이전, 다음  클릭 시
    if (text == "prev") {
    	cur = cur - 1; 
    } else if (text == "next"){
    	cur = cur + 1;    	
    } else {
    	cur = text;
    }
    
    if (cur < 1) {
    	cur = 1;
    } else if (cur > pageTotal) {
    	cur = pageTotal;
    } 
    
    var start = offset * (cur - 1);
    var end = offset;
   
	changeTopicList(start, end); 
	drawPaging(totalCount, cur, 10);   
}

// 페이지 이벤트시 목록을 그림
function changeTopicList(start, end){
	var param = {
			media: "M", // 필수
			from: "",   // 필수
			to: "",     // 필수
			offset: 0,  // 필수
			size: 10,   // 필수
			keyWord: "",
			query: "",
			folderId: $("#rule").data("fid"),
			flag: "B",
			excelYn: "",
			taxonomyFilter: "",
			stopType: ""
	}	
	var from = $(".fromArea").text(); 	
	var to = $(".toArea").text();
	
	param.from = AdminUtil.specialCharRemove(from);
	param.to = AdminUtil.specialCharRemove(to);
	param.media = $("#topMedia").data("media");
	param.offset = start;
	param.size = end;
	
	// flag파라미터 결정
	if ($("input[name=radioTopic]").eq(0).prop("checked")){
		param.flag = "B";
	} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
		param.flag = "S";		
		param.stopType = "brand";
	}
	
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
			console.log(data);
			issueTopicList = data;
			totalCount = data.totalCount;	
			
			// 브랜드 주제어 일때
			if (param.flag == "B"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());
			// brand 불용어 일때
			}	else if (param.flag == "S" && param.stopType == "brand"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());
			}		
		},
		error: function(request, status, error) {
				console.log(error);
			}
	});
}

// 페이징시 토픽목록을 그린다
function drawChangeTopicList(changeList, cur, offset){
	if (cur == undefined) {
		cur = 1;	
	}	
	if (offset == undefined) {
		offset = $("input[name=periodRadio]:checked").val();		
	}		
	var sourceHtml = $("#topicManagementList").html();
	// 원문 리스트
	var changeTopicList = [];
	var template = Handlebars.compile(sourceHtml);
	var pageStart = 0;
	var pageEnd = 0;
	
	pageStart = (cur - 1) * offset ;
	pageEnd = cur * offset;
	
	if (pageEnd > changeList) {
		pageEnd = changeList;
	}
	// 원문 개수만큼 articleList에 담음
	for (var i in changeList) {
		if (pageStart <= i && pageEnd > i){		
			changeTopicList.push(changeList[i]);
		}  
	}		 
	
	var data = {list: changeTopicList};
	var html = template(data);
	$("#selectTopicList").html(html);
	
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);
}

//불용어로 등록한다.
function stopWord(e){
	var chk = $("[name=checkBox]:checked");
	
	if (chk.length === 0){
		alertModal3("dsAertType", "불용어를 처리할 항목을 선택해주세요." , "modalclose1");
		return;
	}
		
	// TPO불용어일때 tno를 배열로 담는다.
	var tnoFilter = [];
	var tnoArr = [];
	$("[name=checkBox]:checked").each(function(index, el){
		tnoFilter.push($(this).data("word"));
		tnoArr.push($(this).attr("id"));
	});
	
	var param = {
			table: "brand",
			command: "insert",
			tno: tnoArr,
			word: tnoFilter,
			folderId: $("#rule").data("fid")
	}	
	
	$.ajax({
		url: '/trest/updateStopWord',
		data: param,
		dataType: 'text',
		type: 'POST',
		success: function(response){
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			alertModal3("dsAertType", "불용어로 등록하였습니다." , "modalclose1");
			getBrandTopicList();					
		},
		error: function(status, error){
			console.log(error);
		}
	});			
}

//불용어를 해제한다.
function cancelStopword(e){
var chk = $("[name=checkBox]:checked");
	
	if (chk.length === 0){
		alertModal3("dsAertType", "불용어를 해제 할 항목을 선택해주세요." , "modalclose1");
		return;
	}
	
	var wordFilter = [];
	var tnoFilter = []; 	
	
	// 체크박스 선택된 keyword, tno를 배열로 담기
	$("[name=checkBox]:checked").each(function(index, el) {
		if($("[name=checkBox]:checked").eq(index).parent().parent().parent().parent().parent().css("display")!="none" ){
			wordFilter.push($(this).attr("data-word"));	
			tnoFilter.push($(this).attr("data-tno"));	
		}
	});
	
	var param = {		
			word: [],  // 필수
			tno: [],
			command: "delete",  // 필수
			table: "brand",  // 필수
			folderId: $("#rule").data("fid")  
	}	
	param.word = wordFilter;
	param.tno = tnoFilter;
	
	$.ajax({
		url: '/trest/updateStopWord',
		data: param,
		dataType: 'text',
		type: 'POST',
		success: function(response){
			console.log(response);
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			$("#checkAll2").prop("checked", false);
			getBrandTopicList();
			
			var cur = parseInt($(".paging a.on").text());
			var offset = $('input:radio[name="periodRadio"]:checked').val();
			var start = offset * (cur - 1);
		},
		error: function(status, error){
			console.log(error);
		}
	});
}

//불용어 목록을 그린다
function drawStopWordList(scrapList, cur, offset){
	pushEventAction();
	if (cur == undefined) {
		cur = 1;		
	}
	
	if (offset == undefined) {
		offset = $('input:radio[name="periodRadio"]:checked').val();		
	}
	
	var sourceHtml = $("#StopWordList").html();
	var template = Handlebars.compile(sourceHtml);
	var pageStart = 0;
	var pageEnd = 0;
	topicList = [];
	
	pageStart = (cur - 1) * offset ;
	pageEnd = cur * offset;
	
	$('.tbl-list2 .NoneDataBox').remove();
	$('.tbl-list2').show();
	
	if (scrapList !== null) {		
		if (pageEnd > scrapList.length) {
			pageEnd = scrapList.length;
		}
		
		for (var i in scrapList) {
			if( pageStart <=i && pageEnd > i ){
				topicList.push(scrapList[i] );
			}
		}
		
		var data = {list: topicList};
		var html = template(data);
		$("#selectStopWordList").html(html);
	
	} else {
		$('#selectStopWordList').remove();
		$('.tbl-list2').append('<div class="NoneDataBox">조회결과가 없습니다.</div>');
	}
		
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);
}


//엑셀 다운로드 이벤트
function downloadEvent(){
	console.log("download start...");
	
	var param = {
			media: $("#topMedia").data("media"), // 필수
			from: "",   // 필수
			to: "",     // 필수
			offset: 0,  // 필수
			size: totalCount,   // 필수
			keyWord: "",
			query: "",
			folderId: $("#rule").data("fid"),
			flag: "B",
			excelYn: "Y",
			taxonomyFilter: "",
			stopType: ""
	}
	
	var from = $(".fromArea").text(); 	
	var to = $(".toArea").text();
	param.from = AdminUtil.specialCharRemove(from);
	param.to = AdminUtil.specialCharRemove(to);
	
	// flag파라미터 결정
	if ($("input[name=radioTopic]").eq(0).prop("checked")){
		param.flag = "B";
	} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
		param.flag = "S";		
		param.stopType = "brand";
	}
					
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
		console.log("download");
		window.location = "http://" + location.host + data.fileUrl;
		},
		error: function(request, status, error){
			console.log(error);
			alert("다운로드 실패");
		}
	});	
}

//달력 날짜 오늘로 지정
function dateSetting(){
	var now = new Date();
	var year = now.getFullYear();
	var month = (now.getMonth() + 1);
	var day = now.getDate();
	
	if (month < 10){
		month = "0" + month;
	}
	if (day < 10){
		day = "0" + day;
	}
	var today = year + "." + month + "." + day;
	AdminUtil.changeCalrenderDate(today, today);
}

// 체크박스
function allCheck(e){
	e.stopPropagation();
	if ($("#checkAll").prop("checked")){
		$("[name=checkBox]").prop("checked", true);
	} else if($("#checkAll2").prop("checked")) {
		$("[name=checkBox]").prop("checked", true);
	} else {
		$("[name=checkBox]").prop("checked", false);
	}
}

// 미디어 선택
function selectMedia(e){
	var mediaType = $(e.target).data("media");
	var text = $(e.target).text();
	
	$("#topMedia").data("media", mediaType);
	$("#topMedia").text(text);
	
	getBrandTopicList();
}

//분류식 선택
function selectClassification(e){
	e.preventDefault();
	pushEventAction();
	var name = $(e.target).data("name");
	var text = $(e.target).text();
	var fid = $(e.target).data("fid");
	
	$("#rule").data("name", name);
	$("#rule").text(text);
	$("#rule").data("fid", fid);
	
	$("#radio1").attr("checked", "");
	$("#radio5").attr("checked", "checked");

	getBrandTopicList();	
}

//검색 갯수 선택
function selectSize(){
	$("#selectSizeNum").html(" " + "<i class=\"xi-align-center\"></i>" 
		+ $("input[name=periodRadio]:checked").val() 
			+"개 <i class=\"xi-angle-down-min\"></i>");
	
	$("#selectSizeNum").removeClass("open");
	$(".right .item .drop-ct.square").css("display", "none");
	
	var cur = parseInt($(".paging a.on").text());
	var offset = $('input:radio[name="periodRadio"]:checked').val();
	var start = offset * (cur - 1);
    var end = offset;
	
    changeTopicList(start, end);     
}

// 조회버튼 클릭
function clickReadBtn(){
	getBrandTopicList();
}