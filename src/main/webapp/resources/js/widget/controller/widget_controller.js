/**
 * @author 송원진
 * @since 2019.03.26
 * <pre> 각메뉴별 위젯들의 컨트롤러 이다. </pre>
 * */

WIDGET.createNameSpace("WIDGET.controller.widget");
WIDGET.controller.widget = (function() {
    var widget = function() {
        this.widgetModel = null; // 위젯 모델
        this.widgetView = null; // 위젯 뷰
        this.api = new ApiCall(); // api 
    }

    widget.prototype.setWidgetModel = function(model) {
        this.widgetModel = model;
    }

    widget.prototype.setWidgetView = function(view) {
        this.widgetView = view;
    }

    // 위젯 기본 정보 외곽 그리기 정보 가져오기
    widget.prototype.getWidgetInfoList = function(dashId) {
        var that = this;
        var url = "/comrest/girdList/" + dashId;
        this.api.setDataType("JSON");
        this.api.setMethod("GET");
        this.api.setPath(url);
        this.api.callReq()
            .done(function(data) {
                // 위젯기본 그리기 정보 -- 주입후 위젯 그리기
                that.widgetModel.setWidgetInfoList(data.widgetGridInfo);
                that.widgetModel.setWidgetPropList(data.widgetPropInfo);
            })
            .fail(function() {
                console.error(that.errorMsg);
            });


        this.widgetModel.getWidgetInfoList(dashId);
    }

    widget.prototype.toString = function() {
        return "WIDGET.controller.widget";
    }

    return widget;
}());