package com.fire.oneshot.cert.dto;

public enum CertContent {
    화재대비("화재 대비 기기 교육 과정","위 교육생은 불속에서 살아남기 화재 대비 기기 교육 과정을 수료하였기에 \\n이 수료증을 수여합니다.", 1),
    실전시뮬("실전 시뮬레이션 과정","위 교육생은 불속에서 살아남기 실전 시뮬레이션 과정을 수료하였기에 \\n이 수료증을 수여합니다.", 2);

    String title;
    String content;
    int hour;

    CertContent(String title, String content, int hour) {
        this.title = title;
        this.content = content;
        this.hour = hour;
    }

    public String getTitle(){
        return title;
    }
    public String getContent(){
        return content;
    }

    public int getHour(){
        return hour;
    }
}
