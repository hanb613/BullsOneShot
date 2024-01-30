package com.fire.oneshot.domain;

import com.fire.oneshot.global.exception.TestErrorCode;
import com.fire.oneshot.global.exception.TestException;
import com.fire.oneshot.global.util.ApiUtils;
import com.fire.oneshot.global.util.ApiUtils.ApiResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public ApiResult test() {
//
//        return ApiUtils.success("ti");
        throw new TestException(TestErrorCode.CANNOT_FINE_USER);
    }

    @GetMapping("/switch")
    public void iot(@RequestParam String value) {
        System.out.println(value);
    }
}
