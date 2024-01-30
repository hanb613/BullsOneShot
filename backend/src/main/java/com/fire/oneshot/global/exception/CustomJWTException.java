package com.fire.oneshot.global.exception;

import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
public class CustomJWTException extends RuntimeException implements CommonException {

    private final JWTErrorCode jwtErrorCode;

    public CustomJWTException(JWTErrorCode jwtErrorCode) {
        super(jwtErrorCode.getMessage());
        this.jwtErrorCode = jwtErrorCode;
    }

    @Override
    public CommonErrorCode getCommonErrorCode() {
        return jwtErrorCode;
    }
}
