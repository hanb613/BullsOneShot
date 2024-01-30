package com.fire.oneshot.global.exception;

import org.springframework.http.HttpStatus;

public interface CommonErrorCode {

    HttpStatus getHttpStatus();

    String getMessage();
}
