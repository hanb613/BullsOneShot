package com.fire.oneshot.global.util;

import com.fire.oneshot.auth.dto.NaverInfoRes;
import com.fire.oneshot.auth.dto.NaverLoginDto;
import com.fire.oneshot.auth.dto.NaverTokens;
import com.fire.oneshot.global.exception.NaverErrorCode;
import com.fire.oneshot.global.exception.NaverLoginException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
@RequiredArgsConstructor
public class NaverRequestUtil {

    private static final String GRANT_TYPE = "authorization_code";

    @Value("${oauth.naver.url.auth}")
    private String authUrl;

    @Value("${oauth.naver.url.api}")
    private String apiUrl;

    @Value("${oauth.naver.client-id}")
    private String clientId;

    @Value("${oauth.naver.secret}")
    private String clientSecret;

    private final RestTemplate restTemplate;

    public NaverInfoRes request(NaverLoginDto.Request naverLoginReq) {
        String accessToken = requestAccessToken(naverLoginReq);
//        log.debug("요청한 Naver AccessToken : {}", accessToken);
        return requestOauthInfo(accessToken);
    }

    public String requestAccessToken(NaverLoginDto.Request naverLoginReq) {
        String url = authUrl + "/oauth2.0/token";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = naverLoginReq.makeBody();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);

        NaverTokens response = restTemplate.postForObject(url, request, NaverTokens.class);

        if(response == null){
            throw new NaverLoginException(NaverErrorCode.CANNOT_GET_AT);
        }
        return response.getAccessToken();
    }

    public NaverInfoRes requestOauthInfo(String accessToken) {
        String url = apiUrl + "/v1/nid/me";

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        httpHeaders.set("Authorization", "Bearer " + accessToken);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();

        HttpEntity<?> request = new HttpEntity<>(body, httpHeaders);
        NaverInfoRes naverInfoRes = null;
        try{
            naverInfoRes = restTemplate.postForObject(url, request, NaverInfoRes.class);
        } catch (HttpClientErrorException e){
            throw new NaverLoginException(NaverErrorCode.CANNOT_GET_INFO);
        }
        return naverInfoRes;
    }
}
