package com.dash.cortroller;

import java.util.HashMap;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dash.dto.DashMenuDTO;
import com.dash.dto.DashWidgetDTO;
import com.dash.service.SettingSevice;

@RestController
@RequestMapping("/crest")
public class ComRestController {
	private static final Logger logger = LoggerFactory.getLogger(ComRestController.class);
	@Inject
	SettingSevice settingSevice;
	// 대시보드생성 제한수 가져오기
	@RequestMapping(value = "/dashlimit/{userId}", method = RequestMethod.GET)
	public ResponseEntity<Integer> getDashLimit(
			@PathVariable("userId") String userId ) {
		logger.info("[대시보드 생성 제한 수를 가져온다.]");
		try {
			int returnCount = settingSevice.selectDashLimitCount(userId);
			return new ResponseEntity<>(returnCount, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}
	
	/**
	 * 사용자의 대메뉴별 대시보드 목록을 가져온다
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @param svcMunuId  String 대메뉴값
	 * @return 사용하는 대시보드 목록 ResponseEntity List<DashMenuDTO>
	 * @exception Exception
	 * 
	 * */
	@RequestMapping(value = "userDashList/{userId}", method = RequestMethod.POST)
	public ResponseEntity<List<DashMenuDTO>> userDashList(
			@PathVariable("userId") String userId	
			) {
		logger.info("[사용자의 대시보드 목록을 가져온다.]");
		try {
			return new ResponseEntity<>(settingSevice.selectUserDashList(userId) , HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}
	
	// 대시보드정보목록을 가져온다.
	@RequestMapping(value = "/dashlist/{userId}", method = RequestMethod.GET)
	public ResponseEntity<List<DashMenuDTO>> getDashList(
			@PathVariable("userId") String userId) {
		try {
			List<DashMenuDTO> list = settingSevice.selectUserDashList(userId);
			return new ResponseEntity<>(list, HttpStatus.OK);
			/*
			 * if(list!=null) return new ResponseEntity<>(list, HttpStatus.OK); 
			 * else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			 */
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}
	
	/**
	 * 사용가능한 위젯정보를 가져온다.
	 * @author 송원진
	 * @param userId  String 사용자 아아디
	 * @return 사용하는 대시보드 목록 ResponseEntity List<DashMenuDTO>
	 * @exception Exception
	 * 
	 * */

	@RequestMapping(value = "/widgetAble")
	public ResponseEntity<HashMap<String, Object>> ableWidgetList(
			@RequestParam(value="search" , defaultValue="") String search, 
			@RequestParam(value="size" , defaultValue="6") int size,
			@RequestParam(value="offset" , defaultValue="1") int offset
			){
		try {
			HashMap<String, Object> map = settingSevice.getWidgetList(search.trim(), size,offset);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.toString());
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		}
	}
}
