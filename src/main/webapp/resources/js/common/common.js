
// 메뉴 이동관련 
var menuUtil = {
	surl : location.href.split("?")[0],
	// 대시보드를 선택한이벤트 dashBoardId : 대시보드id
	goDashBoard : function(dashId){
		var form = document.createElement('form');
		var dashParam = document.createElement('input');
		dashParam.setAttribute('type', 'hidden');
		dashParam.setAttribute('name', 'dashId');
		dashParam.setAttribute('value', dashId);
		form.appendChild(dashParam);
		form.setAttribute('method', 'post');
		form.setAttribute('action', this.surl);
		document.body.appendChild(form);
		form.submit();
	},
	
	// 상단 좌측 대메뉴를 선택한 경우 urlName : 이동주소 menuId : 대메뉴Id
	goRootMenu : function(urlName,menuId){		
		var form = document.createElement('form');
		var dashParam = document.createElement('input');
		dashParam.setAttribute('type', 'hidden');
		dashParam.setAttribute('name', 'menuId');
		dashParam.setAttribute('value', menuId);
		form.appendChild(dashParam);
		form.setAttribute('method', 'post');
		form.setAttribute('action', urlName);
		document.body.appendChild(form);
		form.submit();
	},
	
	// view 로딩 이미지
	appendLoading: function(canvas){
		canvas.append("<div class=\"loading\"><p><img src=\"/resources/images/common/loading003.gif\">로딩중입니다.<br>잠시만 기다려주세요.</p></div>");
	},
	// view 로딩 이미지
	reomveLoading: function(canvas){
		$(canvas).children(".loading").hide();
	}
};


