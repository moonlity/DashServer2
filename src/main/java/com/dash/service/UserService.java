package com.dash.service;

import com.dash.dto.UserDTO;

public interface UserService {
	public UserDTO getLogin(UserDTO userDTO) throws Exception;
}
