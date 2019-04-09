<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	 
<title>TrendUp4</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta content="트렌드업" name="description" />
<meta content="trendup,trend,트렌드업,트렌드,트랜드,빅데이터,소셜,meaningscience,meaning,science" name="keywords" /><!-- 구글,네이버등 검색엔진에 검색되도록 조치함  -->
<link rel="shortcut icon" href="/resources/images/favicon.ico">
<link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="/resources/css/base.css">
<link rel="stylesheet" type="text/css" href="/resources/css/style.css">

<!-- Trend Up Icons CSS-->
<link rel="stylesheet" href="/resources/css/xeicon.min.css">
<!--// Trend Up Icons CSS-->

<!-- jQuery UI 1.12.4 -->
<script src="/resources/plugins/jQuery/jquery-1.12.4.min.js"></script>
<script src="/resources/plugins/jQuery/jquery-ui.min.js"></script>
<!--// jQuery UI 1.12.4 -->

<!-- GridStack.js -->
<link rel="stylesheet" href="/resources/css/gridstack.css">
<script type="text/javascript" src="/resources/plugins/gridstack/lodash.min.js"></script>
<script type="text/javascript" src='/resources/plugins/gridstack/gridstack.min.js'></script>
<script type="text/javascript" src='/resources/plugins/gridstack/gridstack.jQueryUI.min.js'></script>
<!--// GridStack.js -->

<!-- scroll bar -->
<script type="text/javascript" src='/resources/plugins/scrollbar/jquery.scrollbar.js'></script>

<!-- modal Popup -->
<script type="text/javascript" src='/resources/plugins/modal/jquery.modal.min.js'></script>

<!-- 메뉴 ui 관련  -->
<script src="/resources/js/common/ui.js"></script>
<!--// 메뉴 ui 관련  -->
<script src="/resources/js/common/common.js"></script>
<!-- 위젯에서 공통으로 사용되는 스크립트 -->

<script type="text/javascript" src="/resources/js/common/gridStack.js"></script>


<script type="text/javascript" src="/resources/js/dash/com/common.js"></script>
<script type="text/javascript" src="/resources/js/dash/com/api.js"></script>
<script type="text/javascript" src="/resources/js/dash/com/constants.js"></script>
<!-- <script type="text/javascript" src="/resources/js/dash/model/header_bar.js"></script>
<script type="text/javascript" src="/resources/js/dash/view/header_bar.js"></script> -->
<script type="text/javascript" src="/resources/js/dash/model/dashboard.js"></script>
<script type="text/javascript" src="/resources/js/dash/view/dashboard.js"></script>

<script type="text/javascript" src="/resources/js/dash/model/add_menu.js"></script>
<script type="text/javascript" src="/resources/js/dash/view/add_menu.js"></script>

<script type="text/javascript" src="/resources/js/dash/model/widget.js"></script>
<script type="text/javascript" src="/resources/js/dash/view/widget.js"></script>
<script type="text/javascript" src="/resources/js/dash/view/comview.js"></script>

<script type="text/javascript" src="/resources/js/dash/controller/setting_controller.js"></script>
<script type="text/javascript" src="/resources/js/dash/app/dash_main.js"></script>
<script type="text/javascript" src="/resources/js/dash/app/widgetInfo.js"></script>
<script>
	window.onload = function() {   
		var main = new SETTING.app.dashMain(); 
    }
</script>
</head>

