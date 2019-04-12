package com.dash.service;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dash.dao.SettingDAO;
import com.dash.dto.DashMenuDTO;
import com.dash.dto.DashWidgetDTO;
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

	@Override
	public HashMap<String, Object> getWidgetList(String search, int size, int offset) throws Exception {
		logger.info("[ SettingSevice : 사용자 이용가능 위젯확인 ] " );
		HashMap<String, Object> map = new HashMap<String, Object>();
		List<DashWidgetDTO> widgetList = dao.getWidgetList(search , size, offset);
		int widgetCount = dao.getWidgetCount(search);
		map.put("list", widgetList);
		map.put("count", widgetCount);
		return map;
	}

	@Override
	public List<DashWidgetDTO> getSettingDashAbleWidget(int dashid) throws Exception {
		logger.info("[ SettingSevice : 이전에 등록한 위젯목록확인 ] : " + dashid );
		return dao.getSettingDashAbleWidget(dashid);
	}

}
