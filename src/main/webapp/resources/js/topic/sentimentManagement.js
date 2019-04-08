/**
 * Create: 2018.06.18
 * @author 오경은
 * Page: 사전관리 - 감성어관리
 * 
 */

$(document).ready(function(){
	// 달력 날짜 오늘로 지정
	dateSetting();
	// 감성어 조회
	selectSentimentList(0, 10);
	
	// 전체체크
	$("#checkAll").on("click", allCheck);
	$("#checkAll2").on("click", allCheck);
	// 페이지 선택 이벤트
	$(".paging.mid").on("click", "a", pageEvent);	
	// 감성선택
	$(".folderList li").on("click", selectSentiment);
	// 검색이벤트	
	$("#searchBtn").on("click", searchEvent);
	// 검색갯수선택
	$("#SizeNum li").on("click", selectSize);
	// 검색창에서 엔터키 사용한 경우
	$(".inputSrch input").on("keyup", function(e){
		if (e.which == 13) {  // 엔터키
			selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());
		}
	});	
	// 불용어 라디오버튼 클릭 이벤트
	$("[name=radioTopic]").on("click", function(){
		if ($(this).attr("id") == "radio1"){
			selectSentimentList(0, 10);	
			// 감성어일때 긍부정 분류선택 O
			$(".srchBox .item .category-ar .drop-bt").css("pointer-events", "");
		} else {
			selectStopKeywordList(0, $('input:radio[name="periodRadio"]:checked').val());
			// 불용어일때 긍부정 분류선택 X
			$(".srchBox .item .category-ar .drop-bt").css("pointer-events", "none");
		}
	});	
	// 불용어등록 버튼 클릭
	$(".stopBtnArea .stopBtn").on("click", StopwordBtnClick);
	// 불용어해제 버튼 클릭
	$(".stopBtnArea .stopCancelBtn").on("click", cancelStopword);	
	// 엑셀 다운로드
	$("#excelDownload").on("click", downloadEvent);
	// 상단버튼클릭 이벤트
	$(".basicBtn.gray").on("click", addDelBtnEvent);
	// 일괄등록 모달창 버튼 이벤트
	$("#uploadBtn").on("click", excelAdd);
	// 신규등록모달 긍부정선택
	$(".folderList.polarity").on("click", selectPolarity);	
	// 신규등록 모달창 버튼 이벤트
	$(".newAddModal").on("click", newAdd);	
	// 신규등록모달 취소버튼
	$(".newAddModal.gray").on("click", function (){
		modalReset();
		$.modal.close();
		$.modal.close();
		$.modal.close();
		$.modal.close();
	})
});

var sentimentList = [];
var FilterData = [];
var totalCount = [];
var today;

// 감성어 목록을 호출한다.
function selectSentimentList(start, end){
	var param = {
			type: "sentiment",  // 필수
			offset: 0, // 필수
			size: 10, // 필수
			order: "",
			select: "",
			keyword: "",
			option: "",
			excelYn: ""			
	}
	
	param.offset = start;
	param.size = end;
	param.keyword = $("#searchKeyword").val();
	param.option = $("#sentimentType").data("sentiment");
	
	$.ajax({
		url: '/trest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
			console.log(data);
			sentimentList = data.list;			
			totalCount = data.totalCount;			
			$(".tbl-list").show();
			$(".tbl-list2").hide();
			$(".stopCancelBtn").hide();
			
			var cur = parseInt($(".paging a.on").text());
			pushEventAction();
			drawSentimentList(sentimentList);
			drawPaging(totalCount, cur, 10);
		},
		error : function(request,status,error){
			console.log(error);
		}
	});
}

// 감성어 목록을 그린다
function drawSentimentList(scrapList){
	var sourceHtml = $("#sentimentManagementList").html();
	var template = Handlebars.compile(sourceHtml);
	sentimentList = [];
	
	for (var i in scrapList) {
		if(i <= scrapList){		
			sentimentList.push(scrapList[i]);
		}
	}	
	
	var data = { list: sentimentList };
	var html = template(data);
	$("#sentimentList").html(html);		
	
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);
}

//페이징
function drawPaging(data, cur, offset){
	var startNum = 1;
	var endNum = 5;
	if(cur == undefined){
		cur = 1;
	}
	if(offset == undefined){
		offset = $('input:radio[name="periodRadio"]:checked').val();
	}
	
	startNum = Math.ceil(cur / offset) * offset - (offset - 1);
	endNum = Math.ceil(cur / offset) * offset;
	var pageTotal =  Math.ceil(data / offset);
	var pageArr = [];
	
	if (endNum > pageTotal){
		endNum = pageTotal;
	}
	for (var i = startNum; i <= endNum; i++){
		pageArr.push(i);
	}
	
	var sourceHtml = $("#keywordListPage").html();
	var template = Handlebars.compile(sourceHtml);
	var hdata= {
			list :pageArr,
			cur:cur,
			total : Math.ceil(data / offset)
	};
	var html = template(hdata);
	$(".paging.mid").html(html);	
}

