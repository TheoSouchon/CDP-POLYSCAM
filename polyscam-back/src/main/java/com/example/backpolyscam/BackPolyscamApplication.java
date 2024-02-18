package com.example.backpolyscam;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@EnableCaching
@SpringBootApplication
public class BackPolyscamApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackPolyscamApplication.class, args);
    }

}
