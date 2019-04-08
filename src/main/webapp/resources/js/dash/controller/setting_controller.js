/**
 * @author 송원진
 * @since 2019.01.06
 * <pre> 대시보드 설정화면에서 메인컨트롤러</pre>
 * */
SETTING.createNameSpace("SETTING.controller.settingController");

SETTING.controller.settingController = (function() {
    var settingController = function() {
        this.dashBoardModel = null; // 대시보드 모델
        this.widgetModel = null; // 위젯모델

        this.dashBoardView = null; // 대시보드 뷰
        this.widgetView = null; // 위젯뷰

        this.addMenuModel = null; // 이용가능 위젯모델
        this.addMenuView = null; // 이용가능 위젯뷰

        this.comview = null; // 공통이용화면용

        this.Constants = new SETTING.com.Constants(); // 공통변수
    };

    settingController.prototype.init = function() {
        var that = this;
        $('.grid-stack').gridstack({
            cellHeight: 420,
            cellWidth: 265,
            verticalMargin: 30,
            itemClass: "grid-stack-items",
            float: true,
            acceptWidgets: true
        });
        $('.grid-stack').on('gsresizestop', function(event, el) {
            that.updateWidgetChange();

        });
        $('.grid-stack').on('dragstop', function(event, ui) {
            that.updateWidgetChange();
        });


        // change 이벤트 타입의 items 화면상의 모든 그리드 스택과 생성 삭제 시에도 작동함 
        // $('.grid-stack').on('change', function(event, items) {
        //     serializeWidgetMap(items);
        //     debugger
        // });
        // var serializeWidgetMap = function(items) {
        //     console.log(items);
        // };
    }

    // 메인화면으로 이동한다.
    settingController.prototype.rootMent = function() {
        var svcMenuId = this.getSvcMenuId();
        if (svcMenuId == 'D000') {
            location.href = "/compare/main";
        } else if (svcMenuId == 'C000') {
            location.href = "/cover/main";
        } else if (svcMenuId == 'G000') {
            location.href = "/simple/main";
        } else if (svcMenuId == 'P000') {
            location.href = "/prop/main";
        }
    }

    // 위젯 수정시 데잍 수정및 수정 데이터인지 판별
    settingController.prototype.updateWidgetChange = function(dashId) {
        var $nodes = $('.grid-stack').data('gridstack').grid.nodes;
        if (!dashId) dashId = document.querySelector('.header .gnbArea .menu > li > a.active').dataset.id;
        var widgetList = this.widgetModel.getWidgetList(dashId);
        for (var index = 0; index < widgetList.length; index++) {
            var target = $nodes.filter(function(item) {
                return item.id == widgetList[index].widgetId;
            });

            if (target && target.length > 0) {
                target = target[0];
                if (target.x != widgetList[index].curx ||
                    target.y != widgetList[index].cury ||
                    target.width != widgetList[index].curWidth ||
                    target.height != widgetList[index].curHeight
                ) {
                    widgetList[index].curx = target.x;
                    widgetList[index].cury = target.y;
                    widgetList[index].curWidth = target.width;
                    widgetList[index].curHeight = target.height;

                    this.widgetModel.setUpdateWidget(widgetList[index]);
                }
            }
        }
    }

    // 공통이용화면
    settingController.prototype.setComview = function(view) {
        this.comview = view;
    }

    // 이용가능 위젯모델
    settingController.prototype.setAddMenuModel = function(model) {
        this.addMenuModel = model;
    }

    // 이용가능 위젯뷰
    settingController.prototype.setAddMenuView = function(view) {
        this.addMenuView = view;
    }

    // 대시보드 모델 지정
    settingController.prototype.setDashBoardModel = function(model) {
        this.dashBoardModel = model;
    }

    // 대시보드 뷰 지정
    settingController.prototype.setDashBoardView = function(view) {
        this.dashBoardView = view;
    }

    // 위젯 모델 지정
    settingController.prototype.setWidgetModel = function(model) {
        this.widgetModel = model;
    }

    // 위젯 뷰 지정
    settingController.prototype.setWidgetView = function(view) {
        this.widgetView = view;
    }

    // 화면에 선택된 위젯화면을 그린다.
    settingController.prototype.setWidgetView = function(view) {
        this.widgetView = view;
    }

    // 디비에서 대시보드 최대 생성갯수를 조회한다.
    settingController.prototype.getDashBoardLimit = function() {
        this.dashBoardModel.getLimitCount();
    }

    settingController.prototype.getDashBoardLimitCount = function() {
        return this.dashBoardModel.getDashBoardLimitCount();
    }

    // 디비에서 대시보드목록을 최초 대시보드 조회하기
    settingController.prototype.getDbDashBoard = function() {
        this.dashBoardModel.getDbDashInfo();
    }


    // 대시보드모델 삭제정보 추가
    settingController.prototype.deleteDashBoardModel = function(dashId) {
        this.dashBoardModel.deleteDashBoard(dashId);

    }

    // 대시보드 모델에 수정정보 처리
    settingController.prototype.updateDashBoardModel = function(dashId, dashName) {
        this.dashBoardModel.updateDashBoard(dashId, dashName);
    }

    // 대시보드 그리기 정보 조회
    settingController.prototype.drawBoardModel = function() {
        this.dashBoardView.getDrawBoardList();
    }

    // 대메뉴 정보 세팅
    settingController.prototype.setSvcMenuId = function(svcMenuId) {
        this.dashBoardModel.setSvcMenuid(svcMenuId);
    }

    // 대메뉴 정보 세팅
    settingController.prototype.getSvcMenuId = function() {
        return this.dashBoardModel.getSvcMenuid();
    }

    // 사용가능 위젯 정보를 가져온다.
    settingController.prototype.getAbleWidgetInfo = function() {
        return this.addMenuModel.getWidgetInfo();
    }

    // 사용가능한 위젯 검색
    settingController.prototype.searchAbleWidget = function(search, current) {
        var tempMeudId = this.dashBoardModel.getSvcMenuid();
        this.addMenuModel.widgetSearch(tempMeudId, search, current);
    }

    // 위젯 그리기 메뉴 현재 페이지 정보
    settingController.prototype.getAddMenuPageInfo = function() {
        return this.addMenuModel.getAddMenuPageInfo();
    }

    // 위젯 그리기 메뉴 페이지 선택한경우
    settingController.prototype.getAddMenuPageClick = function(pageNum) {
        return this.addMenuModel.widgetPage(pageNum);
    }

    // 위젯 추가에서 위젯을 추가하는 경우
    settingController.prototype.createWidgetClick = function(widgetInfo) {
        // 데이터 저장및 중복방지 기능추가
        var flag = this.widgetModel.insertConfirm(widgetInfo);
        if (flag) {
            this.comview.oneRowModal("동일한 위젯을 추가하실 수 없습니다.<br/> 확인하세요",
                "dsSettingType");

        } else {
            // 화면에 그리기
            widgetInfo = this.widgetView.drawWidget(widgetInfo);
            this.widgetModel.setInsertWidget(widgetInfo);
        }

    }

    // 위젯 속성 버튼을 선택한 경우
    settingController.prototype.clickWidgetPropBtn = function(widgetId, widgetName) {
        var dashId = document.querySelector('.header .gnbArea .menu > li > a.active').dataset.id;
        this.widgetModel.getPropInfo(widgetId, dashId, widgetName);
    }

    // 위젯 속성 버튼을 선택한 경우
    settingController.prototype.clickWidgetDeleteBtn = function(widgetInfo) {

        this.widgetModel.deleteWidget(widgetInfo);
    }

    // 일단 안내 모달창 생성
    settingController.prototype.showOneRowInfoModal = function(message, id) {
        this.comview.oneRowModal(message, id)
    }

    // 모달창 닫기
    settingController.prototype.modelClose = function() {
        this.comview.modalClose();
    }

    // 대시보드별 위젯 정보를 가져온다.
    settingController.prototype.getWidgetList = function(dashId) {
        return this.widgetModel.getWidgetList(dashId);
    }

    // 대시보드 선택시 기존 위젯 그리기
    settingController.prototype.setupWidget = function(dashId) {
        this.widgetModel.getWidgetListCall(dashId);
    }

    // 대시보드 설정을 변경한경우
    settingController.prototype.insertWidgetProp = function(propArr) {
        var dashId = document.querySelector('.header .gnbArea .menu > li > a.active').dataset.id;

        this.widgetModel.insertWidgetProp(dashId, propArr[0].optionId.substr(0, 3), propArr);
    }

    settingController.prototype.saveValidate = function(dashList) {
        // 필수 위젯 검사
        var necessaryWidget = this.Constants.getNecessaryWidget();
        var widgetList = this.widgetModel.getWidgetDrawList();
        var flag = true;
        for (var a = 0; a < necessaryWidget.length; a++) {
            var nsvcMenuId = necessaryWidget[a].svcMenuId;
            var nwidgetId = necessaryWidget[a].widgetId;
            var ndashList = dashList.filter(function(item) {
                var nsvcMenuId = necessaryWidget[a].svcMenuId;
                return item.svcMenuId == nsvcMenuId;
            });

            for (var b = 0; b < ndashList.length; b++) {
                var nwidgetList = widgetList.filter(function(item) {
                    return item.dashId == ndashList[b].dashId;
                });
                var ncount = 0;
                for (var c = 0; c < nwidgetList.length; c++) {
                    for (var d = 0; d < nwidgetId.length; d++) {
                        if (nwidgetList[c].widgetId == nwidgetId[d]) {
                            ncount++;
                        }
                    }
                }
                if (ncount == 0) {
                    this.comview.oneRowModal("대시보드 '" + ndashList[b].dashName + "' 필수 위젯이 없습니다. <br/><br/> 필수 위젯 - 미디어별 주요 키워드 , 산업별 브랜드 인덱스 ,속성별 주요 키워드 ", "dsSettingType");
                    flag = false;
                }
            }
        }
        return flag;
    }

    // 저장버튼이벤트 위임
    settingController.prototype.save = function() {

        // 신규 저장 대시보드 검사
        var dashList = this.dashBoardModel.getCreateBoardList();

        if (!this.saveValidate(dashList)) return;
        // 대시보드에서 위젯을 삭제하는 경우 대응
        // 위젯을 삭제하는 경우 해당 대시보드를 선택하여 대시보드및 위젯 정보가 있는것으로 여긴다
        dashList = this.dashBoardModel.getDrawBoardList();
        var delDashArr = [];
        var delDashList = this.widgetModel.getDeleteWidgetList();
        for (var i = 0; i < delDashList.length; i++) {
            delDashArr = delDashArr.filter(function(item) {
                return item.dashId != delDashList[i].dashId;
            });
            delDashArr.push(delDashList[i].dashId);
        }

        dashList = dashList.filter(function(item) {
            for (var i = 0; i < delDashArr.length; i++) {
                console.log((item.dashId == delDashArr[i].dashId && item.svcMenuId == "C000"));
                if (item.dashId == delDashArr[i] && item.svcMenuId == "C000") return true;
            }
        });

        if (!this.saveValidate(dashList)) return;
        var count = 0;
        // 대시보드 저장 호출
        // this.dashBoardModel.save();
        var that = this;
        var jsonForm = {
            delDashId: [],
            updateDash: null,
            createDash: null,
            insertWidget: null,
            updateWidget: null,
            deleteWidget: [],
            insertProp: null
        };

        jsonForm.delDashId = this.dashBoardModel.getDeleteBoardList();
        count += jsonForm.delDashId.length;
        jsonForm.updateDash = this.dashBoardModel.getUpdateBoardList();
        count += jsonForm.updateDash.length;
        jsonForm.createDash = this.dashBoardModel.getCreateBoardList();
        count += jsonForm.createDash.length;
        jsonForm.insertWidget = this.widgetModel.getInsertWidgetList();
        count += jsonForm.insertWidget.length;
        jsonForm.updateWidget = this.widgetModel.getUpdateWidgetList();
        count += jsonForm.updateWidget.length;
        jsonForm.deleteWidget = this.widgetModel.getDeleteWidgetList();
        count += jsonForm.deleteWidget.length;
        jsonForm.insertProp = this.widgetModel.getInsertPropList();
        // 저장 대상이 없으면 반응하지 않는다.
        if (count == 0) {
            console.log("저장정보가 없습니다.");
            return;
        }
        $.ajax({
                method: "post",
                url: "/serest/dashsave",
                accept: "application/json",
                dataType: "text",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(jsonForm),
            })
            .done(function(res) {
                that.dashBoardModel.infoReset();
                that.widgetModel.infoReset();
                that.comview.oneRowModal("저장하였습니다.", "dsSettingType");
                // 그냥 저장하고 나서 강제 리프래쉬를 할것인가????????????
            })
            .fail(function(jqXHR, textStatus) {
                console.error(jqXHR, textStatus);
                that.comview.oneRowModal("저장에 문제가 있습니다.", "dsSettingType");
            })
            .always(function() {
                console.log("저장 실행");
            })
    }

    // 필수 위젯 확인
    settingController.prototype.necsssWidget = function() {
        this.widgetModel = this.widgetModel.getWidgetDrawList()

    }
    settingController.prototype.toString = function() {
        return "settingController";
    };

    return settingController;
}());