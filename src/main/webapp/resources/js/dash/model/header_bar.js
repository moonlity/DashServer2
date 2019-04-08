/**
 * @author 송원진
 * @since 2019.01.06
 * <pre> 대시보드 설정화면에서 대시보드메뉴의 모델영역 </pre>
 * */
SETTING.createNameSpace("SETTING.model.haderBarModel");

SETTING.model.haderBarModel = (function() {
    var haderBarModel = function() {
        this.controller = null;
        this.view = null;
        this.api = new ApiCall();
        this.dashListInfo = null; // 현재 화면에 그려지는 대시보드 목록
        this.userId = "apple";
        this.svcMenuId = "C000";
    }

    // 컨트롤러 지정
    haderBarModel.prototype.setController = function(controller) {
        this.controller = controller
    }

    // 뷰지정
    haderBarModel.prototype.setView = function(view) {
        this.view = view
    }

    // svcMunuId 메뉴값 지정
    haderBarModel.prototype.setSvcMenuId = function(val) {
        this.svcMenuId = val;
    }

    // userid 를 지정한다.
    haderBarModel.prototype.setUserId = function(val) {
        this.userId = val;
    }

    /**
     * @param menuId 메인메뉴 아이디
     * 현재대시보드 디비에서 목록확인
     */
    haderBarModel.prototype.getDashBoardList = function() {
        var payload = { svcMenuId: this.svcMenuId, userId: this.userId };
        var that = this;
        this.api.setPath("/serest/userDashList");
        this.api.setPayload(payload);
        this.api.setMethod("POST");
        this.api.setDataType("JSON");
        this.api.callReq()
            .done(function(data) {
                that.dashBoardMake(data);
            }).fail(function() {
                console.error(that.errorMsg);
            });
    }

    // 대시보드 목록을 그린다.
    haderBarModel.prototype.dashBoardMake = function(data) {
        this.dashListInfo = data;
        this.controller.dashBoardMake();
    }

    /**
     * 대시보드 정보를 변경한다.
     * @param crud 신규C 기존R 수정U 삭제D 구분값
     * @param dashName 대시보드 이름
     * @param dashId 대시보드 아이디
     */
    haderBarModel.prototype.upateDashBoardInfo = function(crud, dashName, dashId) {
        var dashInfo = { crud: crud, name: dashName, sort: dashInfo.length, userId: null, id: dashId };
        if (crud === "C") {
            this.dashListInfo.push(dashInfo);
        } else if (crud === "U") {
            this.dashListInfo.forEach(
                function(item, index) {
                    if (item.id === dashId) {
                        item.name = dashName;
                    }
                }
            );
        } else if (crud === "D") {
            this.dashListInfo = this.dashListInfo.filter(function(el, index, array) {
                return (el.id != dashId)
            });
        }

    }


    // 대시보드를 신규 저장한다. -- 요건 수정해야 한다. 전체 저장으로 
    haderBarModel.prototype.dashBoardSave = function(dashName) {
        var that = this;
        var url = "/serest/dash/" + that.userId + "/" + that.svcMenuId + "/" + dashName;
        this.api.setMethod("POST");
        this.api.setPath(url);
        this.api.setDataType("text");
        var xhr = this.api.callReq()
        xhr
            .done(function(e) {
                //저장 성공후 다시 다시그린다.
                that.getDashBoardList();
            }).fail(function(e) {
                console.error(e);
            });
    }

    // 이아래는 전부 안쓴다

    // 대시보드를 삭제한다.
    haderBarModel.prototype.dashBoardDelete = function(dashId) {
        var that = this;
        var url = "/serest/dash/" + that.userId + "/" + that.svcMenuId + "/" + dashId;
        this.api.setMethod("DELETE");
        this.api.setPath(url);
        this.api.setDataType("text");
        this.api.callReq()
            .done(function(e) {
                //저장 성공후 다시 다시그린다.
                that.getDashBoardList();
            }).fail(function(e) {
                console.error(e);
            });
    }

    // 대시보드를 수정한다.
    haderBarModel.prototype.dashBoardUpdate = function(dashName, dashId) {
        var that = this;
        this.api.setMethod("PUT");
        this.api.setDataType("text");
        var url = "/serest/dash/" + that.userId + "/" + that.svcMenuId + "/" + dashName + "/" + dashId;
        this.api.setPath(url);
        this.api.callReq()
            .done(function(e) {
                //저장 성공후 다시 다시그린다.
                that.getDashBoardList();
            }).fail(function(e) {
                console.error(e);
            });
    }

    // 객체명 확인용
    haderBarModel.prototype.toString = function() {
        return "haderBarModel";
    }

    return haderBarModel;
}());