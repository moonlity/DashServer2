package com.dash.dto.widget;

/**
 * <pre>
 * com.dash.dto.widget
 * MediaTopic.java
 * </pre>
 * 
 * @author : swonjiny
 * @Date    : 2019. 4. 22.
 * @Version : 1.0
 */
public class MediaTopic {
	public String media;
	public String category; 
	public String topic;
	public int buzz;
	public String getMedia() {
		return media;
	}
	public void setMedia(String media) {
		this.media = media;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
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
		builder.append("MediaTopic [media=");
		builder.append(media);
		builder.append(", category=");
		builder.append(category);
		builder.append(", topic=");
		builder.append(topic);
		builder.append(", buzz=");
		builder.append(buzz);
		builder.append("]");
		return builder.toString();
	}
	
}
