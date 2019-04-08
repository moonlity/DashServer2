/**
 * @fileoverview 트랜드업의 위젯이라 통칭되는 영역에서 사용되는 공통적용소 부분
 * @author 송원진
 * @version 0.1
 * @since 2018.10.02 
 */

// 위젯영역에서 이용한여 네임스페이스를 생성한다.
var WIDGET = WIDGET || {};
// 네임스페이스 생성을 위할 함수
WIDGET.createNameSpace = function(nsValue) {
    // 사용된 변수들은 선언부에 모두 선언한다.
    var parts = nsValue.split('.'),
        parent = WIDGET,
        i;

    if (parts[0] === "WIDGET") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
}