package com.fire.oneshot.global.util;

import com.fire.oneshot.auth.dto.OAuthToken;
import com.fire.oneshot.global.exception.CustomJWTException;
import com.fire.oneshot.global.exception.JWTErrorCode;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.concurrent.TimeUnit;

import static java.util.Objects.isNull;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTUtil {
    //    private final int FIVE_MINUTES = 1000 * 60 * 5; // FIXME : 구현 하는 동안 5000분으로, 실제로는 5분
    private final int FIVE_MINUTES = 1000 * 60 * 60 * 24 * 3;
    private final int THREE_DAYS = 1000 * 60 * 60 * 24 * 3;

    @Value("${jwt.refresh_time}")
    private Long expiredTime;

    private final RedisTemplate<String, String> redisTemplate;

    // 헤더 설정
    private final HashMap<String, Object> headerMap = new HashMap<>() {{
        put("alg", "HS256");
        put("typ", "JWT");
    }};

    @Value("${spring.auth.secretKey}")
    private String random256BitKey;

    private SecretKey secretKey;

    @PostConstruct
    private void generateSecretKey() {
        secretKey = Keys.hmacShaKeyFor(random256BitKey.getBytes(StandardCharsets.UTF_8));
    }

    public OAuthToken createOAuthToken(String userId) {
        String accessToken = createAccessToken(userId);
        String refreshToken = createRefreshToken();
        OAuthToken oAuthToken = new OAuthToken(accessToken, refreshToken);

        return oAuthToken;
    }

    public String createRefreshToken() {
        Date exp = new Date(getCurrentTime() + THREE_DAYS);
        Date today = new Date(getCurrentTime());

        String refreshToken = Jwts.builder()
                .setHeaderParams(headerMap)
                .setExpiration(exp)
                .setIssuedAt(today)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        return refreshToken;
    }

    public String createAccessToken(String userId) {
        Date exp = new Date(getCurrentTime() + FIVE_MINUTES);
        Date today = new Date(getCurrentTime());

        String accessToken = Jwts.builder()
                .setHeaderParams(headerMap)
                .setExpiration(exp)
                .setIssuedAt(today)
                .claim("userId", userId)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();

        return accessToken;
    }

    public boolean validateToken(String token) {
        Jws<Claims> jws;

        // 유효한 토큰인지 확인
        try {
            jws = Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            // 유효 기간이 지난 토큰
            throw new CustomJWTException(JWTErrorCode.EXPIRED_TOKEN);
        } catch (CompressionException | MalformedJwtException | UnsupportedJwtException e) {
            // 압축 오류, 키 틀림 오류, 해당 토큰과 맞지 않는 토큰 타입 오류
            throw new CustomJWTException(JWTErrorCode.NOT_VALID_TOKEN);
        }
        return true;
    }

    public String getUserIdFromToken(String token) {
        String userId = (String) Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody().get("userId");

        return userId;
    }

    private long getCurrentTime() {
        Date date = new Date(System.currentTimeMillis());
        return date.getTime();
    }


    /**
     * 유저 Refresh Token 저장
     *
     * @param userId    유저 이메일
     * @param refreshToken 현재 유저 Refresh Token
     * @return 0이면 실패, 1이면 성공
     */
    public void saveUserRefreshToken(String userId, String refreshToken) {

        if (isNull(userId) || isNull(refreshToken)) {
            throw new CustomJWTException(JWTErrorCode.NOT_VALID_TOKEN);
        }

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set(refreshToken, userId, expiredTime, TimeUnit.HOURS);

        log.info("set '{}' Refresh Token: '{}'", userId, refreshToken);
    }

    /**
     * 파라미터로 전달된 이메일의 유저 Refresh Token 반환
     *
     * @param refreshToken 리프래시 토큰
     * @return userRefreshToken or 없거나 만료될 경우 -1
     */
    public String getUserId(String refreshToken) {

        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String userId = valueOperations.get(refreshToken);

        log.info("get '{}' Refresh Token: '{}'", refreshToken, userId);

        if (isNull(userId)) {
            userId = "-1";
        }
        return userId;
    }

    /**
     * 파라미터로 전달된 이메일의 유저 Refresh Token 삭제
     *
     * @param userEmail 유저 이메일
     * @return 0이면 실패, 1이면 성공
     */
    public int deleteUserRefreshToken(String userEmail) {

        if (isNull(userEmail)) {
            return 0;
        }

        Boolean isDeleted = redisTemplate.delete(userEmail);

        if (isDeleted) {
            log.info("delete '{}'", userEmail);
            return 1;
        }
        return 0;
    }
}
