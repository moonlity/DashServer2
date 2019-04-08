//******************************************************************************************//
//                      ******  함수 개요 *******													
//																			
//  Length (src)						      // 문자열의 길이 구하는 함수		
//  IsKorean (chr)							  // 문자가 한글인지 아닌지를 체크				
//  IsSimplePassword1 (src)					  // 패스워드 검사 1									
//  IsSimplePassword2 (src)				      // 패스워드 검사 2		                            
//  IsSimplePassword3 (src)					  // 패스워드 검사 3                  					
//  IsSimplePassword4 (src)					  // 패스워드 검사 4                  					
//  IsSimplePassword5 (src)					  // 패스워드 검사 5        

//  ValidPassword (pw, pwConfirm)			  // 올바른 패스워드인지 검사							
//******************************************************************************************//

//********************************************************
//   문자열의 길이구하는 함수 (한글 : 2,  영문 : 1)
//********************************************************

function Length(src) {
	var len = 0, i;

	for (i = 0; i < src.length; i++) {
		if (IsKorean(src.charAt(i)))
			len = len + 2;
		else
			len++;
	}

	return len;
}

// ********************************************************
// 문자가 한국어인지 아닌지 체크
// ********************************************************

function IsKorean(chr) {
	if (chr.charCodeAt(0) > 0x8000)
		return true;

	return false;
}

// ********************************************************
// 비밀번호 확인 정규식 (영문+숫자+특수문자)
// ********************************************************
function isValidFormPassword(pw) {
	//var check = /^.*(?=^.{8,1024}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&\*\(\)\-_+=|\\{}\[\]:;\"\'<>,\.\?\/]).*$/;
	var check2 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
	
	if (pw.length < 8 || pw.length > 16) {
		alert("비밀번호는 8자리 이상으로 입력해주세요.");
		return false;
	}

	/*if (!check.test(pw)) {
		alert("비밀번호는 문자, 숫자, 특수문자의 조합으로 입력해주세요.");
		return false;
	}*/
	
	if (!check2.test(pw)) {
		alert("비밀번호는 문자, 숫자의 조합으로 8자리 이상, 20자리 이하로 입력해주세요.");
		return false;
	}

	return true;
}

// ********************************************************
// 올바른 암호인지 체크
// ********************************************************

function fncv_ValidPassword(pw, pwConfirm) {

	if ((IsSimplePassword1(pw) == false) || (IsSimplePassword2(pw) == false)) {
		alert("패스워드가 너무 단순합니다");
		return false;
	}

	if ((IsSimplePassword3(pw) == false) || (IsSimplePassword4(pw) == false)) {
		alert("패스워드가 너무 단순합니다");
		return false;
	}

	if (IsSimplePassword5(pw) == false) {
		alert("패스워드가 너무 단순합니다");
		return false;
	}

	if (isValidFormPassword(pw) == false) {
		return false;
	}

	if (pw != pwConfirm) {
		alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		return false;
	}

	return true;
}

// ********************************************************
// 패스워드 : 간단한 암호 체크 (반복형 : aaaa)
// ********************************************************
function IsSimplePassword1(src) {
	var i, nRepeat = 0, temp = -1;

	for (i = 0; i < src.length; i++) {
		if (src.charCodeAt(i) == temp)
			nRepeat++;
		else {
			nRepeat = 0;
			temp = src.charCodeAt(i);
		}
		if (nRepeat >= 3)
			return false;
	}

	return true;
}

// ********************************************************
// 패스워드 : 간단한 암호체크 (단순증가형 : 12345)
// ********************************************************
function IsSimplePassword2(src) {
	var i, nInc = 0, temp = -1;

	for (i = 0; i < src.length; i++) {
		if (i == 0)
			nInc = 1;
		else if (src.charCodeAt(i) == (temp + 1))
			nInc++;
		else
			nInc = 1;

		temp = src.charCodeAt(i);

		if (nInc >= 3)
			return false;
	}

	return true;
}

// ********************************************************
// 패스워드 : 간단한 암호체크 (단순증가형 : 54321)
// ********************************************************
function IsSimplePassword3(src) {
	var i, nInc = 0, temp = -1;

	for (i = 0; i < src.length; i++) {
		if (i == 0)
			nInc = 1;
		else if (src.charCodeAt(i) == (temp - 1))
			nInc++;
		else
			nInc = 1;

		temp = src.charCodeAt(i);

		if (nInc >= 3)
			return false;
	}

	return true;
}

// ********************************************************
// 패스워드 : 간단한 암호체크 (두글자 반복 : 121212)
// ********************************************************
function IsSimplePassword4(src) {
	var str1, str2, str3;

	str1 = src.substring(0, 2);
	str2 = src.substring(2, 4);
	str3 = src.substring(4, 6);

	if ((str1 == str2) || (str1 == str3))
		return false;

	return true;
}

// ********************************************************
// 패스워드 : 간단한 암호체크 (세글자 반복 : 123123)
// ********************************************************
function IsSimplePassword5(src) {
	var str1, str2;

	str1 = src.substring(0, 3);
	str2 = src.substring(3, 6);

	if (str1 == str2)
		return false;

	return true;
}
