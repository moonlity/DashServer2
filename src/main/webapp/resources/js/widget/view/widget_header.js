/**
 * @fileoverview 각위젯 검색영역관련 html 
 * @author 송원진
 * @version 1.0
 * @since 2019.04.01 
 */
WIDGET.createNameSpace("WIDGET.view.header");

WIDGET.view.header = (function() {
    var header;
    header = function() {
        this.media = ''; // 미디아
        this.setWith = ''; // 다운로드 이미지 rt 정렬등
        this.categories = ''; // 카테고리
        this.catetype = ''; // 카테고리타입
        this.duration = ''; // 일별 부별 월별 분기별 기간
        this.classification = ''; // 소비자발신
        this.search = ''; // 검색버튼
        this.attributes = ''; // 속성값
        this.count = ''; // 조회 숫자목록
        this.chartShow = ''; // 차트값보기
    }

    // 각위젯의 검색 영역 html
    header.prototype.getSearchBarHtml = function(tag, widgetId) {
        var html = '';

        switch (tag) {
            case 'h00': // 아무것도 없는영역
                html = '<div class="item"></div>';
                html += '<div class="item"></div>';
                break;
            case 'h01': // 다운로드만 있는경우
                html = '<div class="item">';
                html += this.getSetWith2Html();
                html += '</div>';
                break;
            case 'h02': //  미디어 + 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h03': //  미디어 + 조회숫자 + 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getCountHtml("centerType", widgetId);
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h04': //  미디어 + 일별조회 + 차트보기 + 다운로드(이미지 + 엑셀) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getDuration1Html("centerType", widgetId);
                html += this.getChartShowHtml("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h05': //  미디어 + 차트보기 + 다운로드(이미지 + 엑셀) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getChartShowHtml("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h06': //  미디어 + 갯수보기 + 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getCountHtml("centerType", widgetId);
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h07': //  미디어 + 전체키워드속성 + 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getAttributesHtml("centerType", widgetId); // 키워드 값은 디비에서 값조회시 추출된 키워드로 채운다.
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h08': // 소비자발신 + 미디어 + 다운로드(엑셀만) + 조회 --  원문보기1
                html = '<div class="item">';
                html += this.getClassificationHtml("leftType", widgetId);
                html += this.getMediaHtml("centerType", widgetId);
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h08': // 소비자발신 + 미디어 + 다운로드(rt + 엑셀) + 조회 --  원문보기2 -- 트위터가 포함되어 있을때
                html = '<div class="item">';
                html += this.getClassificationHtml("leftType", widgetId);
                html += this.getMediaHtml("centerType", widgetId);
                html += this.getSetWith3Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h09': // 미디어 + 일별+ 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getDuration1Html("centerType", widgetId);
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h10': // 미디어 + 일별+ 조회
                html = '<div class="item">';
                html += this.getMediaHtml("leftType", widgetId);
                html += this.getDuration1Html("rightType", widgetId);
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;
            case 'h11': // 카테타입 + 다운로드(엑셀만) + 조회
                html = '<div class="item">';
                html += this.getCatetypeHtml("leftType"); // 조회이후 카테고리 타입을 채워주어야 한다. + 하위 펼쳐지는 메뉴를 만들어서 추가 해야한다.
                html += this.getSetWith2Html("rightType");
                html += '</div>';
                html += '<div class="item">';
                html += this.getSearchHtml(widgetId);
                html += '</div>';
                break;

        }
        return html;
    }

    // 소비자 발신에 따른 미디어 html
    header.prototype.getClassMediaHtml = function(val, widgetId) {
        var html = "";
        switch (val) {
            case "A":
                html += '<a href="javascript:void(0);" class="drop-bt mediaType centerType" style="width:112px;"><i class="ico_mass"></i>매스미디어<i class="xi-angle-down-min"></i></a>';
                html += '<div class="drop-ct" style="display: none;">';
                html += '<ul>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="ALL" id= "media' + widgetId + '01" ><label for="media' + widgetId + '01">전체</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" checked=true value="M" id="media' + widgetId + '02"><label for="media' + widgetId + '02">매스미디어</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="T" id="media' + widgetId + '03"><label for="media' + widgetId + '03">트위터</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="F" id="media' + widgetId + '04"><label for="media' + widgetId + '04">페이스북</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="I" id="media' + widgetId + '05"><label for="media' + widgetId + '05">인스타그램</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="R" id="media' + widgetId + '06"><label for="media' + widgetId + '06">블로그</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="C" id="media' + widgetId + '07"><label for="media' + widgetId + '07">커뮤니티</label></li>';
                html += '</ul>';
                html += '</div>';
                break;
            case "E":
                html += '<a href="javascript:void(0);" class="drop-bt mediaType centerType"  style="width:112px;"><i class="ico_twitter"></i>트위터<i class="xi-angle-down-min"></i></a>';
                html += '<div class="drop-ct" style="display: none;">';
                html += '<ul>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="ALL" id= "media' + widgetId + '01" ><label for="media' + widgetId + '01">전체</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" checked=true value="T" id="media' + widgetId + '03"><label for="media' + widgetId + '03">트위터</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="F" id="media' + widgetId + '04"><label for="media' + widgetId + '04">페이스북</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="I" id="media' + widgetId + '05"><label for="media' + widgetId + '05">인스타그램</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="R" id="media' + widgetId + '06"><label for="media' + widgetId + '06">블로그</label></li>';
                html += '</ul>';
                html += '</div>';
                break;
            case "C":
                html += '<a href="javascript:void(0);" class="drop-bt mediaType centerType"  style="width:112px;"><i class="ico_twitter"></i>트위터<i class="xi-angle-down-min"></i></a>';
                html += '<div class="drop-ct" style="display: none;">';
                html += '<ul>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="ALL" id= "media' + widgetId + '01" ><label for="media' + widgetId + '01">전체</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" checked=true value="T" id="media' + widgetId + '03"><label for="media' + widgetId + '03">트위터</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="F" id="media' + widgetId + '04"><label for="media' + widgetId + '04">페이스북</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="I" id="media' + widgetId + '05"><label for="media' + widgetId + '05">인스타그램</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="R" id="media' + widgetId + '06"><label for="media' + widgetId + '06">블로그</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="C" id="media' + widgetId + '07"><label for="media' + widgetId + '07">커뮤니티</label></li>';
                html += '</ul>';
                html += '</div>';
                break;
            case "T":
                html += '<a href="javascript:void(0);" class="drop-bt mediaType centerType" style="width:112px;"><i class="ico_mass"></i>매스미디어<i class="xi-angle-down-min"></i></a>';
                html += '<div class="drop-ct" style="display: none;">';
                html += '<ul>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="ALL" id= "media' + widgetId + '01" ><label for="media' + widgetId + '01">전체</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" checked=true value="M" id="media' + widgetId + '02"><label for="media' + widgetId + '02">매스미디어</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="T" id="media' + widgetId + '03"><label for="media' + widgetId + '03">트위터</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="R" id="media' + widgetId + '06"><label for="media' + widgetId + '06">블로그</label></li>';
                html += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="C" id="media' + widgetId + '07"><label for="media' + widgetId + '07">커뮤니티</label></li>';
                html += '</ul>';
                html += '</div>';
                break;
            default:
                break;
        }
        return html;
    }

    // 미디어 html
    header.prototype.getMediaHtml = function(headerClass, widgetId) {
        this.media = '<div class="drop-ar commonheader">';
        this.media += '<a href="javascript:void(0);" class="drop-bt mediaType ' + headerClass + '" style="width:112px;"><i class="ico_mass"></i>매스미디어<i class="xi-angle-down-min"></i></a>';
        this.media += '<div class="drop-ct" style="display: none;">';
        this.media += '<ul>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="ALL" id= "media' + widgetId + '01" ><label for="media' + widgetId + '01">전체</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" checked=true value="M" id="media' + widgetId + '02"><label for="media' + widgetId + '02">매스미디어</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="T" id="media' + widgetId + '03"><label for="media' + widgetId + '03">트위터</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="F" id="media' + widgetId + '04"><label for="media' + widgetId + '04">페이스북</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="I" id="media' + widgetId + '05"><label for="media' + widgetId + '05">인스타그램</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="R" id="media' + widgetId + '06"><label for="media' + widgetId + '06">블로그</label></li>';
        this.media += '<li><input type="checkbox" name="mediaChk' + widgetId + '" class="cssCheck" value="C" id="media' + widgetId + '07"><label for="media' + widgetId + '07">커뮤니티</label></li>';
        this.media += '</ul>';
        this.media += '</div>';
        this.media += '</div>';
        return this.media;
    };
    // 다운로드 관련  html 이미지 엑셀 다운로드만 있는경우
    header.prototype.getSetWith1Html = function(headerClass) {
        this.setWith = '<div class="drop-ar commonheader">';
        this.setWith += '<a href="javascript:void(0);" class="drop-bt optionType ' + headerClass + '"><i class="xi-ellipsis-v"></i></a>';
        this.setWith += '<div class="drop-ct wide" style="display: none;">';
        this.setWith += '<div class="download">';
        this.setWith += '<span>다운로드</span>';
        this.setWith += '<ul>';
        this.setWith += '<li><a href="javascript:void(0);" class="file-image"><i class="xi-file-text-o"></i>이미지파일</a></li>';
        this.setWith += '<li><a href="javascript:void(0);" class="file-text"><i class="xi-file-image-o"></i>엑셀파일</a></li>';
        this.setWith += '</ul>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        return this.setWith;
    }

    // 다운로드 관련  html 엘셀 다운로드만 있는경우
    header.prototype.getSetWith2Html = function(headerClass) {
        this.setWith = '<div class="drop-ar commonheader">';
        this.setWith += '<a  href="javascript:void(0);" class="drop-bt optionType ' + headerClass + '"><i class="xi-ellipsis-v"></i></a>';
        this.setWith += '<div class="drop-ct wide" style="display: none;">';
        this.setWith += '<div class="download">';
        this.setWith += '<span>다운로드</span>';
        this.setWith += '<ul>';
        this.setWith += '<li><a href="javascript:void(0);" class="file-text"><i class="xi-file-text-o"></i>엑셀파일</a></li>';
        this.setWith += '</ul>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        return this.setWith;
    }

    // 다운로드 관련  html rt글 포함 rt 순 정렬 엑셀다운로드
    header.prototype.getSetWith3Html = function(headerClass) {
        this.setWith = '<div class="drop-ar commonheader">';
        this.setWith += '<a  href="javascript:void(0);" class="drop-bt optionType ' + headerClass + '"><i class="xi-ellipsis-v"></i></a>';
        this.setWith += '<div class="drop-ct wide" style="display: none;">';
        this.setWith += '<div class="rtCheck">';
        this.setWith += '<input type="checkbox" id="rtCheck" checked="checked"><label for="rtCheck">RT 글 포함</label>';
        this.setWith += '<input type="checkbox" id="rtCheckSort" value="rt_count desc"><label for="rtCheckSort">RT 순 정렬</label>';
        this.setWith += '</div>';
        this.setWith += '<div class="download">';
        this.setWith += '<span>다운로드</span>';
        this.setWith += '<ul>';
        this.setWith += '<li><a href="javascript:void(0);" class="file-text"><i class="xi-file-text-o"></i>엑셀파일</a></li>';
        this.setWith += '</ul>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        this.setWith += '</div>';
        return this.setWith;
    }

    // 카테고리
    header.prototype.getGategoriesHtml = function() {
        this.categories = '<dl class="dropdown category-ar"></dl>';
        return this.categories;
    }

    // 일별 주별 월별 분기별 구군
    header.prototype.getDuration1Html = function(headerClass, widgetId) {
        this.duration = '<div class="drop-ar commonheader">';
        this.duration += '<a href="javascript:void(0);"  class="drop-bt periodType ' + headerClass + ' duration1" style="width:84px;"><i class="xi-calendar"></i>일별<i class="xi-angle-down-min"></i></a>';
        this.duration += '<div class="drop-ct" style="display: none;">';
        this.duration += '<ul>';
        this.duration += '<li><input type="radio" class="cssRadio" value="date" name="periodRadio' + widgetId + '" id="periodRadio' + widgetId + '01" checked=true ><label for="periodRadio' + widgetId + '01">일별</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="week" name="periodRadio' + widgetId + '" id="periodRadio' + widgetId + '02"><label for="periodRadio' + widgetId + '02">주별</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="month" name="periodRadio' + widgetId + '" id="periodRadio' + widgetId + '03"><label for="periodRadio' + widgetId + '03">월별</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="quarter" name="periodRadio' + widgetId + '" id="periodRadio' + widgetId + '04"><label for="periodRadio' + widgetId + '04">분기별</label></li>';
        this.duration += '</ul>';
        this.duration += '</div>';
        this.duration += '</div>';
        return this.duration;
    }

    // 2주 1개월 3개월 6개월
    header.prototype.getDuration2Html = function(headerClass, widgetId) {
        this.duration = '<div class="drop-ar commonheader">';
        this.duration += '<a href="javascript:void(0);"  class="drop-bt periodType ' + headerClass + ' duration2" style="width:84px;"><i class="xi-calendar"></i>2주<i class="xi-angle-down-min"></i></a>';
        this.duration += '<div class="drop-ct" style="display: none;">';
        this.duration += '<ul>';
        this.duration += '<li><input type="radio" class="cssRadio" value="2w" name="periodRadio" id="periodRadio' + widgetId + '01" checked="checked"><label for="periodRadio' + widgetId + '01">2주</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="1m" name="periodRadio" id="periodRadio' + widgetId + '02"><label for="periodRadio' + widgetId + '02">1개월</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="3m" name="periodRadio" id="periodRadio' + widgetId + '03"><label for="periodRadio' + widgetId + '03">3개월</label></li>';
        this.duration += '<li><input type="radio" class="cssRadio" value="6m" name="periodRadio" id="periodRadio' + widgetId + '04"><label for="periodRadio' + widgetId + '04">6개월</label></li>';
        this.duration += '</ul>';
        this.duration += '</div>';
        this.duration += '</div>';
        return this.duration;
    }

    // 소비자발신
    header.prototype.getClassificationHtml = function(headerClass, widgetId) {
        this.classification = '<div class="drop-ar commonheader">';
        this.classification += '<a href="javascript:void(0);" class="drop-bt mediaType ' + headerClass + '" style="width:112px;"><i class="ico_all"></i>전체<i class="xi-angle-down-min"></i></a>';
        this.classification += '<div class="drop-ct" style="display: none;">';
        this.classification += '<ul>';
        this.classification += '<li><input type="radio" class="cssRadio" name="classRadio' + widgetId + '"  id="classfication' + widgetId + '01" checked=true value="A"><label for="classfication' + widgetId + '01">전체</label></li>';
        this.classification += '<li><input type="radio" class="cssRadio" name="classRadio' + widgetId + '"  id="classfication' + widgetId + '02" value="E"><label for="classfication' + widgetId + '02">기업 발신</label></li>';
        this.classification += '<li><input type="radio" class="cssRadio" name="classRadio' + widgetId + '"  id="classfication' + widgetId + '03" value="C"><label for="classfication' + widgetId + '03">소비자 발신</label></li>';
        this.classification += '<li><input type="radio" class="cssRadio" name="classRadio' + widgetId + '"  id="classfication' + widgetId + '04" value="T"><label for="classfication' + widgetId + '04">Third Party</label></li>';
        this.classification += '</ul>';
        this.classification += '</div>';
        this.classification += '</div>';
        return this.classification;
    }

    // 검색버튼
    header.prototype.getSearchHtml = function(widgetId) {
        this.search = '<a href="javascript:void(0);" class="drop-bt oneType refresh" data-widgetid= ' + widgetId + '>조회</a>';
        return this.search;
    }

    // 속성영역
    header.prototype.getAttributesHtml = function(headerClass, widgetId) {
        this.attributes = '<div class="drop-ar commonheader">';
        this.attributes += '<a href="javascript:void(0);" class="drop-bt periodType ' + headerClass + ' attribute" style="width:136px;"><i class="xi-filter"></i>전체 키워드 속성<i class="xi-angle-down-min"></i></a>';
        this.attributes += '<div class="drop-ct" style="display: none;">';
        this.attributes += '<ul>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '"  id="arr' + widgetId + '01" value="ALL" ><label for="arr' + widgetId + '01">전체 속성</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '02" value="단체"><label for="arr' + widgetId + '02">단체</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '03" value="라이프"><label for="arr' + widgetId + '03">라이프</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '04" value="브랜드"><label for="arr' + widgetId + '04">브랜드</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '05" value="상품"><label for="arr' + widgetId + '05">상품</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '06" value="속성"><label for="arr' + widgetId + '06">속성</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '07" value="시간"><label for="arr' + widgetId + '07">시간</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '08" value="엔터테이먼트"><label for="arr' + widgetId + '08">엔터테이먼트</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '09" value="이슈"><label for="arr' + widgetId + '09">이슈</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '10" value="인물"><label for="arr' + widgetId + '10">인물</label></li>';
        this.attributes += '<li><input type="checkbox" class="cssCheck"  checked=true name="c1Radio' + widgetId + '" id="arr' + widgetId + '11" value="장소"><label for="arr' + widgetId + '11">장소</label></li>';
        this.attributes += '</ul>';
        this.attributes += '</div>';
        this.attributes += '</div>';
        return this.attributes;
    }

    // 전체 숫자 갯수
    header.prototype.getCountHtml = function(headerClass, widgetId) {
        this.attributes = '<div class="drop-ar commonheader">';
        this.attributes += '<a href="javascript:void(0);" class="drop-bt periodType ' + headerClass + '" style="width:65px;"><i class="xi-align-center"></i>25<i class="xi-angle-down-min"></i></a>';
        this.attributes += '<div class="drop-ct" style="display: none;">';
        this.attributes += '<ul>';
        this.attributes += '<li><input type="radio" class="cssRadio" name="countRadio' + widgetId + '" id="countarr25' + widgetId + '" value="25" checked="checked"><label for="countarr25' + widgetId + '">25</label></li>';
        this.attributes += '<li><input type="radio" class="cssRadio" name="countRadio' + widgetId + '" id="countarr50' + widgetId + '" value="50" ><label for="countarr50' + widgetId + '">50</label></li>';
        this.attributes += '<li><input type="radio" class="cssRadio" name="countRadio' + widgetId + '" id="countarr75' + widgetId + '" value="75" ><label for="countarr75' + widgetId + '">75</label></li>';
        this.attributes += '<li><input type="radio" class="cssRadio" name="countRadio' + widgetId + '" id="countarr100' + widgetId + '" value="100" ><label for="countarr100' + widgetId + '">100</label></li>';
        this.attributes += '</ul>';
        this.attributes += '</div>';
        this.attributes += '</div>';
        return this.attributes;
    }

    // 차트 값보기
    header.prototype.getChartShowHtml = function(headerClass) {
        this.chartShow = '<div class="drop-ar">';
        this.chartShow += '<a href="#" class="drop-bt  ' + headerClass + '" id="showValue" style="width:70px;padding-left: 14px;" >';
        this.chartShow += '<i class="xi-chart-bar"></i>';
        this.chartShow += '<span>값보기</span>';
        this.chartShow += '</a>';
        this.chartShow += '</div>';
        return this.chartShow;
    }

    // 차트 값보기
    header.prototype.getCatetypeHtml = function(headerClass) {
        this.catetype = '<dt class="categoryType">';
        this.catetype += '<i class="xi-list"></i>';
        this.catetype += '<a  href="javascript:void(0);" class="drop-bt ' + headerClass + '">';
        this.catetype += '<span>전체<em>카테고리<span></span>&nbsp;(15)</em></span>'; // 이부분은 카테고리속성값 구하고서 다시 숫자 정의한다.
        this.catetype += '<i class="xi-angle-down-min"></i>';
        this.catetype += '</a>';
        this.catetype += '</dt>';
        this.catetype += '<dd style="display: none;" class="drop-ct">';
        this.catetype += '<ul class="dropdown2">';
        this.catetype += '</ul>';
        this.catetype += '</dd>';
        return this.catetype;
    }


    header.prototype.toString = function() {
        return "WIDGET.view.header";
    };
    return header;
}());