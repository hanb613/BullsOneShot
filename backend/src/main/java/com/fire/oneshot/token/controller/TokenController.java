package com.fire.oneshot.token.controller;

import com.fire.oneshot.global.util.ApiUtils;
import com.fire.oneshot.global.util.ApiUtils.ApiResult;
import com.fire.oneshot.token.dto.ATokenDto;
import com.fire.oneshot.token.service.TokenService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Api(value = "토큰 API", tags = {"Token"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/token")
public class TokenController {
    private final TokenService tokenService;

    @ApiOperation(value = "refresh 토큰으로 access 토큰 발급", notes = "(쿠키) refreshToken : refresh 토큰 값")
    @PostMapping("/create")
    public ApiResult getAccessTokenByRefreshToken(@CookieValue(value = "refreshToken") String refreshToken) {

        tokenService.getValidation(refreshToken);
//        log.debug("refreshToken at Cookie : {}",refreshToken);
        ATokenDto aTokenDto = tokenService.getAccessTokenByRefreshToken(refreshToken);
        return ApiUtils.success(aTokenDto);
    }
}
