package com.dash.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import org.apache.ibatis.session.SqlSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.dash.dto.DashInsertDTO;
import com.dash.dto.DashMenuDTO;
import com.dash.dto.WidgetInfoDTO;
@Repository
public class SettingDAOImpl implements SettingDAO {
	private static Logger logger = LoggerFactory.getLogger(SettingDAOImpl.class);
	
	@Inject
	private SqlSession session;
	
	private static String namespace = "mapper.SettingMapper";
	
	@Override
	public List<DashMenuDTO> selectUserDashList(String userId) throws Exception {
		logger.info("[사용자별 메뉴별 대시보드를 조회합니다 ]" + " - userId : " + userId );
		return session.selectList(namespace + ".userDashList", userId);
	}

	@Override
	public int insertDash(String userId, String svcMenuId, String dashName) throws Exception {
		logger.info("[사용자별 메뉴별 대시보드를 저장한다. ]" + " - userId : " + userId + " - svcMunuId : " + svcMenuId + " - dashName : " + dashName);
		Map<String, Object> param = new HashMap<>();
		param.put("userId", userId);
		param.put("svcMenuId", svcMenuId);
		param.put("dashName", dashName);
		return session.insert(namespace + ".insertDashBoard", param);
	}

	@Override
	public int updateDash(String userId, String svcMenuId, String dashName , String dashId) throws Exception {
		logger.info("[사용자별 메뉴별 대시보드를 수정한다. ]" + " - userId : " + userId + " - svcMunuId : " + svcMenuId + " - dashName : " + dashName + " - dashId " + dashId);
		Map<String, Object> param = new HashMap<>();
		param.put("userId", userId);
		param.put("svcMenuId", svcMenuId);
		param.put("dashName", dashName);
		param.put("dashId", dashId);
		return session.update(namespace + ".updateDashBoard", param);
	}

	@Override
	public int deleteDash(String userId, String svcMenuId, String dashId) throws Exception {
		logger.info("[사용자별 메뉴별 대시보드를 삭제한다. ]" + " - userId : " + userId + " - svcMenuId : " + svcMenuId + " - dashId : " + dashId);
		Map<String, Object> param = new HashMap<>();
		param.put("userId", userId);
		param.put("svcMenuId", svcMenuId);
		param.put("dashId", dashId);
		return session.delete(namespace + ".deleteDashBoard", param);
	}

	@Override
	public int selectDashLimitCount(String userId) throws Exception {
		return session.selectOne(namespace+".selectDashLimitCount", userId);
	}

	@Override
	public int deleteWidgetProp(String[] dashId) throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashList", dashId);
		return session.delete(namespace + ".deleteWidgetProp", paramMap);
	}

	@Override
	public int deleteWidget(String[] dashId) throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashList", dashId);
		return session.delete(namespace + ".deleteWidget", paramMap);
	}

	@Override
	public int deleteDashQuery(String[] dashId) throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashList", dashId);
		return session.delete(namespace + ".deleteDashQuery", paramMap);
	}

	@Override
	public int deleteDashBoard(String[] dashId) throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashList", dashId);
		return session.delete(namespace + ".deleteDash", paramMap);
	}

	@Override
	public int updateDashName(DashMenuDTO dto) throws Exception {
		return session.update(namespace + ".updateDashName", dto);
	}

	@Override
	public int deleteWidgetPropVal(int propId) throws Exception {
		return session.delete(namespace + ".deleteWidgetPropVal", propId);
	}

	@Override
	public int deleteWidgetVal(int widgetId) throws Exception {
		return session.delete(namespace + ".deleteWidgetVal", widgetId);
	}

	@Override
	public int updateDashWidget(WidgetInfoDTO dto) throws Exception {
		return session.delete(namespace + ".updateDashWidget", dto);
	}

	@Override
	public int insertDashBoardWidget(int dashId, int widgetId, int curWidth, int curHeight, int curx, int cury,
			String userId) throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashId", dashId);
		paramMap.put("widgetId", widgetId);
		paramMap.put("curWidth", curWidth);
		paramMap.put("curHeight", curHeight);
		paramMap.put("curx", curx);
		paramMap.put("cury", cury);
		paramMap.put("userId", userId);
		return session.insert(namespace+".insertDashBoardWidget", paramMap);
	}

	@Override
	public int insertDashReturn(DashInsertDTO dto) throws Exception {
		return session.insert(namespace+".insertDashBoardReturn", dto);
	}

	@Override
	public int insertDashWidgetProp(String dashId, int widgetId, int optionid, int optionpropid, String userId)
			throws Exception {
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("dashId", dashId);
		paramMap.put("widgetId", widgetId);
		paramMap.put("optionid", optionid);
		paramMap.put("optionpropid", optionpropid);
		paramMap.put("userId", userId);
		return session.insert(namespace+".insertDashWidgetProp", paramMap);
	}

}
