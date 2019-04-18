package com.dash.cortroller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.dash.dto.UserDTO;
import com.dash.service.UserService;
import com.dash.util.EncryptionUtil;

/**
 * Handles requests for the application home page.
 */
@Controller
@SessionAttributes({"loginUser" ,"fastList"})
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Inject
	UserService userService;
	
	@Inject
	EncryptionUtil encryptUtil;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);
		
		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		
		String formattedDate = dateFormat.format(date);
		
		model.addAttribute("serverTime", formattedDate );
		
		return "home";
	}
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(Model model) {
		// 로그인 완성후 + 인터셉터나 aop 기능 완성후 변경한다.
		return "redirect:/login";
	}
	
	@RequestMapping(value = "/user/login", method = RequestMethod.GET)
	public String login(Model model) {
		return "login";
	}
	// 로그인검사
	@RequestMapping(value = "/user/logingo", method = RequestMethod.POST)
	public String logingo(
			HttpServletRequest request, 
			HttpServletResponse response,
			UserDTO userDTO,
			RedirectAttributes rttr,
			Model model) {
		logger.info("[사용자의 로그인확인]");
		String resultUrl = "redirect:/"; // 다음에 보낼 주소페이지
		try {
			if (userDTO.getPassword() == null || userDTO.getUserId() == null || userDTO.getPassword().length() ==0 || userDTO.getUserId().length() ==0 ) {
				rttr.addFlashAttribute("strongMsg", "\"아이디, 비밀번호\"");
				rttr.addFlashAttribute("msg", "를 확인후 시도해주세요.");
				rttr.addFlashAttribute("focus", "userid");
				resultUrl = "redirect:/login";
			}else {
				userDTO.setEncryptPassWord( encryptUtil.encrypt("SHA256",  userDTO.getPassword()));
				userDTO = userService.getLogin(userDTO);
				model.addAttribute("loginUser", userDTO);	
				resultUrl = "redirect:/setting";
			}
		} catch (Exception e) {
			e.printStackTrace();
			userDTO = null;
			rttr.addFlashAttribute("strongMsg", "\"아이디, 비밀번호\"");
			rttr.addFlashAttribute("msg", "를 확인후 시도해주세요.");
			rttr.addFlashAttribute("focus", "userid");
			resultUrl = "redirect:/login";
		}
		return resultUrl;
	}
	// 원하는 대시보드를 꾸미는 화면
	@RequestMapping(value = "/setting", method = RequestMethod.GET)
	public String setting(Model model) {
		return "setting";
	}
	
	// 메인 프런트오피스영역
	@RequestMapping(value = "/view/main", method = RequestMethod.GET)
	public String viewMain(Model model) {
		return "view";
	}
}
