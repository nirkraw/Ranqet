package com.rankerapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/.well-known/acme-challenge/3JLfyMdtyYIQDuoVdk0yre5QlXsI6mJKtJPqvHGg1Hk")
                .setViewName("ssldata");
        registry.addViewController("/{spring:[\\w-]+}")
                .setViewName("forward:/");
        registry.addViewController("/**/{spring:[\\w-]+}")
                .setViewName("forward:/");
        registry.addViewController("/{spring:[\\w-]+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
    }
}