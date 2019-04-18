<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	 
<title>SWONJINY</title>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta http-equiv="Cache-Control" content="no-cache"/>
<meta http-equiv="Expires" content="0"/>
<meta http-equiv="Pragma" content="no-cache"/>
<meta content="dashboard 형 화면구성" name="description" />
<meta content="dashboard,gridstack,zingchart" name="keywords" /><!--검색엔진에 검색되도록 조치함  -->
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

<!-- 메뉴 ui 관련 꼭 다시 구성하고 제거해야하는 스크립트!!!!!!!  -->
<script src="/resources/js/common/ui.js"></script>
<!--// 메뉴 ui 관련  -->
<script src="/resources/js/common/common.js"></script>
<!-- 위젯에서 공통으로 사용되는 스크립트 -->

<script type="text/javascript" src="/resources/js/common/gridStack.js"></script>


<script>
	window.onload = function() {   
		var main = new SETTING.app.viewMain(); 
    }
</script>
</head>

<body id="wide"><!-- [D] 대시보드, 위젯페이지만 #wide 추가 -->
<div class="wrap">		 
<!-- header -->
	<div class="header">
		<div class="headerIn">
			<div class="variableArea">
				<h1 class="logo"><a href="/" onclick="">SWONJINY</a></h1>
				<ul class="util">
					<c:set var="icon" value="ico03"/>
					<c:choose>
						<c:when test="${empty loginUser}">
							<li class="drop-ar">
								<a href="#" onclick="menuUtil.goRootMenu('/trend/main' ,'C000')  ;return false;" class="btnUser drop-bt"><i class="xi-user-plus"></i><strong>로그인해주세요.</strong></a>
							</li>
						</c:when>
						<c:otherwise>
							<li class="drop-ar">
								<a href="#" class="btnUser drop-bt"><i class="xi-user"></i>안녕하세요. <strong>${loginUser.userName}(${loginUser.userId})</strong> 님<i class="xi-angle-down-min"></i></a>
								<div class="userInfoLayer drop-ct">
									<div class="userInfo">
										<span class="img"><img src="/resources/images/ci/${loginUser.domainId}.png" onerror="this.src='/resources/images/ci/basic.png'"/></span>
										<strong>${loginUser.userName}</strong>
										<span>${loginUser.userId}</span>
									</div>
									<ul>
										<li><a href="/mypage/userInfo">서비스 정보</a></li>
										<!-- <li><a href="/mypage/reportList">보고서</a></li> -->
										<li><a href="/mypage/mypageScrap">스크랩 정보</a></li>
										<li><a href="/mypage/inquiryList">문의내역</a></li>
									</ul>
									<c:choose>
										<c:when test="${loginUser.userLevelCd eq '0001'}">
										<a href="/admin/domainManagement">설정</a>
										</c:when>
										
										<c:when test="${loginUser.userLevelCd eq '0002'}">
										<a href="/admin/userManagement">설정</a>
										</c:when>
										
										<c:when test="${loginUser.userLevelCd eq '0005'}">
										<a href="/rule/searchQuery">설정</a>
										</c:when>
									</c:choose>
									<a href="/user/logout">로그아웃</a>
								</div>
							</li>
							<li class="drop-ar">
								<a href="#" class="btnPush drop-bt">
									<i class="xi-bell-o"></i>
									<span class="count on"><!-- 알림없을경우 클래스 on 제거 -->
									${fn:length(notifyList)}
									</span>
								</a>
								<div class="noticeLayer drop-ct">
									<c:if test="${empty notifyList}">
										<div class="noticeNo"><i class="xi-bell-off"></i>새로운 알림이 없습니다</div>
									</c:if>
									<div class="noticeList">
										<ul class="scrollbar-inner">
											<c:forEach var="item" items="${notifyList}">
												<li><!-- <li class="read"> 만약 읽음도 체크 어쩌구 한다면 이걸로 지금은 없다 -->
													<i class="xi-bell"></i>
													<a href="/mypage/noticeDetail?id=${item.notifyId}">${item.title}</a>
													<span class="date">${item.postingTime}</span>
												</li>
											</c:forEach>
										</ul>
									</div>
								</div>
							</li>
						</c:otherwise>
					</c:choose>	
					<c:if test="${!empty loginUser}">
					<li class="drop-ar">
						<a href="/mypage/noticeList" class="btnHelp"><i class="xi-help-o"></i></a>
						<div class="helpLayer drop-ct">고객지원</div>
					</li>
					</c:if>
				</ul>	
			</div>
		</div>
	</div>
	<!-- //header -->
	<!-- search 검색설정영역 -->
	<div class="searchArea">
		<div class="searchType">
		<div class="variableArea">

			<div class="selectbox"><!-- 대메뉴부분 -->
				<dl class="dropdown cover-ar">
					<dt>
					<c:forEach var="item" items="${rootList}">
						<c:if test="${item.code eq loginUser.menuId}">
							<a href="#" class="drop-bt">
								<span><em class="${item.code}"></em>${item.name}</span>
								<i class="xi-caret-down-min"></i>
							</a>
						</c:if>
					</c:forEach>
					</dt>
					
					<dd class="drop-ct">
						<ul class="dropdown2">
						<c:forEach var="item" items="${rootList}">
	
						<li><a href="#" onclick="menuUtil.goRootMenu('${item.url}' ,'${item.code}') ;return false;"><em class="${item.code}"></em>${item.name}<i class="xi-angle-down-min"></i></a></li>
						</c:forEach>							
						</ul>
					</dd>
				</dl>
			</div><!-- // 대메뉴부분 -->
			<dl class="dropdown category-ar menu-bar">
				<dt><i class="xi-angle-right"></i></dt>
			</dl>
			
			<dl class="dropdown category-ar"><!-- 대시보드메뉴 -->
				<dt>
					<c:forEach var="item" items="${dashboardUser}">
						<c:if test="${item.dashboardId==loginUser.dashBoardId}">
							<a href="#" class="drop-bt"><span>${item.dashboardNm}</span><i class="xi-caret-down-min"></i></a>
						</c:if>
					</c:forEach>			
				</dt>
				<dd class="drop-ct" style="display:none;">
					<ul class="dropdown2">
					<c:forEach var="item" items="${dashboardUser}">
						<c:if test="${item.svcMenuId eq loginUser.menuId}">
						<li><a href="#"  data-id = "${item.dashboardId}"  onclick="menuUtil.goDashBoard(${item.dashboardId});return false;" 
							<c:if test="${item.dashboardId eq loginUser.dashBoardId}">
								class = "on"
							</c:if>	
							>${item.dashboardNm}</a></li><!-- 현재 선택메뉴 클래스 on 추가 -->							
						</c:if>		
					</c:forEach>
					</ul>
				</dd>
				
			</dl><!--  //대시보드메뉴 -->			
			
			<div class="period drop-ar">
				<strong class="tit"><i class="xi-calendar"></i>기간</strong>
				<span class="term">2주</span>
				<a href="#" class="date drop-bt"><span class="fromArea">2019.01.01</span> ~ <span class="toArea">2019.12.31</span><i class="xi-caret-down-min"></i></a>
				<div class="periodLayer drop-ct">
					<p>분석 기간을 선택해주세요</p>
					<ul id = "perioButtonT" data-service_term = "${loginUser.serviceTerm}" ><!-- perioButtonTemplate -->
						<!-- <li><input type="radio" id="period01" name="periodCheck" value="1w"><label for="period01" class="all">1주</label></li>
						<li><input type="radio" id="period02" name="periodCheck" value="2w" checked="checked"><label for="period02" class="all">2주</label></li>
						<li><input type="radio" id="period03" name="periodCheck" value="3w"><label for="period03" class="all">3주</label></li>
						<li><input type="radio" id="period04" name="periodCheck" value="1m"><label for="period04" class="all">1개월</label></li>
						<li><input type="radio" id="period05" name="periodCheck" value="6m"><label for="period05" class="all">6개월</label></li>
						<li><input type="radio" id="period06" name="periodCheck" value="1y"><label for="period06" class="all">1년</label></li>
						<li><input type="radio" id="period07" name="periodCheck" value="2y"><label for="period07" class="all">2년</label></li> -->
					</ul>
					<div class="calendarArea">
						<div class="area">
							<span class="txt">시작일</span>
							<div id="from" style="display:inline-block"></div>
						</div>
						<div class="area">
							<span class="txt">종료일</span>
							<div id="to" style="display:inline-block"></div>
						</div>
					</div>
					<div class="btnArea">
						<a href="#" class="btnCancel">닫기</a>
						<a href="#" class="btnApply">적용하기</a>
					</div>
					<a href="#" class="btnClose xi-close">닫기</a>
				</div>
			</div>

			<div class="media">
				<strong class="tit"><i class="xi-desktop"></i>채널</strong>
				<div class="channel">
					<dl class="dropdown channel-ar">
						<dt><a href="#" class="drop-bt"  data-value='A'><span>전체<i class="xi-caret-down-min"></i></span></a></dt>
						<dd style="display:none;" class="drop-ct">
							<ul>
								<li><a href="#" class="on"  data-value='A'>전체<i class="xi-caret-down-min"></i></a></li>
								<li><a href="#" data-value='E'>기업 발신<i class="xi-caret-down-min"></i></a></li>
								<li><a href="#" data-value='C'>소비자 발신<i class="xi-caret-down-min"></i></a></li>
								<li><a href="#" data-value='T'>Third Party<i class="xi-caret-down-min"></i></a></li><!-- 현재 선택명일 경우 클래스 추가 -->
							</ul>
						</dd>
					</dl>
				</div>
				<input type="checkbox" id="mediaAll" name="mediaType" value="M T F I B C"><label for="mediaAll" class="all" title="전체"><span>전체</span></label>
				<input type="checkbox" id="mediaMass" name="mediaType" value="M" checked = 'checked'><label for="mediaMass" class="mass" title="매스미디어"><i></i><span>매스미디어</span></label>
				<input type="checkbox" id="mediaTwitter" name="mediaType" value="T"><label for="mediaTwitter" class="twitter" title="트위터"><i></i><span>트위터</span></label>
				<input type="checkbox" id="mediaFace" name="mediaType" value="F"><label for="mediaFace" class="facebook" title="페이스북"><i></i><span>페이스북</span></label>
				<input type="checkbox" id="mediaInsta" name="mediaType" value="I"><label for="mediaInsta" class="instagram" title="인스타그램"><i></i><span>인스타그램</span></label>
				<input type="checkbox" id="mediaBlog" name="mediaType" value="R"><label for="mediaBlog" class="blog" title="블로그"><i></i><span>블로그</span></label>
				<input type="checkbox" id="mediaCommunity" name="mediaType" value="C"><label for="mediaCommunity" class="community" title="커뮤니티"><i></i><span>커뮤니티</span></label>
				<input type="checkbox" id="mediaEtc" checked="checked"><label for="mediaEtc" class="etc"><span>기타</span></label>
			</div>
			
			<a href="/setting" onclick="return false;" class="btnDashboard"><i></i>화면설정</a>
		</div>
	</div>
	<!-- // searchArea-->
	<!--  검색어부분 -->
	<!-- 대메뉴별 설정옵션선택  -->
	
	</div><!-- searchArea -->
	<!-- //심플 검색어부분 -->
	<div class="blankArea"></div>
	<!-- //search -->
	<div class="container">
		<div class="content">
			<div class="grid-stack view"></div>
		</div>
	</div><!-- //.container -->
</div><!-- //.wrap -->
<!-- 기본 알럿 팝업 -->
<div id="dsSettingType" style="display: none"></div>
<!-- footer  -->
<!--  추후 FOOTER 별도 파일로 분리한다.  -->
<div class="footer">
	<div class="footerIn">
		<div class="footerTop">
			<div class="rollingNotice">
				<ul>
				<!-- 공지사항 부분 개발후 변경할 영역  -->
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