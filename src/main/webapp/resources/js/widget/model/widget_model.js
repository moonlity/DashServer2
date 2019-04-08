/**
 * @author 송원진
 * @since 2019.03.26
 * <pre> 각메뉴별 위젯들의 모델영역이다. </pre>
 * */

WIDGET.createNameSpace("WIDGET.model.widget");

WIDGET.model.widget = (function() {
    var model = function() {
        this.widgetController = null;
        this.widgetView = null;
        this.api = new ApiCall(); // api 

        this.widgetInfoList = []; // 위젯 기본크기 좌표 정보
        this.widgetPropList = []; // 위젯별 속성정보

        this.param = []; // 위젯별 파라미터 
        // 시작일 종료일 소비자(1개) 미디어(복수) 검색식 제외식 필터식 조건식 해시식   조회갯수 기간별(일별,주별,월별,분기별)
        // 정렬(원문보기만) rt 글포함 rt 순정렬 최초글포함
        // 카테고리(복수) 1차연관어 , 감성 , tpo
    }

    model.prototype.setWidgetController = function(controller) {
        this.widgetController = controller;
    }

    model.prototype.setWidgetView = function(view) {
        this.widgetView = view;
    }

    // 위젯별 파라미터를 세팅한다.
    model.prototype.setWidgetParam = function(widgetParam) {
        var flag = this.param.some(function(item) {
            return
        });
    }

    // 위젯별 파라미터를 획득한다.
    model.prototype.getWidgetParam = function(widgetId) {
        return this.param.filter(function(item) {
            return widgetId == item.widgetId;
        });
    }

    // 기본 외형 위젯 정보 목록을 저장한다.
    model.prototype.setWidgetInfoList = function(widgetInfoList) {
        this.widgetInfoList = widgetInfoList;
        // 화면관련 정보가 변경된다면 위젯들을 다시그린다.
        this.widgetView.drawInfoWidget(widgetInfoList);
        // 생성된 위젯의 토글이벤트 초기화 -- 이부분은 ui.js 부분이라 어쩔수 없음
        //pushEventAction();
    }

    model.prototype.setWidgetPropList = function(widgetPropList) {
        this.widgetPropList = widgetPropList;
    }

    // 위젯기본 크기 좌표등의 정보를 가져온다.
    model.prototype.getWidgetInfoList = function(dashId) {
        return this.widgetInfoList;
    }

    return model;
}());