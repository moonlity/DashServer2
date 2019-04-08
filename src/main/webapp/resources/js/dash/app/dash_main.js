/**
 * 
 */
SETTING.createNameSpace("SETTING.app.dashMain");

SETTING.app.dashMain = (function() {
    var dashMain;
    dashMain = function() {
        this.mainController = new SETTING.controller.settingController();
        this.dashView = new SETTING.view.dashboard();
        this.dashModel = new SETTING.model.dashBoard();

        this.addMenuModel = new SETTING.model.addmenu();
        this.addMenuView = new SETTING.view.addmenu();

        this.widgetModel = new SETTING.model.widget();
        this.widgetView = new SETTING.view.widget();

        this.comview = new SETTING.view.comview();

        this.setup();

    }

    // 초기화
    dashMain.prototype.setup = function() {
        var svcMenuId = document.querySelectorAll("[data-code]")[0].dataset.code;
        this.mainController.setDashBoardModel(this.dashModel);
        this.mainController.setDashBoardView(this.dashView);

        this.dashView.setModel(this.dashModel);
        this.dashView.setController(this.mainController);
        this.dashModel.setView(this.dashView);

        this.mainController.getDashBoardLimit();
        this.mainController.setSvcMenuId(svcMenuId);
        this.mainController.getDbDashBoard(svcMenuId);

        this.mainController.setAddMenuModel(this.addMenuModel);
        this.mainController.setAddMenuView(this.addMenuView);

        this.mainController.setWidgetModel(this.widgetModel);
        this.mainController.setWidgetView(this.widgetView);

        this.addMenuView.setController(this.mainController);
        this.addMenuModel.setView(this.addMenuView);

        this.widgetView.setController(this.mainController);
        this.widgetModel.setView(this.widgetView);
        this.mainController.setComview(this.comview);

        this.mainController.init();
        this.dashView.init();

        //this.addMenuView.drawList();
        this.mainController.searchAbleWidget("", 1);
        //this.mainController.getDashBoardLimit();

        //this.mainController.drawDashBoard();

    }

    dashMain.prototype.toString = function() {
        return "dashMain";
    }

    return dashMain;
}());