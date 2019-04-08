package com.dash.dao;

import com.dash.dto.UserDTO;

public interface UserDAO {
	public UserDTO login(UserDTO dto) throws Exception;
}
