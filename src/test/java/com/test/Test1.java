package com.test;

import java.sql.Connection;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.dash.dao.UserDAO;
import com.dash.dto.UserDTO;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "file:src/main/webapp/WEB-INF/spring/**/root-context.xml" })
public class Test1 {

	@Inject
    private DataSource ds;
	
	@Inject
	private UserDAO uDao;
	
	@Test
    public void testConnection() throws Exception {
 
        try (Connection con = ds.getConnection()) {
 
            System.out.println("\n >>>>>>>>>> Connection 출력 : " + con + "\n");
            UserDTO dto = new UserDTO();
            dto.setPassword("swonjiny");
            dto.setUserId("swonjiny");
            dto = uDao.login(dto);
 System.out.println("dto : " + dto.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


}
