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
        var ela = el.querySelectorAll('a');
        ela[0].addEventListener('click', this.propClick.bind(this, ela[0]));

        ela[1].addEventListener('click', function() {
            $('.grid-stack').data('gridstack').removeWidget(el)
            that.controller.clickWidgetDeleteBtn(widgetInfo);
        });
        widgetInfo.curx = el.dataset.gsX;
        widgetInfo.cury = el.dataset.gsY;

        return widgetInfo;
    }

    // 속성버튼을 선택한경우
    widget.prototype.propClick = function(el) {
        var widgetId = el.dataset.widgetId;
        this.controller.clickWidgetPropBtn(widgetId, el.previousSibling.innerText);
    }

    // 속성창 html 
    widget.prototype.drawProp = function(propList, indexList, widgetName) {
        var that = this;

        var html = this.propHtml(propList, indexList, widgetName);
        var $el = $("#dsSettingType");
        $el.html(html);
        // propList 없는경우
        if (propList.length < 1) {
            $el.find('ul').html('<center>설정가능한 옵션이 없습니다.</center>')
            $el.find('a').first().on('click', function() {
                that.controller.modelClose();
            });
        } else {
            // 일단 1차항목만 그린다.
            html = this.getFisrstOptionHtml(propList, indexList[0]);
            $el.find('ul').html(html);
            if (indexList.length > 1) {
                var selectEl = document.querySelector(".modal.settingType a.drop-bt span");
                var selectId = selectEl.dataset.optionpropid;

                html = this.getSecondOptionHtml(propList, indexList[1], selectId);
                $el.find('ul').first().append(html);
            }
        }

        // x 닫기 버튼
        $el.find('a.close-modal.xi-close').on('click', function(e) {
            e.preventDefault();
            that.controller.modelClose();
        });
        $el.find('a.blue').on('click', function(e) {
            e.preventDefault();
            // propList 와 비교 한다.
            var propFlag = true;
            var inputArr = [];

            //셀렉트 박스인경우
            var selectPropdata = document.querySelector(".modal.settingType a.drop-bt span");
            if (selectPropdata) {
                var widgetId = "#" + selectPropdata.dataset.optionid.substring(0, 3);
                var grid = $('.grid-stack').data('gridstack');
                inputArr.push({ 'optionId': selectPropdata.dataset.optionid, 'optionPropId': selectPropdata.dataset.optionpropid })
                    // 위젯을 다시 그린다.
                var img = selectPropdata.dataset.defaultimg;
                var maxHeight = selectPropdata.dataset.maxheight;
                var minHeight = selectPropdata.dataset.minheight;
                var maxWidth = selectPropdata.dataset.maxwidth;
                var minwidth = selectPropdata.dataset.maxheight;
                var curHeight = selectPropdata.dataset.defaultheight;
                var curWidth = selectPropdata.dataset.defaultwidth;
                grid.maxHeight(widgetId, maxHeight);
                grid.minHeight(widgetId, minHeight);
                grid.maxWidth(widgetId, maxWidth);
                grid.minWidth(widgetId, minwidth);

                grid.resize(widgetId, curWidth, curHeight);
                $(widgetId).find("img").attr("src", img);
                that.controller.updateWidgetChange();

            }

            // 라디오 체크박스 인경우
            var inputPropdata = document.querySelectorAll("input[name=dwpCheck]");
            if (inputPropdata) {
                for (var i = 0; i < inputPropdata.length; i++) {
                    if (inputPropdata[i].checked) {
                        inputArr.push({ 'optionId': inputPropdata[i].dataset.optionid, 'optionPropId': inputPropdata[i].value })
                    }
                }
            }
            that.controller.insertWidgetProp(inputArr);
            // if (propFlag) {
            //     for (var i = 0; i < inputArr.length; i++) {
            //         propFlag = false;
            //         propFlag = propList.some(function(item) {
            //             return (item.defaultYn == "Y" && inputArr[i].optionId == item.optionId && inputArr[i].optionPropId == item.optionPropId)
            //         })
            //         if (!propFlag) that.controller.insertWidgetProp(inputArr);

            //     }
            // }
            that.controller.modelClose();
        });

        $el.modal();

        // 셀렉트 박스 이벤트
        var selectEl = document.querySelector(".modal.settingType a.drop-bt");
        if (selectEl) selectEl.addEventListener('click', function(event) {
            event.preventDefault();
            var optionList = document.querySelector(".modal.settingType .dropdown .drop-ct");
            if (this.className.indexOf("open") != -1) {
                this.className = 'drop-bt';
                optionList.style.display = "none";

            } else {
                this.className = 'drop-bt open';
                optionList.style.display = "";
            }
        });

        // 셀렉트박스 옵션이벤트
        var optionEl = document.querySelectorAll(".modal.settingType dd.drop-ct ul li a");
        if (optionEl) {
            for (var index = 0; index < optionEl.length; index++) {
                optionEl[index].addEventListener('click', this.propFirstOptionEvent.bind(this, optionEl[index], indexList, propList, event));
            }
        }
    }

    // 셀렉트 박스 옵션값 이벤트처리
    widget.prototype.propFirstOptionEvent = function(el, indexList, propList, event) {
        event.preventDefault()
        var selectEl = document.querySelector(".modal.settingType a.drop-bt");
        var optionEl = document.querySelectorAll(".modal.settingType dd.drop-ct ul li a");
        for (var index = 0; index < optionEl.length; index++) {
            optionEl[index].className = "";
        }

        el.className = "on";
        selectEl.firstElementChild.innerText = el.text;
        selectEl.firstElementChild.dataset.optionid = el.dataset.optionid;
        selectEl.firstElementChild.dataset.optionpropid = el.dataset.optionpropid;
        selectEl.firstElementChild.dataset.defaultwidth = el.dataset.defaultwidth;
        selectEl.firstElementChild.dataset.defaultheight = el.dataset.defaultheight;
        selectEl.firstElementChild.dataset.minwidth = el.dataset.minwidth;
        selectEl.firstElementChild.dataset.minheight = el.dataset.minheight;
        selectEl.firstElementChild.dataset.maxwidth = el.dataset.maxwidth;
        selectEl.firstElementChild.dataset.maxheight = el.dataset.maxheight;
        selectEl.firstElementChild.dataset.defaultimg = el.dataset.defaultimg;
        selectEl.firstElementChild.dataset.defaultyn = el.dataset.defaultyn;
        selectEl.firstElementChild.dataset.parentpropId = el.dataset.parentpropId;
        selectEl.firstElementChild.dataset.childrenyn = el.dataset.childrenyn;

        if (el.dataset.childrenyn == 'Y') {

            var $el = $("#dsSettingType");
            if (el.dataset.optionpropid == 0) {
                el.dataset.optionpropid = selectEl.dataset.optionpropid
            }
            var html = this.getSecondOptionHtml(propList, indexList[1], el.dataset.optionpropid);

            $el.find('li.inputType').html(html)
        }
    }

    // 속성 첫번째 셀렉트 박스 이벤트
    widget.prototype.propFirstSelectEvent = function(el, event) {
        event.preventDefault();
        var optionList = document.querySelector(".modal.settingType .dropdown .drop-ct");
        if (el.className.indexOf("open") != -1) {
            el.className = 'drop-bt';
            optionList.style.display = "none";

        } else {
            el.className = 'drop-bt open';
            optionList.style.display = "";
        }

    }

    // 1차 옵션 성분을 그린다.
    widget.prototype.getFisrstOptionHtml = function(propList, indexInfo) {
        // selectedList  은 1개만을 기준으로 함
        var html = "";
        if (indexInfo.formType == 'COMBOBOX') {
            html += '<li>';
            html += '<span class="sTit"';
            html += ' data-max=' + indexInfo.maxNum;
            html += ' data-min=' + indexInfo.minNum;
            html += ' data-optionid=' + indexInfo.optionId;
            html += ' data-optionpropid=' + indexInfo.optionpropid + '>';
            html += indexInfo.optionNm + '</span>';
            html += '<dl class="dropdown category-ar">';
            html += '<dt class="categoryType">';
            html += '<a href="#" class="drop-bt">'; // 여기에 propList 값 들어가야 한다.
            // 이전에 선택했거나 기본 선택 사항목
            for (var index = 0; index < propList.length; index++) {
                if (indexInfo.optionId == propList[index].optionId && propList[index].defaultYn == 'Y') {
                    html += '<span ';
                    html += ' data-optionid=' + propList[index].optionId;
                    html += ' data-optionpropid=' + propList[index].optionPropId;
                    html += ' data-defaultwidth=' + propList[index].defaultWidth;
                    html += ' data-defaultheight=' + propList[index].defaultHeight;
                    html += ' data-minwidth=' + propList[index].minWidth;
                    html += ' data-minheight=' + propList[index].minHeight;
                    html += ' data-maxwidth=' + propList[index].maxWidth;
                    html += ' data-maxheight=' + propList[index].maxHeight;
                    html += ' data-defaultimg=' + propList[index].defaultImg;
                    html += ' data-defaultyn=' + propList[index].defaultYn;
                    html += ' data-parentpropId=' + propList[index].parentPropId;
                    html += ' data-childrenyn=' + propList[index].childrenYn;
                    html += ' >' + propList[index].optionPropNm;
                    html += '</span>';
                }
            }
            html += '<i class="xi-angle-down-min"></i>';
            html += '</a>';
            html += '</dt>';
            html += '<dd style="display: none;" class="drop-ct">';
            html += '<ul class="dropdown2">';
            for (var index = 0; index < propList.length; index++) {
                if (propList[index].optionId == indexInfo.optionId) {
                    html += '<li><a href="#"';
                    html += ' data-optionid=' + propList[index].optionId;
                    html += ' data-optionpropid=' + propList[index].optionPropId;
                    html += ' data-defaultwidth=' + propList[index].defaultWidth;
                    html += ' data-defaultheight=' + propList[index].defaultHeight;
                    html += ' data-minwidth=' + propList[index].minWidth;
                    html += ' data-minheight=' + propList[index].minHeight;
                    html += ' data-maxwidth=' + propList[index].maxWidth;
                    html += ' data-maxheight=' + propList[index].maxHeight;
                    html += ' data-defaultimg=' + propList[index].defaultImg;
                    html += ' data-defaultyn=' + propList[index].defaultYn;
                    html += ' data-parentpropId=' + propList[index].parentPropId;
                    html += ' data-childrenyn=' + propList[index].childrenYn;
                    html += ' >' + propList[index].optionPropNm;
                    html += '</a></li>';
                }
            }
            html += '</ul>';
            html += '</dd>';
            html += '</dl>';

        } else {
            html += '<li class="type03">';
            html += '<span class="sTit"';
            html += ' data-max=' + indexInfo.maxNum;
            html += ' data-min=' + indexInfo.minNum;
            html += ' data-optionid=' + indexInfo.optionId;
            html += ' data-optionpropid=' + indexInfo.optionpropid + " >";
            html += indexInfo.optionNm + '</span>';
            html += '<ul class="inputList ' + indexInfo.formSize + '">';
            for (var index = 0; index < propList.length; index++) {
                if (propList[index].optionId == indexInfo.optionId) {
                    html += '<li>';
                    if (indexInfo.formType == 'RADIOBOX') {
                        html += '<input type="radio" class="cssRadio" name="dwpCheck" ';
                    } else if (indexInfo.formType == 'CHECKBOX') {
                        html += '<input type="checkbox" class="cssCheck" name="dwpCheck" ';
                    }

                    html += ' data-optionid =' + propList[index].optionId;
                    html += ' value=' + propList[index].optionPropId;
                    html += ' id=' + propList[index].optionPropId;
                    if (propList[index].defaultYn == "Y") {
                        html += " checked=true >"
                    } else {
                        html += " >"
                    }
                    html += '<label for="' + propList[index].optionPropId + '">' + propList[index].optionPropNm + '</label>';
                }
            }

            html += '</ul>';

        }

        html += '</li>'; //end 최상단 li 
        return html;
    }

    // 2차 옵션 성분을 그린다.
    widget.prototype.getSecondOptionHtml = function(propList, indexInfo, selectId) {
        // selectedList  은 1개만을 기준으로 함
        var html = "";
        html += '<li class="inputType type03">';
        html += '<span class="sTit"';
        html += ' data-minnum=' + indexInfo.minNum;
        html += ' data-maxnum=' + indexInfo.maxNum;
        html += ' >';
        html += indexInfo.optionNm + '</span>';
        html += '<ul class="inputList ' + indexInfo.formSize + '">';

        for (var index = 0; index < propList.length; index++) {
            var parentPropId = propList[index].parentPropId;

            if (selectId == parentPropId) {
                html += '<li>';
                if (indexInfo.formType == 'RADIOBOX') {
                    html += '<input type="radio" class="cssRadio" name="dwpCheck" ';
                } else if (indexInfo.formType == 'CHECKBOX') {
                    html += '<input type="checkbox" class="cssCheck" name="dwpCheck" ';
                }

                html += ' data-optionid =' + propList[index].optionId;
                html += ' value=' + propList[index].optionPropId;
                html += ' id=' + propList[index].optionPropId;
                if (propList[index].defaultYn == "Y") {
                    html += " checked=true >"
                } else {
                    html += " >"
                }
                html += '<label for="' + propList[index].optionPropId + '">' + propList[index].optionPropNm + '</label>';
            }
        }
        html += '</ul>';
        html += '</li>'; //end 최상단 li 
        return html;
    }


    // 속성 html 
    widget.prototype.propHtml = function(propData, selectData, widgetName) {

        var html = "";
        html += '<div class="modal settingType" style="width: 390px; display: inline-block;">';
        html += '<div class="layerPopWrap">';
        html += '<div class="tit">';
        html += '<h3>' + widgetName + '</h3>';
        html += '</div>';
        html += '<div class="cont">';
        html += '<ul class="settingList"></ul>';
        html += '</div>';
        html += '<div class="btn">';
        html += '<a href="#" class="blue">확인</a>';
        html += '</div>';
        html += '</div>';
        html += '<a href="#"  class="close-modal xi-close"><span>Close</span></a>';
        html += '</div>';
        return html
    }

    // 위젯 html 생성
    widget.prototype.widgetHtml = function(item) {
        var html = "";
        html += '<div id=' + item.widgetId + ' class = "grid-stack-item" > ';
        html += '<div class="grid-stack-item-content">';
        html += '<div class="tit">';
        html += '<strong>' + item.widgetNm + '</strong>';
        html += '<a href="#" onclick= "return false;" class="xi-wrench" ';
        html += 'data-widget-id= ' + item.widgetId + '><span>수정</span></a>'
        html += '<a href="#" onclick= "return false;" class="xi-trash"><span>삭제</span></a>';
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

    // 속성창 확인버튼이벤트


    return widget;
}());