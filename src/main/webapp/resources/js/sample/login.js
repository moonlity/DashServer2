/**
 * Create: 2017.08.17
 * Author: 송원진
 * Purpose: 로그인처리관련기능정의
 */

$(document).ready(function(){
	$("#userID").focus(); // 아이디로 포커스
	// 아이디 저장 체크시 쿠키에 저장된 아이디값이용
	var chkID = $.cookie('chkID'); // 아이디저장 체크값
	if(chkID == undefined || chkID == "null"){
		$("#userID").val("");
		$("#chkID").attr("checked", false);	 
	} else {
		$("#userID").val(chkID);
		$("#chkID").attr("checked", true);
	}
	
    // 로그인버튼
	var loginBtn = document.getElementById("wrap_btn");
	
	//이벤트리스너 정보
	loginBtn.addEventListener('click', signIn); 
	
});
// 로그인버튼 클릭
function signIn(){
	var memberId = $("#userId").val();
	var password = $("#passWord").val();
    var chk = $("#chkID").is(":checked"); // 만약 아이디 저장을 사용한경우
   	if( memberId == ""){
       	alert("아이디를 입력해주세요");
       	$("#chkID").prop("checked", false);
       } else if(password==""){
		alert("비밀번호를 입력해주세요");
		$("#password").focus(); //패스워드로 포커스이동
	} else {
		if(chk) {
			$.cookie('chkID' , memberId, { path : '/' });
        	document.loginform.action="/user/logingo";
        	document.loginform.submit();
		} else {
			//$.removeCookie("chkID"); 쿠기제거
			$.cookie('chkID' , null, { expire : -1, path : '/' });
	    	document.loginform.action="/user/logingo";
	    	document.loginform.submit();
		}
	}
 } //signIn()

