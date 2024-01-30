package com.fire.oneshot.token.service;

import com.fire.oneshot.auth.domain.User;
import com.fire.oneshot.auth.repository.UserRepository;
import com.fire.oneshot.global.exception.CustomJWTException;
import com.fire.oneshot.global.exception.JWTErrorCode;
import com.fire.oneshot.global.util.JWTUtil;
import com.fire.oneshot.token.dto.ATokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {

    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public void getValidation(String token) {

        boolean isValid = jwtUtil.validateToken(token);
        if(!isValid){
            throw new CustomJWTException(JWTErrorCode.NOT_VALID_TOKEN);
        }
    }

    @Override
    public ATokenDto getAccessTokenByRefreshToken(String refreshToken) {

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new CustomJWTException(JWTErrorCode.TOKEN_IS_NULL);
        }
        jwtUtil.validateToken(refreshToken);
        String userId = jwtUtil.getUserId(refreshToken);

//        log.debug("리프래시 토큰에서 추출한 userId : {}",userId);
        Optional<User> ouser = userRepository.findById(userId);

        if(ouser.isEmpty()){
            throw new CustomJWTException(JWTErrorCode.NOT_VALID_TOKEN);
        }

        ATokenDto aTokenDto = new ATokenDto(jwtUtil.createAccessToken(ouser.get().getUserId()));
        return aTokenDto;
    }
}

