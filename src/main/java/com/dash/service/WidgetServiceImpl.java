package com.dash.service;

import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.dash.dao.WidgetDAO;
import com.dash.dto.widget.KeyTopic;
import com.dash.dto.widget.MediaTopic;
@Service
public class WidgetServiceImpl implements WidgetService {
	private static Logger logger = LoggerFactory.getLogger(WidgetServiceImpl.class);
	@Inject
	WidgetDAO dao;
	
	@Override
	public List<MediaTopic> getMediaTopic(String day) throws Exception {
		logger.info("미디어별 토픽을 조회한다. : " +  day);
		return dao.getMediaTopic(day);
	}

	@Override
	public List<KeyTopic> getCategoryTopic(String day) throws Exception {
		logger.info("카테고리별 토픽을 조회한다. : " +  day);
		return dao.getKeyTopic(day);
	}

}
