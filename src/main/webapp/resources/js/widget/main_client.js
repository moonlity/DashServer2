/**
 * @fileoverview 위젯 객체 기본화면 구성을 위한 가장 윗단계 최초부분 - 여기서 부터 아래로 찾아가면 된다.
 * @author 송원진
 * @version 0.1
 * @since 2018.10.02 
 */

WIDGET.createNameSpace("WIDGET.before.MainClient");
// 화면상의 기본 위젯 껍칠에 해당
WIDGET.before.MainClient = (function(){
	var MainClient = function(){}; //내부에 MainClient 객체 생성
	
	MainClient.prototype.main = function(){
		var after = WIDGET.before;
		
		var widgetArr = []; // 위젯의 경우 여러개가 발생할수 있다.
		// 가장 기본적인 표면적인 위젯만 그리고 나머지는 widget 부터 생성한다.
		// 각위젯 화면을 그릴 데이터 displayInfo 및 기본예제
		var displayInfo = [];
		/*{[
			{
				,"widgetId":116
				,"widgetNm":"TPO 순위"
				,"widgetWidth":6
				,"widgetHeight":1
				,"widgetXCoordinate":0.0
				,"widgetYCoordinate":7.0
				,"widgetOrder":0
			}
		]}*/
		// 이곳에 각 위젯의 기본 정보 호출 후 widget 에 담아야 한다. 여기에 로직 추가해야함!!!!!!
		displayInfo.forEach(function(val,index){
			var widget = new widgetgaching(val ); // widgetgaching 은 단위 위젯의 최상의 개념으로 작성필요 내부에 위젯 상세 화면 구성 + 각 기능별 인터페이스등이 정의됨
			widgetArr.push(widget);
		});
	}
}());