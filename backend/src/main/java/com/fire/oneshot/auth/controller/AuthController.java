package com.fire.oneshot.auth.controller;

import com.fire.oneshot.auth.dto.NaverLoginDto;
import com.fire.oneshot.auth.service.AuthService;
import com.fire.oneshot.global.util.ApiUtils;
import com.fire.oneshot.global.util.ApiUtils.ApiResult;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "인증 API", tags = {"Auth"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * 네이버 로그인 결과로 반환받은 code와 state를 이용해 로그인 후 Oauth 토큰 반환
     * 회원 정보를 조회, 조회한 회원이 가입되어 있는지 DB 조회 -> 가입되지 않았다면 회원가입
     * 회원의 userId로 액세스 토큰과 리프래시 토큰 발급
     * 발급한 토큰을 반환
     *
     * @param naverLoginReq 네이버 로그인 결과로 반환받은 code와 state
     * @return
     */
    @PostMapping("/naver")
    @ApiOperation(value = "로그인", notes = "네이버 로그인 API", response = ApiResult.class)
    public ApiResult login(@RequestBody NaverLoginDto.Request naverLoginReq) {

        NaverLoginDto.Response res = authService.login(naverLoginReq);
        return ApiUtils.success(res);
    }
}
