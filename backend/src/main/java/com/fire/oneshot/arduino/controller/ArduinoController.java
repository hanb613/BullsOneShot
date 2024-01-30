package com.fire.oneshot.arduino.controller;

import com.fire.oneshot.global.util.ApiUtils;
import com.fire.oneshot.global.util.ApiUtils.ApiResult;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@Api(value = "아두이노 소켓 API", tags = {"Arduino"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/arduino")
public class ArduinoController {

    private final SimpMessagingTemplate template;

    @GetMapping
    public ApiResult receiveData(@RequestParam String req) {
        try {
            template.convertAndSend("/topic/socket", req);
            System.out.println(req);

            return ApiUtils.success(req);
        } catch(Exception e){
            return ApiUtils.error("Fail", HttpStatus.BAD_REQUEST);
        }
    }

}
