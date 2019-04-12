package com.dash.dao;

import java.util.List;

import com.dash.dto.DashInsertDTO;
import com.dash.dto.DashMenuDTO;
import com.dash.dto.DashWidgetDTO;
import com.dash.dto.WidgetInfoDTO;

public interface SettingDAO {
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
	 * 사용자의 대메뉴별 대시보드 목록을 가져온다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @param dashName  String 대시보드이름
	 * @return void
	 * @exception Exception
	 * 
	 * */
	public int insertDash(String userId , String dashName) throws Exception;
	
	/**
	 * 사용자의 대메뉴별 대시보드 이름을 수정한다.
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @param dashName  String 대시보드이름
	 * @param dashId  String 대시보드 아이디
	 * @return void
	 * @exception Exception
	 * 
	 * */
	public int updateDash(String userId , String dashName,String dashId) throws Exception;
	
	/**
	 * 사용자의 대메뉴별 대시보드 삭제한다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @param dashId  String 대시보드 아이디
	 * @return void
	 * @exception Exception
	 * */
	public int deleteDash(String userId , String dashId) throws Exception;
	/**
	 * 사용자의 대메뉴별 대시보드 생성가능 갯수를 가져온다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @return int
	 * @exception Exception
	 * */
	public int selectDashLimitCount(String userId) throws Exception;
	
	// 대시보드 위젯속성 속성정보 삭제
	public int deleteWidgetProp(String[] dashId) throws Exception;
	
	// 대시보드 위젯 정보 삭제
	public int deleteWidget(String[] dashId) throws Exception;

	// 대시보드 쿼리정보 삭제
	public int deleteDashBoard(String[] dashId) throws Exception;
	// 대시보드 이름 수정
	public int updateDashName(DashMenuDTO dto) throws Exception;
	// 위젯속성정보 삭제
	public int deleteWidgetPropVal(int widgetId) throws Exception;
	// 위젯정보 삭제
	public int deleteWidgetVal(int widgetId) throws Exception;
	// 대시보드위젯 수정
	public int updateDashWidget(WidgetInfoDTO dto) throws Exception;
	// 신규 대시보드위젯
	public int insertDashBoardWidget(int dashId , int widgetId ,int curWidth, int curHeight , int curx , int cury , String userId  ) throws Exception;
	// 대시보드 신규 입력
	public int insertDashReturn(DashInsertDTO dto) throws Exception;

	/**
	 * @param String search 위젯검색명
	 * @param int size 리턴받을 갯수
	 * @param int offset 이숫자 다음것부터 가져온다.
	 * @return List<DashWidgetDTO>  
	 * @throws Exception 
	 * 대시보드 메뉴에서 사용가능한 위젯목록정보를 가져온다.
	 */	
	public List<DashWidgetDTO> getWidgetList(String search, int size, int offset) throws Exception;
	
	/**
	 * @param String search 위젯검색명
	 * @return int
	 * @throws Exception 
	 * 대시보드 메뉴에서 사용가능한 위젯목록정보를 가져온다.
	 */	
	public int getWidgetCount(String search) throws Exception;
	
	/**
	 * @param int dashid 대시보드아이디
	 * @return List<DashWidgetDTO>  
	 * @throws Exception 
	 *  대시보드설정페이지에서 이미 설정완료된 위젯 정보를 가져온다.
	 */	
	public List<DashWidgetDTO> getSettingDashAbleWidget(int dashid) throws Exception;
}
