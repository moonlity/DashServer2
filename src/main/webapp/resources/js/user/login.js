/**
 * @Create: 2019.04.17
 * @Author: 송원진
 * 로그인처리관련기능정의
 */

$(document).ready(function(){
	
	$("#userID").focus(); // 아이디로 포커스
    // 로그인버튼		
	 $('.btnLogin').on("click" , function(){
		 signIn();
	 });

	var msg = $("[name=msg]").val();
	if(msg.length > 0) waringLoginAlert(); 
	
	var userId = $("[name=userId]").val(); 
	$("#userId").val(userId);
	$("[name=userId]").focus();
	
	// 엔터 키이벤트
	$('#userId').on("keydown" , function(key){
		if(key.keyCode == 13){
			var memberId = $("#userId").val();
		 	if( $.trim(memberId) == ""){
		 		alertModal3('warning_login1' ,'아이디를 입력해주세요');	
		 		$("[name=userId]").focus();
		 	}else{
		 		$("#passWord").focus();
		 	}
			//signIn();
		}
	 });
	$('#passWord').on("keydown" , function(key){
		if(key.keyCode == 13){
			var password = $("#passWord").val();
			if( $.trim(password) == ""){
				alertModal3('warning_login1' ,'비밀번호를 입력해주세요');
				$("#passWord").focus();
			}else{
				//$(".btnLogin").focus();
				signIn();
			}
			//signIn();
		}
	 });
	
	$('#btnLogin').on("keydown" , function(key){
		if(key.keyCode == 13){
			signIn();
		}
	 });
	
});
// 로그인버튼 클릭
function signIn(){
	var memberId = $("#userId").val();
	var password = $("#passWord").val();
   	if( memberId == ""){
       	alert("아이디를 입력해주세요");
       } else if(password==""){
		alert("비밀번호를 입력해주세요");
		$("#password").focus(); //패스워드로 포커스이동
	} else {
		document.loginform.action="/logingo";
    	document.loginform.submit();
	}
 } //signIn()

//로그인관련 안내창
function waringLoginAlert(strongmsg, msg){
	$("[name=userId]").focus();
	var html = "";
	var source = $("#warning_alert1").html();
	var template = Handlebars.compile(source);
	
	var data = {strongmessage : $("[name=strongMsg]").val() , message : $("[name=msg]").val() , id:"warning_login1" , functionnm : 'fclose'};
	html = template(data);
	$("#warning_login1").html(html);
	$("#warning_login1").modal();
}
 
function fclose(){
	$.modal.close();
	if($("[name=focus]").val() == 'passWord')$("[name=passWord]").focus();
	else $("[name=userId]").focus();
}
