package com.fire.oneshot.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CertErrorCode implements CommonErrorCode{
    NO_CERT_FIND(HttpStatus.BAD_REQUEST, "해당 id의 수료 정보를 찾을 수 없습니다.");

    private final HttpStatus httpStatus;

    private final String message;

}
