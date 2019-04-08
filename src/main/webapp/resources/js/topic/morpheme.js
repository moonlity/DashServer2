/**
 * Create: 2018.05.09
 * @author 오경은
 * Page: 사전관리 - 형태소확인
 * 
 */

var keywordList = [];
var keywordFilterData = [];
$(document).ready(function(){
	$("#morphem:even").css("border-right", "1px solid");
	// 목록 개수 표시	
	totalMorpheme();	
	// 규칙연산자제거 버튼 클릭
	$(".right a").eq(2).on("click", delRulQuery);		
	// 키워드 추출 버튼 클릭
	$(".right a").eq(1).on("click", morphemeEvent);
	// 검색 버튼 클릭
	$("tbody td.button").on("click", searchEvent);	
	// 엔터 키이벤트
	$('#search').on("keydown" , function(key){
		if(key.keyCode == 13){
			searchEvent();
		 }
	});
});

// 규칙연산자 제거
function delRulQuery(){
	var text = $("textarea[name=textarea]").val();
	var delRulText = AdminUtil.RuleOperatorRemove(text);
		
	$("textarea[name=textarea]").val(delRulText);
}

// 추출한 형태소 개수
function totalMorpheme(){
	var totalCount = $("li#num.left").length;
	$("tbody p.txt").text("형태소 확인 총 " + totalCount + "건");
	console.log(totalCount);
}

// 키워드 추출 목록을 그린다
function drawKeywordList(scrapKeywordList){
	var sourceHtml = $("#morphemeList").html();
	var template = Handlebars.compile(sourceHtml);
	var keywordList = [];
	
	for (var i in scrapKeywordList) {
		if(i <= scrapKeywordList){
			keywordList.push(scrapKeywordList[i]);
		}
	}
	
	$("#morphem:even").css("border-right", "1px solid");
		
	var data = {list: keywordList};
	var html = template(data);
	$("#morphem").html(html);
	// 형태소 개수
	totalMorpheme();
		
}

// 키워드추출 버튼 이벤트
function morphemeEvent(){
	var param = {
		text: $.trim($("textarea[name=textarea]").val())
	};	
	if(!param.text){
		alert("키워드를 입력하세요");
		return;
	}
	
	$.ajax({
		url: '/trest/morphemeList',
		data: param,
		dataType: 'json',
		type: 'POST',
		success: function(data){
			keywordList = data;
			drawKeywordList(keywordList); 	
		},
		error: function(request, status, error){
			console.log(error);
		}				
	});	
}

function getParam(e){
	var param = {
			search: ""
	}
	param.search = $("#search").val();
	return param;
}

// 검색 돋보기버튼 클릭 (추출된 목록에서 형태소 검색)
function searchEvent(){
	var param = getParam();
	
	keywordFilterData = keywordList.filter(searchFilter, param);	
	totalMorpheme();
	drawKeywordList(keywordFilterData);	
	
}
// 검색 필터
function searchFilter(value){
	var flag = true;	
	if(value.token.indexOf(this.search ) > -1 ){
		flag = true;
	}else{
		flag = false;
	}

	return flag;
}
