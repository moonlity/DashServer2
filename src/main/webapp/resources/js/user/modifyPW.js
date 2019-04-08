/**
 * 작성일 : 2018.02.02
 * 내용 : 아이디 찾기 관련된 사항
 */

$(document).ready(function(){
	var $domainSelecter = $(".content table td .dropdown .drop-ct li a");
	$domainSelecter.on("click", function(e){
		$domainSelecter.each(function(){
			$(this).removeClass("on");
		});
		$(e.target).addClass("on");
		$("#userEmail2").val($(e.target).data("email"));
		$("#userEmail2").focus();
	});
	
	$(".basicBtn.blue.btnAccount").on("click", function(){

		if($("#comRegNum1").val()==""){
			focusModal1("dsAertType", "첫번째 사업자 등록번호" , "를 입력해주시기 바랍니다." , "findModalClose" ,"comRegNum1");
			return;
		};
		
		if($("#comRegNum2").val()==""){
			focusModal1("dsAertType", "두번째 사업자 등록번호" , "를 입력해주시기 바랍니다." , "findModalClose" ,"comRegNum2");
			return;
		};
		
		if($("#comRegNum3").val()==""){
			focusModal1("dsAertType", "세번째 사업자 등록번호" , "를 입력해주시기 바랍니다." , "findModalClose" ,"comRegNum3");
			return;
		};
		
		if($("#userId").val()==""){
			focusModal1("dsAertType", "아이디" , "를 입력해주시기 바랍니다." , "findModalClose" ,"userId");
			$("#userId").focus();
			return;
		};
		
		if($("#userEmail1").val()==""){
			focusModal1("dsAertType", "이메일" , "을 입력해주시기 바랍니다.", "findModalClose","userEmail1");
			$("#userEmail1").focus();
			return;
		};
		
		if($("#userEmail2").val()==""){
			focusModal1("dsAertType", "이메일" , "을 입력해주시기 바랍니다.", "findModalClose" , "userEmail2");
			$("#userEmail2").focus();
			return;
		};		
		var param = {
				comRegNum : $("#comRegNum1").val() + "-" + $("#comRegNum2").val() +  "-" + $("#comRegNum3").val() ,
				userId : $("#userId").val() ,
				email : $("#userEmail1").val() + '@' + $("#userEmail2").val()
		};
		lodingModal("dsAertType" ,"메일을 전송중입니다.");
		$.ajax({
			url: '/user/findPasswordAjax',
			data : param,
			type: 'POST',
			success: function(){
				$.modal.close();
				alertModal1("dsAertType" ,$("#userEmail1").val() + '@' + $("#userEmail2").val(),"\n비밀번호를 변경 할 수 있는 메일을 보내드렸습니다.\n메일에 포홤된 URL로 접속하여 비밀번호를 변경해주세요","logingo");
				
			},
			error : function(request,status,error){
				$.modal.close();
				alertModal1("dsAertType" ,"사용자정보확인","에 문제가 있습니다. 잠시후 다시 시도해주세요");
			}
		});
	});
});

