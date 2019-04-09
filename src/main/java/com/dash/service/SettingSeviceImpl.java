package com.dash.service;

import java.util.List;

import com.dash.dto.DashMenuDTO;

public class SettingSeviceImpl implements SettingSevice {

	@Override
	public List<DashMenuDTO> selectUserDashList(String userId, String svcMunuId) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int insertDash(String userId, String svcMunuId, String dashName) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateDash(String userId, String svcMunuId, String dashName, String dashId) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteDash(String userId, String svcMenuId, String dashId) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int selectDashLimitCount(String userId) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

}
