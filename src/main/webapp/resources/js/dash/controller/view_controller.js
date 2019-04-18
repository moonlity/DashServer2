/**
 * @author 송원진
 * @since 2019.04.18
 * <pre>메인 프런트오피스 컨트롤러</pre>
 * */
SETTING.createNameSpace("SETTING.controller.viewController");

SETTING.controller.viewController = (function() {
    var viewController = function() {
        this.comview = null; // 공통이용화면용
        this.Constants = new SETTING.com.Constants(); // 공통변수
    };

    viewController.prototype.init = function() {
        var that = this;
        // 그리드 스택 세팅
        $('.grid-stack').gridstack({
            cellHeight: 420,
            cellWidth: 265,
            verticalMargin: 30,
            itemClass: "grid-stack-items",
            float: true,
            acceptWidgets: true
        });
    }


    // 공통이용화면
    viewController.prototype.setComview = function(view) {
        this.comview = view;
    }

  
    viewController.prototype.toString = function() {
        return "SETTING.controller.viewController";
    };

    return viewController;
}());