<body id="wide"><!-- [D] 대시보드, 위젯페이지만 #wide 추가 -->
<div class="wrap">		 
<!-- header -->
	<div class="header">
		<div class="headerIn">
			<div class="variableArea">
				<h1 class="logo"><a href="#" onclick="rootManuMove();return false;">Trend Up</a></h1>
				<ul class="util">
					<li class="drop-ar">
						<a href="#" class="btnUser drop-bt"><i class="xi-profile"></i>안녕하세요. <strong>${userName}(${userId})</strong> 님<i class="xi-angle-down-min"></i></a>
						<div class="userInfoLayer drop-ct">
							<div class="userInfo">
								<span class="img"><img src="/resources/images/ci/235.png" onerror="this.src='/resources/images/ci/basic.png'"/></span>
								<strong>${userId}</strong>
								<span>${userId}</span>
							</div>
							<ul>
								<li><a href="#">서비스 정보</a></li>
								<li><a href="#">스크랩 정보</a></li>
								<li><a href="#">문의내역</a></li>
							</ul>
							<a href="#">설정</a>
							<a href="#">로그아웃</a>
						</div>
					</li>
					<li class="drop-ar">
						<a href="#" class="btnPush drop-bt"><i class="xi-bell-o"></i><span class="count on"><!-- 알림없을경우 클래스 on 제거 -->2</span></a>
						<div class="noticeLayer drop-ct">
							<div class="noticeList">
								<ul class="scrollbar-inner">
										<li><!-- <li class="read"> 읽음인경우 -->
											<i class="xi-bell"></i>
											<a href="#">[긴급공지]안내사항1</a>
											<span class="date">2019.12.25 15:00</span>
										</li>
									
										<li><!-- <li class="read"> 읽음인경우 -->
											<i class="xi-bell"></i>
											<a href="#">[공지]서비스 정기점검 안내공지</a>
											<span class="date">2019.12.11 15:50</span>
										</li>
								</ul>
							</div>
						</div>
					</li>
					
					<li class="drop-ar">
						<a href="#" class="btnHelp"><i class="xi-help-o"></i></a>
						<div class="helpLayer drop-ct">고객지원</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="variableArea">
			<div class="gnbArea">
				<div class="selectbox">
					<dl class="dropdown cover-ar">
						<dt>
							<a href="#" class="drop-bt"><span data-code="C000"><em class="C000"></em>대시보드<i class="xi-angle-down-min"></i></span></a>
						</dt>
						<dd class="drop-ct">
							<ul class="dropdown2">
									<li><a href="#" data-code="C000" ><em class="C000"></em>대시보드<i class="xi-angle-down-min"></i></a></li>
<!-- 									<li><a href="#"  data-code="G000" ><em class="G000"></em>대시보드1<i class="xi-angle-down-min"></i></a></li>
									<li><a href="#"  data-code="D000" ><em class="D000"></em>대시보드2<i class="xi-angle-down-min"></i></a></li>
									<li><a href="#"  data-code="P000" ><em class="P000"></em>대시보드3<i class="xi-angle-down-min"></i></a></li> -->
							</ul>
						</dd>
					</dl>
				</div>

				<ul class="menu">
					<li class="dash1-ar">
						<a href="#" 	class="active"  data-id=1>1번대시보드</a>
						<a href="" class="xi-ellipsis-h drop-bt"><span>설정</span></a>
						<ul class="boardMenu_setting drop-ct">
							<li><a href="#" onclick="return false;">이름변경</a></li>
							<li><a href="#" onclick="return false;">삭제</a></li>
						</ul>
					</li>
					<li class="dash1-ar">
						<a href="#"	data-id=2>2번대시보드</a>
						<a href="" class="xi-ellipsis-h drop-bt"><span>설정</span></a>
						<ul class="boardMenu_setting drop-ct">
							<li><a href="#" onclick="return false;">이름변경</a></li>
							<li><a href="#" onclick="return false;">삭제</a></li>
						</ul>
					</li>
					
					<li style="display: none" id="dashEditForm">
						<input type="text" placeholder="대시보드추가">
						<a href="#" class="addSuc">완료</a>
					</li>
				</ul>

				<a href="#" class="btnDashboardPlus"><i class="xi-plus-circle-o"></i>대시보드추가</a>
				<a href="#" class="btnDashboardSave">저장</a>
				<div id="dashSetModal" style="display: none"></div>
			</div>
		</div>
	</div>
	<!-- //header -->
	<div class="container">
		<div class="editTxt">
			<div class="variableArea">위젯을 추가하거나 삭제하고  순서를 변경할 수 있습니다.  각 위젯의 설정을 변경한 후 저장 해주세요.</div>
		</div>
		<div class="content">
			<!-- gridstack 생성영역 -->
			<div class="grid-stack"></div>
			<!-- //gridstack 생성영역 -->
			<!-- 위젯 추가 레이어 -->
			<div class="widgetAddLayer drop-ar non-ch"><!-- 클릭시 open 클래스 추가 -->
				<a href="#" class="drop-bt">위젯추가<i class="xi-drag-handle"></i><i class="xi-angle-up"></i><i class="xi-angle-down"></i></a>
				<div class="cont drop-ct">
					<div class="widgetSearch"><input type="text" placeholder="위젯명으로 검색하세요"><a href="#" class="xi-search"><span>검색</span></a></div>					
					<div class="sort"></div>
					<ul class="list">	</ul>
					<div class="paging small"></div>
				</div>
			</div>
			<!-- //위젯 추가 레이어 -->	
		</div><!-- //.content  -->
	</div><!-- //.container -->
</div><!-- //.wrap -->
		 
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
			<p class="copy">Copyright 2019.<a href="http://www.tapacross.co.kr" target="_blank">SWONJINY</a>Corp. All rights reserved.</p>
		</div>
	</div>
</div>
<!-- //footer -->
</body>
</html>

