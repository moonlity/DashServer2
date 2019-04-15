package com.dash.dto;

public class UserDTO {
	public String userId;
	public String userName;
	public String password;
	public String encryptPassWord;    // 암호화된 패스워드
	public String email;
	public String userLevelCd;
	public String phoneNum;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEncryptPassWord() {
		return encryptPassWord;
	}
	public void setEncryptPassWord(String encryptPassWord) {
		this.encryptPassWord = encryptPassWord;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserLevelCd() {
		return userLevelCd;
	}
	public void setUserLevelCd(String userLevelCd) {
		this.userLevelCd = userLevelCd;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("UserDTO [userId=");
		builder.append(userId);
		builder.append(", userName=");
		builder.append(userName);
		builder.append(", password=");
		builder.append(password);
		builder.append(", encryptPassWord=");
		builder.append(encryptPassWord);
		builder.append(", email=");
		builder.append(email);
		builder.append(", userLevelCd=");
		builder.append(userLevelCd);
		builder.append(", phoneNum=");
		builder.append(phoneNum);
		builder.append("]");
		return builder.toString();
	}
	
}
