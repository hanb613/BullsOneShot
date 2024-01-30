package com.fire.oneshot.global.util;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;



public class ApiUtils {

    //    public static <T> ApiResult<T> fail(T response){
//        return new ApiResult<T>(false, response, null);
//    }

    public static <T> ApiResult<T> success(T response){
        return new ApiResult<T>(true, response, null);
    }

    public static ApiResult<?> error(String message, HttpStatus status){
        return new ApiResult<>(false, null, new ApiError(message, status));
    }

    @Getter
    public static class ApiResult<T>{

        private final boolean success;
        private final T response;
        private final ApiError error;

        private ApiResult(boolean success, T response, ApiError error){
            this.success = success;
            this.response = response;
            this.error = error;
        }

    }

    @Getter
    public static class ApiError{

        private final String message;
        private final int status;

        ApiError(String message, HttpStatus status) {
            this.message = message;
            this.status = status.value();
        }

    }

}
