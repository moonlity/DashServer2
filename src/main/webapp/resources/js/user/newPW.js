/**
 * 작성일 : 2018.02.06
 * 내용 : 비밀번호 변경관련
 */

$(document).ready(function(){
	$(".tbl-inquiry .btnZone .basicBtn.blue.btnAccount").on("click", function(){
		var pass1 , pass2 , userId;
		pass1 = $("#password1").val();
		pass2 = $("#password2").val();
		userId =$(".pwInfoTxt").data("id");
		confirmPass(pass1,pass2, userId);
	});
	
});

function confirmPass(pass1 , pass2 , userId ){
	var idArr = [];
	var passcnt = 0;
	if(!chkPwd(pass1)){
		focusModal1("dsAertType", "비밀번호" , "는 8~12자리 영문, 숫자를 사용하세요.", "findModalClose" , "password1");
		return;
	}
	
	// 아이디구성 문자 비밀번호에 있는지 체크
	for (var i = 0; i < userId.length; i++) {
		idArr[i]= userId.substr(i,1);
	}
	
	idArr = ComUtil.dupArr(idArr);
	for ( var i in idArr) {
		if(pass1.indexOf(idArr[i]) > 0) {
			passcnt++;			
		}
		/*
		if(passcnt > 3){
			focusModal1("dsAertType", "아이디" , "와 4자리 이상 동일한 비밀번호는 사용 불가합니다.", "findModalClose" , "password1");
			console.log(" 아이디와 4자리 이상 동일한 비밀번호는 사용 불가합니다 ");
			return;
		}*/
	}
	
	var pattern = new RegExp(idArr[i],"g");
	if( pattern.test(pass1) ) {
		// 연속된 숫자테스트
		var regexNo = /(\w)\1\1\1/; // 같은 영문자숫자 연속 4번 체크 정규식
		if (!regexNo.test(pass1)) {
			/*if (!stck(pass1, 4)) {
				focusModal1("dsAertType", "4자리 이상 반복되는 문자, 숫자" , "는 사용 불가능합니다.", "findModalClose" , "password1");
				console.log("4자리 이상 반복되는 문자, 숫자는 사용 불가능합니다. ");
				return;
			}*/
		}else{
			focusModal1("dsAertType", "4자리 이상 반복되는 문자, 숫자" , "는 사용 불가능합니다.", "findModalClose" , "password1");
			console.log("4자리 이상 반복되는 문자, 숫자는 사용 불가능합니다. ");
			return;
		}
	}
	if($.trim(pass1) != $.trim(pass2)){
		focusModal1("dsAertType", "비밀번호" , "를 동일하게 입력해주시기 바랍니다.", "findModalClose" , "password1");
		return;
	}
	
	var param = {
			userId : userId ,
			passWord : pass1
	}
	
	$.ajax({
		url: '/user/changePass',
		data : param,
		type: 'POST',
		dataType : 'text',
		success: function(data){	
			if(data == 'ok' ) {
				alertModal1("dsAertType" ,"패스워드","가 변경되었습니다." , "menuUtil.goRootMenu('/cover/main' ,'C000')");
			}
			else {
				alertModal1("dsAertType" ,"패스워드","에 문제가 있습니다.");
			}
		},
		error : function(request,status,error){
			alertModal1("dsAertType" ,"패스워드","에 문제가 있습니다.");
		}
	});

}
// 영문 혼합 6 12 자리 체크
function chkPwd(str){
	var reg_pwd = /^.*(?=.{8,12})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	if(!reg_pwd.test(str)){
		return false;
	}else {
		return true;		 
	}
}

//연속된 문자 카운트
function stck(str, max) {
    if(!max) max = 4; // 글자수를 지정하지 않으면 4로 지정 
    var i, j, k, x, y; 
    var buff = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
    var src, src2, ptn=""; 

    for(i=0; i<buff.length; i++){ 
        src = buff[i]; // 0123456789 
        src2 = buff[i] + buff[i]; // 01234567890123456789 
        for(j=0; j<src.length; j++){ 
            x = src.substr(j, 1); // 0 
            y = src2.substr(j, max); // 0123 
            ptn += "["+x+"]{"+max+",}|"; // [0]{4,}|0123|[1]{4,}|1234|... 
            ptn += y+"|"; 
        } 
    } 
    ptn = new RegExp(ptn.replace(/.$/, "")); // 맨마지막의 글자를 하나 없애고 정규식으로 만든다. 

    if(ptn.test(str)) return true; 
    return false; 
}

