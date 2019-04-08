var tu = {};
var tgArr = [];
//datePicker 
var datepickerSetting = function(){
	// 서비스 검색기간별 달력 상단 기간 선택 버튼 생성
	var callist = [] , service_term = 0, minusy = 0, minusm = 0;
	service_term = $("#perioButtonT").data("service_term"); 
	if(service_term == undefined)service_term = 12;
	if($("#perioButtonT").length > 0 ){
		if(service_term < 13){
			if(service_term == 12){
				minusy = 1;
				minusm = 0				
			}else {
				minusy = 0;
				minusm = service_term;
			}
			callist.push({weekVal : '1w' , weekTxt:'1주' , checked:false });
			callist.push({weekVal : '2w' , weekTxt:'2주' , checked:true});
			callist.push({weekVal : '3w' , weekTxt:'3주' , checked:false});
			callist.push({weekVal : '1m' , weekTxt:'1개월' , checked:false});
			callist.push({weekVal : '3m' , weekTxt:'3개월' , checked:false});
			callist.push({weekVal : '6m' , weekTxt:'6개월' , checked:false});
			callist.push({weekVal : '1y' , weekTxt:'1년' , checked:false});
		}else if(service_term >= 13 && service_term <25 ){
			if(service_term == 24){
				minusy = 2;
				minusm = 0				
			}else {
				minusy = 1;
				minusm = service_term - 12;
			}
			callist.push({weekVal : '1w' , weekTxt:'1주' , checked:false });
			callist.push({weekVal : '2w' , weekTxt:'2주' , checked:true});
			callist.push({weekVal : '3w' , weekTxt:'3주' , checked:false});
			callist.push({weekVal : '1m' , weekTxt:'1개월' , checked:false});
			callist.push({weekVal : '3m' , weekTxt:'3개월' , checked:false});
			callist.push({weekVal : '1y' , weekTxt:'1년' , checked:false});
			callist.push({weekVal : '2y' , weekTxt:'2년' , checked:false});
		}else{
			if(service_term == 36){
				minusy = 3;
				minusm = 0				
			}else {
				minusy = 2;
				minusm = service_term - 24;
			}
			callist.push({weekVal : '2w' , weekTxt:'2주' , checked:true});
			callist.push({weekVal : '1m' , weekTxt:'1개월' , checked:false});
			callist.push({weekVal : '3m' , weekTxt:'3개월' , checked:false});
			callist.push({weekVal : '6m' , weekTxt:'6개월' , checked:false});
			callist.push({weekVal : '1y' , weekTxt:'1년' , checked:false});
			callist.push({weekVal : '2y' , weekTxt:'2년' , checked:false});
			callist.push({weekVal : '3y' , weekTxt:'3년' , checked:false});
		}
		var source = $("#perioButtonTemplate").html();
		var template = Handlebars.compile(source);
		html = template({list:callist});
		$("#perioButtonT").html('');
		$("#perioButtonT").append(html);
		
		
	}	
	// 서비스 가능기간 값 생성함
	var limitDay = new Date();
	limitDay.setFullYear (limitDay.getFullYear()-minusy); 
	limitDay.setMonth(limitDay.getMonth()-minusm+1); 
	if(limitDay.getMonth() < 10) {
		if(limitDay.getDate() >= 10 ) limitDay =  limitDay.getFullYear() + ".0" + limitDay.getMonth() + "." +limitDay.getDate()
		else 	limitDay =  limitDay.getFullYear() + ".0" + limitDay.getMonth() + ".0" +limitDay.getDate()
	}else{
		if(limitDay.getDate() >= 10 ) limitDay =  limitDay.getFullYear() + "." + limitDay.getMonth() + "." +limitDay.getDate()
		else 	limitDay =  limitDay.getFullYear() + "." + limitDay.getMonth() + ".0" +limitDay.getDate()
	}
	var dFormat = "yy.mm.dd";
	var from = $( "#from" );
	
	from.datepicker( "option", "minDate", "-"+service_term+"m" );
	
	from.datepicker({
		defaultDate: "-2w",
		dateFormat : dFormat,
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	}).on( "change", function(e) {
		var fdv = $(this).datepicker().val();
		var tdv = to.datepicker().val();
		to.datepicker( "option", "minDate", getDate( fdv ) );
		from.datepicker( "option", "minDate", "-"+service_term+"m" );
		$(".period .term").text('선택');
		var date1 = fdv;
		var date2 = limitDay;
		if(fdv < limitDay){
			return;
		}else{changePeiodArea(fdv,tdv);}
	});

	var to = $( "#to" );
	to.datepicker( "option", "minDate", "-"+service_term+"m" );
	to.datepicker({
		defaultDate: new Date ,
		dateFormat : dFormat,
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	}).on( "change", function(e) {
		var fdv = from.datepicker().val();
		var tdv = $(this).datepicker().val();
		from.datepicker( "option", "maxDate", getDate( tdv ) );
		$(".period .term").text('선택');
		changePeiodArea(fdv,tdv);
	});
	

	
	function getDate( dateValeu ) {
		var date;
		try {
			date = $.datepicker.parseDate( dFormat, dateValeu );
		} catch( error ) {
			date = null;
		}

		return date;
	}

	//from.trigger("change");
	//to.trigger("change");
	initFunc();
	
	$("input[name=periodCheck]").on("change",function(){
		var pv = $(this).val();
		var fromDate = to.datepicker("getDate");
		//버튼 내용을 상단 영역에 입력
		var btnNm = $(this).next('label');
		$(".period .term").text(btnNm.text());
		switch(pv){
			case "1w" : 
					fromDate.setDate(fromDate.getDate() - 7)
				break
			case "2w" : 
					fromDate.setDate(fromDate.getDate() - 14)
				break
			case "3w" : 
					fromDate.setDate(fromDate.getDate() - 21)
				break
			case "1m" : 
					fromDate.setMonth(fromDate.getMonth() - 1)
				break
			case "3m" : 
				fromDate.setMonth(fromDate.getMonth() - 3)
			break
			case "6m" : 
					fromDate.setMonth(fromDate.getMonth() - 6)
				break
			case "1y" : 
					fromDate.setFullYear(fromDate.getFullYear() - 1)
				break
			case "2y" : 
					fromDate.setFullYear(fromDate.getFullYear() - 2)
				break
			case "3y" : 
				fromDate.setFullYear(fromDate.getFullYear() - 3)
			break
		
		}
		changeFromPeriod(fromDate)
	})
	function changeFromPeriod(fromDate){
		from.datepicker( "setDate", fromDate );
		var dv = from.datepicker().val();
		//from.trigger("change");
		$(".period .fromArea").text(dv);
	}
	
	function changePeiodArea(fromDateValue,toDateValue){
		$(".period .fromArea").text(fromDateValue);
		$(".period .toArea").text(toDateValue);
	}
	
	function initFunc(e){
		var fromDay = new Date();
		var fromDayText = "";
		var year =fromDay.getFullYear();
		var month = fromDay.getMonth()+1;
		var day = fromDay.getDate();
		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;
		fromDayText = year + "." + month +"." +day;
		
		/*fromDay.setMonth(fromDay.getMonth()+1); 
		if(fromDay.getMonth() == 0){
			fromDay.setYear(fromDay.getFullYear()-1);
 			fromDay =  fromDay.getFullYear() + ".12." +fromDay.getDate()
		}
 		else if(fromDay.getMonth() >0 && fromDay.getMonth() < 10) {
 			if(fromDay.getDate() >= 10 ) fromDay =  fromDay.getFullYear() + ".0" + fromDay.getMonth() + "." +fromDay.getDate()
 			//else 	fromDay =  fromDay.getFullYear() + ".0" + fromDay.getMonth() + fromDay.getDate()
 			else 	fromDay =  fromDay.getFullYear() + ".0" + fromDay.getMonth() + ".0" +fromDay.getDate()
 		}
		else {
 			if(fromDay.getDate() >= 10 ) fromDay =  fromDay.getFullYear() + "." + fromDay.getMonth() + "." +fromDay.getDate()
 			else 	fromDay =  fromDay.getFullYear() + "." + fromDay.getMonth() + fromDay.getDate()
 			//else 	fromDay =  fromDay.getFullYear() + "." + fromDay.getMonth() + ".0" +fromDay.getDate()
 		}*/
 		
 		$(".period .toArea").text(fromDayText);
 		var periodStr = "";
 		$("[name=periodCheck]").each(function(index , el){
			if($("[name=periodCheck]").eq(index).prop("checked")){
				$("[name=periodCheck]").eq(index).trigger('click');
				periodStr = $("[name=periodCheck]").eq(index).val();
			}
			
		}); 
 		fromDay= new Date();
 		switch(periodStr){
		case "1w" : 
			fromDay.setDate(fromDay.getDate() - 7)
			break;
		case "2w" : 
			fromDay.setDate(fromDay.getDate() - 14)
			break;
		case "3w" : 
			fromDay.setDate(fromDay.getDate() - 21)
			break;
		case "1m" : 
			fromDay.setMonth(fromDay.getMonth() - 1)
			break;
		case "3m" : 
			fromDay.setMonth(fromDay.getMonth() - 3)
		break
		case "6m" : 
			fromDay.setMonth(fromDay.getMonth() - 6)
			break;
		case "1y" : 
			fromDay.setFullYear(fromDay.getFullYear() - 1)
			break;
		case "2y" : 
			fromDay.setFullYear(fromDay.getFullYear() - 2)
			break
		case "3y" : 
			fromDay.setFullYear(fromDay.getFullYear() - 3)
		break;
	
	}
 		
 		
 		fromDayText = "";
		year =fromDay.getFullYear();
		month = fromDay.getMonth()+1;
		day = fromDay.getDate();
		if(month < 10) month = "0"+month;
		if(day < 10) day = "0"+day;
		fromDayText = year + "." + month +"." +day;
		
		
 		// 제공받은 달력 오류로 인한 임시수정
 /*		fromDay.setMonth(fromDay.getMonth()+1); 
		if(fromDay.getMonth() == 0){
			fromDay.setYear(fromDay.getFullYear()-1);
			if(fromDay.getDate() < 10){
				fromDay =  fromDay.getFullYear() + ".12.0" +fromDay.getDate()
			}else fromDay =  fromDay.getFullYear() + ".12." +fromDay.getDate()
		}
 		else if(fromDay.getMonth() >0 && fromDay.getMonth() < 10) {
 			if(fromDay.getDate() >= 10 ) fromDay =  fromDay.getFullYear() + ".0" + fromDay.getMonth() + "." +fromDay.getDate()
 			else 	fromDay =  fromDay.getFullYear() + ".0" + fromDay.getMonth() + ".0" +fromDay.getDate()
 		}else{
 			if(fromDay.getDate() >= 10 ) fromDay =  fromDay.getFullYear() + "." + fromDay.getMonth() + "." +fromDay.getDate()
 			else 	fromDay =  fromDay.getFullYear() + "." + fromDay.getMonth() + ".0" +fromDay.getDate()
 		}*/
 		$(".period .fromArea").text(fromDayText);
 		
 		

	}
	
};

