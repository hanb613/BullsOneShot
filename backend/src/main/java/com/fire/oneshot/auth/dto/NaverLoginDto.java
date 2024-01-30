package com.fire.oneshot.auth.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class NaverLoginDto {

    @Data
    @Builder
    @ApiModel(value = "Naver 로그인 요청", description = "Naver 로그인 요청 Dto")
    public static class Request{

        private String authCode;

        private String state;

        public MultiValueMap<String, String> makeBody() {
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("code", authCode);
            body.add("state", state);
            return body;
        }
    }

    @Data
    @Builder
    public static class Response{

        private String accessToken;

        private String refreshToken;

        private String name;
    }
}
