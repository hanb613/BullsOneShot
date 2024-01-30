package com.fire.oneshot.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum UserErrorCode implements CommonErrorCode{

    NO_MATCHING_USER(HttpStatus.BAD_REQUEST, "해당하는 유저가 없습니다.");

    private final HttpStatus httpStatus;

    private final String message;
}