(function(window, $) {

	var CommonUI = (function($, undefined) {
		var _CommonUI = function() {
			// property----------------
		}
		_CommonUI.extend = function(a, b) {
			var spp = a.prototype;
			for ( var property in b) {
				spp[property] = b[property];
			}
			return a;
		};
		_CommonUI.prototype._applyOptions = function(op, applyO) {
			var margeO = {};
			for ( var attrname in op) {
				margeO[attrname] = op[attrname];
			}
			for ( var attrname in applyO) {
				margeO[attrname] = applyO[attrname];
			}
			return margeO

		};

		return _CommonUI;
	})(!!jQuery ? jQuery : false);


	// TAB UI
	/*
	 * var tab = new rs.ui.Toggle(); tab.show({selector : {menu : $("a"), content :
	 * $("b")} , start : 0 , tabClass : "on", contClass:"off" });
	 */
	CommonUI.Toggle = function() {
		CommonUI.call(this, arguments);
		this._options = {
			
			tglArea : null,
			tglBtn : ".drop-bt",
			tglCont : ".drop-ct",
			innerBtn : "li",
			closeBtn : ".btnClose",
			closeBtn2 : ".btnCancel",

			start : 0,
			tabClass : "on",
			closeCallback : null,
			subMenuCallback : null,
			setIndex: false,
			hashEvent: false
		}
		
		this.tglObj = null;
		this.tglArea = null;
		this.tglBtn = null;
		this.tglCont = null;
		this.innerBtn = null;
		this.closeBtn = null;
		this.closeBtn2 = null;
		this.cIdx = 0;
		this.tg = null;
		this.setIndex = false;
		
	}
	CommonUI.Toggle.prototype = new CommonUI();
	CommonUI.extend(CommonUI.Toggle, {
		show : function(opt) {
			if (opt) {
				this._options = this._applyOptions(this._options, opt);
			}
			this._init();
		},

		_init : function() {
			var opt = this._options;
			this.tglArea = opt.tglArea;
			this.tglObj = this.tglArea;
			
			this.tglBtn = this.tglObj.find("" + opt.tglBtn).eq(0);
			this.tglCont = this.tglObj.find("" + opt.tglCont).eq(0);
			this.innerBtn = this.tglCont.find("" + opt.innerBtn);
			this.closeBtn = this.tglCont.find("" + opt.closeBtn);
			this.closeBtn2 = this.tglCont.find("" + opt.closeBtn2);
			this.closeCallback = opt.closeCallback;
			this.subMenuCallback = opt.subMenuCallback;
			
			this._hashHandler();
			
			
			this._pushToogle();
			
		},
		_hashHandler : function(){
			var that = this;
			var scName = "" + that.tglObj.selector + " "+that._options.tglBtn;
			var scInnerName = "" + that.tglObj.selector + " "+that._options.tglCont + " "+that._options.innerBtn;

			that.tglBtn.off("click").on("click",function(e){

				e.preventDefault();
				if(!$(this).closest(".drop-ar").hasClass("dragged")){
					if($(this).hasClass("open")){
						that.hideCont();
					}else {
						
						if(that.closeCallback != null)that.closeCallback();
						that.tglCont.show();
						$(this).addClass("open");
					}
				}
				
			})
			
			/* 2018-01-16 수정
			that.innerBtn.off("click").on("click",function(e){
				
				if(that.subMenuCallback != null)that.subMenuCallback(e,$(this),that.tglObj);
				
				if($(this).parent().find("input").length <= 0 && !that.tglObj.hasClass("non-ch")){
					
					that.tglCont.hide();
					that.tglBtn.removeClass("open");
				}
			})
			*/

			that.innerBtn.off("click").on("click",function(e){
				if(!$(this).parent().hasClass("ui-datepicker-header") ) {
				   if(that.subMenuCallback != null)that.subMenuCallback(e,$(this),that.tglObj);
				   
				   if($(this).parent().find("input").length <= 0 && !that.tglObj.hasClass("non-ch")){
					  
					  /*that.tglCont.hide();
					  that.tglBtn.removeClass("open");*/
					  
					  if(!that.tglObj.hasClass("period")){
						 that.tglCont.hide();
						 that.tglBtn.removeClass("open");
					  }
				   }
				}else{
					datepickerSetting();
			//	  $(".ui-datepicker-current-day").trigger("click");
				
				}
				
			 })

			that.closeBtn.off("click").on("click",function(e){
				that.tglCont.hide();
				that.tglBtn.removeClass("open");
				e.preventDefault();
				
			})
			
			that.closeBtn2.off("click").on("click",function(e){
				that.tglCont.hide();
				that.tglBtn.removeClass("open");
				e.preventDefault();
				
			})

		},
		hideCont : function(){
			var that = this;
			if(that.tglBtn.hasClass("open")){
				that.tglCont.hide();
				that.tglBtn.removeClass("open");
			}
		
		}
		,
		
		getArea : function(){
			var that = this;
			return that.tglObj
		},

		_pushToogle : function(){
			tgArr.push(this);
		}

	})
	


	// 슬라이드 UI
	/*
	 * var slide = new rs.ui.Slide({item : $("a"), next : $("b"), prev :$("c")}); slide.show({dir : 'vertical'});
	 */
	CommonUI.Slide = function() {
		CommonUI.call(this, arguments);	
		this._options = {
			dir : "vertical"
		};
		
		this.content = arguments[0] || null;
		this.cIdx = 0;
		this.pIdx = 0;
		this.totalNum = 0;
		this.timerID = null;
	}
	CommonUI.Slide.prototype = new CommonUI();
	CommonUI.extend(CommonUI.Slide, {
		show : function(opt) {
			if (opt) {
				this._options = this._applyOptions(this._options, opt);
			}
			this._init();
			
		},
		_init : function() {
			var opt = this._options;
			var arg = this.content;
			this.item = arg.item;
			this.next = arg.next;
			this.prev = arg.prev;
			this.dir = opt.dir;
			this.itemH = this.item.outerHeight(true);
			this.totalNum = this.item.size();
			
			this._setNode();
			
			if(this.item.size() >= 1){
				this._setEvent();
			}
			this._timer();
			
		},
		_setNode : function(){
			var node = this.item;
			var taht = this;
			node.css("position","absolute");
			
			node.each(function(i){
				var tg = $(this);
				tg.css("top",taht.itemH * i);
			})
			
		},
		_setEvent : function() {
			var that = this;
			this.next.off("click").on("click", {
				me : this
			}, function(e) {
				e.preventDefault();
				var me = e.data.me;
				me._next();
				
			})
			this.prev.off("click").on("click",{
				me : this
			}, function(e) {
				e.preventDefault();
				var me = e.data.me;
				me._prev();
			})
			
			
			$(".rollingNotice").on({
				"mouseenter" : function(){
					clearInterval(that.timerID);
				},
				"mouseleave" : function(){
					that._timer();
				},
				
			})
		},
		_timer :function(){
			var that = this;
			that.timerID = setInterval(function(){that._next()},4000);
		},
		_next : function(){
			this.pIdx = this.cIdx;
			this.cIdx++;
			if(this.cIdx >= this.totalNum ){
				this.cIdx = 0;
			}
			this._moveNode("next");
		},
		_prev : function(){
			this.pIdx = this.cIdx;
			this.cIdx--;
			if(this.cIdx < 0){
				this.cIdx = this.totalNum -1;
			}
			this._moveNode("prev");
		},
		_getCurrent : function(){
			return this.item.eq(this.cIdx);
		},
		_moveNode : function(dir){
			var node = this.item;
			var cInitPos = 0;
			var pEndPos = 0;
			if(dir == "next"){
				cInitPos = this.itemH;
				pEndPos  =  -1*(this.itemH);
			}else{
				cInitPos = -1*(this.itemH);
				pEndPos =  this.itemH;
			}
			
			//node.eq(this.pIdx).velocity("stop");
			node.eq(this.pIdx).stop().css("top",0).animate({ top: pEndPos }, 400 );//.velocity({top:[ pEndPos , 0 ]},{duration: 400}) 
			
			//node.eq(this.cIdx).velocity("stop");
			node.eq(this.cIdx).stop().css("top",cInitPos).animate({ top: 0 }, 400 );//.velocity({top:[ 0 , cInitPos ]},{duration: 400}) 
			
		}

	})

	// 이슈 뉴스 슬라이드 UI
	/*
	 * var newsMenu= new rs.ui.NewsMenu({item : $("a"), next : $("b"), prev :$("c")}); slide.show();
	 */
	CommonUI.NewsMenu = function() {
		CommonUI.call(this, arguments);	
		this._options = {
		};
		
		this.content = arguments[0] || null;
		this.cIdx = 0;
		this.pIdx = 0;
		this.totalNum = 0;
		this.minNum = 10;
	}
	CommonUI.NewsMenu.prototype = new CommonUI();
	CommonUI.extend(CommonUI.NewsMenu, {
		show : function(opt) {
			if (opt) {
				this._options = this._applyOptions(this._options, opt);
			}
			this._init();
			
		},
		_init : function() {
			var opt = this._options;
			var arg = this.content;
			this.item = arg.item;
			this.itemNode = this.item.find("li");
			this.next = arg.next;
			this.prev = arg.prev;
			this.totalNum = this.itemNode.size();
			this.cIdx = this.minNum -1;
			this.itemWidth = this.item.width();

			this._setNode();
			
			if(this.item.size() >= 1){
				this._setEvent();
			}
			
		},
		_setNode : function(){
			var node = this.item;
			var taht = this;
			
		},
		_setEvent : function() {
			var that = this;
			this.next.off("click").on("click", {
				me : this
			}, function(e) {
				e.preventDefault();
				var me = e.data.me;
				
				me._next($(this));
				
			})
			this.prev.off("click").on("click",{
				me : this
			}, function(e) {
				e.preventDefault();
				var me = e.data.me;
				
				me._prev($(this));
			})
			
		},
		_next : function(btn){
			this.pIdx = this.cIdx;
			this.cIdx++;
			console.log(this.cIdx  )
			if(this.cIdx <= this.totalNum -1 ){
				
				this._moveNode("next");
				this.prev.removeClass("disabled");
				if ( this.cIdx == this.totalNum -1){
					btn.addClass("disabled");
				}
			}else{
				this.cIdx = this.totalNum -1;	
			}

			
		},
		_prev : function(btn){
			this.pIdx = this.cIdx;
			this.cIdx--;
			console.log(this.cIdx )
			if(this.cIdx >= this.minNum -1){
				
				this._moveNode("prev");
				this.next.removeClass("disabled");
				if ( this.cIdx == this.minNum -1){
					btn.addClass("disabled");
				}
			}else{
				this.cIdx = this.minNum -1;
			}
			
		},
		_getCurrent : function(){
			return this.item.eq(this.cIdx);
		},
		_moveNode : function(dir){
			var node = this.itemNode;
			var cInitPos = 0;
			var pEndPos = 0;
			if(dir == "next"){
				pEndPos = (this.item.parent().width()-(node.eq(this.cIdx).position().left + node.eq(this.cIdx).width()));
			}else{
				pEndPos = -1 *((node.eq(this.cIdx).position().left + node.eq(this.cIdx).width())-this.item.parent().width());
			}
			
			this.item.stop().animate({ left: pEndPos }, 400 );//.velocity({top:[ pEndPos , 0 ]},{duration: 400}) 

			
		}

	})
	tu.ui = CommonUI

})(window, jQuery);


