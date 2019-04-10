/**
 * @author 송원진
 * @since 2019.01.06
 * <pre> 대시보드 설정화면에서 대시보드 뷰영역</pre>
 * */

SETTING.createNameSpace("SETTING.view.dashboard");

SETTING.view.dashboard = (function() {
    var dashboard = function() {
        this.model = null;
        this.controller = null;
        this.svcMenuEl = document.querySelectorAll(".gnbArea .selectbox .dropdown dd a"); // 좌측 대메뉴
        this.dashEl = document.querySelectorAll(".header .gnbArea .menu")[0]; // 대시보드 그려질 위치
        this.btnDashAdd = document.querySelector(".btnDashboardPlus"); // 대시보드추가 버튼
        this.addDashEl = document.querySelectorAll(".header .gnbArea .menu")[1];
        this.btnDashEdit = document.querySelector("#dashEditForm"); // 대시보드추가 버튼을 누를경우 나타나는 신규보드추가 영역
        this.btnDashSave = document.querySelector("#dashEditForm").lastElementChild; // 완료  버튼
        this.btnFinalSave = document.querySelector(".btnDashboardSave"); // 최종저장버튼
    };

    dashboard.prototype.init = function() {
        var that = this;
        // 대메뉴 선택 이벤트 ui.js 기능 일부 공유
        for (var index = 0; index < this.svcMenuEl.length; index++) {
            this.svcMenuEl[index].addEventListener('click', function() {
                var code = this.dataset.code;
                that.model.setSvcMenuid(code);
                that.controller.getDbDashBoard();
                that.controller.setSvcMenuId(code); // 옵져버 패턴변경시 사용됨
                that.controller.searchAbleWidget('', 1); // 사용가능한 위젯 목록갱신
                that.btnDashEdit.style.display = "none";
            });
        }

        // 최종저장 버튼
        this.btnFinalSave.addEventListener('click', function() {
            that.controller.save();
        }, false);

        // 대시보드 추가 버튼
        this.btnDashAdd.addEventListener('click', function() {
            // 대시보드 수 제한 확인
            var limitDash = that.controller.getDashBoardLimitCount();
            var curDash = $(".header .gnbArea .menu > li ").length - 1; // 대시보드추가창 빼기
            console.log(limitDash);
            if (limitDash <= curDash) {
                that.controller.showOneRowInfoModal("생성가능한 대시보드 갯수는 " + limitDash + "개입니다", "dsSettingType");
                return;
            }

            that.btnDashEdit.style.display = "block";
            that.dashOptionHide();
            that.dashNameEditClose();
        }, false);

        // 신규저장버튼
        this.btnDashSave.addEventListener('click', function() {
            that.btnDashEdit.style.display = "none";
            that.dashOptionHide();
            that.dashNameEditClose();
            var dashName = this.previousElementSibling.value;
            that.model.createDashBoard(dashName);
        }, false);
    }


    // 모델지정
    dashboard.prototype.setModel = function(model) {
        this.model = model;
    }

    // 모델지정
    dashboard.prototype.setController = function(controller) {
        this.controller = controller;
    }


    // 대시보드 메뉴 그리기
    dashboard.prototype.drawDashBoard = function() {

        var html = this.dashHtml(this.model.getDrawBoardList(), this.model.getSelectedId());
        this.dashEl.innerHTML = html;
        this.btnDashEdit.firstElementChild.value = "";
        this.dashBoardEventBind();

    }

    // 대시보드 이벤트등록
    dashboard.prototype.dashBoardEventBind = function() {
        var dalshel = this.dashEl.children;
        var optionEl = this.dashEl.querySelectorAll('.header .gnbArea .menu > li');
        for (var index = 0; index < dalshel.length; index++) {
            var iel = dalshel[index].querySelectorAll('a');
            iel[0].addEventListener('click', this.dashSelect.bind(this, iel[0]), true); // 대시보드선택
            iel[1].addEventListener('click', this.dashOption.bind(this, iel[1]), true); // 옵션 ... 
            iel[2].addEventListener('click', this.dashNameEdit.bind(this, iel[2]), true); // 이름벼경
            iel[3].addEventListener('click', this.dashDelete.bind(this, iel[3]), true); // 삭제
            iel[4].addEventListener('click', this.dashNameUpdate.bind(this, iel[4]), true); // 이름변경의 완료버튼
        }
    }

    // 대시보드메뉴 선택 이벤트
    dashboard.prototype.dashSelect = function(el) {
        // 대시보드 이동전에 필수 위젯 검사
        var id = el.dataset.id;
        this.model.setSelectedId(id);
        this.drawDashBoard(); // 대시보드 선택상태로 다시그리기
        this.controller.setupWidget(id); // 대시보드 선택시 위젯목록을 그린다.
    }

    // 대시보드메뉴 옆 삭제 수정 표시 ... 마크선택
    dashboard.prototype.dashOption = function(el) {
        this.dashOptionHide();

        var elDisplay = el.nextElementSibling.style.display;

        // 선택한 요소 표시
        if (elDisplay === "block") el.nextElementSibling.style.display = "none";
        else el.nextElementSibling.style.display = "block";

    }
    dashboard.prototype.dashOptionHide = function() {
        var nodeList = document.querySelectorAll(".header .gnbArea .menu .boardMenu_setting");
        for (var index = 0; index < nodeList.length; index++) {
            var element = nodeList[index].style.display = "none";
        }
    }

    // 전체 이름 변경 수정창 닫기
    dashboard.prototype.dashNameEditClose = function() {
        var el = this.dashEl.children;

        for (var index = 0; index < el.length; index++) {
            var ael = el[index].querySelectorAll("a");
            ael[0].style.display = "inline-block";
            ael[1].style.display = "inline-block";
            ael[4].style.display = "none";
        }

        el = this.dashEl.querySelectorAll("input");
        for (var index = 0; index < el.length; index++) {
            el[index].style.display = "none";

        }
    }

    // 대시보드 이름변경 이벤트 - 대시보드 이름변경창 보이기
    dashboard.prototype.dashNameEdit = function(el) {
        this.dashOptionHide(); // 옵션닫기
        this.dashNameEditClose(); // 대시보드이름변경창닫기
        this.btnDashEdit.style.display = "none"; // 대시보드추가창닫기
        // 선택한 노드에 해당하는 뷰잉 부분
        var aEl = el.parentElement.parentElement.parentElement.querySelectorAll("a");
        aEl[0].style.display = "none";
        aEl[1].style.display = "none";
        aEl[4].style.display = "inline-block";
        var inputEl = el.parentElement.parentElement.parentElement.querySelector("input");
        inputEl.style.display = "block";
    }


    // 대시보드 삭제 이벤트
    dashboard.prototype.dashDelete = function(el) {

        var className = el.parentElement.parentElement.parentElement.querySelectorAll("a")[0].className;
        var dashId = el.parentElement.parentElement.parentElement.querySelectorAll("a")[0].dataset.id;
        // 대시보드관련 정보 정리
        this.controller.deleteDashBoardModel(dashId);
        if ("active" == className) $('.grid-stack').data('gridstack').removeAll();
    }

    // 대시보드 이름 수정이벤트
    dashboard.prototype.dashNameUpdate = function(el) {
        var dashId = el.previousElementSibling.dataset.id;
        var dashName = el.previousElementSibling.value;
        this.controller.updateDashBoardModel(dashId, dashName);

    }

    // 대시보드 html 생성
    // data 대시보드 정보 svcMenuId 대메뉴정보 selected  선택된 정보
    dashboard.prototype.dashHtml = function(data, selected) {
        return data.reduce(
            function(html, item, index) {
            	html += '<li>';
            	if (item.dashId == selected) html += '<a href="#" class = "active" data-id=' + item.dashId + '>' + item.dashName + '</a>';
            	else html += '<a href="#" data-id=' + item.dashId + '>' + item.dashName + '</a>';
            	html += '<a href="#" class="xi-ellipsis-h drop-bt"><span>설정</span></a>';
            	html += '<ul class="boardMenu_setting drop-ct">';
            	html += '<li><a href="#" >이름변경</a></li>';
            	html += '<li><a href="#" >삭제</a></li>';
            	html += '</ul>';
            	html += '<input type="text" style="display:none" class = "edit" data-id=' + item.dashId + ' value= ' + item.dashName + '> ';
            	html += '<a href="#" style="display:none" class="addSuc">완료</a>'
            	html += '</li>';
                return html;
            }, '') + ""
    }

    dashboard.prototype.toString = function() {
        return "SETTING.view.dashboard";
    }

    return dashboard;
}());