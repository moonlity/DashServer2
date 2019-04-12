/**
 * @author 송원진
 * @since 2019.02.20
 * <pre> 대시보드 사용가능 위젯목록 모델</pre>
 * */

SETTING.createNameSpace("SETTING.model.addmenu");

SETTING.model.addmenu = (function() {
    var addmenu = function() {
        this.api = new ApiCall(); // api 
        this.view = null; // 뷰영역
        this.param = { "offset": 0, "size": 6, "search": "" }; //파라미터
        this.pageInfo = { "total": 0, "current": 1, "pageArr": [] }; // 페이지 정보
        this.widgetList = []; // 위젯 정보목록
        this.pageSize = 3; // 페이징 영역에 그려질 갯수
        this.listSize = 6; // 목록 표현 갯수
    }

    // 뷰영역지정
    addmenu.prototype.setView = function(view) {
        this.view = view;
    }

    // 위젯 목록 조회
    addmenu.prototype.getWidgetInfo = function() {
        return this.widgetList;
    }

    // 현재 페이지 조회
    addmenu.prototype.getAddMenuPageInfo = function() {
        return this.pageInfo;
    }

    // 파라미터 지정
    addmenu.prototype.widgetSearch = function(search, current) {
        this.pageInfo.current = current;
        var curOffset = (current - 1) * this.listSize;
        this.param = { "offset": curOffset, "size": this.listSize, "search": search };
        this.getWidgetList();
    }

    // 페이징 처리한경우
    addmenu.prototype.widgetPage = function(pageNum) {
        this.pageInfo.current = pageNum;
        var curOffset = (pageNum - 1) * this.listSize;
        this.param.offset = curOffset
        this.getWidgetList();
    }

    // 위젯 목록 정보 갱신
    addmenu.prototype.getWidgetList = function() {
        var url = "/crest/widgetAble";
        this.api.setMethod("POST");
        this.api.setDataType("JSON");
        this.api.setPayload(this.param);
        this.api.setPath(url);
        var that = this;
        this.api.callReq()
            .done(function(data) {
                that.widgetList = data.list;
                that.getPageList(data.count); // 페이지 정보 갱신 및 그리기
                // 위젯목록을 그린다.
                that.view.drawList();
                // 페이지 영역을 그린다.
                that.view.drawPage();

            }).fail(function() {
                console.error(that.errorMsg);
            });
    }

    // 위젯 목록 페이지 부분 갱신
    addmenu.prototype.getPageList = function(total) {
        this.pageInfo.total = total;
        this.pageInfo.pageArr = [];
        var tempPcount = Math.ceil(total / this.listSize);
        for (var index = 0; index < tempPcount; index++) {
            this.pageInfo.pageArr.push(index);
        }
        // 페이징부분을 그린다.
        this.view.drawPage();
    }

    return addmenu;
}());