$(document).ready(function() {	
	// 세션확인 체커
	
	// 세션체커 다시 만들기!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/*	setInterval(sessioncheck,1000);*/
	
	function sessioncheck(){
		$.ajax({
			url : "/com/sessionCheckAjax",
			type:"POST",
			cache : false,
			success : function(data){
				if(data!=='ok') console.log("세션이 사라젔습니다."); 
			},
			error:function(request, status, error){
				console.log("세션이 오류 사라젔습니다."); 
			}
		});
	}
	
	//닫기 컨트롤
	function otherClose(){
		for(var i = 0; i<tgArr.length; i++ ){

			if(!tgArr[i].getArea().is(".non-ch"))tgArr[i].hideCont();
		}
	}

	// 기타 토글 버튼 UI
	$(".drop-ar").each(function(){
		var dropToggle = new tu.ui.Toggle();
		dropToggle.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose });
	})

	/*2.요청사항  - widget_sample.html */
	/*
		(1) :	dropdown 요소중 아래 input 조작이 들어가는 요소의 경우
				.drop-ar.inner-input
				처럼 .inner-input 클래스를 추가해준다 

		(2) :	<i class="ico_all"></i>전체미디어<i class="xi-angle-down-min"></i> 에서 아래처럼 span 을 넣어준다.
				<i class="ico_all"></i><span class="mtype">전체미디어</span><i class="xi-angle-down-min"></i>

		(3)	:	타이틀 위에 붙는 부분이 '선택 미디어','선택 속성' 인지 구분하는 class="atype" class="mtype" 넣어주기
		
	*/

	// 인풋 토글 버튼 UI
	$(".drop-ar.inner-input").each(function(){
		var dropInputToggle = new tu.ui.Toggle();
		//innerBtn 의 타겟은 li label 입니다.
		dropInputToggle.show({tglArea : $(this) , innerBtn : "li label",closeCallback : otherClose ,subMenuCallback : extMenuControl});
	})
	
	// 각각 drop sub menu 클릭시 callback
	function extMenuControl(e,el,parent){
		
		// menu가 checkbox 인 경우
		if(parent.find("input[type='checkbox']").length > 0){
			//메뉴 wrap
			var pEl = el.closest("ul");
			//명칭이 바뀌어야할 셀렉터
			var pDropBt = el.closest(".inner-input").find(".drop-bt span");

			//input change 와 클릭 이벤트 간의 타이밍 해결
			setTimeout(function(){
				//선택 총 개수
				var chkSize = pEl.find("input:checked").length;

				pEl.find("li").each(function(){
					var input = $(this).find("input");
					
					//개수가 0 일떄 입력될 텍스트
					if(chkSize == 0){
							pDropBt.text("선택해주세요");
					}

					if(input.prop("checked")){
						 if(chkSize == 1){
							var labelTxt = input.next().text();
							pDropBt.text(labelTxt);
						}else{
							var txt = "";
							//checkbox 명칭이 2개라 타입으로 관리
							if(pDropBt.hasClass("mtype")){
								txt = "미디어";
							}else if(pDropBt.hasClass("atype")){
								txt = "속성";
							}
							pDropBt.text("선택" + txt);
						}
					}
				})
			}, 50);
			
		}

		// menu가 radio 인 경우
		if(parent.find("input[type='radio']").length > 0){
			//메뉴 wrap
			var pEl = el.closest("ul");
			//명칭이 바뀌어야할 셀렉터
			var pDropBt = el.closest(".inner-input").find(".drop-bt span");

			setTimeout(function(){
				pEl.find("li").each(function(){
					var input = $(this).find("input");
					if(input.prop("checked")){

						var labelTxt = input.next().text();
						pDropBt.text(labelTxt);
						
					}
				})
			}, 50);
		}
	}

	//좌측 상단 커버스토리 토글
	$(".cover-ar").each(function(){
		var coverToggle = new tu.ui.Toggle();
		coverToggle.show({tglArea : $(".cover-ar") , innerBtn : "a",closeCallback : otherClose, subMenuCallback : coverMenuControl });
	})

	//좌측 상단 커버스토리 메뉴 클릭 콜백
	function coverMenuControl(e,el){
		e.preventDefault();

		var $menu = el;
		$(".cover-ar .drop-bt span").html($menu.html());
	}

	//대시보드 토글
	$(".dash1-ar").each(function(){
		var dashToggle1 = new tu.ui.Toggle();
		dashToggle1.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose});
	})

	//채널 토글
	$(".channel-ar").each(function(){
		var channelToggle1 = new tu.ui.Toggle();
		channelToggle1.show({tglArea : $(".channel-ar") , innerBtn : "a",closeCallback : otherClose, subMenuCallback : channelMenuControl });
	})
	
