package com.fire.oneshot.global.exception;

public class NaverLoginException extends RuntimeException implements CommonException {

    private final CommonErrorCode commonErrorCode;

    public NaverLoginException(CommonErrorCode commonErrorCode) {
        this.commonErrorCode = commonErrorCode;
    }

    @Override
    public CommonErrorCode getCommonErrorCode() {
        return commonErrorCode;
    }
}
