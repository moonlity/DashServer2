package com.dash.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.dash.dto.UserDTO;


public class LoginInterceptor extends HandlerInterceptorAdapter {
	private static Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		logger.info("[session-confirm-세션확인 인터셉터]");
		// 세션이 없을 경우 이동할 주소
		String loginURL = "/user/login";
		UserDTO userDTO = (UserDTO)RequestContextHolder.getRequestAttributes().getAttribute("loginUser", RequestAttributes.SCOPE_SESSION);
		logger.info("[session-confirm-userDTO]" +(userDTO == null));
		if (userDTO == null || userDTO.getUserName() == null || userDTO.getUserName().length() <1) {
			response.sendRedirect(loginURL);
		}
		return super.preHandle(request, response, handler);
	}

}
