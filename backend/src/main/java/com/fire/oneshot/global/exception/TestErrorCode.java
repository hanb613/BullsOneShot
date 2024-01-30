package com.fire.oneshot.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum TestErrorCode implements CommonErrorCode{

    NOT_A_VALID_USER(BAD_REQUEST, "인증 정보가 정확하지 않습니다."),
    CANNOT_FINE_USER(BAD_REQUEST, "존재하지 않는 유저입니다.");

    private final HttpStatus httpStatus;

    private final String message;

}
