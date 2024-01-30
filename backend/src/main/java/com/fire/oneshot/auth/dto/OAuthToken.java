package com.fire.oneshot.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OAuthToken {

    private String accessToken;

    private String refreshToken;
}
