package com.fire.oneshot.global.exception;

import com.fire.oneshot.global.util.ApiUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class CommonExceptionHandler {

    private <T extends CommonErrorCode> ApiUtils.ApiResult<?> convertFailCodeToHttpResponse(T errorCode) {
        return ApiUtils.error(
                errorCode.getMessage(),
                errorCode.getHttpStatus()
        );
    }


    @ExceptionHandler({TestException.class, CustomJWTException.class, NaverLoginException.class, UserException.class, CertException.class})
    protected ApiUtils.ApiResult<?> runExceptionHandler(CommonException error) {
        return convertFailCodeToHttpResponse(error.getCommonErrorCode());
    }

}