//페이지 선택 이벤트
function pageEvent(e){
	e.preventDefault();
    var text = $(e.target).text();
    var cur = parseInt($(".paging a.on").text());
    var offset = $('input:radio[name="periodRadio"]:checked').val();
    var pageTotal = Math.ceil(totalCount / offset);
       
    // 이전, 다음  클릭 시
    if (text == "prev") {
    	cur = cur - 1; 
    } else if(text == "next"){
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
    
    // 불용어인 경우 불용어목록으로 조회한다
    if ($("#radio2").prop("checked") == true){
    	selectStopKeywordList(start, end);
	} else {
		selectSentimentList(start, end);
	}		
    
    //selectSentimentList(start, end);
    drawPaging(totalCount, cur, 10);
}

//불용어 목록을 호출한다
function selectStopKeywordList(start, end){
	var param = {
			media: "A", // 필수
			from: "20180629",   // 필수
			to: "20180629",     // 필수
			offset: start,  // 필수
			size: $("input[name=periodRadio]:checked").val(),   // 필수
			keyWord: "",
			query: "",
			folderId: $("#rule").data("fid"),
			flag: "S",
			excelYn: "",
			taxonomyFilter: "",
			stopType: "sentiment"
	}		
	param.size = end;
	
	$.ajax({
		url: '/adrest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		success: function(data){
			pushEventAction();
			console.log(data);
			topicList = [];
			topicList = data;
			totalCount = data.totalCount;
			pushEventAction();
			var cur = parseInt($(".paging a.on").text());			
			
			$(".tbl-list").hide();
			$(".tbl-list2").show();
			$(".stopCancelBtn").show();
			drawStopWordList(topicList.list, 1, $('input[name="periodRadio"]:checked').val());	
			drawPaging(totalCount, cur, end);		
			
			var total = ComUtil.formatNumber(totalCount);	
			$("p.txt").text("총 : " + total);
		},
		error: function(request, status, error){
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
	
	var sourceHtml = $("#stopSentimentKeywordList").html();
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
		$("#selectStopKeywordList").html(html);
	
	} else {
		$('.tbl-list2').append('<div class="NoneDataBox">조회결과가 없습니다.</div>');
	}
		
	var total = ComUtil.formatNumber(totalCount);	
	$("p.txt").text("총 : " + total);
}

// 불용어로 등록한다.
function StopwordBtnClick(e){
	var chk = $("[name=checkBox]:checked");

	if (chk.length === 0){
		alertModal3("dsAertType", "불용어를 처리할 항목을 선택해주세요." , "modalclose");
		return;
	}
	
	
	// 체크박스 선택된 값 배열로 담기
	var tnoFilter = [];
	var wordFilter = [];
	var timeFilter = [];
	
	chk.each(function(index, el) {
		if($("[name=checkBox]:checked").eq(index).parent().parent().parent().parent().parent().css("display")!="none" ){		
			tnoFilter.push($(this).attr("data-tno"));					
			wordFilter.push($(this).attr("data-word"));	
			timeFilter.push($(this).attr("data-time"));
		}
	});
	timeFilter.sort();
	timeFilter.reverse();
	
	// 과거데이터: 불용어등록 O, 삭제 X
	// 당일등록 데이터: 불용어등록 X, 삭제 O
	for (var i = 0; i < tnoFilter.length; i++) {
		if (timeFilter[i] == today) {
			alertModal3("dsAertType", "당일 등록한 감성어는 삭제만 가능합니다." , "modalclose");
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			return;
		} else {
			var param = {		
					word: [],  // 필수
					tno: [],
					command: "insert",  // 필수
					table: "sentiment",  // 필수
					folderId: ""		  
			}	
			param.word = wordFilter;
			param.tno = tnoFilter;
			
			$.ajax({
				url: '/trest/updateStopWord',
				data: param,
				dataType: 'text',
				type: 'POST',
				success: function(response){
					$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
					$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
					alertModal3("dsAertType", "불용어로 등록하였습니다." , "modalclose");
					
					var cur = parseInt($(".paging a.on").text());
					var offset = $('input:radio[name="periodRadio"]:checked').val();
					var start = offset * (cur - 1);
					selectSentimentList(start, offset);
				},
				error: function(status, error){
					console.log(error);
				}
			});		
		}
	} // for문 
}

//불용어를 해제한다.
function cancelStopword(e){
var chk = $("[name=checkBox]:checked");
	
	if (chk.length === 0){
		alertModal3("dsAertType", "불용어를 해제 할 항목을 선택해주세요." , "modalclose");
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
			table: "sentiment",  // 필수
			folderId: ""  
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
			
			var cur = parseInt($(".paging a.on").text());
			var offset = $('input:radio[name="periodRadio"]:checked').val();
			var start = offset * (cur - 1);
			selectStopKeywordList(start, offset);
		},
		error: function(status, error){
			console.log(error);
		}
	});
	//alertModal3("dsAertType", "불용어를 해제하였습니다." , "modalclose");
}

