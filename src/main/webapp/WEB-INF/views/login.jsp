<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<title>TrendUp4</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<head>	
	<link rel="shortcut icon" href="/resources/images/favicon.ico">
	<link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="/resources/css/base.css">
	<link rel="stylesheet" type="text/css" href="/resources/css/style.css">
	<link rel="stylesheet" href="/resources/css/xeicon.min.css">
	<link rel="stylesheet" href="/resources/css/gridstack.css">
	<script src="/resources/plugins/jQuery/jquery-1.12.4.min.js"></script>
	<script src="/resources/plugins/jQuery/jquery-ui.min.js"></script>
	
	<script type="text/javascript" src='/resources/plugins/scrollbar/jquery.scrollbar.js'></script>
	<script type="text/javascript" src='/resources/plugins/modal/jquery.modal.min.js'></script>
	<script type="text/javascript" src="/resources/plugins/gridstack/lodash.min.js"></script>
	<script type="text/javascript" src='/resources/plugins/gridstack/gridstack.min.js'></script>
	<script type="text/javascript" src='/resources/plugins/gridstack/gridstack.jQueryUI.min.js'></script>

<script src="/resources/plugins/jQuery/jquery.bxslider.js"></script>
<script src="/resources/js/user/login.js" type="text/javascript"></script>
<script type="text/javascript">
	$(function(){
		$('#bxSlider_login').bxSlider({
			auto: true,
			autoControls: false,
			controls: false,
			pager: true,
			pause: 5000,
			minSlides: 1,
			maxSlides: 1,
			moveSlides: 1
		});
	});
</script>
</head>
<body id="login">
<div class="wrap">
	<div class="wrapIn">
		<!-- 슬라이딩배경 -->
		<div class="loginSlider">
			<ul id="bxSlider_login">
				<li class="slide01">
					<p><span>사용하고 싶은 화면을</span> <strong> 자유롭게 만든다.</strong></p>
					<a href="#">Ready to experience <strong>TrendUp?</strong></a>
				</li>
				<li class="slide02">
					<p><span>남들과 다른 화면을</span> <strong>꾸밀수 있다.</strong></p>
					<a href="#">Ready to experience <strong>TrendUp?</strong></a>
				</li>
			</ul>
		</div>
		<!-- //슬라이딩배경 -->
		<!-- 로그인박스 -->
		<form name="loginform" method="POST" >
		<div class="loginBox">
			<h1 class="logo"><img src="/resources/images/common/logo_login.png" width="100%" alt="TrendUp" /></h1>
			<input type="text" id="userId" name="userId" value='' placeholder="아이디를 입력 해주세요" class="inputId" />
			<input type="password" id="password" name="password"  placeholder="비밀번호를 입력 해주세요" class="inputPw" />
			<a href="#" class="btnLogin">로그인</a>
			<p class="loginUtilMenu"><a href="/user/findId">아이디 찾기</a> 또는 <a href="/user/modifyPW">비밀번호 변경하기</a></p>
			<p class="txt">Making a drag-and-drop, multi-column dashboard<a href="http://www.naver.com" target="_blank">XXXXXXXX</a></p>
		</div>
		</form>
		<!-- //로그인박스 -->		
	</div><!-- // wrapIn -->
</div> <!-- // wrap -->


<!-- footer  -->
<div class="footer">
	<div class="footerIn">
		<div class="footerTop">
			<div class="rollingNotice">
				<ul>
					<li><span>공지</span><a href="#">DASHBOARD 안내</a></li>
				</ul>
				<a href="#" class="up xi-caret-up-min"><span>Up</span></a>
				<a href="#" class="down xi-caret-down-min"><span>Down</span></a>
			</div>
			<ul class="footMenu">
				<li><a href="#">개인정보 처리방침</a></li>
				<li><a href="#">서비스 이용약관</a></li>
				<li><a href="#">문의하기</a></li>
				<li><a href="#">고객지원</a></li>
			</ul>
		</div>
		<div class="footerBot">
			<p class="addr">서울시 XX구 XXX로1길 99, XXXX호 (XX동XXX가, XXXXXXX타워X차)</p>
			<ul class="contact">
				<li>대표전화. 02-1234-5678</li>
				<li>팩스. 02-1234-9876</li>
				<li>이메일. <a href="mailto:help@xxx.co.kr">help@xxx.co.kr</a></li>
			</ul>

			<ul class="sns">
				<li><a href="#" class="home" target="_blank" title="새창">Home</a></li>
				<li><a href="#" class="tstroy" target="_blank" title="새창">blog</a></li>
				<li><a href="#" class="facebook" target="_blank" title="새창">faceBook</a></li>
				<li><a href="#" class="twitter" target="_blank" title="새창">twitter</a></li>
				<li><a href="#" class="instagram" target="_blank" title="새창">instagram</a></li>
			</ul>

			<p class="copy">Copyright 2019.<a href="#" target="_blank">SWONJINY</a>Corp. All rights reserved.</p>
		</div>
		
	</div>
</div>
<!-- //footer -->

</body>
</html>