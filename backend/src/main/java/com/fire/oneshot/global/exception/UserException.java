package com.fire.oneshot.global.exception;

public class UserException extends RuntimeException implements CommonException{

    private final CommonErrorCode commonErrorCode;

    public UserException(CommonErrorCode commonErrorCode) {
        super(commonErrorCode.getMessage());
        this.commonErrorCode = commonErrorCode;
    }

    @Override
    public CommonErrorCode getCommonErrorCode() {
        return commonErrorCode;
    }
}
