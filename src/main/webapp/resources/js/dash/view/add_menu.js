/**
 * @author 송원진
 * @since 2019.02.21
 * <pre> 대시보드 사용가능 위젯목록 뷰/pre>
 * */

SETTING.createNameSpace("SETTING.view.addmenu");

SETTING.view.addmenu = (function() {
    var addmenu = function() {
        this.rootMenu = document.querySelector(".header .logo a"); // 최좌측상단 메뉴
        this.searchText = document.querySelector(".widgetSearch input"); // 검색어입력영역
        this.searchBtn = document.querySelector(".widgetSearch a"); // 검색버튼영역
        this.listArea = document.querySelector(".widgetAddLayer ul.list"); // 위젯리스트영역
        this.pageArea = document.querySelector(".paging.small"); // 위젯리스트영역
        this.controller = null;
        this.init();
    }

    // 초기시작
    addmenu.prototype.init = function() {
        var that = this;
        this.searchBtn.addEventListener('click', function(e) {
            var searchtext = that.searchText.value;
            that.controller.searchAbleWidget(searchtext, 1);
        });
        this.rootMenu.addEventListener('click', function(e) {
            that.controller.rootMent();
        });

        this.searchText.addEventListener('keyup', function(e) {
            if (e.keyCode == 13) {
                var searchtext = that.searchText.value;
                if (!searchtext) return;
                that.controller.searchAbleWidget(searchtext, 1);
            }

        });
    }

    // 컨트롤러 지정
    addmenu.prototype.setController = function(controller) {
        this.controller = controller;
    }


    // 위젯 목록 그리기
    addmenu.prototype.drawList = function() {
        var data = this.controller.getAbleWidgetInfo();
        var html = this.listHtml(data);
        this.listArea.innerHTML = html;
        this.widgetListEventBind();
    }

    // 위젯 목록에 이벤트 등록하기
    addmenu.prototype.widgetListEventBind = function() {
        var targetel = this.listArea.children;
        for (var index = 0; index < targetel.length; index++) {
            var item = targetel[index].firstElementChild;
            item.addEventListener('click', this.addWidgetCreate.bind(this, item));
        }

    }

    // 메인 화면에 위젯 그리기
    addmenu.prototype.addWidgetCreate = function(el) {
        var dashId = document.querySelector('.header .gnbArea .menu > li > a.active');
        if (!dashId) return;
        var widgetInfo = new SETTING.app.widgetInfo();
        widgetInfo.dashId = dashId.dataset.id;
        widgetInfo.widgetId = el.dataset.id;
        widgetInfo.curWidth = el.dataset.defaultwidth;
        widgetInfo.curHeight = el.dataset.defaultheight;
        widgetInfo.minWidth = el.dataset.minwidth;
        widgetInfo.minHeight = el.dataset.minheight;
        widgetInfo.maxWidth = el.dataset.maxwidth;
        widgetInfo.maxHeight = el.dataset.maxheight;
        widgetInfo.widgetNm = el.dataset.widgetnm;
        widgetInfo.curx = 0;
        widgetInfo.cury = 0;
        this.controller.createWidgetClick(widgetInfo);
    }

    // 위젯 페이지 그리기

    addmenu.prototype.drawPage = function() {
        var pageInfo = this.controller.getAddMenuPageInfo();
        var html = this.pageHtml(pageInfo);
        this.pageArea.innerHTML = html;

        var targetel = this.pageArea.childNodes;
        for (var index = 0; index < targetel.length; index++) {
            var item = targetel[index];
            item.addEventListener('click', this.goPageSearch.bind(this, item));
        }
    }

    addmenu.prototype.goPageSearch = function(el) {
        var pageInfo = this.controller.getAddMenuPageInfo();
        var pageNum = 0;
        var textc = "";
        if (el.childElementCount > 0) textc = el.firstElementChild.innerText;
        else textc = el.innerText;

        if (textc == 'prev') {
            pageNum = pageInfo.current - 1;
            if (pageNum < 1) pageNum = 1;
        } else if (textc == 'next') {
            pageNum = pageInfo.current + 1;
            if (Math.ceil(pageInfo.total / 6) < pageNum) {
                pageNum = Math.ceil(pageInfo.total / 6);
            }
        } else pageNum = textc;

        this.controller.getAddMenuPageClick(pageNum);
    }

    // 위젯 목록 html 구하기
    addmenu.prototype.listHtml = function(data) {
        return data.reduce(
            function(html, item) {
                html += '<li>';
                html += '<a href="#"';
                html += ' data-id=' + item.widgetId;
                html += ' data-defaultwidth=' + item.defaultWidth;
                html += ' data-defaultheight=' + item.defaultHeight;
                html += ' data-maxheight=' + item.maxHeight;
                html += ' data-maxwidth=' + item.maxWidth;
                html += ' data-minheight=' + item.minHeight;
                html += ' data-minwidth=' + item.minWidth;
                html += ' data-widgetnm="' + item.widgetNm + '"';
                html += ' class="img">';
                if (!item.widgetImg) html += ' <img src="/resources/images/widget/' + item.widgetId + '.png"' + ' onerror=\"this.src=\'/resources/images/widget/' + item.widgetId + '.png\' />';
                else html += ' <img src="' + item.widgetImg + '"' + ' onerror=\"this.src=\'/resources/images/widget/' + item.widgetId + '.png\' />';
                html += '<span class="layer"></span>';
                html += '</a>';
                html += '<strong>'
                html += item.widgetNm
                html += '</strong>'
                html += '</li>';
                return html;
            }, '') + "";
    }

    // 위젯 페이징 html 구하기
    addmenu.prototype.pageHtml = function(pageInfo) {
        var flag = Math.ceil(pageInfo.total / 6);
        var html = "";
        if (flag > 1) html += '<a href="#" class="btn xi-angle-left"><span>prev</span></a>';
        for (let index = 1; index <= flag; index++) {
            html += '<a href="#" class="xi-angle-center';
            if (pageInfo.current == index) html += ' on ';
            html += '">' + index + '</a>'
        }
        if (flag > 1) html += '<a href="#" class="btn xi-angle-right"><span>next</span></a>';
        return html;
    }

    return addmenu;
}());