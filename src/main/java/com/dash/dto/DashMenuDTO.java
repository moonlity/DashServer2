package com.dash.dto;

public class DashMenuDTO {
	private String dashId; // 대시보드 아이디
	private String dashName; //대시보드 이름
	private int sortOrder; // 정렬조건
	
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
		builder.append("DashMenuDTO [dashId=");
		builder.append(dashId);
		builder.append(", dashName=");
		builder.append(dashName);
		builder.append(", sortOrder=");
		builder.append(sortOrder);
		builder.append("]");
		return builder.toString();
	}
}
