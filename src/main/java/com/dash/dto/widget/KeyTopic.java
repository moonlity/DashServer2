package com.dash.dto.widget;

/**
 * <pre>
 * com.dash.dto.widget
 * KeyTopic.java
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version :
 */
public class KeyTopic {
	public String category; 
	public String categoryNm;  
	public String topic;
	public int buzz;
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getCategoryNm() {
		return categoryNm;
	}
	public void setCategoryNm(String categoryNm) {
		this.categoryNm = categoryNm;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public int getBuzz() {
		return buzz;
	}
	public void setBuzz(int buzz) {
		this.buzz = buzz;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("KeyTopic [category=");
		builder.append(category);
		builder.append(", categoryNm=");
		builder.append(categoryNm);
		builder.append(", topic=");
		builder.append(topic);
		builder.append(", buzz=");
		builder.append(buzz);
		builder.append("]");
		return builder.toString();
	}

	
}
