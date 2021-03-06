package com.dash.service;

import java.util.HashMap;
import java.util.List;

import com.dash.dto.DashMenuDTO;
import com.dash.dto.DashSaveDTO;
import com.dash.dto.DashWidgetDTO;

public interface SettingSevice {
	/**
	 * 사용자의 대메뉴별 대시보드 목록을 가져온다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @return 사용하는 대시보드 목록 List<DashMenuDTO>
	 * @exception Exception
	 * 
	 * */
	public List<DashMenuDTO> selectUserDashList(String userId) throws Exception;
	
	/**
	 * 사용자의 대메뉴별 대시보드 생성가능 갯수를 가져온다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @return int
	 * @exception Exception
	 * */
	public int selectDashLimitCount(String userId) throws Exception;
	
	/**
	 * @param String search 위젯검색명
	 * @param int size 리턴받을 갯수
	 * @param int offset 이숫자 다음것부터 가져온다.
	 * @return List<WidgetDTO>  
	 * @throws Exception 
	 * 대시보드 메뉴에서 사용가능한 위젯목록정보를 가져온다.
	 */	
	public HashMap<String, Object> getWidgetList(String search, int size, int offset) throws Exception;
	
	/**
	 * @param int dashid 대시보드아이디
	 * @return List<DashWidgetDTO>  
	 * @throws Exception 
	 * @desc 대시보드설정페이지에서 이미 설정완료된 위젯 정보를 가져온다.
	 */	
	public List<DashWidgetDTO> getSettingDashAbleWidget(int dashid) throws Exception;
	/**
	 * 대시보드를 저장한다.
	 * @author 송원진
	 * @param {DashSaveDTO} dto  저장관련정보 일체
	 * @return int
	 * @exception Exception
	 * 
	 * */
	public int saveDash(DashSaveDTO dto) throws Exception;
}
