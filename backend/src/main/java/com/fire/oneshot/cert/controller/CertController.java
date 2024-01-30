package com.fire.oneshot.cert.controller;

import com.fire.oneshot.auth.domain.User;
import com.fire.oneshot.cert.domain.Certification;
import com.fire.oneshot.cert.dto.CertCreateDto;
import com.fire.oneshot.cert.service.CertService;
import com.fire.oneshot.global.util.ApiUtils;
import com.fire.oneshot.global.util.ApiUtils.ApiResult;
import com.fire.oneshot.global.util.JWTUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "인증서 API", tags = {"Cert"})
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/cert")
public class CertController {

    private final CertService certService;
    private final JWTUtil jwtUtil;

    @PostMapping("/new")
    @ApiOperation(value = "인증서 생성", notes = "사용자 계정으로 인증서 생성", response = ApiResult.class)
    public ApiResult createCert(@RequestHeader("Authorization") String authenticationToken, @RequestBody CertCreateDto certCreateDto) {
//        log.debug("액세스 토큰 : {}", authenticationToken);
        String accessToken = authenticationToken.substring(7);
        String userId = jwtUtil.getUserIdFromToken(accessToken);
        log.debug("사용자 확인 : " + userId);
        certService.create(userId,certCreateDto);
        return ApiUtils.success("인증서 생성 완료");
    }

    @PostMapping("/get/{certId}")
    @ApiOperation(value = "인증서 조회", notes = "특정 번호의 인증서 조회", response = ApiResult.class)
    public ApiResult getCert(@PathVariable Long certId) {

//        log.debug("cert 컨트롤러 들어옴 조회 아이디 : {}",certId);
        Certification cert = certService.getCert(certId);
        return ApiUtils.success(cert);
//        log.debug(cert.toString());
//        return ApiUtils.success(cert.getCertContent());
    }

    @PostMapping("/list")
    @ApiOperation(value = "인증서 전체 조회", notes = "사용자 계정의 모든 인증서 조회", response = ApiResult.class)
    public ApiResult getCertList(@RequestHeader("Authorization") String authenticationToken) {
        String accessToken = authenticationToken.substring(7);
        String userId = jwtUtil.getUserIdFromToken(accessToken);
        log.debug("사용자 확인 : " + userId);
        List<Certification> certList = certService.getCertList(userId);
        return ApiUtils.success(certList);
    }
}
