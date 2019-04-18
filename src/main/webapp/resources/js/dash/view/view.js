/**
 * @author 송원진
 * @since 2019.04.18
 * <pre> 프런트오피스영역메인 뷰 </pre>
 * */

SETTING.createNameSpace("SETTING.view.view");

SETTING.view.view = (function() {
    var view = function() {
        this.controller = null;
    }

    // 컨트롤러 지정
    view.prototype.setController = function(controller) {
        this.controller = controller;
    }

    return view;
}());