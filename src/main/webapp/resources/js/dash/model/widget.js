/**
 * @author 송원진
 * @since 2019.02.22
 * <pre> 메인 위젯및 위젯 속성들 관련 뷰 </pre>
 * */

SETTING.createNameSpace("SETTING.model.widget");

SETTING.model.widget = (function() {
    var widget = function() {
        this.api = new ApiCall(); // api 
        this.view = null;

        this.widgetInfo = {
                "curHeight": 1,
                "curWidth": 6,
                "curationYn": null,
                "curx": 0,
                "cury": 6,
                "dashId": "320",
                "dashNm": null,
                "defaultHeight": 1,
                "defaultWidth": 6,
                "maxHeight": 1,
                "maxWidth": 8,
                "minHeight": 1,
                "minWidth": 6,
                "necessaryWidgetYn": null,
                "svcMenuId": null,
                "total": null,
                "useYn": null,
                "userId": null,
                "widgetId": 102,
                "widgetImg": "",
                "widgetNm": "",
                "widgetOrder": null
            }
            //저장전 원래 위젯 정보 최종 저장전 삭제 신규 수정 삭제 순으로 동작하여 신규 데이터로 분류된경우
            // 원본 자료와 비교하여 동일한 경우 신규 에서 제거
            // 원본에 존재하지만 데이터가 다른경우 수정자료로 변경한다.
        this.oriWidgetList = [];

        this.widgetList = []; // 화면 위젯목록

        this.insertWidgetList = []; // 신규 저장 위젯리스트
        this.updateWidgetList = []; // 수정 위젯 리스트
        this.deleteWidgetList = []; // 삭제 위젯 리스트

        this.insertPropList = []; // 속성 정보는 무조건 삭제후 다시 입력인다. 입력정보내 위젯 아이디를 삭제 정보로 이용한다. 저장시 신규 위젯에서 속성정보가 없는지 판단하는 부분 추가개발피료

    }


    // 위젯표현부외 모든 부분 클리어
    widget.prototype.infoReset = function(dashId) {
        this.insertWidgetList = [];
        this.updateWidgetList = [];
        this.deleteWidgetList = [];
        this.insertPropList = [];
        this.getWidgetListCall(dashId);
    }

    // 뷰지정
    widget.prototype.setView = function(view) {
        this.view = view;
    }

    widget.prototype.getInsertWidgetList = function() {
        return this.insertWidgetList;
    }
    widget.prototype.getUpdateWidgetList = function() {
        return this.updateWidgetList;
    }
    widget.prototype.getDeleteWidgetList = function() {
        return this.deleteWidgetList;
    }

    widget.prototype.getInsertPropList = function() {
            return this.insertPropList;
        }
        // 화면에 그리는 위젯 속성정보 획득

    widget.prototype.getPropInfo = function(widgetId, dashId, widgetName) {
        var url = "/dash/wproplist";
        var param = { widgetId: widgetId, dashId: dashId };
        if (isNaN(dashId)) param = { widgetId: widgetId, dashId: null };

        this.api.setMethod("POST");
        this.api.setDataType("JSON");
        this.api.setPayload(param);
        this.api.setPath(url);
        var that = this;
        this.api.callReq()
            .done(function(data) {
                // widgetName 화면 생성은 존재 화면 없이 정보만 가져올때는 없다.
                if (widgetName) {
                    if (that.insertPropList.length > 0) {
                        for (var i = 0; i < data.propList.length; i++) {
                            for (var j = 0; j < that.insertPropList.length; j++) {
                                if (that.insertPropList[j].optionId == data.propList[i].optionId && dashId == that.insertPropList[j].dashId) {
                                    data.propList[i].defaultYn = "N";
                                }
                            }
                            for (var j = 0; j < that.insertPropList.length; j++) {
                                if (that.insertPropList[j].optionId == data.propList[i].optionId && that.insertPropList[j].optionPropId == data.propList[i].optionPropId && dashId == that.insertPropList[j].dashId) {
                                    data.propList[i].defaultYn = "Y";
                                }
                            }
                        }
                    }
                    that.view.drawProp(data.propList, data.indexList, widgetName);
                } else {
                    // 1차만 1차2차 속성으로 구분되는 인지 판단후 속성 값을 추가해야 한다.
                    var pflag = data.propList.filter(function(item) {
                        return (item.childrenYn == "Y" && item.defaultYn == "Y");
                    });
                    if (pflag.length > 0) { // 1차 2차 구분이 있는경우
                        // 1차 속성 입력
                        that.insertPropList.push({ dashId: dashId, widgetId: widgetId, optionId: pflag[0].optionId, optionPropId: pflag[0].optionPropId });
                        // 2차 속성 입력
                        for (var i = 0; i < data.propList.length; i++) {
                            if (data.propList[i].parentPropId == pflag[0].optionPropId && data.propList[i].defaultYn == "Y") {
                                that.insertPropList.push({ dashId: dashId, widgetId: widgetId, optionId: data.propList[i].optionId, optionPropId: data.propList[i].optionPropId });
                            }
                        }
                    } else { // 구분할 필요 없는 경우
                        for (var i = 0; i < data.propList.length; i++) {
                            if (data.propList[i].defaultYn == "Y") {
                                that.insertPropList.push({ dashId: dashId, widgetId: widgetId, optionId: data.propList[i].optionId, optionPropId: data.propList[i].optionPropId });
                            }
                        }
                    }
                }
            }).fail(function() {
                console.error(that.errorMsg);
            });
    }

    /**
     * 신규 위젯이 생성될때
     * @param {widgetInfo} widgetInfo 위젯 정보
     */
    widget.prototype.setInsertWidget = function(widgetInfo) {
        this.insertWidgetList = this.insertWidgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });
        this.insertWidgetList.push(widgetInfo);
        // 속성 정보는 속성 선택할때 입력됨

        this.widgetList = this.widgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });
        var param = {
            "dashId": widgetInfo.dashId,
            "curHeight": widgetInfo.curHeight,
            "curWidth": widgetInfo.curWidth,
            "defaultHeight": widgetInfo.curHeight,
            "defaultWidth": widgetInfo.curWidth,
            "maxHeight": widgetInfo.maxHeight,
            "maxWidth": widgetInfo.maxWidth,
            "minHeight": widgetInfo.minHeight,
            "minWidth": widgetInfo.minWidth,
            "svcMenuId": widgetInfo.svcMenuId,
            "widgetId": widgetInfo.widgetId,
            "widgetImg": widgetInfo.widgetImg,
            "widgetNm": widgetInfo.widgetNm,
            "curx": widgetInfo.curx,
            "cury": widgetInfo.cury,

        }
        this.widgetList.push(param);

        // 속성값을 입력한다.
        this.getPropInfo(widgetInfo.widgetId, widgetInfo.dashId);
    }


    /**
     * 위젯을 수정한 경우
     * @param {widgetInfo} widgetInfo 대시보드 아이디
     */
    widget.prototype.setUpdateWidget = function(widgetInfo) {
        var flag = true;

        this.widgetList = this.widgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });

        this.widgetList.push(widgetInfo);
        // 먼저 신규 생성 정보확인
        flag = this.insertWidgetList.some(function(item) {
            return item.dashId == widgetInfo.dashId && item.widgetId == widgetInfo.widgetId;
        });
        if (flag) {
            for (var index = 0; index < this.insertWidgetList.length; index++) {
                if (this.insertWidgetList[index].dashId == widgetInfo.dashId && this.insertWidgetList[index].widgetId == widgetInfo.widgetId) {
                    this.insertWidgetList[index].curWidth = widgetInfo.curWidth;
                    this.insertWidgetList[index].curHeight = widgetInfo.curHeight;
                    this.insertWidgetList[index].curx = widgetInfo.curx;
                    this.insertWidgetList[index].cury = widgetInfo.cury;
                }

            }
        }

        // 신규정보에 값이 없다면 수정정보에서 수정한다.

        flag = this.updateWidgetList.some(function(item) {
            return item.dashId == widgetInfo.dashId && item.widgetId == widgetInfo.widgetId;
        });
        if (flag) {
            // 수정정보 확인
            for (var index = 0; index < this.updateWidgetList.length; index++) {
                if (this.updateWidgetList[index].dashId == widgetInfo.dashId && this.updateWidgetList[index].widgetId == widgetInfo.widgetId) {
                    this.updateWidgetList[index].curWidth = widgetInfo.curWidth;
                    this.updateWidgetList[index].curHeight = widgetInfo.curHeight;
                    this.updateWidgetList[index].curx = widgetInfo.curx;
                    this.updateWidgetList[index].cury = widgetInfo.cury;
                }
            }
        } else {
            //신규인 위젯은 제외 시키기 
            flag = this.oriWidgetList.some(function(item) {
                return item.dashId == widgetInfo.dashId && item.widgetId == widgetInfo.widgetId;
            });
            if (flag) this.updateWidgetList.push({ dashId: widgetInfo.dashId, widgetId: widgetInfo.widgetId, curWidth: widgetInfo.curWidth, curHeight: widgetInfo.curHeight, curx: widgetInfo.curx, cury: widgetInfo.cury })

        }

    }


    /* 위젯 정보를 삭제한경우
     * @param {widgetInfo} widgetInfo 위젯정보객체
     */
    widget.prototype.deleteWidget = function(widgetInfo) {

        this.insertWidgetList = this.insertWidgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });

        this.updateWidgetList = this.updateWidgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });
        // 삭제후 다시입력을 반복할 경우 삭제 정보로 중복으로 입력될수 있다.
        this.deleteWidgetList = this.deleteWidgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });

        // 속성정보에서 삭제
        this.insertPropList = this.insertPropList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });

        this.deleteWidgetList.push(widgetInfo);
        this.widgetList = this.widgetList.filter(function(item) {
            return !(item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId);
        });

    }

    widget.prototype.insertWidgetProp = function(dashId, widgetId, propArr) {
        for (var i = 0; i < propArr.length; i++) {
            this.insertPropList = this.insertPropList.filter(function(item) {
                return !(item.dashId == dashId && item.widgetId == widgetId);
            });
        }
        // 1차만 1차2차 속성으로 구분되는 인지 판단후 속성 값을 추가해야 한다.
        var pflag = propArr.filter(function(item) {
            return (item.childrenYn == "Y" && item.defaultYn == "Y");
        });

        if (pflag) { // 1차 2차 구분이 있는경우
            for (var i = 0; i < propArr.length; i++) {
                if (propArr[i].parentPropId == pflag.optionPropId) {
                    this.insertPropList.push({ dashId: dashId, widgetId: widgetId, optionId: propArr[i].optionId, optionPropId: propArr[i].optionPropId });
                }
            }
        } else {
            for (var i = 0; i < propArr.length; i++) {
                this.insertPropList.push({ dashId: dashId, widgetId: widgetId, optionId: propArr[i].optionId, optionPropId: propArr[i].optionPropId });
            }
        }


    }

    // insert 정보 확인및 방지
    widget.prototype.insertConfirm = function(widgetInfo) {
        return this.widgetList.some(function(item) {
            return item.widgetId == widgetInfo.widgetId && item.dashId == widgetInfo.dashId;
        });
    }

    widget.prototype.getWidgetListCall = function(dashId) {

        var that = this;
        var returnList = this.widgetList.filter(function(item) {
            return item.dashId == dashId;
        });

        // 신규로 작성된 위젯인 경우 위젯 아이디가 숫자가 아니다.
        if (isNaN(dashId)) {
            this.view.drawWidgets(returnList);
            return
        }
        if (returnList.length < 1) {
            var url = "/dash/beforeSwList";
            var param = { dashId: dashId };
            this.api.setMethod("POST");
            this.api.setDataType("JSON");
            this.api.setPayload(param);
            this.api.setPath(url);
            this.api.callReq()
                .done(function(data) {
                    for (var index = 0; index < data.length; index++) {
                        that.oriWidgetList.push(data[index]);
                        that.widgetList.push(data[index]);
                    }
                    that.view.drawWidgets(data);
                }).fail(function() {
                    console.error(that.errorMsg);
                });
        } else {
            this.view.drawWidgets(returnList);
        }


    }
    widget.prototype.getWidgetList = function(dashId) {
            return this.widgetList.filter(function(item) {
                return item.dashId == dashId;
            });
        }
        // 현재 화면 그리기용으로 사용하는 위젯정보
    widget.prototype.getWidgetDrawList = function(dashId) {
        return this.widgetList;
    }

    return widget;
}());