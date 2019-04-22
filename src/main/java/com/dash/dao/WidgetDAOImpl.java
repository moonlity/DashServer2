package com.dash.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.dash.dto.widget.KeyTopic;
import com.dash.dto.widget.MediaTopic;

/**
 * <pre>
 * com.dash.dao
 * WidgetDAOImpl.java
 * 위젯용 데이터 조회
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version :
 */
@Repository
public class WidgetDAOImpl implements WidgetDAO {
	
	@Inject
	private SqlSession session;
	
	private static String namespace ="mapper.WidgetMapper";

	@Override
	public List<MediaTopic> getMediaTopic(String day) throws Exception {
		return session.selectList(namespace+".selectMediaTopic", day);
	}

	@Override
	public List<KeyTopic> getKeyTopic(String day) throws Exception {
		return session.selectList(namespace+".selectCategoryTopic", day);
	}

}
