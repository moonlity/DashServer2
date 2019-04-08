package com.dash.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.dash.dto.UserDTO;
@Repository
public class UserDAOImpl implements UserDAO {
	@Inject
	private SqlSession session;
	
	private static String usernamespace ="mapper.UserMapper";
	@Override
	public UserDTO login(UserDTO dto) throws Exception {
		return session.selectOne(usernamespace +".login", dto);
	}

}
