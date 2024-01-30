package com.fire.oneshot.global.exception;



public class TestException extends RuntimeException implements CommonException{

    private final CommonErrorCode commonErrorCode;

    public TestException(TestErrorCode testErrorCode) {
        super(testErrorCode.getMessage());
        this.commonErrorCode = testErrorCode;
    }

    public CommonErrorCode getCommonErrorCode() {
        return commonErrorCode;
    }

}