/*	function channelMenuControl(e,el,parent){
		e.preventDefault();

		var $menu = el;
		parent.find(".drop-bt span").html($menu.html());
	}*/
	function channelMenuControl(e,el,parent){
		e.preventDefault();
		$(".searchArea .media input:checkbox[name='mediaType']").prop("checked" , false);
		// 첫번째요소 선택하기
		
		// 선택된 정보로 변경
		var $menu = el;
		parent.find(".drop-bt span").html($menu.html());
		// 컴스텀 데이터로 소비자발신에 값부여
		parent.find("a.drop-bt").data('value' , $menu.data('value'));
		
		// 하단 콤보박스에 대한 스타일 처리부분 작성 송원진
		// 선택한 값에 따라 
		if($menu.text().indexOf("기업")!=-1){
			$(".searchArea .media label.mass").hide();
			$(".searchArea .media label.twitter").show();
			$(".searchArea .media label.facebook").show();
			$(".searchArea .media label.instagram").show();
			$(".searchArea .media label.blog").show();
			$(".searchArea .media label.community").hide();
			
			$(".searchArea .media input:checkbox[id='mediaMass']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaTwitter']").prop("checked" , true);
			$(".searchArea .media input:checkbox[id='mediaFace']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaInsta']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaBlog']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaCommunity']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaAll']").prop("checked" , false);
		}else if($menu.text().indexOf("소비자")!=-1){
			$(".searchArea .media label.mass").hide();
			$(".searchArea .media label.twitter").show();
			$(".searchArea .media label.facebook").show();
			$(".searchArea .media label.instagram").show();
			$(".searchArea .media label.blog").show();
			$(".searchArea .media label.community").show();
			
			$(".searchArea .media input:checkbox[id='mediaMass']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaTwitter']").prop("checked" , true);
			$(".searchArea .media input:checkbox[id='mediaFace']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaInsta']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaBlog']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaCommunity']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaAll']").prop("checked" , false);
		}else if($menu.text().indexOf("Third")!=-1){
			$(".searchArea .media label.mass").show();
			$(".searchArea .media label.twitter").hide();
			$(".searchArea .media label.facebook").hide();
			$(".searchArea .media label.instagram").hide();
			$(".searchArea .media label.blog").hide();
			$(".searchArea .media label.community").show();
			
			$(".searchArea .media input:checkbox[id='mediaMass']").prop("checked" , true);
			$(".searchArea .media input:checkbox[id='mediaTwitter']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaFace']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaInsta']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaBlog']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaCommunity']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaAll']").prop("checked" , false);
		}else{
			$(".searchArea .media label.mass").show();
			$(".searchArea .media label.twitter").show();
			$(".searchArea .media label.facebook").show();
			$(".searchArea .media label.instagram").show();
			$(".searchArea .media label.blog").show();
			$(".searchArea .media label.community").show();
			
			$(".searchArea .media input:checkbox[id='mediaMass']").prop("checked" , true);
			$(".searchArea .media input:checkbox[id='mediaTwitter']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaFace']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaInsta']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaBlog']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaCommunity']").prop("checked" , false);
			$(".searchArea .media input:checkbox[id='mediaAll']").prop("checked" , false);
		}
		$(".searchArea .channel .dropdown dd a.on").removeClass("on");
		$(el).addClass("on");
	}
	//위젯추가 카테고리 토글
	$(".category-ar").each(function(){
		var wgCateToogle = new tu.ui.Toggle();
		wgCateToogle.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose, subMenuCallback : wgCateMenuControl });
	})
	
	function wgCateMenuControl(e,el,parent){
		e.preventDefault();

		var $menu = el;
		parent.find(".drop-bt span").html($menu.html());
	}


	//위젯추가 인기순 토글
	$(".rank-ar").each(function(){
		var wgRankToogle = new tu.ui.Toggle();
		wgRankToogle.show({tglArea : $(this) , innerBtn : "a",closeCallback : otherClose, subMenuCallback : wgRankMenuControl });
	});
	
	function wgRankMenuControl(e,el,parent){
		e.preventDefault();

		var $menu = el;
		parent.find(".drop-bt span").html($menu.html());
	}
	
	//검색영역
	var searchArea = $(".search"),
		searchBox = searchArea.find(".searchBox"),
		searchSetting = searchArea.find(".searchSetting");

	searchSetting.find("li a").on("click",function(e){
		e.preventDefault();
		var searchTxt = $(this).text();
		searchBox.find("input").val(searchTxt);
		searchSetting.hide();
	})

	//위젯 dragable
	$( ".widgetAddLayer" ).draggable({ 
		containment: ".container",
		scroll: false,
		cursor: 'move',
		handle: "> .drop-bt",
		start: function() {
			
			$(this).addClass('dragged')
		},
		stop: function(e) {
			var that = $(this);
			setTimeout(function(){ that.removeClass('dragged') }, 200);
		}
	});

	//뉴스 카테고리 슬라이드
	$(".newsCateNavi").each(function(){

		var newsMenu= new tu.ui.NewsMenu({item : $(this).find("ul"), next : $(this).find(".xi-angle-right"), prev :$(this).find(".xi-angle-left")}); newsMenu.show();
	})


	
	// 해더 스크롤 UI
	var scFlag = false;
	$(window).on("scroll",function(){
		var $search = $(".searchArea"),
			headerH = $(".header").outerHeight(true),
			searchH = $search.outerHeight(true),
			st = $(this).scrollTop()

		if(st >= headerH){
			if(!$search.hasClass("sticky")){
				$search.addClass("sticky");
			if(!scFlag){
					scFlag = true;
				}
			}
		}else{
			if($search.hasClass("sticky")){
				$search.removeClass("sticky");
				scFlag = false;
			}
		}
	})
	$(window).trigger("scroll");

	//footer 공지사항 슬라이드
	var slide = new tu.ui.Slide({item : $(".rollingNotice li"), next : $(".rollingNotice .up"), prev :$(".rollingNotice .down")}); 
	slide.show();

	//faq 아코디언
	$(function(){
		$(document.body).on("click", ".faqList .question", function(){
			if($(this).parent("li").hasClass("on")){
				$(this).parent("li").removeClass("on");
			} else {
				$(".faqList li").removeClass("on");
				$(this).parent("li").addClass("on");
			}
		});
	});


	//scrollbar jqeury
	$('.scrollbar-inner').scrollbar();
	

	/*1.요청사항  - layout.html */
	/*
		1. select 메뉴에  block-data="0,1,2,3,4,5,6" attribute 를 넣어줍니다
		2. 아래 channelArr 의 배열 순서가 맞게 클래스 명을 넣어줍니다

	*/
