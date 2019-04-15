package com.dash.service;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dash.dao.SettingDAO;
import com.dash.dto.DashInsertDTO;
import com.dash.dto.DashMenuDTO;
import com.dash.dto.DashSaveDTO;
import com.dash.dto.DashWidgetDTO;
import com.dash.dto.WidgetInfoDTO;
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

	@Override
	@Transactional
	public int saveDash(DashSaveDTO dto) throws Exception {
		// -- delDashId 대시보드를 삭제
		String[] delDashId = dto.getDelDashId();
		if(delDashId.length > 0){
			dao.deleteWidget(delDashId);
			dao.deleteDashBoard(delDashId);
		}
		
		// 대시보드 수정정보
		List<DashMenuDTO> updateDash = dto.getUpdateDash();
		for (DashMenuDTO dashMenuDTO : updateDash) {
			dao.updateDash(dto.getUserId() , dashMenuDTO.getDashName() , dashMenuDTO.getDashId() );
		}	
		
		// 대시보드 신규정보
		List<DashMenuDTO> createDash = dto.getCreateDash();
		for (DashMenuDTO dashMenuDTO : createDash) {
			DashInsertDTO inDto = new DashInsertDTO();
			String dashId = dashMenuDTO.getDashId();

			inDto.setDashName( dashMenuDTO.getDashName());
			inDto.setUserId(dto.getUserId());
			dao.insertDashReturn(inDto);
			
			// 하위 위젯 , 위젯 속성값의 dashId 를 변경해준다
			List<WidgetInfoDTO> widgetDto  = dto.getInsertWidget();
			for (WidgetInfoDTO widgetInfoDTO : widgetDto) {
				if(widgetInfoDTO.getDashId().equals(dashId )){
					widgetInfoDTO.setDashId( inDto.getDashId());
				}
			}
		}
		
		//  위젯 삭제정보
		List<WidgetInfoDTO> deleteWidget = dto.getDeleteWidget();
		for (WidgetInfoDTO widgetInfoDTO : deleteWidget) {
			dao.deleteWidgetVal(Integer.parseInt(widgetInfoDTO.getDashId()), widgetInfoDTO.getWidgetId());			
		}		
				
		// 위젯 수정정보
		List<WidgetInfoDTO> updateWidget = dto.getUpdateWidget();
		for (WidgetInfoDTO widgetInfoDTO : updateWidget) {
			widgetInfoDTO.setUserId(dto.getUserId());
			dao.updateDashWidget(widgetInfoDTO);
		}		
				
		// 위젯 신규 정보
		List<WidgetInfoDTO> insertWidget = dto.getInsertWidget();
		for (WidgetInfoDTO widgetInfoDTO : insertWidget) {
			dao.insertDashBoardWidget( Integer.parseInt(widgetInfoDTO.getDashId()), widgetInfoDTO.getWidgetId(), widgetInfoDTO.getCurWidth(), widgetInfoDTO.getCurHeight(), 
					widgetInfoDTO.getCurx(), widgetInfoDTO.getCury(), dto.getUserId());
		}		

		return 1;
	}

}
