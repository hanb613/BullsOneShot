package com.fire.oneshot.auth.service;

import com.fire.oneshot.auth.domain.User;
import com.fire.oneshot.auth.dto.NaverInfoRes;
import com.fire.oneshot.auth.dto.NaverLoginDto;
import com.fire.oneshot.auth.dto.OAuthToken;
import com.fire.oneshot.auth.repository.UserRepository;
import com.fire.oneshot.global.exception.UserException;
import com.fire.oneshot.global.util.JWTUtil;
import com.fire.oneshot.global.util.NaverRequestUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import static com.fire.oneshot.global.exception.UserErrorCode.NO_MATCHING_USER;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final NaverRequestUtil naverRequestUtil;

    private final UserRepository userRepository;

    private final JWTUtil jwtUtil;

    private final AuthenticationManager authenticationManager;

    public NaverLoginDto.Response login(NaverLoginDto.Request naverLoginReq) {
        NaverInfoRes naverInfoRes = naverRequestUtil.request(naverLoginReq);

        String userId = findOrCreateMember(naverInfoRes);
//        log.debug("로그인한 유저 아이디 : {}", userId);
        // Todo : 비밀번호가 없는 인증 객체 생성 (아마 oauth 방식)
//        Authentication authenticatedUser = null;
//        try {
//            authenticatedUser = authenticationManager.authenticate(
//                    new UsernamePasswordAuthenticationToken(userId, null)
//            );
//        } catch (Exception e) {
//            log.error(e.toString());
//            throw new UserException(NO_MATCHING_USER);
//        }

        OAuthToken oAuthToken = jwtUtil.createOAuthToken(userId);
//        log.debug("토큰 생성 : {}",oAuthToken.getAccessToken());

        jwtUtil.saveUserRefreshToken(userId, oAuthToken.getRefreshToken());

        NaverLoginDto.Response res = NaverLoginDto.Response
                .builder()
                .accessToken(oAuthToken.getAccessToken())
                .refreshToken(oAuthToken.getRefreshToken())
                .name(naverInfoRes.getName())
                .build();
        return res;
    }

    /**
     * naverInfoRes를 바탕으로 디비를 조회하여 기존회원이 존재한다면
     * 해당 회원의 아이디를 반환하고, 존재하지 않는다면
     * 새로운 회원을 가입시킨다.
     *
     * @param naverInfoRes 네이버에서 조회한 회원정보
     * @return 유저아이디
     */
    private String findOrCreateMember(NaverInfoRes naverInfoRes) {

//        log.debug("회원 존재 여부 확인 : {}", naverInfoRes.getName());
        return userRepository.findById(naverInfoRes.getId())
                .map(User::getUserId)
                .orElseGet(() -> newMember(naverInfoRes));
    }

    /**
     * naverInfoRes를 바탕으로 새로운 회원 DB에 삽입하고 아이디 반환
     *
     * @param naverInfoRes 네이버에서 조회한 회원정보
     * @return 회원 가입한 유저 아이디
     */
    private String newMember(NaverInfoRes naverInfoRes) {
        log.debug("신규 회원 가입 : {}", naverInfoRes.getId());
        User user = new User();
        user.setUserId(naverInfoRes.getId());
        user.setUserName(naverInfoRes.getName());
        userRepository.save(user);
        return user.getUserId();
    }
}
