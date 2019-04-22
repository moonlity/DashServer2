package com.dash.service;

import java.util.List;

import com.dash.dto.widget.KeyTopic;
import com.dash.dto.widget.MediaTopic;

/**
 * <pre>
 * com.dash.service
 * WidgetService.java
 * 위젯용 데이터를 처리하는 부분
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version :
 */
public interface WidgetService {
	/**
	 * <pre>
	 * 내용 : 미디어별 토픽을 조회한다.
	 * </pre>
	 * @Method name : getMediaTopic
	 * @see 
	 * @param {String} day
	 * @return List<MediaTopic>
	 * @throws Exception
	 */
	public List<MediaTopic> getMediaTopic(String day) throws Exception;
	
	/**
	 * <pre>
	 * 내용 : 카테고리별 토픽을 조회한다.
	 * </pre>
	 * @Method name : getCategoryTopic
	 * @see
	 * @param {String} day
	 * @return List<KeyTopic>
	 * @throws Exception
	 */
	public List<KeyTopic> getCategoryTopic(String day) throws Exception;
}
