package com.fire.oneshot.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum NaverErrorCode implements CommonErrorCode{

    CANNOT_GET_AT(BAD_REQUEST, "AccessToken을 조회할 수 없습니다."),
    CANNOT_GET_INFO(BAD_REQUEST, "네이버 회원 정보를 조회할 수 없습니다.");

    private final HttpStatus httpStatus;

    private final String message;
}
