WIDGET.createNameSpace("WIDGET.view.widget");

WIDGET.view.widget = (function() {
    var view = function() {
        this.widgetController = null;
        this.widgetHeader = new WIDGET.view.header();
    }

    view.prototype.setWidgetController = function(controller) {
        this.widgetController = controller;
    }

    // 가장 기본적인 외곽 위젯을 그리는 부분 widgetInfoList[] 위젯목록
    view.prototype.drawInfoWidget = function(widgetInfoList) {
        var that = this;
        var html = "";
        var headerHtml = ""; // 위젯내 검색바
        $('.grid-stack').gridstack();
        for (var i = 0; i < widgetInfoList.length; i++) {
            headerHtml = this.widgetHeader.getSearchBarHtml(widgetInfoList[i].headerType, widgetInfoList[i].widgetId);
            html = this.widgetInfoHtml(widgetInfoList[i], headerHtml);
            $('.grid-stack').data('gridstack').addWidget(html, widgetInfoList[i].xcoord, widgetInfoList[i].ycoord,
                widgetInfoList[i].width, widgetInfoList[i].height, false, widgetInfoList[i].width, widgetInfoList[i].width,
                widgetInfoList[i].height, widgetInfoList[i].height, "widget" + widgetInfoList[i].widgetId);
        }
        // 위젯내부 검색부분 셀렉트 관련 이벤트 등록
        var widgetOption = document.querySelectorAll('div.commonheader a');
        for (var index = 0; index < widgetOption.length; index++) {
            widgetOption[index].addEventListener('click', this.widgetOptionEvent.bind(this, widgetOption[index]));
        }

        for (var i = 0; i < widgetInfoList.length; i++) {
            // 미디어 이벤트 처리
            var mediaOption = document.querySelectorAll('[name=mediaChk' + widgetInfoList[i].widgetId + ']');
            if (mediaOption) {
                for (var j = 0; j < mediaOption.length; j++) {
                    mediaOption[j].addEventListener('click', this.mediaEvent);
                }
            }

            // 일간간격이벤트 처리 일별 주별 월별 분기별 periodEvent
            mediaOption = document.querySelectorAll('[name=periodRadio' + widgetInfoList[i].widgetId + ']');
            if (mediaOption) {
                for (var j = 0; j < mediaOption.length; j++) {
                    mediaOption[j].addEventListener('click', this.periodEvent.bind(this, mediaOption[j], "xi-calendar"));
                }
            }

            // 갯수 선택 이벤트 periodEvent
            mediaOption = document.querySelectorAll('[name=countRadio' + widgetInfoList[i].widgetId + ']');
            if (mediaOption) {
                for (var j = 0; j < mediaOption.length; j++) {
                    mediaOption[j].addEventListener('click', this.periodEvent.bind(this, mediaOption[j], "xi-align-center"));
                }
            }

            // 소비자 발신 이벤트 등록 classificationEvent
            mediaOption = document.querySelectorAll('[name=classRadio' + widgetInfoList[i].widgetId + ']');
            if (mediaOption) {
                for (var j = 0; j < mediaOption.length; j++) {
                    mediaOption[j].addEventListener('click', this.classificationEvent.bind(this, mediaOption[j]));
                }
            }

            // c1name 변경이벤트 등록
            mediaOption = document.querySelectorAll('[name=c1Radio' + widgetInfoList[i].widgetId + ']');
            if (mediaOption) {
                for (var j = 0; j < mediaOption.length; j++) {
                    mediaOption[j].addEventListener('click', this.c1Event);
                }
            }

        }


        // 검색버튼 이벤트처리
        var searchEl = document.querySelectorAll('.refresh');
        for (var i = 0; i < searchEl.length; i++) {
            searchEl[i].addEventListener('click', this.searchEvent.bind(this, searchEl[i].dataset.widgetid));
        }

        var grid = $('.grid-stack').data('gridstack');
        grid.movable('.grid-stack-item', false);
        grid.resizable('.grid-stack-item', false);
    }

    // html 관련 부분 이 아래에 정리
    view.prototype.widgetInfoHtml = function(item, headerHtml) {
        var html = "";
        html += '<div id=widget' + item.widgetId + ' class = "grid-stack-item" > ';
        html += '<div class="grid-stack-item-content">';
        //html += '<div class="loading"><p><img src="/resources/images/common/loading004.gif">분석한 데이터를 로딩중입니다.<br>잠시만 기다려주세요.</p></div>';
        html += '<div class="tit">';
        html += '<strong>' + item.widgetNm + '</strong>';
        html += '<div class="sortArea">';
        html += headerHtml;
        html += '</div>'
        html += '</div>';
        html += '<div class="cont scrollbar-inner" style="text-align:center">';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        return html;
    }

    // 이부분은 단순한 선택등의 이벤트 정의이다

    // 위젯내 검색버튼 이벤트
    view.prototype.searchEvent = function(widgetId) {
        // 미디어값 획득
        var mediaEl = document.querySelectorAll('[name=mediaChk' + widgetId + ']');
        var mediaParam = [];
        var termParam = 'date';
        var classParam = 'A';
        var countParam = 25;
        for (var i = 0; i < mediaEl.length; i++) {
            if (mediaEl[i].checked && mediaEl[i].value != "ALL") {
                mediaParam.push(mediaEl[i].value);
            }
        }

        // 일간격 값획득 일별 주별 월별 분기별
        mediaEl = document.querySelectorAll('[name=periodRadio' + widgetId + ']');
        for (var i = 0; i < mediaEl.length; i++) {
            if (mediaEl[i].checked) {
                termParam = mediaEl[i].value;
            }
        }

        // 소비자 발신값을 가져온다.
        mediaEl = document.querySelectorAll('[name=classRadio' + widgetId + ']');
        for (var i = 0; i < mediaEl.length; i++) {
            if (mediaEl[i].checked) {
                classParam = mediaEl[i].value;
            }
        }

        // 갯수 획득
        mediaEl = document.querySelectorAll('[name=countRadio' + widgetId + ']');
        for (var i = 0; i < mediaEl.length; i++) {
            if (mediaEl[i].checked) {
                countParam = mediaEl[i].value;
            }
        }


        // 위젯 아이디로 세팅된 모델의 위젯별 파라미터를 항목을 변경하고 검색을 시도한다(컨트롤러 호출)
    }

    // 위젯내 옵션선택 이벤트처리
    view.prototype.widgetOptionEvent = function(el) {
        if (el.className.indexOf("open") > 0) {
            el.classList.remove("open");
            if (el.nextSibling) el.nextSibling.style.display = "none";
        } else {
            el.classList.add("open");
            if (el.nextSibling) el.nextSibling.style.display = "block"
        }
    }

    // 위젯내 미디어 선택 이벤트 처리
    view.prototype.mediaEvent = function() {
        var thisel = document.querySelectorAll('[name=' + this.name + ']');
        var count = 0;
        var inhtml = "";
        if (this.value == 'ALL') {
            var flag = this.checked;
            for (var i = 0; i < thisel.length; i++) {
                thisel[i].checked = flag;
            }
            thisel[1].checked = true;
        } else {
            if (!this.checked) {
                for (var i = 0; i < thisel.length; i++) {
                    if (thisel[i].checked && thisel[i].value != "ALL") count++;
                    if (thisel[i].value == "ALL") thisel[i].checked = false;
                }
                if (count < 1) {
                    this.checked = true;
                }
            } else {
                for (var i = 0; i < thisel.length; i++) {
                    if (thisel[i].checked && thisel[i].value != "ALL") count++;
                }
                if (count + 1 == thisel.length) {
                    for (var i = 0; i < thisel.length; i++) {
                        if (thisel[i].value == "ALL") thisel[i].checked = true;
                    }
                }
            }
        }
        count = 0;
        for (var i = 0; i < thisel.length; i++) {
            if (thisel[i].checked) count++;
        }
        // 선택상태에 따른 상단 선택정보영역 
        if (count == 1) {
            var temp = "";
            for (var i = 0; i < thisel.length; i++) {
                if (thisel[i].checked) temp = thisel[i].value;
            }
            switch (temp) {
                case "M":
                    inhtml = '<i class="ico_mass"></i>매스미디어<i class="xi-angle-down-min"></i>';
                    break;
                case "T":
                    inhtml = '<i class="ico_twitter"></i>트위터<i class="xi-angle-down-min"></i>';
                    break;
                case "F":
                    inhtml = '<i class="ico_facebook"></i>페이스북<i class="xi-angle-down-min"></i>';
                    break;
                case "I":
                    inhtml = '<i class="ico_instagram"></i>인스타그램<i class="xi-angle-down-min"></i>';
                    break;
                case "R":
                    inhtml = '<i class="ico_blog"></i>블로그<i class="xi-angle-down-min"></i>';
                    break;
                case "C":
                    inhtml = '<i class="ico_comm"></i>커뮤니티<i class="xi-angle-down-min"></i>';
                    break;

            }
        } else if (count >= thisel.length - 1) {
            inhtml = '<i class="ico_all"></i>전체<i class="xi-angle-down-min"></i>'
        } else {
            inhtml = '<i class="ico_all"></i>선택 미디어<i class="xi-angle-down-min"></i>'
        }
        this.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML = inhtml;
    }

    // 위젯내 카테고리(c1name) 선택 이벤트 처리 xi-filter
    view.prototype.c1Event = function() {
        var thisel = document.querySelectorAll('[name=' + this.name + ']');
        var count = 0;
        var inhtml = "";
        if (this.value == 'ALL') {
            var flag = this.checked;
            for (var i = 0; i < thisel.length; i++) {
                thisel[i].checked = flag;
            }
            thisel[1].checked = true;
        } else {
            if (!this.checked) {
                for (var i = 0; i < thisel.length; i++) {
                    if (thisel[i].checked && thisel[i].value != "ALL") count++;
                    if (thisel[i].value == "ALL") thisel[i].checked = false;
                }
                if (count < 1) {
                    this.checked = true;
                }
            } else {
                for (var i = 0; i < thisel.length; i++) {
                    if (thisel[i].checked && thisel[i].value != "ALL") count++;
                }
                if (count + 1 == thisel.length) {
                    for (var i = 0; i < thisel.length; i++) {
                        if (thisel[i].value == "ALL") thisel[i].checked = true;
                    }
                }
            }
        }
        count = 0;
        for (var i = 0; i < thisel.length; i++) {
            if (thisel[i].checked) count++;
        }
        // 선택상태에 따른 상단 선택정보영역 
        if (count == 1) {
            for (var i = 0; i < thisel.length; i++) {
                if (thisel[i].checked) inhtml = '<i class="xi-filter"></i>' + thisel[i].value + '<i class="xi-angle-down-min"></i>';
            }

        } else if (count >= thisel.length - 1) {
            inhtml = '<i class="xi-filter"></i>전체 키워드 속성<i class="xi-angle-down-min"></i>'
        } else {
            inhtml = '<i class="xi-filter"></i>선택 키워드 속성<i class="xi-angle-down-min"></i>'
        }
        this.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML = inhtml;
    }

    // 위젯내 기간 선택 이벤트 , 위젯내 갯수 선택 이벤트
    view.prototype.periodEvent = function(el, icoStr) {
        var thisel = document.querySelectorAll('[name=' + el.name + ']');
        for (var i = 0; i < thisel.length; i++) {
            if (thisel[i].checked) {
                val = thisel[i].value;
                thisel[i].parentElement.parentElement.parentElement.parentElement.children[0].innerHTML = '<i class="' + icoStr + '"></i>' + thisel[i].nextSibling.innerText + '<i class="xi-angle-down-min"></i>';
            }
        }
    }

    // 소비자 발신 
    view.prototype.classificationEvent = function(el) {
        var widgetId = el.name.substr(el.name.length - 3, 3);
        var thisel = document.querySelectorAll('[name=' + el.name + ']');
        var targetEl = thisel[0].parentElement.parentElement.parentElement.parentElement.nextElementSibling;
        var val = 'A';
        for (var i = 0; i < thisel.length; i++) {
            if (thisel[i].checked) {
                val = thisel[i].value;
                thisel[i].parentElement.parentElement.parentElement.parentElement.children[0].innerHTML = '<i class="ico_all"></i>' + thisel[i].nextSibling.innerText + '<i class="xi-angle-down-min"></i>';
            }
        }
        targetEl.innerHTML = this.widgetHeader.getClassMediaHtml(val, widgetId);
        targetEl.children[0].addEventListener('click', this.widgetOptionEvent.bind(this, targetEl.children[0]));

        var mediaOption = document.querySelectorAll('[name=mediaChk' + widgetId + ']');
        if (mediaOption) {
            for (var j = 0; j < mediaOption.length; j++) {
                mediaOption[j].addEventListener('click', this.mediaEvent);
            }
        }
    }



    view.prototype.toString = function() {
        return "WIDGET.view.widget"
    }

    return view;
}());