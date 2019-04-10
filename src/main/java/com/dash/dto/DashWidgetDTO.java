package com.dash.dto;

public class DashWidgetDTO {
	private String dashId;
	private String dashNm;
	private Integer widgetId;
	private String widgetNm;
	private int defaultWidth;
	private int defaultHeight;
	private int minWidth;
	private int minHeight;
	private int maxWidth;
	private int maxHeight;
	private int curx; // x 좌표값
	private int cury; // y 좌표값
	private int curWidth; // 입력된 넓이
	private int curHeight; // 입력된 높이
	private String widgetImg;// 선택된 위젯 이미지
	public String getDashId() {
		return dashId;
	}
	public void setDashId(String dashId) {
		this.dashId = dashId;
	}
	public String getDashNm() {
		return dashNm;
	}
	public void setDashNm(String dashNm) {
		this.dashNm = dashNm;
	}
	public Integer getWidgetId() {
		return widgetId;
	}
	public void setWidgetId(Integer widgetId) {
		this.widgetId = widgetId;
	}
	public String getWidgetNm() {
		return widgetNm;
	}
	public void setWidgetNm(String widgetNm) {
		this.widgetNm = widgetNm;
	}
	public int getDefaultWidth() {
		return defaultWidth;
	}
	public void setDefaultWidth(int defaultWidth) {
		this.defaultWidth = defaultWidth;
	}
	public int getDefaultHeight() {
		return defaultHeight;
	}
	public void setDefaultHeight(int defaultHeight) {
		this.defaultHeight = defaultHeight;
	}
	public int getMinWidth() {
		return minWidth;
	}
	public void setMinWidth(int minWidth) {
		this.minWidth = minWidth;
	}
	public int getMinHeight() {
		return minHeight;
	}
	public void setMinHeight(int minHeight) {
		this.minHeight = minHeight;
	}
	public int getMaxWidth() {
		return maxWidth;
	}
	public void setMaxWidth(int maxWidth) {
		this.maxWidth = maxWidth;
	}
	public int getMaxHeight() {
		return maxHeight;
	}
	public void setMaxHeight(int maxHeight) {
		this.maxHeight = maxHeight;
	}
	public int getCurx() {
		return curx;
	}
	public void setCurx(int curx) {
		this.curx = curx;
	}
	public int getCury() {
		return cury;
	}
	public void setCury(int cury) {
		this.cury = cury;
	}
	public int getCurWidth() {
		return curWidth;
	}
	public void setCurWidth(int curWidth) {
		this.curWidth = curWidth;
	}
	public int getCurHeight() {
		return curHeight;
	}
	public void setCurHeight(int curHeight) {
		this.curHeight = curHeight;
	}
	public String getWidgetImg() {
		return widgetImg;
	}
	public void setWidgetImg(String widgetImg) {
		this.widgetImg = widgetImg;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DashWidgetDTO [dashId=");
		builder.append(dashId);
		builder.append(", dashNm=");
		builder.append(dashNm);
		builder.append(", widgetId=");
		builder.append(widgetId);
		builder.append(", widgetNm=");
		builder.append(widgetNm);
		builder.append(", defaultWidth=");
		builder.append(defaultWidth);
		builder.append(", defaultHeight=");
		builder.append(defaultHeight);
		builder.append(", minWidth=");
		builder.append(minWidth);
		builder.append(", minHeight=");
		builder.append(minHeight);
		builder.append(", maxWidth=");
		builder.append(maxWidth);
		builder.append(", maxHeight=");
		builder.append(maxHeight);
		builder.append(", curx=");
		builder.append(curx);
		builder.append(", cury=");
		builder.append(cury);
		builder.append(", curWidth=");
		builder.append(curWidth);
		builder.append(", curHeight=");
		builder.append(curHeight);
		builder.append(", widgetImg=");
		builder.append(widgetImg);
		return builder.toString();
	}
}
