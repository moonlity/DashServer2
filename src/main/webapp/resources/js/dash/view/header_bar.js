/**
 * @author 송원진
 * @since 2019.01.03
 * <pre> 대시보드 설정화면에서 대시보드 메뉴 선택 생성 삭제를 시행하는 뷰 </pre>
 * */

SETTING.createNameSpace("SETTING.view.headerBar");

SETTING.view.headerBar = (function() {
    var headerBar = function() {
        this.controller = null;
        this.model = null;
        this.userId = document.querySelectorAll(".header .userInfo span")[1];
        this.dashEl = document.querySelectorAll(".header .gnbArea .menu")[0]; // 대시보드 그려질 위치
        this.btnDashAdd = document.querySelector(".btnDashboardPlus"); // 대시보드추가 버튼
        this.addDashEl = document.querySelectorAll(".header .gnbArea .menu")[1];
        this.btnDashEdit = document.querySelector("#dashEditForm"); // 대시보드추가 버튼을 누를경우 나타나는 신규보드추가 영역
        this.btnDashSave = document.querySelector(".addSuc"); // 완료  버튼

        this.init();
    };
    // 컨트롤러 지정
    headerBar.prototype.setController = function(controller) {
        this.controller = controller;
    };
    // 모델 지정
    headerBar.prototype.setModel = function(model) {
        this.model = model;
    };

    //초기 이미 만들어진 화면영역에 대한 이벤트 지정
    headerBar.prototype.init = function() {
        var that = this;
        this.btnDashAdd.addEventListener('click', function() {
            that.btnDashEdit.style.display = "block";
            that.dashOptionHide();
            that.dashNameEditClose();
        }, false);

        this.btnDashSave.addEventListener('click', function() {
            var dashName = this.parentElement.firstElementChild.value;
            if (!dashName) {
                alert('대시보드이름을 입력하세요')
                return;
            }
            that.dashOptionHide();
            that.dashNameEditClose();
            that.btnDashEdit.style.display = "none";
            // 대시보드 목록에 수정후 다시그린다.
            this.controller.upateDashBoardInfo("C", dashName, dashName);
        }, false)

        this.btnDashEdit.addEventListener('keyup', function(e) {
            var key = e.which || e.keyCode;
            if (key === 27) {
                that.btnDashEdit.style.display = "none";
                that.btnDashEdit.firstElementChild.value = "";
                return;
            }

            if (key !== 13) return;
            var dashName = this.firstElementChild.value;
            if (!dashName) {
                alert('대시보드이름을 입력하세요')
                return;
            }

            that.dashOptionHide();
            that.dashNameEditClose();
            that.btnDashEdit.style.display = "none";

        }, false)
    }


    // 대시보드 메뉴 생성
    // index 선택 상태로 만들 위치
    headerBar.prototype.createDashMenu = function(index) {
        if (!index) index = 0;
        var html = this.getHtml(this.model.dashListInfo, index);
        this.dashEl.innerHTML = html;
        this.btnDashEdit.firstElementChild.value = "";
        this.dashBoardEventBind();
    };

    // 생성된 영역 이벤트 등록
    headerBar.prototype.dashBoardEventBind = function() {
        var that = this;
        var dalshel = this.dashEl.children;
        var optionEl = this.dashEl.querySelectorAll('.header .gnbArea .menu > li');
        for (var index = 0; index < dalshel.length; index++) {
            var iel = dalshel[index].querySelectorAll('a');
            iel[0].addEventListener('click', that.dashSelect.bind(that, iel[0]), true);
            iel[1].addEventListener('click', that.dashOption.bind(that, iel[1]), true);
            iel[2].addEventListener('click', that.dashNameEdit.bind(that, iel[2]), true);
            iel[3].addEventListener('click', that.dashDelete.bind(that, iel[3]), true);
            iel[4].addEventListener('click', that.dashNameUpdate.bind(that, iel[4]), true);
        }



        // Array.from(this.dashEl.querySelectorAll('.header .gnbArea .menu > li')).forEach(
        //     function(btn) {
        //         var iel = btn.querySelectorAll('a');
        //         iel[0].addEventListener('click', that.dashSelect.bind(that, iel[0]), true);
        //     }
        // );
    }

    // 대시보드 이름변경 이벤트
    headerBar.prototype.dashNameEdit = function(el) {
        this.dashOptionHide();
        this.dashNameEditClose();
        this.btnDashEdit.style.display = "none"; // 대시보드추가영역
        // 선택한 노드에 해당하는 뷰잉 부분
        var aEl = el.parentElement.parentElement.parentElement.querySelectorAll("a");
        aEl[0].style.display = "none";
        aEl[1].style.display = "none";
        aEl[4].style.display = "inline-block";
        var inputEl = el.parentElement.parentElement.parentElement.querySelector("input");
        inputEl.style.display = "block";
        // this.controller.upateDashBoardInfo("U", dashName, aEl.[0].dataset.id);
    }

    // 대시보드 삭제 이벤트
    headerBar.prototype.dashDelete = function(el) {
        this.dashOptionHide();
        this.dashNameEditClose();
        this.btnDashEdit.style.display = "none"; // 대시보드추가영역
        var dashId = el.parentElement.parentElement.parentElement.querySelectorAll("a")[0].dataset.id;
        //this.controller.dashBoardDelete(dashId);
        this.controller.upateDashBoardInfo("D", null, dashId);
    }

    // 대시보드 이름 수정이벤트
    headerBar.prototype.dashNameUpdate = function(el) {
        this.dashOptionHide();
        this.dashNameEditClose();
        this.btnDashEdit.style.display = "none"; // 대시보드추가영역
        var dashId = el.previousElementSibling.dataset.id;
        var dashName = el.previousElementSibling.value;
        this.controller.dashBoardUpdate(dashName, dashId);
    }

    // 전체 이름 변경 수정창 닫기
    headerBar.prototype.dashNameEditClose = function() {
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

    // 대시보드메뉴 선택 이벤트
    headerBar.prototype.dashSelect = function(el) {
        // 선택 클래스 제거
        this.dashEl.querySelector(".header .gnbArea .menu > li a.active").classList.remove(['active']);

        // 현재 선택한 요소 선택표시
        el.classList.add(['active']);
    }

    headerBar.prototype.dashOptionHide = function() {
        var nodeList = document.querySelectorAll(".header .gnbArea .menu .boardMenu_setting");
        for (var index = 0; index < nodeList.length; index++) {
            var element = nodeList[index].style.display = "none";
        }
    }

    // 대시보드메뉴 옆 삭제 수정 표시 ... 마크선택
    headerBar.prototype.dashOption = function(el) {
        this.dashOptionHide();

        var elDisplay = el.nextElementSibling.style.display;

        // 선택한 요소 표시
        if (elDisplay === "block") el.nextElementSibling.style.display = "none";
        else el.nextElementSibling.style.display = "block";

    }

    headerBar.prototype.getHtml = function(data, sindex) {
        return data.reduce(
            function(html, item, index) {
                html += '<li>';

                if (index === sindex) html += '<a href="#" class = "active" onclick="#" data-id=' + item.id + '">' + item.name + '</a>';
                else html += '<a href="#" onclick="#" data-id=' + item.id + '>' + item.name + '</a>';
                html += '<a href="#" class="xi-ellipsis-h drop-bt"><span>설정</span></a>';
                html += '<ul class="boardMenu_setting drop-ct">';
                html += '<li><a href="#" onclick="return false;">이름변경</a></li>';
                html += '<li><a href="#" onclick="return false;">삭제</a></li>';
                html += '</ul>';
                html += '<input type="text" style="display:none" class = "edit" data-id=' + item.id + ' value= ' + item.name + '> ';
                html += '<a href="#" style="display:none" class="addSuc">완료</a>'
                html += '</li>';
                return html;
            }, '') + ""
    }

    headerBar.prototype.dashBoardMake = function(data) {
        console.log(data)
            // 모델에 저장된 목록정보를 이용해서 대시보드 목록을 그린다.
    }

    // 헤더바의 이벤트 지정
    headerBar.prototype.dashBindEvent = function() {

    };
    // 대시보드 추가 버튼 이벤트
    headerBar.prototype.addEvent = function() {};
    // 대시보드 저장 버튼 이벤트 -- 이건 자동 저장으로 변경함
    headerBar.prototype.saveEvent = function() {};

    headerBar.prototype.toString = function() {
        return "headerBar";
    }

    return headerBar;
}());