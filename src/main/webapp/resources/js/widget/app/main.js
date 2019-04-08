/**
 * @author 송원진
 * @since 2019.03.26
 * <pre> 메인 화면 </pre>
 * */
WIDGET.createNameSpace("WIDGET.app.Main");
WIDGET.app.Main = (function() {
    var main = function() {
        this.widgetController = new WIDGET.controller.widget();
        this.widgetView = new WIDGET.view.widget();
        this.widgetModel = new WIDGET.model.widget();

        this.setup();
    }

    // 최초 기본 실행
    main.prototype.setup = function() {
        this.widgetController.setWidgetModel(this.widgetModel);
        this.widgetController.setWidgetView(this.widgetView);

        this.widgetModel.setWidgetController(this.widgetController);
        this.widgetModel.setWidgetView(this.widgetView);

        this.widgetView.setWidgetController(this.widgetController);


        // 그리드 스택과련 기본 처리
        $('.grid-stack').gridstack({
            cellHeight: 420,
            cellWidth: 265,
            verticalMargin: 30,
            itemClass: "grid-stack-items",
            float: true,
            acceptWidgets: false,
            disableDrag: false,
            disableResize: false
        });

        // 최초 선택된 dashId 를 획득한다.
        var dashId = document.querySelector(".searchArea .category-ar .drop-ct a.on").dataset.id;
        this.widgetController.getWidgetInfoList(dashId);
    }

    main.prototype.toString = function() {
        return "WIDGET.app.Main";
    }
    return main;
}());