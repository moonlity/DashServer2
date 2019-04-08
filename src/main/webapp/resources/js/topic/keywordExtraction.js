/**
 * Create: 2018.05.09
 * @author 오경은
 * Page: 사전관리 - 키워드 추출
 * 
 */
var keywordExtractionList = [];
var uniqueKeywordList = [];
$(document).ready(function(){
	// 목록 개수표시
	totalMorpheme();
	// 라디오버튼 선택 이벤트
	$("input[name=radioTopic]").eq(0).on("click", radioEvent1);
	$("input[name=radioTopic]").eq(1).on("click", radioEvent2);
	$("input[name=radioTopic]").eq(2).on("click", radioEvent3);
	// 키워드 추출 클릭
	$(".right a").on("click", keywordExtract);	
	// 체크박스 선택
	$(".ac.top .cssCheck.hidden").on("click", allCheck);
	// 불용어처리 버튼
	$("#stopBtn td.button").on("click", stopWord);	
	
});

// 불용어처리 버튼클릭 (issue, base, stop, 감성, 불용어)
function stopWord(e){
	var chk = $("[name=checkBox]:checked");
	
	if(chk.length === 0){
		alertModal3("dsAertType", "불용어를 처리할 항목을 선택해주세요." , "modalclose1");
		return;
	}
	
	// 선택된 체크박스를 배열로 담기
	var  wordFilter = [];
	var  tnoFilter = [];	
	
	chk.each(function(index, el) {
		if($("[name=checkBox]:checked").eq(index).parent().parent().parent().parent().parent().css("display")!="none" ){
			wordFilter.push($(this).attr("data-word"));	
			tnoFilter.push($(this).attr("data-tno"));	
		}
	});
		
	var param = {
			table: "",
			command: "insert", 
			word: [],
			tno: []
	}	
	
	param.table = $(e.target).data("name");  // 체크박스에 포함된 data-name값
	param.word = wordFilter;	
	param.tno = tnoFilter;
	
	$.ajax({
		url: '/trest/updateStopWord',
		data: param,
		dataType: 'text',
		type: 'POST',
		success: function(response){
			$("#checkAll").prop("checked", false);
			$("#checkAll2").prop("checked", false);
			$("#checkAll3").prop("checked", false);
			$(".tbl-list").find("input[name=checkBox]").prop("checked", false);
			$("#sentimentTbl").find("input[name=checkBox]").prop("checked", false);
			$("#sentimentExtractList").find("input[name=checkBox]").prop("checked", false);
			alertModal3("dsAertType", "불용어로 등록하였습니다." , "modalclose1");			
			keywordExtract();
		},
		error: function(status, error){
			console.log(error);
		}
	});		
}

// 추출 키워드 개수 (총개수, 주제어, 불용어)
function totalMorpheme(total, topic, stop){
	if (total == undefined){
		total = 0;
	}
	if (topic == undefined){
		topic = 0;
	}
	if (stop == undefined){
		stop = 0;
	}
	
	total = total;
	topic = topic;
	stop = stop;
	
    $("tbody td.totalCnt").text("키워드 총 " + total + "건 (주제어" 
    		+ topic + "건, 불용어" + stop + "건)" );
	console.log(total);
}

// 키워드추출 버튼 클릭
function keywordExtract(){
	var param = {
		text: $.trim($("textarea[name=text]").val()),
		type: "",  // topic, sentiment, occasion
		search: ""  // 검색식
		//proximity: -1
	};	
	
	if(!param.text){
		alertModal3("dsAertType", "키워드를 입력하세요." , "modalclose1");
		return;
	} 
	
	// type파라미터 결정
	if ($("input[name=radioTopic]").eq(0).prop("checked")){
		param.type = $("#radio1").data("type");						
	} else if ($("input[name=radioTopic]").eq(1).prop("checked")){
		param.type = $("#radio2").data("type");	
	} else if($("input[name=radioTopic]").eq(2).prop("checked")) {
		param.type = $("#radio3").data("type");	
	}	
	
	$.ajax({
		url: '/trest/keywordList',
		data: param,
		dataType: 'json',
		type: 'POST',
		success: function(data){
			console.log(data);
			keywordExtractionList = data;					
				
			// 주제어일때
			if(param.type == "topic"){
				$(".tbl-list").show();
				$("#sentimentTbl").hide();
				$("#tpoTbl").hide();
				drawTopicList(keywordExtractionList); 					
			// 감성어일때
			} else if (param.type == "sentiment"){ 
				drawSentimentList(keywordExtractionList); 
				$(".tbl-list").hide();
				$("#sentimentTbl").show();
				$("#tpoTbl").hide();
			// TPO 일때
			} else {
				$(".tbl-list").hide();
				$("#sentimentTbl").hide();
				$("#tpoTbl").show();
				drawTpoList(keywordExtractionList); 		
			}
			// 키워드 개수 표시
			totalMorpheme(data.totCnt, data.topicCnt, data.stopCnt);
		},
		error: function(request, status, error){
			console.log(error);
		}				
	});	
}

