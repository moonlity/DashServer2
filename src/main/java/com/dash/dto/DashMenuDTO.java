package com.dash.dto;

public class DashMenuDTO {
	public String userId;
	public String dashId; // 대시보드 아이디
	public String dashName; //대시보드 이름
	public int sortOrder; // 정렬조건
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDashId() {
		return dashId;
	}
	public void setDashId(String dashId) {
		this.dashId = dashId;
	}
	public String getDashName() {
		return dashName;
	}
	public void setDashName(String dashName) {
		this.dashName = dashName;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DashMenuDTO [userId=");
		builder.append(userId);
		builder.append(", dashId=");
		builder.append(dashId);
		builder.append(", dashName=");
		builder.append(dashName);
		builder.append(", sortOrder=");
		builder.append(sortOrder);
		builder.append("]");
		return builder.toString();
	}
	
}
