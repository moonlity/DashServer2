package com.dash.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.dash.dao.UserDAO;
import com.dash.dto.UserDTO;

@Service
public class UserServiceImpl implements UserService {
	@Inject
	UserDAO userDAO;
	
	@Override
	public UserDTO getLogin(UserDTO userDTO) throws Exception {
		return userDAO.login(userDTO);
	}

}
