/**
 * @author 송원진
 * @since 2019.01.16
 * @version 1.0
 * 
 * 영역전체에서 사용할 정보 영역 지정하여 사용할 부분 모음
 * 
 */
SETTING.createNameSpace("SETTING.com.Constants");

SETTING.com.Constants = (function() {

    var Constants;

    Constants = function() {
        this.necessaryWidget = [{ svcMenuId: 'C000', widgetId: [104, 117, 118] }]

    };
    Constants.prototype.getNecessaryWidget = function() {
        return this.necessaryWidget;
    };

    Constants.prototype.toString = function() {
        return "SETTING.com.Constants";
    };

    return Constants;

}());