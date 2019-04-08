/**
 * * Create: 2018.06.04
 *	 @author 오경은
 *	 Page: 사전관리 - 토픽관리
 */

$(document).ready(function(){
	// 달력 오늘날짜로 강제 변경
	dateSetting();	
	// 토픽 목록 로딩
	getTopicList();			
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
		getTopicList();					
	});		
	// 소셜트렌드와 동일조건 체크 이벤트
	$("#socialSameBtn").on("click", socialSameEvent);
})

var issueTopicList = [];
var topicList = [];
var totalCount = [];
var filterTopic = [];                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
var classificationData = [];
var socialTopicList = [];
var total;

//이슈토픽 목록을 호출한다
function getTopicList(){	
	pushEventAction();
	var param = {
			media: "M", // 필수
			from: "",   // 필수
			to: "",     // 필수
			offset: 0,  // 필수
			size: "",   // 필수
			keyWord: "",
			query: "",
			folderId: $("#rule").data("fid"),
			flag: "I",
			excelYn: "",
			taxonomyFilter: "",
			stopType: ""
	}
	
	var from = $(".fromArea").text(); 	
	var to = $(".toArea").text();
	param.from = AdminUtil.specialCharRemove(from);
	param.to = AdminUtil.specialCharRemove(to);
	param.media = $("#topMedia").data("media");
	param.size = $("input[name=periodRadio]:checked").val();
		
	// flag파라미터 결정
	if ($("input[name=radioTopic]").eq(0).prop("checked")){
		param.flag = "I";
		$("a.drop-bt.mediaType.oneType.center").css("pointer-events", "");
		$("a.date.drop-bt").css("pointer-events", "");
	} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
		param.flag = "S";	
		param.stopType = "issue";
		$("a.drop-bt.mediaType.oneType.center").css("pointer-events", "none");
		$("a.date.drop-bt").css("pointer-events", "none");
	} else if ($("input[name=radioTopic]").eq(2).prop("checked")){
		param.flag = "S";
		param.stopType = "base";
		$("a.drop-bt.mediaType.oneType.center").css("pointer-events", "none");
		$("a.date.drop-bt").css("pointer-events", "none");
	} else if ($("input[name=radioTopic]").eq(3).prop("checked")){
		param.flag = "S";
		param.stopType = "stop";
		$("a.drop-bt.mediaType.oneType.center").css("pointer-events", "none");
		$("a.date.drop-bt").css("pointer-events", "none");
	}
	
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
			pushEventAction();
			console.log(data);
			issueTopicList = [];
			issueTopicList = data;
			totalCount = data.totalCount;
			pushEventAction();
						
			// 주제어 일때
			if (param.flag == "I"){
				$(".tbl-list").show();
				$(".tbl-list2").hide();
				$(".stopCancelBtn").hide();
				$(".item.socialBtn").show();
				drawTopicList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val()); 					
			// issue불용어 일때
			} else if (param.flag == "S" && param.stopType == "issue"){ 
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".stopCancelBtn").show();
				$(".item.socialBtn").hide();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());	
			// base불용어 일때
			} else if(param.flag == "S" && param.stopType == "base"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".stopCancelBtn").show();
				$(".item.socialBtn").hide();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());
			// stop불용어 일때
			} else if(param.flag == "S" && param.stopType == "stop"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".stopCancelBtn").show();
				$(".item.socialBtn").hide();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());
			}				
			drawPaging(totalCount, 1, 10);		
			
			var total = ComUtil.formatNumber(totalCount);	
			$("p.txt").text("총 : " + total);
		},
		error: function(request, status, error){
			console.log(error);
		}
	});		
}

//이슈토픽 목록을 그린다
function drawTopicList(scrapList, cur, offset){
	pushEventAction();
	if (cur == undefined) {
		cur = 1;		
	}
	
	if (offset == undefined) {
		offset = $('input:radio[name="periodRadio"]:checked').val();		
	}
	
	var sourceHtml = $("#topicManagementList").html();
	var template = Handlebars.compile(sourceHtml);
	var pageStart = 0;
	var pageEnd = 0;
	topicList = [];
	
	ageStart = (cur - 1) * offset ;
	pageEnd = cur * offset;
	
	$('.tbl-list .NoneDataBox').remove();
	
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
		$("#selectTopicList").html(html);
		
	} else {
		$('#selectTopicList').remove();
		$('.tbl-list').append('<div class="NoneDataBox">검색결과가 없습니다.</div>');
	}
	
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);		
}