// 주제어일때 목록을 그린다
function drawTopicList(scrapList){
	var sourceHtml = $("#topicList").html();
	var template = Handlebars.compile(sourceHtml);
	
	for (var i in scrapList) {
		if(i <= scrapList){		
			keywordExtractionList.push(scrapList[i]);
		}
	}
	
	var data = {list: keywordExtractionList.list};
	var html = template(data);
	$("#topicExtractionList").html(html);
	
	// 불용어 O 표시
	$("td[name=keyword]").each(function(){
		if($(this).text() == "false"){
			$(this).text(" ");
		}else{
			$(this).text("O");
		}
	});		
	// 형태소 개수
	totalMorpheme(data.totCnt, data.topicCnt, data.stopCnt);	
}

// TPO 일때 목록을 그린다
function drawTpoList(scrapList){
	var sourceHtml = $("#tpoList").html();
	var template = Handlebars.compile(sourceHtml);
	for (var i in scrapList) {
		if(i <= scrapList){		
			keywordExtractionList.push(scrapList[i]);
		}
	}				
	var data = {list: keywordExtractionList.list};
	var html = template(data);
	$("#tpoExtractList").html(html);
	
	// 불용어 O 표시
	$("td[name=keyword]").each(function(){
		if($(this).text() == "false"){
			$(this).text(" ");
		}else{
			$(this).text("O");
		}
	});
		
	// 형태소 개수
	totalMorpheme(data.totCnt, data.topicCnt, data.stopCnt);
		
}
// 감성어 일때 목록을 그린다
function drawSentimentList(scrapList){
	var sourceHtml = $("#sentimentList").html();
	var template = Handlebars.compile(sourceHtml);

	for (var i in scrapList) {
		if(i <= scrapList){		
			keywordExtractionList.push(scrapList[i]);
		}
	}
	var data = {list: keywordExtractionList.list};
	var html = template(data);
	$("#sentimentExtractList").html(html);
	
	// 불용어 O 표시
	$("td[name=keyword]").each(function(){
		if($(this).text() == "false"){
			$(this).text(" ");
		}else{
			$(this).text("O");
		}
	});	
	
	// 긍정,부정 표시
	$("#sentimentExtractList td[name=polar]").each(function(){
		if($(this).data("polar") === 1){
			$(this).text("긍정");
		}else{
			$(this).text("부정");
		}
	});
	
	// 형태소 개수
	totalMorpheme(data.totCnt, data.topicCnt, data.stopCnt);	
}

// 체크박스 선택
function allCheck(e){
	e.stopPropagation();
	if ($(e.target).prop("checked")) {
		$("[name=checkBox]").prop("checked" , true);		
	} else {
		$("[name=checkBox]").prop("checked" , false);				
	}
}

// 주제어 라디오버튼
function radioEvent1(e){
	e.stopPropagation();
	$('.button a').show();
	$('.button a').eq(3).hide();
	$('.button a').eq(4).hide();
	$("#checkAll2").prop("checked", false);
	$("#checkAll3").prop("checked", false);
	keywordExtract();
}
// 감성어 라디오버튼
function radioEvent2(e){
	e.stopPropagation();
	$('.button a').hide();
	$('.button a').eq(3).show();
	$('.button a').eq(5).show();
	$('.stopBtnArea').eq(4).show();
	$("#checkAll").prop("checked", false);
	$("#checkAll3").prop("checked", false);
	keywordExtract();
}
// TPO 라디오버튼
function radioEvent3(e){
	e.stopPropagation();
	$('.button a').hide();
	$('.button a').eq(4).show();
	$('.button a').eq(5).show();
	$('.stopBtnArea').eq(4).show();
	$("#checkAll").prop("checked", false);
	$("#checkAll2").prop("checked", false);
	keywordExtract();
}
