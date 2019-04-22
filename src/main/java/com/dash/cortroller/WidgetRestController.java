package com.dash.cortroller;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dash.dto.widget.KeyTopic;
import com.dash.dto.widget.MediaTopic;
import com.dash.service.WidgetService;
import com.dash.util.ComSessionUtil;

/**
 * <pre>
 * com.dash.cortroller
 * WidgetRestController.java
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version : 1.0
 */
@RestController
@RequestMapping("/widget")
public class WidgetRestController {
	private static final Logger logger = LoggerFactory.getLogger(WidgetRestController.class);
	@Inject
	ComSessionUtil csUtil;
	
	@Inject
	WidgetService service;
	/**
	 * <pre>
	 * 내용 : 특정날짜의 미디어별 토픽을 조회한다.
	 * </pre>
	 * @Method name : getMediaTopic
	 * @param {String} day 날짜
	 * @return ResponseEntity<List<MediaTopic>> 
	 * @exception
	 * @see
	 */
	@RequestMapping(value = "/mediaTopic/{day}", method = RequestMethod.GET)
	public ResponseEntity<List<MediaTopic>> getMediaTopic(
			@PathVariable("day") String day ) {
		logger.info("해당날짜의 미디어별 토픽목록을 가져온다..]");
		try {
			List<MediaTopic> list = service.getMediaTopic(day);
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}

	/**
	 * <pre>
	 * 내용 : 해당날짜의 카테고리별 토픽목록을 조회한다.
	 * </pre>
	 * @Method name : CategoryTopic
	 * @see
	 * @param day
	 * @return
	 */
	@RequestMapping(value = "/categoryTopic/{day}", method = RequestMethod.GET)
	public ResponseEntity<List<KeyTopic>> getCategoryTopic(
			@PathVariable("day") String day ) {
		logger.info("해당날짜의 카테고리별 토픽목록을 가져온다..]");
		try {
			List<KeyTopic> list = service.getCategoryTopic(day);
			return new ResponseEntity<>(list, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}
}
