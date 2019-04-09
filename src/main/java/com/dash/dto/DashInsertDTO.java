package com.dash.dto;

public class DashInsertDTO {
	public String dashId;
	public String svcMenuId;
	public String dashName;
	public String userId;
	public String getDashId() {
		return dashId;
	}
	public void setDashId(String dashId) {
		this.dashId = dashId;
	}
	public String getSvcMenuId() {
		return svcMenuId;
	}
	public void setSvcMenuId(String svcMenuId) {
		this.svcMenuId = svcMenuId;
	}
	public String getDashName() {
		return dashName;
	}
	public void setDashName(String dashName) {
		this.dashName = dashName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DashInsertDTO [dashId=");
		builder.append(dashId);
		builder.append(", svcMenuId=");
		builder.append(svcMenuId);
		builder.append(", dashName=");
		builder.append(dashName);
		builder.append(", userId=");
		builder.append(userId);
		builder.append("]");
		return builder.toString();
	}
	
}
