package com.fire.oneshot.global.exception;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class CommonExceptionHandlerTest {

    @Test
    @DisplayName("핸들러 사용 예제")
    void testExceptionHandler () {

        // 사용 예제 throw new TestException(TestErrorCode.NOT_A_VALID_USER);

        // given
        TestException e = Assertions.assertThrows(TestException.class, () -> {
            throw new TestException(TestErrorCode.NOT_A_VALID_USER);
        });

        // then
        assertThat(e.getCommonErrorCode().getMessage())
                .isSameAs(TestErrorCode.NOT_A_VALID_USER.getMessage());
    }

}