package com.dash.dao;

import java.util.List;

import com.dash.dto.widget.KeyTopic;
import com.dash.dto.widget.MediaTopic;

/**
 * <pre>
 * com.dash.dao
 * WidgetDAO.java
 * 위젯용 데이터조회
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version :
 */
public interface WidgetDAO {
	
	/**
	 * <pre>
	 * 내용 : 미디어별 토픽을 조회한다.
	 * </pre>
	 * @Method name : getMediaTopic
	 * @param {String} day 조회날짜
	 * @return List<MediaTopic>
	 * @see
	 * @throws Exception
	 */
	public List<MediaTopic> getMediaTopic(String day) throws Exception;
	
	/**
	 * <pre>
	 * 내용 : 카테고리별 토픽을 조회한다.
	 * </pre>
	 * @Method name : getKeyTopic
	 * @see
	 * @param {String} day 조회 날자
	 * @return List<KeyTopic>
	 * @throws Exception
	 */
	public List<KeyTopic> getKeyTopic(String day) throws Exception;
}