//	var channelArr = ["all","mass","twitter","facebook","instagram","blog","community"];
//	
//	// 소셜 영역 가리키는 셀렉터
//	var $channelCont = $(".variableArea .media");
//	var $channelLabel = $channelCont.find("label");
//	// 채널 select 이벤트
//	$(".channel-ar .drop-ct li").on("click",function(e){
//		// e.preventDefault();
//		// select 버튼 attribute 읽어서 배열로 만듬
//		var blkData = $(this).attr("block-data").split(",");
//		
//		//Arrap.map 으로 channelArr 에서 blkData 맞는 클래스 필터
//		function isIn(value,index,ar) {
//			value = parseInt(value);
//		  return channelArr[value];
//		}
//		var filter = blkData.map(isIn);
//		
//		// 영역 안 모든 label display:none 로 초기화
//		$channelCont.find("label").css("display","none");
//		// 영역 안 모든 input checkbox false로 초기화
//		$channelCont.find("input[type='checkbox']").prop("checked",false);
//		
//		for(var i = 0; i<filter.length; i++){
//			// 클래스에 매칭되는 노드 display:block
//			$channelCont.find("." + filter[i]).css("display","block");
//			// 2번째 checkbox 활성화
//			$channelCont.find("." + filter[1]).prev().prop("checked",true);
//		}
//	})
//
//	$channelLabel.on("click",function(e){
//		
//		if($(this).hasClass("all") && $(this).prev().prop("checked") == false){ // 비활성화된 전체버튼 눌렀을떄
//			$channelLabel.prev().prop("checked",true);
//			return false;
//		}else if($(this).hasClass("all") && $(this).prev().prop("checked")){	// 활성화된 전체버튼 눌렀을떄
//			$channelLabel.prev().prop("checked",false);
//			return false;
//		}else{																	// 외 버튼 눌렀을떄
//			$channelLabel.eq(0).prev().prop("checked",false);	
//		}
//		
//	})
    
    //미디어별 키워드랭킹, 산업별 키워드랭킹, 카테고리별 키워드랭킹
    // industryList 클래스로 잡혀있음
    
    var $keyWordRanks = $(".industryList");
    
    $keyWordRanks.each(function(){
        //각 카테고리별 키워드랭킹
        var list = $(this);
        //over되는 dl영역
        var overArea = list.find("dl");
        //click되는 li영역
        var clickArea = list.find(">li");
        
        //마우스 오버 이벤트
        overArea.on("mouseenter",function(){
            //현재 이미지 path
            var path = $(this).find(">dt .img img").attr("src");
            //활성화 이미지 path
            var cPath = getImgPath(path,"_on","add");
            $(this).find(">dt .img img").attr("src",cPath);
        })
        //마우스 아웃 이벤트
        overArea.on("mouseleave",function(){
            //현재 이미지 path
            var path = $(this).find(">dt .img img").attr("src");
            //비활성화 이미지 path
            var cPath = getImgPath(path,"_on","remove");

            if(!$(this).closest("li").hasClass("on"))$(this).find(">dt .img img").attr("src",cPath);
            
        })
        clickArea.on("click",function(e){
            e.stopPropagation();
            var tg = $(this);
			if(!tg.hasClass("on")){
				//img src reset
				overArea.each(function(){
					if($(this).closest("li").hasClass("on")){
						var path = $(this).find(">dt .img img").attr("src");
						var cPath = getImgPath(path,"_on","remove");
						$(this).find(">dt .img img").attr("src",cPath);
					}
				})
				//클래스 on초기화
				clickArea.removeClass("on");
				tg.addClass("on");
			}
        })
    })
    
    
    
    function getImgPath(path,tail,mode){
        
        var cPath="";
        var arSplitFileName     = path.split(".");   // 파일명을 다시 "." 로 나누면 파일이름과 확장자로 나뉜다
        if(mode == "add"){
            if(arSplitFileName[0].indexOf(tail) < 0)arSplitFileName[0] = arSplitFileName[0] + tail;
        }else{
            if(arSplitFileName[0].indexOf(tail) >= 0)arSplitFileName[0] = arSplitFileName[0].replace(tail,"");
        }
        cPath = arSplitFileName.join(".");

        return cPath;
    }
    
   

 // 드래그앤드롭 정렬기능을 사용하기 위해서
	$( "#sortable" ).sortable({
		revert: true,
		stop: function( event, ui ) {
			
			var i = 0;
			$(".searhWord .wordList ul li a").each(function(){
				console.log( $(this).data("qid") );
				var dashQid = $(this).data("qid");
				$.ajax({
					url : "/user/dashQsortAjax",
					dataType:"json",
					type:"POST",
					data : {orderNum:i , dashQid : dashQid},
					cache : false,
					success : function(data){
						//
					},
					error:function(request, status, error){
						//
					}
				});
				i++;
			});
		}
	});
	
	// 미디어값 변동관련 : 송원진
	$(".searchArea .media input:checkbox[name='mediaType']").on("click",function(e){
		var text = $(e.target).next().children().text();
		var checked = $(e.target).is(':checked');
		
		
		
		
		if(text == '전체'){
			if(checked){
				$(".searchArea .media input:checkbox[name='mediaType']").prop("checked" , true);				
			}else{
					$(".searchArea .media input:checkbox[name='mediaType']").prop("checked" , false);	
					$(".searchArea .media input:checkbox[name='mediaType']").each(function(index){
						if($(this).next().css("display").indexOf("block") != -1 && $(this).next().children().text()!=='전체' ){
							$(this).prop("checked" , true);	
							return false;
						}
					});
			}
		}
		
		var count = 0;
		$(".searchArea .media input:checkbox[name='mediaType']").each(function(index , item){
			if($(item).prop("checked") == true && index!=0 ){
				count = count +1;
			} 
		});
		
		if(count>5){
			$(".searchArea .media input:checkbox[name='mediaType']").eq(0).prop("checked" , true);	
		}else{
			if($(".searchArea .media input:checkbox[name='mediaType']").eq(0).prop("checked")){
				$(".searchArea .media input:checkbox[name='mediaType']").eq(0).prop("checked" , false);	
			}
		}
		
	});
	
	// 검색 텍스트 박스에 입력시 on 클래스 붙이기 : 송원진
	$(".searhWord .wordSearch .wordInput input").on("keyup",function(e){
		if($(this).val().length > 0) $(this).prev().addClass("on");
		else $(this).prev().removeClass("on");
	});
	
	Handlebars.registerHelper('if_eq', function(a, b, options) {
	    if(a == b) // Or === depending on your needs
	        return options.fn(this);
	    else
	        return options.inverse(this);
	});
	Handlebars.registerHelper('if_compare', function(a, b, options) {
	    if(a > b){ 	
	    	return options.fn(this);	    	
	    }
	    else{;	    	
	    	return options.inverse(this);	    	
	    }
	});
	
	Handlebars.registerHelper('breaklines', function(text) {
	    text = Handlebars.Utils.escapeExpression(text);
	    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
	    return new Handlebars.SafeString(text);
	});
	
	//연산 헬퍼 추가
	Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	    lvalue = parseFloat(lvalue);
	    rvalue = parseFloat(rvalue);
	        
	    return {
	        "+": lvalue + rvalue,
	        "-": lvalue - rvalue,
	        "*": lvalue * rvalue,
	        "/": lvalue / rvalue,
	        "%": lvalue % rvalue
	    }[operator];
	});
	
	//문자열 포함여부 확인 헬퍼 추가
	Handlebars.registerHelper("hasStr", function(withInStr, findStr, options) {
		if(withInStr && withInStr.indexOf(findStr) > -1){ 	
	    	return options.fn(this);	    	
	    }
	    else{	    	
	    	return options.inverse(this);	    	
	    }
	});
	
	//반복문 헬퍼 추가
	Handlebars.registerHelper('times', function(n, block) {
	    var accum = '';
	    for(var i = 1; i < n+1; ++i)
	        accum += block.fn(i);
	    return accum;
	});
	
	//개월 연 값 비교 헬퍼 추가
	Handlebars.registerHelper("equalTerm", function(yearVal, monthVal, options) {
		if(yearVal*12 === monthVal){ 	
	    	return options.fn(this);	    	
	    }
	    else{	    	
	    	return options.inverse(this);	    	
	    }
	});
	
	//날짜 포멧 헬퍼 추가(yyyy.mm.dd)
	Handlebars.registerHelper("dateFormatDot", function(dateNum, options) {
		var dateString = dateNum + "";
	    var dateWithDot = dateString.substring(0,4) + "." 
	    					+ dateString.substring(4,6) + "." 
	    					+ dateString.substring(6);
	        
	    return dateWithDot;
	});
	
	//값이 같지 않을 경우 헬퍼 추가 (not equal)
	Handlebars.registerHelper('if_ne', function(a, b, options) {
	    if(a !== b) 
	        return options.fn(this);
	    else
	        return options.inverse(this);
	});
	
	
	// 서브 2depth 노출
	$('.subTopArea .gnbMenu > li').on("mouseenter",function(){
		$(this).addClass('active');
	});
	$('.subTopArea .gnbMenu > li').on("mouseleave",function(){
		$(this).removeClass('active');
	});
});

