package com.dash.util;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import com.dash.dto.UserDTO;

@Component
public class ComSessionUtil {
	/**
     * 인증된 사용자의 권한 정보를 가져온다.Y]
     * @return List - 사용자 권한정보 목록 (TRUE / FALSE)
     */
    public Boolean isAuthenticated() {
		if (isNull((UserDTO) RequestContextHolder.getRequestAttributes().getAttribute("loginUser", RequestAttributes.SCOPE_SESSION))) {
		    return Boolean.FALSE;
		}
		return Boolean.TRUE;
    }
    /**
     * 인증된 사용자객체를 dto형식으로 가져온다.
     * @return UserDTO - 사용자 정보
     */
    public UserDTO getAuthenticatedUser() {
	return (UserDTO)RequestContextHolder.getRequestAttributes().getAttribute("loginUser", RequestAttributes.SCOPE_SESSION)==null ? 
		new UserDTO() : (UserDTO) RequestContextHolder.getRequestAttributes().getAttribute("loginUser", RequestAttributes.SCOPE_SESSION);

    }
    /**
     * attribute 값을 가져 오기 위한 method
     *
     * @param String  attribute key name
     * @return Object attribute obj
     */
    public Object getAttribute(String name) throws Exception {
        return (Object)RequestContextHolder.getRequestAttributes().getAttribute(name, RequestAttributes.SCOPE_SESSION);
    }
    
    /**
     * 설정한 attribute 삭제
     *
     * @param String  attribute key name
     * @return void
     */
    public void removeAttribute(String name) throws Exception {
    	RequestContextHolder.getRequestAttributes().removeAttribute(name, RequestAttributes.SCOPE_SESSION);
    }
    /**
     * 설정한 sessionStatus 삭제
     *
     * @param SessionStatus sessionStatus
     * @return void
     */
    public void removeAttribute(SessionStatus sessionStatus) throws Exception {
    	sessionStatus.setComplete();
    }
    
    public boolean isNull(Object object) {
    	return ((object == null) || object.equals(null));
    }
    
    /**
     * attribute 설정 method
     *
     * @param String  attribute key name
     * @param Object  attribute obj
     * @return void
     */
    public void setAttribute(String name, Object object) throws Exception {
        RequestContextHolder.getRequestAttributes().setAttribute(name, object, RequestAttributes.SCOPE_SESSION);
    }
}