//소셜트렌드와 동일 조건 체크 이벤트
function socialSameEvent(e){
	console.log(e);
	// 만약 체크되었으면 media만 활성화
	if ($("#socialSameBtn").prop("checked")){
		$(".listCtrlArea .left .item .drop-ar .drop-bt").css("pointer-events", "none");
		$(".srchBox .left .item .category-ar .drop-bt").css("pointer-events", "none");
		$(".listCtrlArea .left .item .drop-ar .drop-bt.mediaType.oneType.center").css("pointer-events", "");
		$(".cssRadio.stop").parent().hide();
		getSocialTrendTopic(0, $("input[name=periodRadio]:checked").val(), 1);
	} else {
		$(".listCtrlArea .left .item .drop-ar .drop-bt").css("pointer-events", "");
		$(".srchBox .left .item .category-ar .drop-bt").css("pointer-events", "");
		$(".cssRadio.stop").parent().show();
		getTopicList();
	}
}

// 소셜트렌드와 동일조건 체크 시 토픽목록을 호출한다
function getSocialTrendTopic(start, end, cur){
	var offset = $("input[name=periodRadio]:checked").val();
	start = offset * (cur - 1);
	end = offset;
	
	var param = {
			media: "M", // 필수
			from: "",   // 필수
			to: "",     // 필수
			offset: 0,  // 필수
			size: $("input[name=periodRadio]:checked").val(),   // 필수
			keyWord: "",
			query: "",
			folderId: "",
			flag: "I",
			excelYn: "",
			taxonomyFilter: "",
			stopType: ""
	}
	param.media = $("#topMedia").data("media");
	
	var now = new Date();
	var year = now.getFullYear();
	var month = (now.getMonth() + 1);
	var day = now.getDate();
	var hour = now.getHours();
	
	if (month < 10){
		month = "0" + month;
	}
	if (day < 10){
		day = "0" + day;
	}
	if (hour < 10){
		hour = "0" + hour;
	}
	var today = year + "." + month + "." + day + "." + hour;	
	param.to = AdminUtil.specialCharRemove(today);
	
	if (param.media === 'F' || param.media === 'C') {
		var beforeTime = new Date(Date.parse(now) - 1 * 1000 * 60 * 60 * 12);
		hour = beforeTime.getHours();
		day = beforeTime.getDate();
		//hour = now.getHours() - 12;
		if (hour < 10){
			hour = "0" + hour;
		}
		if (day < 10){
			day = "0" + day;
		}		
		
		today = year + "." + month + "." + day + "." + hour;
		param.from = AdminUtil.specialCharRemove(today);  
	} else {
		hour = now.getHours() - 4;
		if (hour < 10){
			hour = "0" + hour;
		}
		today = year + "." + month + "." + day + "." + hour;
		param.from = AdminUtil.specialCharRemove(today);
	}
	param.offset = start;
	param.size = $("input[name=periodRadio]:checked").val();
	
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){		
			console.log(data);
			socialTopicList = data;
			totalCount = data.totalCount;	
			
			pushEventAction();			
			$(".tbl-list").show();
			$(".tbl-list2").hide();
			$(".stopCancelBtn").hide();
			drawTopicList(socialTopicList.list, 1, $('input[name="periodRadio"]:checked').val()); 					
			drawPaging(totalCount, cur, 10);		
			
			total = ComUtil.formatNumber(totalCount);	
			$("p.txt").text("총 : " + total);
		},
		error: function(request, status, error){
			console.log(error);
		}
	});			
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
    
    if ($("#socialSameBtn").prop("checked")){
    	getSocialTrendTopic(start, end, cur);
    } else {
    	changeTopicList(start, end); 
    	drawPaging(totalCount, cur, 10);
    }
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
			flag: "I",
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
		param.flag = $("#radio1").data("flag");						
	} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
		param.flag = $("#radio2").data("flag");		
		param.stopType = "issue";
	} else if ($("input[name=radioTopic]").eq(2).prop("checked")){
		param.flag = $("#radio3").data("flag");		
		param.stopType = "base";
	} else if ($("input[name=radioTopic]").eq(3).prop("checked")){
		param.flag = $("#radio4").data("flag");		
		param.stopType = "stop";
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
			
			// 주제어 일때
			if (param.flag == "I"){
				$(".tbl-list").show();
				$(".tbl-list2").hide();
				$(".item.socialBtn").show();
				drawChangeTopicList(issueTopicList.list, 1, $("input[name=periodRadio]:checked").val()); 					
			// issue불용어 일때
			} else if (param.flag == "S" && param.stopType == "issue"){ 
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".item.socialBtn").hide();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());	
			// base불용어 일때
			} else if (param.flag == "S" && param.stopType == "base"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".item.socialBtn").hide();
				drawStopWordList(issueTopicList.list, 1, $('input[name="periodRadio"]:checked').val());
			// stop불용어 일때
			} else if (param.flag == "S" && param.stopType == "stop"){
				$(".tbl-list").hide();
				$(".tbl-list2").show();
				$(".item.socialBtn").hide();
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

//불용어 처리
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
			table: "",
			command: "insert",
			tno: tnoArr,
			word: tnoFilter,
			folderId: $("#rule").data("fid")
	}	
	param.table = $(e.target).data("table");	
	
	$.ajax({
		url: '/trest/updateStopWord',
		data: param,
		dataType: 'text',
		type: 'POST',
		success: function(response){
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			alertModal3("dsAertType", "불용어로 등록하였습니다." , "modalclose1");
			getTopicList();			
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
			table: "",  // 필수
			folderId: ""		  
	}	
	param.word = wordFilter;
	param.tno = tnoFilter;
	
	if ($("#radio2").prop("checked") == true) {
		param.table = "issue";
	} else if ($("#radio3").prop("checked") == true) {
		param.table = "base";
	} else if ($("#radio4").prop("checked") == true) {
		param.table = "stop";
	}			
	
	$.ajax({
		url: '/trest/updateStopWord',
		data: param,
		dataType: 'text',
		type: 'POST',
		success: function(response){
			console.log(response);
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			alertModal3("dsAertType", "불용어를 해제하였습니다." , "modalclose1");
			
			var cur = parseInt($(".paging a.on").text());
			var offset = $('input:radio[name="periodRadio"]:checked').val();
			var start = offset * (cur - 1);
			getTopicList();
		},
		error: function(status, error){
			console.log(error);
		}
	});
}

//엑셀 다운로드 이벤트
function downloadEvent(){
	console.log("download start...");
	// 소셜트렌드와 동일조건 일때
	if ($("#socialSameBtn").prop("checked")){
		var param = {
				media: $("#topMedia").data("media"), // 필수
				from: "",   // 필수
				to: "",     // 필수
				offset: 0,  // 필수
				size: 4000,   // 필수
				keyWord: "",
				query: "",
				folderId: "",
				flag: "I",
				excelYn: "Y",
				taxonomyFilter: "",
				stopType: ""
		}
		
		// 날짜 세팅
		var now = new Date();
		var year = now.getFullYear();
		var month = (now.getMonth() + 1);
		var day = now.getDate();
		var hour = now.getHours();
		
		if (month < 10){
			month = "0" + month;
		}
		if (day < 10){
			day = "0" + day;
		}
		if (hour < 10){
			hour = "0" + hour;
		}
		var today = year + "." + month + "." + day + "." + hour;	
		param.to = AdminUtil.specialCharRemove(today);
		
		if (param.media === 'F' || param.media === 'C'){
			hour = now.getHours() - 12;
			if (hour < 10){
				hour = "0" + hour;
			}
			today = year + "." + month + "." + day + "." + hour;
			param.from = AdminUtil.specialCharRemove(today);
		} else {
			hour = now.getHours() - 4;
			if (hour < 10){
				hour = "0" + hour;
			}
			today = year + "." + month + "." + day + "." + hour;
			param.from = AdminUtil.specialCharRemove(today);
		}
	
	// 소셜트렌드와 동일조건 아닐때
	} else {
		var param = {
				media: $("#topMedia").data("media"), // 필수
				from: "",   // 필수
				to: "",     // 필수
				offset: 0,  // 필수
				size:4000,   // 필수
				keyWord: "",
				query: "",
				folderId: $("#rule").data("fid"),
				flag: "I",
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
			param.flag = "I";						
		} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
			param.flag = "S";		
			param.stopType = "issue";
			param.size = totalCount;
		} else if ($("input[name=radioTopic]").eq(2).prop("checked")){
			param.flag = "S";		
			param.stopType = "base";
			param.size = totalCount;
		} else if ($("input[name=radioTopic]").eq(3).prop("checked")){
			param.flag = "S";		
			param.stopType = "stop";
			param.size = totalCount;
		} 
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

	if ($("#socialSameBtn").prop("checked")) {
    	getSocialTrendTopic(0, $("input[name=periodRadio]:checked").val(), 1);
    } else {
    	getTopicList();
    }			
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
	
    if ($("#socialSameBtn").prop("checked")) {
    	getSocialTrendTopic(start, end, cur); 	
    } else {
    	changeTopicList(start, end); 
    }
}

// 조회버튼 클릭
function clickReadBtn(){
	socialSameEvent();
	/*if ($("#socialSameBtn").prop("checked") == true){
		
	} else {
		getTopicList();				
	}*/
}