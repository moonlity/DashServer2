package com.dash.cortroller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crest")
public class ComRestController {
	private static final Logger logger = LoggerFactory.getLogger(ComRestController.class);
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
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}
}