//모달 리셋
var modalReset = function () {
	$('.sentimentNewAddModal .cssInput').val("");	
}

//신규등록, 일괄등록, 삭제 버튼클릭 이벤트
function addDelBtnEvent(e){
	console.log(e);
	if ($(e.target).text() == "신규 등록"){
		$("#group1").modal();
	} else if($(e.target).text() == "일괄 등록") {
		$("#group2").modal();
	} else if($(e.target).text() == "삭제") {
		deleteTopic();
	}
}

// 신규등록
function newAdd(e){	 
	if ($("#mainKeyword").val() === "") {
		alertModal3("dsAertType", "등록할 키워드를 작성해 주세요." , "modalclose");
		$(".undefined.blocker").eq(1).hide();
		return;
	}
		
	var param = {
			type: "sentiment",  // 필수
			keyword: $("#mainKeyword").val(), // 필수
			c1name: undefined,
			c2name: undefined,
			c3name: undefined,
			attr1: "",
			attr2: "",
			attr3: "",
			tpo: undefined,
			score: undefined,
			polarity: $("#polarity").data("polar"),
			intensity: $("#score").val(),
			cliche: undefined
	}
	
	if ($(e.target).text() == "계속등록"){
		duplicateCheck();		
		if (flag == true) {
			$.ajax({
				url: '/trest/insertTopic',
				type: 'POST',
				data: param,
				success: function(data){
					console.log(data);
					modalReset();
					$("#group1").modal();
					//selectSentimentList(0, 10);		
				},
				error : function(request,status,error){
					console.log(error);				
				}
			});	
		} else {
			alertModal3("dsAertType", "이미 등록되어있는 키워드입니다." , "modalclose");
			$(".undefined.blocker").eq(1).hide();	
			return;
		}		
		
	} else if ($(e.target).text() == "저장"){
		duplicateCheck();	
		if (flag == true){
			$.ajax({
				url: '/trest/insertTopic',
				type: 'POST',
				data: param,
				success: function(data){
					$.modal.close();
					console.log(data);
					modalReset();
					$.modal.close();
					selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());						
					alertModal3("dsAertType", "감성어가 등록되었습니다.", "modalclose1");
				},
				error : function(request,status,error){
					console.log(error)
				}
			});	
		} else {
			alertModal3("dsAertType", "이미 등록되어있는 키워드입니다." , "modalclose");	
			$(".undefined.blocker").eq(1).hide();
			return;
		}		
		
	} else {
		$.modal.close();
		alertModal3("dsAertType", "이미 등록되어있는 키워드입니다." , "modalclose");	
		$(".undefined.blocker").eq(1).hide();
		return;
	}
}

//중복체크
var duplicateCheck = function(){
	var param = {
			type: "sentiment",  // 필수
			offset: 0, // 필수
			size: 10, // 필수
			order: "",
			select: "",
			keyword: "",
			option: "",
			excelYn: ""			
	}
	
	param.offset = 0;
	param.size =  $('input:radio[name="periodRadio"]:checked').val();
	param.keyword = $("#mainKeyword").val();
	
	$.ajax({
		url: '/trest/topicList',
		type: 'POST',
		data: param,
		dataType: 'json',
		async: false,
		success: function(data){
			console.log(data);
			sentimentList = data.list;
			
			if(sentimentList.length > 0){
				if (sentimentList[0].keyWord == $("#mainKeyword").val()){
					flag = false;
				} else {
					flag = true;
				}
			} else { 
				flag = true;
			}	
		},
		error : function(request,status,error){
			console.log(error);
		}
	});	
}

