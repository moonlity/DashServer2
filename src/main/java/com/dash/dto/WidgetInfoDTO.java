package com.dash.dto;

public class WidgetInfoDTO {
	public String userId;
	public int widgetId;
	public String widgetNm;
	public String widgetImg;
	public String dashId;
	public String dashNm;
	public int curHeight;
	public int curWidth;
	public int curx;
	public int cury;
	public int defaultHeight;
	public int defaultWidth;
	public int maxHeight;
	public int maxWidth;
	public int minHeight;
	public int minWidth;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getWidgetId() {
		return widgetId;
	}
	public void setWidgetId(int widgetId) {
		this.widgetId = widgetId;
	}
	public String getWidgetNm() {
		return widgetNm;
	}
	public void setWidgetNm(String widgetNm) {
		this.widgetNm = widgetNm;
	}
	public String getWidgetImg() {
		return widgetImg;
	}
	public void setWidgetImg(String widgetImg) {
		this.widgetImg = widgetImg;
	}
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
	public int getCurHeight() {
		return curHeight;
	}
	public void setCurHeight(int curHeight) {
		this.curHeight = curHeight;
	}
	public int getCurWidth() {
		return curWidth;
	}
	public void setCurWidth(int curWidth) {
		this.curWidth = curWidth;
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
	public int getDefaultHeight() {
		return defaultHeight;
	}
	public void setDefaultHeight(int defaultHeight) {
		this.defaultHeight = defaultHeight;
	}
	public int getDefaultWidth() {
		return defaultWidth;
	}
	public void setDefaultWidth(int defaultWidth) {
		this.defaultWidth = defaultWidth;
	}
	public int getMaxHeight() {
		return maxHeight;
	}
	public void setMaxHeight(int maxHeight) {
		this.maxHeight = maxHeight;
	}
	public int getMaxWidth() {
		return maxWidth;
	}
	public void setMaxWidth(int maxWidth) {
		this.maxWidth = maxWidth;
	}
	public int getMinHeight() {
		return minHeight;
	}
	public void setMinHeight(int minHeight) {
		this.minHeight = minHeight;
	}
	public int getMinWidth() {
		return minWidth;
	}
	public void setMinWidth(int minWidth) {
		this.minWidth = minWidth;
	}
	
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("WidgetInfoDTO [userId=");
		builder.append(userId);
		builder.append(", widgetId=");
		builder.append(widgetId);
		builder.append(", widgetNm=");
		builder.append(widgetNm);
		builder.append(", widgetImg=");
		builder.append(widgetImg);
		builder.append(", dashId=");
		builder.append(dashId);
		builder.append(", dashNm=");
		builder.append(dashNm);
		builder.append(", curHeight=");
		builder.append(curHeight);
		builder.append(", curWidth=");
		builder.append(curWidth);
		builder.append(", curx=");
		builder.append(curx);
		builder.append(", cury=");
		builder.append(cury);
		builder.append(", defaultHeight=");
		builder.append(defaultHeight);
		builder.append(", defaultWidth=");
		builder.append(defaultWidth);
		builder.append(", maxHeight=");
		builder.append(maxHeight);
		builder.append(", maxWidth=");
		builder.append(maxWidth);
		builder.append(", minHeight=");
		builder.append(minHeight);
		builder.append(", minWidth=");
		builder.append(minWidth);
		builder.append("]");
		return builder.toString();
	}
	
}
