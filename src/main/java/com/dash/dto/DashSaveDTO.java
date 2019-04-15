package com.dash.dto;

import java.util.Arrays;
import java.util.List;

public class DashSaveDTO {
	String UserId;
	String[] delDashId;
	List<DashMenuDTO> updateDash;
	List<DashMenuDTO> createDash;
	List<WidgetInfoDTO> insertWidget;
	List<WidgetInfoDTO> updateWidget;
	List<WidgetInfoDTO> deleteWidget;
	public String getUserId() {
		return UserId;
	}
	public void setUserId(String userId) {
		UserId = userId;
	}
	public String[] getDelDashId() {
		return delDashId;
	}
	public void setDelDashId(String[] delDashId) {
		this.delDashId = delDashId;
	}
	public List<DashMenuDTO> getUpdateDash() {
		return updateDash;
	}
	public void setUpdateDash(List<DashMenuDTO> updateDash) {
		this.updateDash = updateDash;
	}
	public List<DashMenuDTO> getCreateDash() {
		return createDash;
	}
	public void setCreateDash(List<DashMenuDTO> createDash) {
		this.createDash = createDash;
	}
	public List<WidgetInfoDTO> getInsertWidget() {
		return insertWidget;
	}
	public void setInsertWidget(List<WidgetInfoDTO> insertWidget) {
		this.insertWidget = insertWidget;
	}
	public List<WidgetInfoDTO> getUpdateWidget() {
		return updateWidget;
	}
	public void setUpdateWidget(List<WidgetInfoDTO> updateWidget) {
		this.updateWidget = updateWidget;
	}
	public List<WidgetInfoDTO> getDeleteWidget() {
		return deleteWidget;
	}
	public void setDeleteWidget(List<WidgetInfoDTO> deleteWidget) {
		this.deleteWidget = deleteWidget;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DashSaveDTO [UserId=");
		builder.append(UserId);
		builder.append(", delDashId=");
		builder.append(Arrays.toString(delDashId));
		builder.append(", updateDash=");
		builder.append(updateDash);
		builder.append(", createDash=");
		builder.append(createDash);
		builder.append(", insertWidget=");
		builder.append(insertWidget);
		builder.append(", updateWidget=");
		builder.append(updateWidget);
		builder.append(", deleteWidget=");
		builder.append(deleteWidget);
		builder.append("]");
		return builder.toString();
	}

}
