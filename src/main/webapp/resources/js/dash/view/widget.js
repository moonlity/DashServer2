/**
 * @author 송원진
 * @since 2019.02.22
 * <pre> 메인 위젯및 위젯 속성들 관련 뷰 </pre>
 * */

SETTING.createNameSpace("SETTING.view.widget");

SETTING.view.widget = (function() {
    var widget = function() {
        this.controller = null;
    }

    // 컨트롤러 지정
    widget.prototype.setController = function(controller) {
        this.controller = controller;
    }

    // 모델의 데이터 변화시 화면상의 모든 위젯을 그린다.
    widget.prototype.drawWidgets = function(widgetList) {
        $('.grid-stack').data('gridstack').removeAll()
        for (var index = 0; index < widgetList.length; index++) {
            this.drawWidget(widgetList[index]);
        }
    }

    // 위젯 추가를 선택한 경우 위젯을 화면에 추가한다.
    widget.prototype.drawWidget = function(widgetInfo) {
        var that = this;
        var flag = false;
        // 컨트롤러에서 위젯정보를 조회한다.
        var html = ""
        html = this.widgetHtml(widgetInfo);
        // widgetList for 문으로 아래 그리드 스택 data addWidget 을 실행한다.
        if (widgetInfo.curx == 0 && widgetInfo.cury == 0) flag = true;
        $('.grid-stack').data('gridstack').addWidget(html, widgetInfo.curx, widgetInfo.cury,
            widgetInfo.curWidth, widgetInfo.curHeight, flag, widgetInfo.minWidth, widgetInfo.maxWidth, widgetInfo.minHeight, widgetInfo.maxHeight, widgetInfo.widgetId);

        var el = document.getElementById(widgetInfo.widgetId);
        var ela = el.querySelector('a');
        
        ela.addEventListener('click', function() {
            $('.grid-stack').data('gridstack').removeWidget(el)
            that.controller.clickWidgetDeleteBtn(widgetInfo);
        });
        widgetInfo.curx = el.dataset.gsX;
        widgetInfo.cury = el.dataset.gsY;

        return widgetInfo;
    }

    // 위젯 html 생성
    widget.prototype.widgetHtml = function(item) {
        var html = "";
        html += '<div id=' + item.widgetId + ' class = "grid-stack-item" > ';
        html += '<div class="grid-stack-item-content">';
        html += '<div class="tit">';
        html += '<strong>' + item.widgetNm + '</strong>';
        html += '<a href="#" onclick= "event.stopPropagation();" class="xi-trash"><span>삭제</span></a>';
        html += '</div>';
        html += '<div class="cont scrollbar-inner" style="text-align:center">';
        if (item.widgetImg) html += '<img style="max-width: 100%; height: auto;" src="' + item.widgetImg + '" ';
        else html += '<img style="max-width: 100%; height: auto;" src="/resources/images/widget/' + item.widgetId + '.png" ';
        html += ' onerror=this.src=\'/resources/images/widget/' + item.widgetId + '.png\' />';
        html += '</div>';
        html += '<div class="overLayer"><p>위젯의 위치를 이동하여<br />배치를 조절 할 수 있습니다</p></div>';
        html += '</div>';
        html += '</div>';
        return html;
    }

    return widget;
}());