var ComUtil = {
	// 포스트 스크랩저장하기
	// articleId , 	folderId , from , to , media
	saveScrap : function(){
		var param = {
			articleId : $(":input:radio[name=postscrap]:checked").data('articleid') ,
			folderId : $(":input:radio[name=postscrap]:checked").val(),
			from : $(".fromArea").text() ,
			to : $(".toArea").text(),
			media: $(":input:radio[name=postscrap]:checked").data('media')
		}
		$.ajax({
			url : "/cover/saveArticle",
		    data : param,
			type: 'POST',
			dataType : 'text',
			success: function(data){	
				alertModal3("dsAertType","스크랩을 성공하였습니다.");
		
			},
			error : function(request,status,error){
				alert('스크랩을 실패하였습니다');
	
			}
		});
	}	,

		// 메일발송하기
	sendPostMail: function(e){
		var input = $("#mailType input");
		var $body = $("#mailType textarea");
		var $msg = $("#mailbody .tit h3");
		var postTitle = $(e).data('posttitle');
		var urlStr = $(e).data('urlstr');
		var $loading = $("#mailType .loading");
		
		var param = {
			postTitle: postTitle,
			urlStr: urlStr,
			mailtitle: input[0].value,
			mailto: input[1].value,
			mailref: input[2].value,
			mailbody: $body.val()
		};
		
		if(!param.mailtitle){
			$(input[0]).focus();
			alertModal3("dsAertType","제목을 입력하셔야 합니다" , "modalclose1");
			return;
		}
		
		if(!param.mailto){
			$(input[1]).focus();
			alertModal3("dsAertType","받는사람을 입력하셔야 합니다", "modalclose1");
			return;
		}
		
		if(!param.mailbody){
			$(input[2]).focus();
			alertModal3("dsAertType","내용을 입력하셔야 합니다", "modalclose1");
			$body.focus();
			return;
		}
		//alertModal3("dsAertType","메일을 발송중입니다.");
		$loading.show();
		$.ajax({
			url: '/user/sendpostmail',
		    data : param,
			type: 'POST',
			dataType : 'text',
			success: function(data){
				//modalclose();
				$loading.hide();
				alertModal3("dsAertType","메일을 성공하였습니다" , "modalclose1");
		
			},
			error : function(request,status,error){
				//modalclose();
				$loading.hide();
				alertModal3("dsAertType","사용자정보확인에 문제가 있습니다. 잠시후 다시 시도해주세요" , "modalclose1");
	
			}
		});
	},
	
	//콤마로 3자리마다 구분자를 넣는 숫자 포맷
	formatNumber : function(number){
	  var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
	  number += '';                     // 숫자를 문자열로 변환
	  while (reg.test(number))
	  number = number.replace(reg, '$1' + ',' + '$2');
	  return number;
	},
	// 콤마제거 delimiter : 구분자
	removeComma : function(number , delimiter){ // 콤마제거
		if(delimiter ==undefined){
			delimiter = ",";
		}
		if ( number == undefined || number == null || number == "" ) {
			return "";
		}
		var txtNumber = '' + number;
		
		return txtNumber.replace(/(,)/g, "");
	},
	// 배열 중복제거
	dupArr : function(arr){
		for(var i=0; i<arr.length; i++) {
	        var checkDobl = 0;
	        for(var j=0; j<arr.length; j++) {
	            if(arr[i] != arr[j]) {
	                continue;
	            } else {
	                checkDobl++;
	                if(checkDobl>1){
	                    spliced = arr.splice(j,1);
	                }
	            }
	        }
	    }
	    return arr;
	},
	// 잠시멈춤
	sleep : function sleep(num){	//[1/1000초]
		var now = new Date();
		var stop = now.getTime() + num;
	    while(true){
		   now = new Date();
		   if(now.getTime() > stop)return;
		}
	},
	// 숫자인지 판단
	isNumber : function(str) {
	  str += ''; // 문자열로 변환
	  str = str.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (str == '' || isNaN(str)) return false;
	  return true;
	},
	// 숫자만 추출
	getNumberOnly : function(str){
		var val = str.value || str;
	    val = new String(val);
	    var regex = /[^0-9]/g;
	    val = val.replace(regex, '');
	    return val;
	},
	
	// 엑셀 다운로드 table 태그 존재하는 경우만
	// 테이블영역 존재하는 div 태그 id
	// 엑셀저장 파일 이름
	exportExcelTable : function(id){
		var ee = excelExport(id).parseToCSV().parseToXLS("excelexport sheet");
		location.href = ee.getXLSDataURI();
	},
	
	sessionStoragelistSave : function(title , element){
		$(element).each(function(){
			
		});
	},
	
	// 기간별 선택할경우 버즈수치 기간단위로 변경 주간 월 ,분기만 해당
	getTermCount: function(term, data){
		var count;
		switch(term){
			case "week":
				count = this.getWeeklyCount(data);
				break;
				
			case "month":
				count = this.getMonthlyCount(data);
				break;
				
			case "quarter":
				count = this.getQuarterCount(data);
				break;
		}
		count.term = term;
		
		return count;
	},
	// 주별 단위 데이터 변환
	getWeeklyCount: function(data){
		var count = {time:[], time2:[], counts:[]};
		
		if(data.time.length === 0){
			return count;
		}
		
		var size = data.counts.length;
		var time = data.time;
		var sum = [];
		var total = [];
		
		for(var i = 0; i < size; i++){
			count.counts[i] = {name: data.counts[i].name, code: data.counts[i].code, value:[]};
			sum[i] = 0;
			total[i] = 0;
		}
		
		var oneday = this.getDateFromString(time[0]);
		var offset = 0;
		var from = time[0];
		var to;
		
		for(var i = 0; i < time.length; i++){
			for(var j = 0; j < size; j++){
				sum[j] += data.counts[j].value[i];
				total[j] += data.counts[j].value[i];
			}
			
			if(from === null){
				from = time[i];
			}
			
			if(oneday.getDay() === 6){
				count.time[offset] = (oneday.getMonth() + 1) + "월" + this.getWeekOfMonth(oneday) +"주";
				for(var j = 0; j < size; j++){
					count.counts[j].value[offset] = sum[j];
					sum[j] = 0;
				}
				to = time[i];
				count.time2[offset] = [from,to];
				from = null;
				offset++;
			}
			
			oneday.setDate(oneday.getDate() + 1);
		}
		
		//마지막 날짜가 토요일이 아닌 경우
		oneday = this.getDateFromString(time[time.length - 1]);
		if(oneday.getDay() !== 6){
			if(from == null){
				from = time[time.length - 1];
			}
			
			to = time[time.length - 1];
			count.time[offset] =  (oneday.getMonth() + 1) + "월" + this.getWeekOfMonth(oneday) + "주";
			
			for (var j = 0; j < size; j++) {
				count.counts[j].value[offset] = sum[j];
			}
			count.time2[offset] = [from,to];
		}
		
		var all = 0;
		for(var i = 0; i < size; i++){
			count.counts[i].total = total[i];
			all += total[i];
		}
		
		count.total = all;
		return count;
	},
	//일별 multi count 데이터로부터 월간count 데이터 생성, DateUtil 종속
	getMonthlyCount: function(data){
		var count = {time: [], time2:[], counts:[]};
		
		if(data.time.length === 0){
			return count;
		}
		
		var size = data.counts.length;
		var time = data.time;
		var sum = [];
		var total = [];
		
		for(var i = 0; i < size; i++){
			count.counts[i] = {name: data.counts[i].name, code: data.counts[i].code, value:[]};
			sum[i] = 0;
			total[i] = 0;
		}
		
		var offset = 0;
		var from = time[0];
		var to;
		
		for(var i = 0; i < time.length - 1; i++){
			for(var j = 0; j < size; j++){
				sum[j] += data.counts[j].value[i];
				total[j] += data.counts[j].value[i];
			}
			
			if(from === null){
				from = time[i];
			}
			
			if(time[i].substr(4,2) !== time[i+1].substr(4,2)){
				to = time[i];
				count.time[offset] = parseInt(time[i].substr(4,2),10) + "월";
				
				for(var j = 0; j < size; j++){
					count.counts[j].value[offset] = sum[j];
					sum[j] = 0;
				}
				count.time2[offset] = [from, to];
				from = null;
				offset++;
			}
		}
		
		var i = time.length - 1;
		if(from === null){
			from = time[i];
		}
		
		if(time[i - 1].substr(4,2) === time[i].substr(4,2)){
			for(var j = 0; j < size; j++){
				sum[j] += data.counts[j].value[i];
				total[j] += data.counts[j].value[i];
				count.counts[j].value[offset] = sum[j];
			}
		}
		else {
			for(var j = 0; j < size; j++){
				sum[j] = data.counts[j].value[i];
				total[j] += data.counts[j].value[i];
				count.counts[j].value[offset] = sum[j];
			}
		}
		to = time[i];
		count.time[offset] = parseInt(time[i].substr(4,2),10) + "월";
		count.time2[offset] = [from, to];
		
		var all = 0;
		for(var i = 0; i < size; i++){
			count.counts[i].total = total[i];
			all += total[i];
		}
		
		count.total = all;
		return count;
	},
	// 분기별 합계구하기
	getQuarterCount: function(data){
		var count = {time:[], time2:[], counts:[]};
		
		if(data.time.length === 0){
			return count;
		}
		
		var size = data.counts.length;
		var time = data.time;
		var sum = [];
		var total = [];
		
		for(var i = 0; i < size; i++){
			count.counts[i] = {name: data.counts[i].name, code: data.counts[i].code, value:[]};
		}
		
		var oneday = this.getDateFromString(time[0]);
		var offset = 0;
		var from = time[0];
		var to;
		var quarter = 0;
		var timeStr = "1Q";
		for(var i = 0; i < time.length; i++){
			if(from === null){
				from = time[i];
			}
			quarter = Math.ceil(parseInt(time[i].substr(4,2),10) /3) ;
			if(time[i+1] == undefined) quarter2 = quarter;
			else quarter2 = Math.ceil(parseInt(time[i+1].substr(4,2),10) /3) ;
			timeStr = time[i].substr(2,2) + '.' + quarter + "Q";
			
			for(var j = 0; j < size; j++){
				if(isNaN(sum[j]) ) sum[j] = 0;
				if(isNaN(total[j]) ) total[j] = 0;
				sum[j] += data.counts[j].value[i];
				total[j] += data.counts[j].value[i];
			}
			if(quarter == quarter2){
				count.time[offset] = timeStr;
				to = time[i];
				count.time2[offset] = [from,to];
				for(var j = 0; j < size; j++){
					count.counts[j].value[offset] = sum[j];
				}
			
			}else{
				count.time[offset] = timeStr;
				to = time[i];
				count.time2[offset] = [from,to];
				for(var j = 0; j < size; j++){
					count.counts[j].value[offset] = sum[j];
					sum[j] = 0;
				}
				
				offset++;
				from = null;
			}
		}
		
		var all = 0;
		for(var i = 0; i < size; i++){
			count.counts[i].total = total[i];
			all += total[i];
		}
		
		count.total = all;
		return count;
	},
	/**
	 * 문자열로부터 날짜 객체 생성
	 * @param {string} str
	 * @returns {Date}
	 */
	getDateFromString: function(str){
		var regexpr = /\/|\.|-/g;
		str = str.replace(regexpr, "");
		
		if(str.length < 8){
			throw "문자열은 8자리 숫자로 구성되어야 합니다.";
		}
		
		var year	= parseInt(str.substr(0, 4), 10);
		var month	= parseInt(str.substr(4, 2), 10) - 1;
		var date	= parseInt(str.substr(6, 2), 10);
	
		return new Date(year, month, date, 0, 0, 0);
	},
	/**
	 * 날짜 객체로부터 8자리, 또는 10자리 문자열 생성
	 * @param {Date} date 날짜 객체
	 * @param {boolean} hourtime 시간 포함 여부
	 * @returns {string} 날짜 문자열
	 */
	getDateString: function(date, hourtime){
		var mm = date.getMonth() + 1;
		var dd = date.getDate();
		
		if(mm < 10){
			mm = "0" + mm;
		}
		
		if(dd < 10){
			dd = "0" + dd;
		}
		
		var str = "" + date.getFullYear() + mm + dd;
		
		if(!hourtime){
			return str;
		}
		
		var hh = date.getHours();
		if(hh < 10){
			hh = "0" + hh;
		}
		
		return str + hh;
	},
	getDateDiff : function(date1, date2) {
		return (date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24;
	},
	getWeekOfMonth: function(date){
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
		return Math.ceil((date.getDate() + firstDay)/7);
	},
	
	/**
	 * str이 올바른 날짜 형식('yyyy.mm.dd')인지 확인체크
	 * @param str
	 * @returns {Boolean}
	 */
	isValidDateForm : function(str) {
		if(str.length != 10)
			return false;
		
		var regex = /[12]\d{3}[.]+(0[1-9]|1[0-2])[.]?(0[1-9]|[12]\d|3[01])/g;
		
		return regex.test(str)
	},
	
	// 파라미터복사
	copyParam : function(param){
		var copied = {};
		for(var key in param){
			copied[key] = param[key];
		}
		return copied;
	}
}

// 모달관련
$.modal.defaults = {
		clickClose: false,
		escapeClose: true
/*  closeExisting: true,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  clickClose: false,       // Allows the user to close the modal by clicking the overlay
  closeText: 'Close',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: true,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  blockerClass: "modal",  // CSS class added to the overlay (blocker).

  // HTML appended to the default spinner during AJAX requests.
  spinnerHtml: '<div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div>',

  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
*/
};
// 모달창 닫기 -- 최대2개 까지 생긴다는 가정으로 함
function modalclose(){
	$.modal.close();
	// 가끔 모달창이 남아 잇는 경우가 있어서 있다면 닫아준다
	if($.modal.getCurrent() != null)	$.modal.close();
}
// 1개만 닫는다
function modalclose1(){
	$.modal.close();
}



// 1줄로 표시되는 모달창
// 강조 + 일반안내 문 모달창
// id 모달창위치, strongmsg 강조구문 , msg 일반구문 , functionnm 닫기버튼용 함구이름

// 포커스가 필요한 모달창
function focusModal1(id, strongmsg, msg , functionnm , focusel){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#focus_alert1").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message : msg, functionnm : functionnm , focusel:focusel };
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function alertModal1(id, strongmsg, msg , functionnm){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#warning_alert1").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message : msg, functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}
//일반 + 강조 + 일반안내 문 모달창
function alertModal2(id,strongmsg ,msg1, msg2 , functionnm){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#warning_alert2").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message1 : msg1,message2 : msg2, functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}
// 일반구문만 있는 모달창
function alertModal3(id, msg , functionnm){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#warning_alert3").html();
	var template = Handlebars.compile(source);
	var data = {message : msg, functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

//일반구문만 2줄짜리
function alertModal4(id, msg1 , msg2 , functionnm){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#warning_alert4").html();
	var template = Handlebars.compile(source);
	var data = {message1 : msg1 ,message2 : msg2 , functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

// 세션 로그인 종료 당했음을 나타낼때
/**
 * @param id : 생성할 위치 엘리먼트 id
 * @param msg1 : 첫번째 아이디
 * @param msg2 : 두번째 아이디
 * @param ip : 아이피
 * */
function alertSessionModal(id, msg1 , msg2 , ip , functionnm){
	if(functionnm==undefined) functionnm = 'modalclose';
	var html = "";
	var source = $("#alert_session").html();
	var template = Handlebars.compile(source);
	var data = {message1 : msg1 ,message2 : msg2 , ip:ip ,functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}
// 기본 확인 모달창
// id 화면에 그려질위치 msg1 메세지 , msg2 메세지 , strongmsg 강조구문 , did 이벤트구분을 위한아이디(제공된심플모달에서는 리턴 콜백에 관련된 부분이 존재안함)
function confirmModal1(id, msg1,msg2,strongmsg ,did  ){
	var html = "";
	var source = $("#confirm_alert1").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message1 : msg1 , message2 : msg2 , did: did};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function confirmModal2(id, msg1,msg2,strongmsg ,functionnm  ){
	var html = "";
	var source = $("#confirm_alert2").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message1 : msg1 , message2 : msg2 ,  functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function confirmModal3(id, msg1, msg2, functionnm){
	var html = "";
	var source = $("#confirm_alert3").html();
	var template = Handlebars.compile(source);
	var data = {message1 : msg1 , message2 : msg2 ,  functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function confirmModal4(id, msg1,msg2,strongmsg ,functionnm  ){
	var html = "";
	var source = $("#confirm_alert4").html();
	var template = Handlebars.compile(source);
	var data = {strongmessage : strongmsg , message1 : msg1 , message2 : msg2 ,  functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function imageModal(id, imgPath, functionnm) {
	var html = "";
	var source = $("#image_alert").html();
	var template = Handlebars.compile(source);
	var data = {imgPath : imgPath,  functionnm : functionnm};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}

function lodingModal(id, msg){
	var html = "";
	var source = $("#loading_modal").html();
	var template = Handlebars.compile(source);
	var data = {message : msg};
	html = template(data);
	$("#"+id).html(html);
	$("#"+id).modal();
}
// 포커스가 있는 모다 닫기
function findModalClose(elidname){
	$.modal.close();
	$(elidname).focus();
}

//포커스가 있는 모달 닫고 포커스 엘리먼트 아이디 제거
function findModalClose2(elidname){
	modalclose();
	$(elidname).focus();
	$(elidname).removeAttr("id");
}

// 모달 닫으면서 포커스 (인자 - 제이쿼리 객체)
function findModalClose3($FocusEl){
	$.modal.close();
	$FocusEl.focus();
}

// 모든 토글을 닫는다.
function allToggleClose(){
	for ( var i in tgArr) {
		tgArr[i].closeBtn.trigger('click');
		//tgArr[i].tglBtn.trigger('click');
	}
}

// 로그인페이지로 이동한다.
function logingo(){
	location.replace("/user/login");  
}

// 대시보드 설정버튼을 선택한경우
function dashSetting(){
	var rootCode = $(".searchArea .selectbox .dropdown dt em").prop("class");
	var dashId = $("#hiddashboardId").val();
	location.href="/setting/main";
	//location.href="/dash/dashview?menuId="+rootCode + "&dashId="+dashId;
}


//화면상에 그려지는 버튼들에 대한 이벤트 초기화및 등록
function pushEventAction(){
	// 기존 토글 이벤트 모두 초기화
	tgArr = [];
	
	// 기타 토글 버튼 UI
	$(".drop-ar").each(function(){
		var dropToggle = new tu.ui.Toggle();
		dropToggle.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose });
	});
	
	$(".category-ar").each(function(){
		var wgCateToogle = new tu.ui.Toggle();
		wgCateToogle.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose, subMenuCallback : wgCateMenuControl });
	});
}

function otherClose(){
	for(var i = 0; i<tgArr.length; i++ ){
		if(!tgArr[i].getArea().is(".non-ch"))tgArr[i].hideCont();
	}
}
function wgCateMenuControl(e,el,parent){
	e.preventDefault();
	var $menu = el;
	parent.find(".drop-bt span").html($menu.html());
}
//사업자 번호 자동 하이픈 입력 및 문자 입력 방지
function licenseNum(str){
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';
    if(str.length < 4){
        return str;
    }else if(str.length < 7){
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3);
        return tmp;
    }else{             
        tmp += str.substr(0, 3);
        tmp += '-';
        tmp += str.substr(3, 2);
        tmp += '-';
        tmp += str.substr(5);
        return tmp;
    }
    return str;
}
//사업자번호 체크
//국내에 종속성을 가지고있기에 라온에는 직접 들어가지 않겠지만 나중에 확장용으로 들어갈 수 있습니다. (은글슬쩍 라이브러리 광고....)
//사업자번호 체크
function ckBisNo(bisNo)
{
	// 넘어온 값의 정수만 추츨하여 문자열의 배열로 만들고 10자리 숫자인지 확인합니다.
	if ((bisNo = (bisNo+'').match(/\d{1}/g)).length != 10) { return false; }
	
	// 합 / 체크키
	var sum = 0, key = [1, 3, 7, 1, 3, 7, 1, 3, 5];
	
	// 0 ~ 8 까지 9개의 숫자를 체크키와 곱하여 합에더합니다.
	for (var i = 0 ; i < 9 ; i++) { sum += (key[i] * Number(bisNo[i])); }
	
	// 각 8번배열의 값을 곱한 후 10으로 나누고 내림하여 기존 합에 더합니다.
	// 다시 10의 나머지를 구한후 그 값을 10에서 빼면 이것이 검증번호 이며 기존 검증번호와 비교하면됩니다.
	return (10 - ((sum + Math.floor(key[8] * Number(bisNo[8]) / 10)) % 10)) == Number(bisNo[9]);
}


function otherClose(){
	for(var i = 0; i<tgArr.length; i++ ){
		if(!tgArr[i].getArea().is(".non-ch"))tgArr[i].hideCont();
	}
}
function wgCateMenuControl(e,el,parent){
	e.preventDefault();
	var $menu = el;
	parent.find(".drop-bt span").html($menu.html());
}

//전화번호 자동변환
function autoPhone(str,type){
	  str = str.replace(/[^0-9]/g, '');
	  return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}

//빈 값 유효성 검사 (필수 입력 요소)
function validateNotBlank(value, msg) {
	if(value.trim() === '') {
		alertModal3('dsAertType', msg, 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 이메일 패턴 검사
function eMailCheck(email){
	var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
	if(exptext.test(email)==false){
		return false;
	}else{
		return true;
	}
}

//이메일 유효성 검사 
function validateEmail(value) {
	if(!eMailCheck(value)) {
		alertModal3('dsAertType', '이메일 주소 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 유선번호 패턴 검사
function phoneNumCheck(value) {
	var exp = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))(\d{3,4})(\d{4})$/;
	return exp.test(value);
}

//유선 전화번호 유효성 검사
function validatePhoneNum(value) {
	if(!phoneNumCheck(value)) {
		alertModal3('dsAertType', '유선 전화번호 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

//팩스 번호 유효성 검사
function validateFax(value) {
	if(!phoneNumCheck(value)) {
		alertModal3('dsAertType', 'FAX번호 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 휴대폰 번호 패턴 검사
function mobileNumCheck(value) {
	var exp = /^(?:(010\d{4})|(01[1|6|7|8|9]\d{3,4}))(\d{4})$/;
	return exp.test(value);
}

// 휴대폰 번호 유효성 검사
function validatemobileNum(value) {
	if(!mobileNumCheck(value)) {
		alertModal3('dsAertType', '휴대폰번호 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 연락처 (휴대폰 + 유선) 유효성 검사
function validateContact(value) {
	if(!mobileNumCheck(value) && !phoneNumCheck(value)) {
		alertModal3('dsAertType', '연락처 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

//IP주소 패턴 검사
function ipAddressCheck(value) {
	var exp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return exp.test(value);
}

// IP주소 유효성 검사
function validateIpAddress(value) {
	if(!ipAddressCheck(value)) {
		alertModal3('dsAertType', 'IP주소 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 사업자 등록 번호 패턴 검사 
function bizIDCheck(bizID) { 
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    //bizID = bizID.replace(/-/gi,'');
    
    if(bizID.length > 10) {
    	return false;
    }
    
    for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;

    if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
    return false;
}

// 사업자 등록 번호 유효성 검사
function validatebizID(value) {
	if(!bizIDCheck(value)) {
		alertModal3('dsAertType', '사업자 등록 번호 형식에 맞게 입력해 주세요.', 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 숫자 값 유효범위 체크
function numberRangeCheck(value, min, max) {
	if(min <= value && value <= max) {
		return true;
	} else {
		return false;
	}
}

//숫자 값 유효범위 유효성 검사
function validateNumberRange(value, min, max, msg) {
	if(!numberRangeCheck(value, min, max)) {
		alertModal3('dsAertType', msg, 'modalclose1');
		return false;
	} else {
		return true;
	}
}

// 아이디 영문숫자 4~12자 유효성 체크
function idStringCheck(value) {
	var exp = /^[A-Za-z0-9]{5,12}$/;
	return exp.test(value);
}

//비밀번호 영문숫자 6~12자 유효성 체크
function pwStringCheck(value) {
	var exp = /^[A-Za-z0-9]{6,12}$/;
	return exp.test(value);
}

//이미지 파일 확장자 유효성 체크
function validateImageExt(fileNm) {
	var ext = fileNm.substring(fileNm.lastIndexOf('.') + 1, fileNm.length).toLowerCase();
	var isImage = true;
	if(ext !== 'jpg' && ext !== 'png' && ext !== 'bmp') {
		isImage =  false;
	} 
	return isImage;
}

function checkFileSize(fileSize, maxValue) {
	
}

// 문자열 byte size 반환 ( 사용법 : getByteLength(문자열) )
function getByteLength(s,b,i,c){
    for(b=i=0;c=s.charCodeAt(i++);b+=c>>11?3:c>>7?2:1);
    return b;
}

// 배열 중복값 확인하여 중복 아이템 반환
function getDuplicatedItem(arr) {
	for(var i=0; i<arr.length; i++) {
		for(var j=i+1; j<arr.length; j++) {
			if(arr[i] === arr[j]) {
				return arr[j];
			}
		}
	}
}
// 쿼리중 엔터키 제거
function queryEnterRemove(queryStr){
	if(queryStr== undefined){
		queryStr = "";
	}
	return queryStr.replace(/\n|\r/g, "");
}


// 엑셀등 문서에서 강조 장식등의 용도로 사용하는 여러종류의 따옴표를 변경하는 부분
function changeQuot(str ){
	if(str == undefined || str ==null){
		str = "";
		}
	// &acute;  	 ´   포함시 제거
	if(str.indexOf("´")>-1){
		str = str.replace(/´/gi , "'");
	}
	
	// &#96; 	 ` 
	if(str.indexOf("`")>-1){
		str = str.replace(/`/gi , "'");
	}
	// &#180; 	 ´
	if(str.indexOf("´")>-1){
		str = str.replace(/´/gi , "'");
	}
	
	//&#168; 	 ¨
	if(str.indexOf("¨")>-1){
		str = str.replace(/¨/gi , "\"");
	}
	
	//&uml;    	 ¨ 
	if(str.indexOf("¨")>-1){
		str = str.replace(/¨/gi , "\"");
	}
	// ʺ
	if(str.indexOf("ʺ")>-1){
		str = str.replace(/ʺ/gi , "\"");
	}
	
	if(str.indexOf("”")>-1){
		str = str.replace(/”/gi , "\"");
	}
	
	if(str.indexOf("“")>-1){
		str = str.replace(/“/gi , "\"");
	}
	
	return str;
}