//일괄등록
function excelAdd(e){
	//업로드 버튼 클릭 	
	console.log(e);
	var formData = new FormData(document.getElementById("topicForm"));
	console.log(formData);
	
	$.ajax({
		url: "/trest/uploadBatchTopic",
		type: 'POST',
		data: formData,
		cache: false,
		processData: false,
		contentType: false,
		success: function(){
			$.modal.close();
			selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());	
			alertModal3('dsAertType', '엑셀파일이 업로드 되었습니다', 'modalclose');
		},
		error : function(status,error){
			console.log(error);
		}
	});
}

// 삭제
function deleteTopic(e){
	var chk = $("[name=checkBox]:checked");
	
	if (chk.length === 0){
		alertModal3("dsAertType", "삭제할 항목을 선택해주세요." , "modalclose");
		return;
	}
	
	// 체크박스 선택된 값 배열로 담기
	var tnoFilter = [];
	var wordFilter = [];
	var timeFilter = [];

	chk.each(function(index, el) {
		if($("[name=checkBox]:checked").eq(index).parent().parent().parent().parent().parent().css("display")!="none" ){		
			tnoFilter.push($(this).attr("data-tno"));					
			wordFilter.push($(this).attr("data-word"));	
			timeFilter.push($(this).attr("data-time"));
		}
	});
	
	timeFilter.sort();
	
	// 과거데이터: 불용어등록 O, 삭제 X
	// 당일등록 데이터: 불용어등록 X, 삭제 O
	for (var i = 0; i < tnoFilter.length; i++) {
		if (timeFilter[i] !== today) {
			alertModal3("dsAertType", "당일 등록된 감성어만 삭제 할 수 있습니다." , "modalclose1");
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$(".tbl-list2").find("input[name=checkBox]").prop("checked", false);
			return;
		} else {
			var param = {
					type: "sentiment",
					tno: []
			}
			
			param.tno = tnoFilter;
			
			$.ajax({
				url: '/trest/deleteTopic',
				type: 'POST',
				data: param,
				success: function(data){			   
					console.log(data);
					$.modal.close();
					selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());	
					alertModal3("dsAertType", "감성어를 삭제하였습니다." , "modalclose");
				},
				error: function(request, status, error){
					console.log(error);
					selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());
				}
			});
		}
	} // for
}

//검색 이벤트
function searchEvent(){
	selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());
}

// 달력 날짜 오늘로 지정
function dateSetting(){
	var now = new Date();
	var year = now.getFullYear();
	var month = (now.getMonth() + 1);
	var day = now.getDate();
	
	if( month < 10 ) {
		month = "0" + month;
	}
	if ( day < 10 ) {
		day = "0" + day;
	}
	
	today = year + "." + month + "." + day;
	AdminUtil.changeCalrenderDate(today, today);	
}

// 전체체크
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

// 감성선택
function selectSentiment(e){
	var sentimentType = $(e.target).data("sentiment");
	var text = $(e.target).text();
	
	$("#sentimentType").data("sentiment", sentimentType);
	$("#sentimentType").text(text);
	
	if ($("#radio2").prop("checked") == true){
		selectStopKeywordList(0, $('input:radio[name="periodRadio"]:checked').val());
	} else {
		selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());	
	}		
}

//검색갯수 선택
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
    
	selectSentimentList(0, $('input:radio[name="periodRadio"]:checked').val());	
}

// 긍부정 선택
function selectPolarity(e){
	var polarType = $(e.target).data("polar");
	var text = $(e.target).text();
	
	$("#polarity").data("polar", polarType);
	$("#polarity").text(text);
}

//엑셀 다운로드
function downloadEvent(){
	console.log("download start...");
	
	if ($("#radio1").prop("checked") == true) {
		var param = {
				type: "sentiment",  // 필수
				offset: 0, // 필수
				size: totalCount, // 필수
				order: "",
				select: "",
				keyword: "",
				option: "",
				excelYn: "Y"			
		}
		
		param.select = $("#searchSql").val();
		param.keyword = $("#searchKeyword").val();
		param.option = $("#sentimentType").data("sentiment");
					
		$.ajax({
			url: '/trest/topicList',
			type: 'POST',
			data: param,
			dataType: 'json',
			success: function(data){
			console.log("download ok");
			window.location = "http://" + location.host + data.fileUrl;
			},
			error: function(request, status, error){
				console.log(error);
				alert("다운로드 실패");
			}
		});	
	} else {
		var param = {
				media: "A", // 필수
				from: "20180705",   // 필수
				to: "20180705",     // 필수
				offset: 0,  // 필수
				size: totalCount,   // 필수
				keyWord: "",
				query: "",
				folderId: "",
				flag: "S",
				excelYn: "Y",
				taxonomyFilter: "",
				stopType: "sentiment"
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
}
