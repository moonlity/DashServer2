/**
 * @author 송원진
 * @since 2019.02.25
 * <pre> 그려지는 위젯의 정보 </pre>
 * */

SETTING.createNameSpace("SETTING.app.widgetInfo");
SETTING.app.widgetInfo = (function() {
    var widgetInfo;
    widgetInfo = function() {

    }
    widgetInfo.dashboardId = "";
    widgetInfo.widgetId = 0;
    widgetInfo.widgetName = 0;
    widgetInfo.widgetWidth = 0; // 현재 위젯의 넓이
    widgetInfo.widgetHeight = 0; // 현재 위젯의 높이
    widgetInfo.minWidth = 0;
    widgetInfo.minHeight = 0;
    widgetInfo.maxWidth = 0;
    widgetInfo.maxHeight = 0;
    widgetInfo.widgetXCoordinate = 0;
    widgetInfo.widgetYCoordinate = 0;
    widgetInfo.widgetImg = "";

    return widgetInfo;
}());