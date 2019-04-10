package com.dash.service;

import java.util.List;

import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dash.dao.SettingDAO;
import com.dash.dto.DashMenuDTO;
@Service
public class SettingSeviceImpl implements SettingSevice {
	private static Logger logger = LoggerFactory.getLogger(SettingSeviceImpl.class);
	@Inject
	SettingDAO dao;
	@Override
	public List<DashMenuDTO> selectUserDashList(String userId) throws Exception {
		
		return dao.selectUserDashList(userId);
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
		logger.info("[ SettingSevice : %s 사용자 대시보드 생성가능수량 ] " , userId );
		return dao.selectDashLimitCount(userId);
	}

}
