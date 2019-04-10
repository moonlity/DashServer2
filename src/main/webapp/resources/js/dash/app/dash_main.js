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
    	var userId = document.querySelectorAll(".userInfo span")[1].innerText ; // 최좌측상단 메뉴

        this.mainController.setDashBoardModel(this.dashModel);
        this.mainController.setDashBoardView(this.dashView);

        this.dashView.setModel(this.dashModel);
        this.dashView.setController(this.mainController);
        this.dashModel.setView(this.dashView);
        this.dashModel.setUserId(userId); // 대시보드 정보를 가져올 유저아이디세팅
        
        this.mainController.getDashBoardLimit(); // 사용자별로 제한된 대시보드수량획득
        this.mainController.getDbDashBoard(); // 사용자별로 이전에 저장한 대시보드 정보를 획득

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