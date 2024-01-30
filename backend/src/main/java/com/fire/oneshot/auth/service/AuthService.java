package com.fire.oneshot.auth.service;

import com.fire.oneshot.auth.dto.NaverLoginDto;

public interface AuthService {

    NaverLoginDto.Response login(NaverLoginDto.Request naverLoginReq);
}
