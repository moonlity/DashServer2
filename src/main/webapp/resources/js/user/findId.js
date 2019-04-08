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
				email : $("#userEmail1").val() + '@' + $("#userEmail2").val()
		};

	
		$.ajax({
			url: '/user/findIdFinAjax',
			data : param,
			type: 'POST',
			dataType : 'json',
			success: function(data){	
				if(data.length<1) {
					alertModal1("dsAertType" ,"조회된 아이디","가 없습니다");
				}
				else {
					alertModal2("dsAertType" ,data, "아이디 : ", " 가 조회되었습니다." ,"menuUtil.goRootMenu('/cover/main' ,'C000')" );
				}
			},
			error : function(request,status,error){
				alertModal1("dsAertType" ,"아이디확인","에 문제가 있습니다. 잠시후 다시 시도해주세요");
			}
		});
		
		
	});
	
});

function findModalClose(elidname){
	$.modal.close();
	$(elidname).focus();
}