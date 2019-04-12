/**
 * @author 송원진
 * @since 2019.02.18
 * <pre> 대시보드메뉴의 정보영역 </pre>
 * */

SETTING.createNameSpace("SETTING.model.dashBoard");

SETTING.model.dashBoard = (function() {
    var dashBoard = function() {
        this.api = new ApiCall(); // api 
        this.view = null;
        this.drawBoardList = []; // 대시보드에 그려지는 목록정보
        this.limitCout = 0; //대시보드 생성 제한숫자
        this.selectedId = ""; // 대시보드 선택한 메뉴
        this.userId = ""; // 사용자 아이디
    }

    // 대시보드 정보를 재설정하고 화면도 다시 그린다.
    dashBoard.prototype.infoReset = function() {
        this.drawBoardList = [];
        this.getDbDashInfo();
    }

    dashBoard.prototype.setView = function(view) {
        this.view = view;
    }
    
    // 사용자 아이디세팅
    dashBoard.prototype.setUserId = function(userId) {
        this.userId = userId;
    }

    // 대시보드메뉴 정보 세팅
    dashBoard.prototype.setSelectedId = function(selectedId) {
        this.selectedId = selectedId;
    }

    // 대시보드메뉴 정보 가져오기
    dashBoard.prototype.getSelectedId = function() {
        return this.selectedId;
    }

    dashBoard.prototype.getDeleteBoardList = function() {
        return this.deleteBoardList;
    }
    dashBoard.prototype.getUpdateBoardList = function() {
        return this.updateBoardList;
    }
    dashBoard.prototype.getCreateBoardList = function() {
        return this.createBoardList;
    }

    dashBoard.prototype.save = function() {
        console.log(this.deleteBoardList);
        var that = this;

    }

    /**
     * 디비에서 현재 사용중인 대시보드 정보를 가져온다.
     */
    dashBoard.prototype.getDbDashInfo = function() {
    	var that = this;
        this.api.setMethod("GET");
        this.api.setDataType("JSON");
        this.api.setPath("/crest/dashlist/"+this.userId);
        this.api.callReq()
            .done(function(data) {
                that.drawBoardList = data;
                // 조회정보로 대시보드를 그린다.
                that.view.drawDashBoard();
                // 대시보드 첫번째 선택 강제
                var et = document.querySelectorAll('.header .gnbArea .menu > li a')[0];
                if (et) et.click();
            }).fail(function() {
                console.error(that.errorMsg);
            });
    }

    // 디비에서 대시보드 생성 제한 수를 가져온다.
    dashBoard.prototype.getLimitCount = function() {
        var that = this;
        this.api.setMethod("GET");
        this.api.setDataType("JSON");
        this.api.setPath("/crest/dashlimit/" +this.userId );
        this.api.callReq()
            .done(function(data) {
                that.limitCout = data;
            }).fail(function() {
                console.error(that.errorMsg);
            });
    }

    dashBoard.prototype.getDashBoardLimitCount = function() {
        return this.limitCout;
    }

    /**
     * @param dashName 대시보드 이름
     * 대시보드를  신규로 생성한경우
     */
    dashBoard.prototype.createDashBoard = function(dashName) {
    	// 대시보드생성시 대시보드아이디를 임시로 생성한다.
        var pushTemp = {"dashId": Math.floor(Math.random() * 10000) + "c", "dashName": dashName };
        //1.신규 입력정보에 입력
        this.createBoardList.push(pushTemp);
        //2.대시보드 그리는 목록에도 추가
        this.drawBoardList.push(pushTemp);
        //3. 뷰의 대시보드 그리는 기능을 호츌한다.
        this.view.drawDashBoard();
    }

    /**
     * @param scvMenuId 대메뉴 아이디
     * @param dashId 대시보드 아이디
     * @param dashName 대시보드 이름
     * 대시보드 수정 이름만 변경 -- 동일이름 튕김은 컨트롤러 에서 대응한다.
     */
    dashBoard.prototype.updateDashBoard = function(dashId, dashName) {
        var pushTemp = { "dashId": dashId, "dashName": dashName };
        //1. 대시보드 그리는 정보 수정
        this.drawBoardList.forEach(function(item, index) {
            if (item.dashId == dashId) {
                item.dashName = dashName;
                if (isNaN(item.dashId)) item.dashId = dashName + "c"; // 아직 디비 저장전 정보 id 값 이름 + c
            }
        });
        // 뷰의 대시보드 그리는 기능을 호츌한다.
        this.view.drawDashBoard();
    }

    /**
     * @param dashId 대시보드 아이디
     * 대시보드 삭제 한 경우
     */
    dashBoard.prototype.deleteDashBoard = function(dashId) {
        // 대시보드 정보 삭제
        // 1. 그리는 정보 삭제
        this.drawBoardList = this.drawBoardList.filter(function(item) {
            return item.dashId != dashId;
        });

        if (!isNaN(dashId)) {
            // 2. 삭제 대상 정보 추가
            this.deleteBoardList.push(dashId);
            // 3. 수정정보삭제
            this.updateBoardList = this.updateBoardList.filter(function(item) {
                return item.dashId != dashId;
            });
            // 그러지는 정보에서 삭제
            this.drawBoardList = this.drawBoardList.filter(function(item) {
                return item.dashId != dashId;
            });

            // 위젯 정보 삭제 -- 위젯 관련 기능 구현후 컨트롤러 호출
        } else {
            // 4. 신규 정보 삭제
            this.createBoardList = this.createBoardList.filter(function(item) {
                return item.dashId !== dashId;
            });
        }

        // 뷰의 대시보드 그리는 기능을 호츌한다.
        this.view.drawDashBoard();
    }

    // 그려질 대시보드 정보를 전달한다.
    dashBoard.prototype.getDrawBoardList = function() {
        return this.drawBoardList;
    }

    // 확인용도
    dashBoard.prototype.toString = function() {
        return "SETTING.model.dashBoard";
    }
    return dashBoard;
}());