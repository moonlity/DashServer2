/**
 * Create: 2017.09.26
 * Author: 송원진
 * Purpose: gridstack.js + zingchart 샘플구현부분
 */
$(function () {
	var options = {
/*			cellHeight: 420,
			width: 265,
		    verticalMargin: 10,*/
		    itemClass : "grid-stack-items",
		    float: true,

		};
	var grid = $('.grid-stack').gridstack(options);
	//var griddata = grid.data('gridstack');
	var items = [
		{x: 0, y: 0, width: 6, height: 6, id : 'heatmaptest'},
		{x: 0, y: 0, width: 6, height: 6, id : 'rankflowtest'},
		{x: 0, y: 0, width: 6, height: 5, id : 'treemaptest'},
        {x: 0, y: 0, width: 6, height: 5 , id : 'pietest'},
        {x: 0, y: 0, width: 6, height: 5, id : 'ringtest'},
        {x: 0, y: 0, width: 6, height: 7, id : 'linetest'},
        {x: 0, y: 0, width: 6, height: 7, id : 'hbar2test'},
        {x: 0, y: 0, width: 6, height: 7, id : 'wordcloudtest'},
              /*  {x: 6, y: 3, width: 3, height: 3, id : 'testid8'},
        {x: 9, y: 3, width: 3, height: 3, id : 'testid9'},
        {x: 12, y: 3, width: 3, height: 3, id : 'testid10'},
        {x: 0, y: 6, width: 3, height: 3, id : 'testid11'},
        {x: 3, y: 6, width: 3, height: 3, id : 'testid12'}*/
    ];
	GridStackWidget.movable = false; // 움직임통제함
	$.each( items , function(index , node){
		var element = GridStackWidget.addBasicWidget(grid,template1,node.x, node.y, node.width, node.height ,node.id);
		element.find("#chartid").attr("id",node.id);
		if(node.id === 'pietest'){
			element.find("span.title").text("파이차트");
			var  myConfigP1 = $.extend(true, {}, ChartBasicConfig);
			myConfigP1.type = "pie";  // 파이는 pie , 도넛형태는 ring
			myConfigP1.title.text= "파이차트를 그려봅시다.";
			myConfigP1.scaleR = ChartScaleRConfig;
			var ChartSeriesConfigcopyP1 =$.extend(true, {}, ChartSeriesConfig);
			var ChartSeriesConfigcopyP2 =$.extend(true, {}, ChartSeriesConfig);
			var ChartSeriesConfigcopyP3 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopyP1.values=[20];
			ChartSeriesConfigcopyP2.values=[10];
			ChartSeriesConfigcopyP3.values=[50];
			myConfigP1.series.push(ChartSeriesConfigcopyP1);
			myConfigP1.series.push(ChartSeriesConfigcopyP2);
			myConfigP1.series.push(ChartSeriesConfigcopyP3);
			
			renderChart(myConfigP1 , 'pietest');
		}else if(node.id === 'ringtest'){
			element.find("span.title").text("링차트");
			var  myConfigP2 = $.extend(true, {}, ChartBasicConfig);
			myConfigP2.type = "ring";  // 파이는 pie , 도넛형태는 ring
			myConfigP2.title.text= "링차트를 그려봅시다.";
			//myConfigP2.width = "100%";
			//myConfigP2.height = "50%";
			myConfigP2.scaleR = ChartScaleRConfig;
			//myConfigP1.scaleR.aperture = 270;
			var ChartPlotConfigCopyp1 =$.extend(true, {}, ChartPlotConfig);	
			var ChartSeriesConfigcopyP12 =$.extend(true, {}, ChartSeriesConfig);
			var ChartSeriesConfigcopyP22 =$.extend(true, {}, ChartSeriesConfig);
			var ChartSeriesConfigcopyP32 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopyP12.values=[200];
			ChartSeriesConfigcopyP12.text="하나";
			ChartSeriesConfigcopyP12.lineColor="red";
			ChartSeriesConfigcopyP22.values=[110];
			ChartSeriesConfigcopyP22.text="둘";
			ChartSeriesConfigcopyP22.lineColor="red";
			ChartSeriesConfigcopyP32.values=[510];
			ChartSeriesConfigcopyP32.text="셋";
			ChartSeriesConfigcopyP32.lineColor="red";
			myConfigP2.plot = ChartPlotConfigCopyp1;
			myConfigP2.tooltip = CharTooltipConfig;
			myConfigP2.series.push(ChartSeriesConfigcopyP12);
			myConfigP2.series.push(ChartSeriesConfigcopyP22);
			myConfigP2.series.push(ChartSeriesConfigcopyP32);
			renderChart(myConfigP2 , 'ringtest');
		}else if(node.id === 'linetest'){
			element.find("span.title").text("라인차트");

			// 라인차트그려보자
			// 1 . 기본 차트 설정부분을 선언한다. 값들의 상호 영향을 미칠수 있으니 꼭 복사한다.
			var  myConfigL1 = $.extend(true, {}, ChartBasicConfig);
			myConfigL1.type = "line"; // 차트의 종류를 선언하낟.
			// 2. 제목 서브 제목을 설정한다.
			myConfigL1.title.text= "라인차트를 그려봅시다."; // 제목을 지정한다.  -- 필요없을시 선언안하거나 공백

			// 3. 라인 바차트형식 가로축을 설정한다. 표시될 최소값,최고 값,한화면에 나타날 갯수지정한다.
			myConfigL1.scaleX.values = "1998:2010:1";
			myConfigL1.scaleX.step = "year";
			myConfigL1.scaleX.zooming =1;
			// 4. 세로축에 관련된 설정을 한다. - 가로축의 경우 값설정이 없다면 1부터 시작하지만 세로축은 series 의 값에 따라 기본저으로 표현이된다.
			//myConfig.scaleX.values = "";
			// scale 에 관련된 세부 설정은 ChartScaleXConfig , ChartScaleYConfig 
			myConfigL1.scaleY.thousandsSeparator = ",";

			// 5. legend 를 설정한다. 차트 하단이나 측면에 목차형식표현
			myConfigL1.legend = ChartLegendConfig;
			// 5.1 legend 세부 설정을 한다.
			myConfigL1.legend.draggable = 1;
			myConfigL1.legend.maxItems = 2;
			myConfigL1.legend.overflow = "page";
			myConfigL1.legend.margin = "5px 0px 15px 20px";
			myConfigL1.legend.padding = "0";

			// 6 . 줌차트를 위한 미리보기 기능구현 
			//myConfigL1.myConfigL1.live = 1; // 미리보기
			myConfigL1.preview = CharPreviewConfig;
			// 7. 차트에 표현될 값과 값들이 표현된 라인이나 파이 바등의 스타일을 지정한다.
			// 7-1 표현된 값의 영역수 만큼 지정해야 한다.
			var ChartSeriesConfigcopyL1 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopyL1.values = [310,1320,1430,1410,1420,1450,1400,1480,1360,1400,1500,1501,1510,1503,1507]; // 이값을 파악해서 scare 부분을 조정해줘야 가로 축이 보기 좋게 표현된다.
			ChartSeriesConfigcopyL1.lineColor = "blue"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL1.backgroundColor = "blue"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL1.text = "값1!"; // 목차등에 표시될 값의 이름
			// 8. 차트에 표시될 마커
			var ChartMarkerConfigCopyL1 =$.extend(true, {}, ChartMarkerConfig);
			ChartMarkerConfigCopyL1.backgroundColor = "blue";
			ChartMarkerConfigCopyL1.borderColor = "gray";
			ChartMarkerConfigCopyL1.borderWidth = 1;
			ChartMarkerConfigCopyL1.size = 3;
			
			ChartSeriesConfigcopyL1.marker = ChartMarkerConfigCopyL1;
			myConfigL1.series.push(ChartSeriesConfigcopyL1);
			
			
			var ChartSeriesConfigcopyL2 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopyL2.values = [2400,2420,2422,2415,1420,2020,2110,1480,1760,1980,2000,2101,1787,1456,1211]; // 이값을 파악해서 scare 부분을 조정해줘야 가로 축이 보기 좋게 표현된다.
			ChartSeriesConfigcopyL2.lineColor = "green"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL2.backgroundColor = "green"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL2.text = "라인2!"; // 목차등에 표시될 값의 이름

			myConfigL1.series.push(ChartSeriesConfigcopyL2);
			
			var ChartSeriesConfigcopyL3 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopyL3.values = [2000,1420,2400,2115,1020,2090,2210,1780,1960,2080,2000,3101,1987,1746,211]; // 이값을 파악해서 scare 부분을 조정해줘야 가로 축이 보기 좋게 표현된다.
			ChartSeriesConfigcopyL3.lineColor = "#00afa4"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL3.backgroundColor = "#00afa4"; // 라인차트인경우 색지정
			ChartSeriesConfigcopyL3.text = "라인3!"; // 목차등에 표시될 값의 이름

			myConfigL1.series.push(ChartSeriesConfigcopyL3);

			renderChart(myConfigL1 , 'linetest');	
		}else if(node.id === 'hbar2test'){
			element.find("span.title").text("비교바분리차트");
			var  myMultConfig = $.extend(true, {}, ChartGrahsetConfig);
			var  myConfigM1 = $.extend(true, {}, ChartBasicConfig);
			myConfigM1.type = "hbar"; // 차트의 종류를 선언하낟.
			myConfigM1.width = "40%";
			myConfigM1.height = "90%";
			myConfigM1.x = "0%";
			myConfigM1.y = "0";
			var ChartSeriesConfigcopym1 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopym1.values = [-310,-1320,-1430,-1410,-1420,-1450,-1400,-1480,-1360,-1400,-1500,-1501,-1510,-1503,-1507]; // 이값을 파악해서 scare 부분을 조정해줘야 가로 축이 보기 좋게 표현된다.
			ChartSeriesConfigcopym1.text = "값1!"; // 목차등에 표시될 값의 이름
			myConfigM1.series.push(ChartSeriesConfigcopym1);
			myConfigM1.scaleX.values=['','','','','','','','','','','','','','',];
			myConfigM1.scaleX.lineWidth=0;
			myConfigM1.scaleX.tick={visible:0};
			//myConfigM1.scaleX.tick.visible=0;
			
			myConfigM1.scaleX2.values="27:33:1";
			myConfigM1.scaleX2.values=['웃다','감사하다','잘하다','좋은','지지하다','시작하다','기쁨','사람','했빛','긍정','플러스','이익','이자','소득',];
			myMultConfig.graphset.push(myConfigM1);
			
			var  myConfigM2 = $.extend(true, {}, ChartBasicConfig);
			myConfigM2.type = "hbar"; // 차트의 종류를 선언하낟.
			myConfigM2.width = "40%";
			myConfigM2.height = "90%";
			myConfigM2.x = "50%";
			myConfigM2.y = "0";
			myConfigM2.scaleX.values=['슬픔','자책하다','잘못하다','나쁜','철회하다','낭비하다','분노','바보','음지','부정','마이너스','비용','월세','지출',];
			var ChartSeriesConfigcopym2 =$.extend(true, {}, ChartSeriesConfig);
			ChartSeriesConfigcopym2.values = [310,1320,1430,1410,1420,1450,1400,1480,1360,1400,1500,1501,1510,1503,1507]; // 이값을 파악해서 scare 부분을 조정해줘야 가로 축이 보기 좋게 표현된다.
			ChartSeriesConfigcopym2.text = "값2!"; // 목차등에 표시될 값의 이름
			ChartSeriesConfigcopym2.backgroundColor = "red"; // 목차등에 표시될 값의 이름
			myConfigM2.series.push(ChartSeriesConfigcopym2);
			myMultConfig.graphset.push(myConfigM2);
			renderChart(myMultConfig , 'hbar2test');
		}else if(node.id === 'wordcloudtest'){
			element.find("span.title").text("워드크라우드차트");
			var  myConfig = $.extend(true, {}, ChartBasicConfig);
			myConfig.type = "wordcloud";
			myConfig.x = "0";
			myConfig.y = "0";
			var ChartOptionsConfigCopy =$.extend(true, {}, ChartOptionsConfig);
			ChartOptionsConfigCopy.text = "jQuery 파일의 압축 및 압축되지 않은 사본을 사용할 수 있습니다. 압축되지 않은 파일은 개발 또는 디버깅 중에 가장 잘 사용됩니다. 압축 파일은 대역폭을 절약하고 프로덕션의 성능을 향상시킵니다. 압축 파일로 디버깅 할 때 사용할 원본 맵 파일을 다운로드 할 수도 있습니다. 지도 파일은 사용자가 jQuery를 실행하는 데 필요하지 않으며 단지 개발자의 디버거 사용 경험을 향상시킵니다. jQuery 1.11.0 / 2.1.0에서 // sourceMappingURL 주석은 압축 파일에 포함되어 있지 않습니다.";
			myConfig.options = ChartOptionsConfigCopy;
			renderChart(myConfig , 'wordcloudtest');
		}else if(node.id === 'treemaptest'){
			element.find("span.title").text("트리맵테스트");
			// 트리맵은 다른 속성항목이 있다면 그려지지 않는다. 1차 연관어만 하므로 child 는 생략함
			var  myConfig = $.extend(true, {}, ChartTreemapConfig);
			myConfig.series.push({text:"신라면",value:102,fontSize : 200});
			myConfig.series.push({text:"너구리",value:120});
			myConfig.series.push({text:"진라면",value:92});
			myConfig.series.push({text:"짬뽕",value:52});
			myConfig.series.push({text:"짜장면",value:72});
			myConfig.series.push({text:"백반",value:32});
			// 색표현방식 선택  palette , transition 선택
			myConfig.options.aspectType = "palette";
			myConfig.options.palette = ChartInfoConfig.backgroundColor;
			myConfig.options.tooltipBox =$.extend(true, {}, CharTooltipConfig);
			myConfig.options.tooltipBox.text = "값은 : %value";
			/*myConfig.options.aspectType = "transition";
			myConfig.options.colorStart = "#acd806";
			myConfig.options.colorEnd = "#8677f5";*/
			renderChart(myConfig , 'treemaptest');
		}else if(node.id === 'rankflowtest'){
			element.find("span.title").text("rankflow테스트");
			// 트리맵은 다른 속성항목이 있다면 그려지지 않는다. 1차 연관어만 하므로 child 는 생략함
			var  myConfig = $.extend(true, {}, ChartRankFlowConfig);

			myConfig.options.style.tooltip = $.extend(true, {}, CharTooltipConfig);
			myConfig.options.style.tooltip.text = "%text:  %scale-value : %rank위";
			// 상단목차부분
			myConfig.scaleX.labels = [ "2017.01.01" , "2017.01.02" , "2017.01.03" , "라면"];
			myConfig.scaleX.values = [ "2017년1월1일" , "2017년1월2일" , "2017년1월3일" , "라면"];
			
			myConfig.series.push({text:"신라면",ranks:[1 ,1, 1, 2],rank : 1});
			myConfig.series.push({text:"너구리",ranks:[2 ,3, 4,1],rank : 3});
			myConfig.series.push({text:"진라면",ranks:[3 ,2, 2,3],rank : 2});
			myConfig.series.push({text:"삼양라면",ranks:[4 ,4, 3,4],rank : 4});
	
			// 색표현방식 선택  palette , transition 선택
			myConfig.options.palette = ChartInfoConfig.lineColor;
			renderChart(myConfig , 'rankflowtest');
		}else if(node.id === 'heatmaptest'){
			element.find("span.title").text("heatmap테스트");
			// 트리맵은 다른 속성항목이 있다면 그려지지 않는다. 1차 연관어만 하므로 child 는 생략함
			var  myConfig = $.extend(true, {}, ChartHeatMapConfig);

			// 상단목차부분
			myConfig.scaleX.labels = [ "2017.01.01" , "2017.01.02" , "2017.01.03" , "2017.01.04" , "2017.01.04"];
			// 왼쪽목차부분
			myConfig.scaleY.labels = [ "백반" , "카페" , "우동" , "라면"];
			// 표시되는 룰지정
			myConfig.plot.rules.push({rule: "%v < 31" , backgroundColor : ChartInfoConfig.mediaColor.T} );
			myConfig.plot.rules.push({rule: "%v < 61 && %v > 32 " , backgroundColor : ChartInfoConfig.mediaColor.M} );
			myConfig.plot.rules.push({rule: "%v < 91 && %v > 62 " , backgroundColor : ChartInfoConfig.mediaColor.F} );
			myConfig.plot.rules.push({rule: "%v < 120 && %v > 92 " , backgroundColor : ChartInfoConfig.mediaColor.C} );
			myConfig.plot.rules.push({rule: "%v > 121" , backgroundColor : "blue"} );
			myConfig.series.push({values:[122 , 130 , 150 , 135 , 190]}); // 백반
			myConfig.series.push({values:[120 , 100 , 150 , 70 , 130]}); // 카페
			myConfig.series.push({values:[10 , 10 , 30 , 20 , 70]});  // 우동
			myConfig.series.push({values:[1 , 1 , 3 , 4 , 5]});  // 라면
	
			renderChart(myConfig , 'heatmaptest');
		}
		
	});	

   
    $('#add-new-widget').on("click" , function(){
    	GridStackWidget.addBasicWidget($('.grid-stack'),template1,locx,locy,width,height,"id");
    });
    
    $('#make-widget').on("click" , function(){
    	//GridStackWidget.makeWidget();	
    });
    
    $('.searchArea .searchBox .btn').on("click" , function(){
    	
    	var ParamLoder1 =$.extend(true, {}, ParamLoder);
    	
    	ParamLoder1.size = 55;
    	ParamLoder1.offset = 33;
    	console.log($.param(ParamLoder1.getBasicRequestParam()));
    	//ComUtil.exportExcelTable("table","tte");
    	UserUtil.getDashBoardMenu('C000');
    	
    	// 대시보드 생성하는 거연습
    	var source = Handlebars.compile($("#templateDashboard1").html);
    	var data = [
    		{dashboardname:'aaaaa'},
    		{dashboardname:'aaaaa1'},
    		{dashboardname:'aaaaa2'}
    	];
    	$("ul.menu").html(source(data));
    	
    });

});

var template1 = "<div><div class=\"trendup_widget w2 h1 grid-stack-item-content\">                                                                                                                                                                                                                                          "
	+"		    <div class=\"widge_titlea_area\">                                                                                                                                                                                                                                  "
	+"		    	<span class=\"title\">감성어 차트</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                              "
	+"		    </div>                                                                                                                                                                                                                                                             "
	+"		    <div class=\"widget_container\" id = \"chartid\">                                                                                                                                                                                                                                   "
	+"		    </div>                                                                                                                                                                                                                                                             "
	+"	   </div>  </div>";