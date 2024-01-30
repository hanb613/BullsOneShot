package com.fire.oneshot.token.service;

import com.fire.oneshot.token.dto.ATokenDto;

public interface TokenService {

    void getValidation(String token);

    ATokenDto getAccessTokenByRefreshToken(String refreshToken);
}
