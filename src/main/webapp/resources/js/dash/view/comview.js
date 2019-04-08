/**
 * @author 송원진
 * @since 2019.02.26
 * <pre> 공통적으로 호출되는 화면 요소들정의 </pre>
 * */
SETTING.createNameSpace("SETTING.view.comview");

SETTING.view.comview = (function() {
    var comview;
    comview = function() {
        this.controller = null;
    }

    comview.prototype.setController = function(controller) {
        this.controller = controller;
    }

    // 1줄 안내 모달창 생성
    comview.prototype.oneRowModal = function(message, id) {
        var that = this;
        var html = "";
        html += '<div class="modal alertType" style="display: inline-block;">';
        html += '<div class="layerPopWrap">';
        html += '<i class="xi-error-o"></i>';
        html += '<div class="cont">';
        html += message;
        html += '</div>';
        html += '<div class="btn"><a href="#" class="blue">확인</a></div>';
        html += '</div>';
        html += '<a href="#" class="close-modal xi-close"><span>Close</span></a></div>';
        // 모달은 제이쿼리를 사용함
        $("#" + id).html(html).modal();
        $("#" + id).find('a').on('click', function() {
            that.modalClose();
        });
    }

    // html 과 사용된 함수가 전달된경우
    comview.prototype.eventModal = function(html, id) {

    }

    comview.prototype.modalClose = function() {
        var count = $.modal.length;
        while (count > 0) {
            $.modal.close();
            count--;
        }
    }

    return comview;
}());