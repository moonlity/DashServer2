package com.dash.dto;

public class DashMenuDTO {
	private String dashId; // 대시보드 아이디
	private String dashName; //대시보드 이름

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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DashMenuDTO [dashId=");
		builder.append(dashId);
		builder.append(", dashName=");
		builder.append(dashName);
		builder.append(", svcMenuId=");
		builder.append("]");
		return builder.toString();
	}
	
}
