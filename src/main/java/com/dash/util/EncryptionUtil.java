package com.dash.util;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Component
public class EncryptionUtil {
	private static Logger logger = LoggerFactory.getLogger(EncryptionUtil.class);
	/**
	 * 암호구분을 얻어간다.
	 * @param passType 암호화방식
	 * @param plainText 암호화대상
	 * @return String 암호화된 구문
	 * @throws Exception 
	 * @desc 사용자 아아디찾기
	 */
	public String encrypt(String passType, String plainText) {	
		String hashedText = "";
		if(passType.equals("MD5")){
			hashedText = encryptMD5(plainText);
		}else if(passType.equals("SHA256")) {
			hashedText = encryptSHA(plainText);
		}else{
			hashedText = "";
		}
		return hashedText;
	}
	
	public String encryptMD5(String str) {
		StringBuffer buf = new StringBuffer();
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			byte[] data = new byte[32];
			md.update(str.getBytes("KSC5601"), 0, str.length());
			data = md.digest();
			for (int i = 0; i < data.length; i++) {
				int halfbyte = (data[i] >>> 4) & 0x0F;
				int two_halfs = 0;
				do {
					if ((0 <= halfbyte) && (halfbyte <= 9))
						buf.append((char) ('0' + halfbyte));
					else
						buf.append((char) ('a' + (halfbyte - 10)));
					halfbyte = data[i] & 0x0F;
				} while (two_halfs++ < 1);
			}
		} catch (Exception e) {
			logger.error("암호화 md5 실패:"+e.getMessage(), e);
		}
		return buf.toString();
	}
	
	public String encryptSHA(String planText) {
        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(planText.getBytes());
            byte byteData[] = md.digest();

            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }

            StringBuffer hexString = new StringBuffer();
            for (int i=0;i<byteData.length;i++) {
                String hex=Integer.toHexString(0xff & byteData[i]);
                if(hex.length()==1){
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        }catch(Exception e){
        	logger.error("암호화 SHA 실패:"+e.getMessage(), e);
            throw new RuntimeException();
        }
    }
}
