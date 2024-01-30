package com.fire.oneshot.global.exception;

public class CertException extends RuntimeException implements CommonException {

    private final CommonErrorCode commonErrorCode;

    public CertException(CommonErrorCode commonErrorCode) {
        super(commonErrorCode.getMessage());
        this.commonErrorCode = commonErrorCode;
    }

    @Override
    public CommonErrorCode getCommonErrorCode() {
        return commonErrorCode;
    }
}
