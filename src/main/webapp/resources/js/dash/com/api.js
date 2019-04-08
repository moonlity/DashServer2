/**
 * @author 송원진
 * @since 2019.01.04
 * 비동기 ajax 호출 공통함수이다
 * */

var ApiCall = (function() {
    var ApiCall;
    ApiCall = function() {
        this.method = "POST"; // 요청방식
        this.path = ""; // 요청주소
        this.payload = {}; // 요청 파라미터
        this.dataType = "JSON"; //응답 데이터 타입

        this.errorMsg = "실행에 문제가 발생했습니다.";
    }

    /**
     * @param val 파라미터정보객체
     * 요청용 payload 파라미터 정보를 저장한다.
     * */
    ApiCall.prototype.setPayload = function(val) {
        this.payload = val;
    }

    /**
     * @param val 메소드명
     * 요청메소드 설정 get post put delete 대소문자 상관없음
     * */
    ApiCall.prototype.setMethod = function(val) {
            this.method = val;
        }
        /**
         * @param val 요청주소
         * 요청 주소를 설정한다.
         * */
    ApiCall.prototype.setPath = function(val) {
            this.path = val;
        }
        /**
         * @param val 데이터방식
         * 데이터 형식을 설정한다.
         * */
    ApiCall.prototype.setDataType = function(val) {
            this.dataType = val;
        }
        /**
         * @param val 메세지
         *  에러메세지를 설정한다.
         * */
    ApiCall.prototype.setErrorMsg = function(val) {
        this.errorMsg = val;
    }


    // 비동기 요청을 한다.
    ApiCall.prototype.call = function() {
        var that = this;

        $.ajax({
                method: this.method,
                url: this.path,
                dataType: this.dataType,
                data: this.payload
            })
            .done(function(res) {
                return res.data;
            })
            .fail(function() {
                console.error(that.errorMsg);
            })
            .always(function() {
                console.log(that.url + " 실행");
            })
    }

    // 비동기 요청을 한다.
    ApiCall.prototype.callReq = function() {
        var xhr;
        xhr = $.ajax({
            method: this.method,
            url: this.path,
            dataType: this.dataType,
            data: this.payload
        })
        return xhr;
    }

    // 직접 실행할때 사용하는 부분
    /**
     *  @param method post get put delete
     *  @param path 호출주소
     *  @param payload 요청데이터
     *  @param dataType 데이터 타입
     *  xhr 자체를 리턴받아 사용할경우 사용
     * */
    ApiCall.prototype.xhrReturn = function(method, path, payload, dataType) {
            var xhr;
            if (!dataType) dataType = "json";
            xhr = $.ajax({
                method: method,
                url: path,
                dataType: dataType,
                data: payload
            });
            return xhr
        }
        /**
         *  @param method post get put delete
         *  @param path 호출주소
         *  @param payload 요청데이터
         *  @param dataType 데이터 타입
         *  @param callBack 호출이후 사용할 콜백함수
         *  @param errorMsg 에러발생시 메세지
         *  콜백함수를 함께 이용할 경우 사용함
         * */

    ApiCall.prototype.callBackReq = function(method, path, payload, dataType, callBack, errorMsg) {
        if (!dataType) dataType = "json";
        $.ajax({
                method: method,
                url: path,
                dataType: dataType,
                data: payload
            })
            .done(function(data) {
                callBack(data);
            })
            .fail(function() {
                console.error(path + "-에러발생-" + errorMsg);
            })
            .always(function() {
                console.log("callBackReq 실행 : " + path + "," + payload);
            })

    }
    ApiCall.prototype.toString = function() {
        return "ApiCall";
    }
    return ApiCall;
}());