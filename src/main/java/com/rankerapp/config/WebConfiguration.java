package com.rankerapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebConfiguration extends WebMvcConfigurerAdapter {
    
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{spring:\\S+}")
                .setViewName("forward:/");
        registry.addViewController("/**/{spring:\\S+}")
                .setViewName("forward:/");
        registry.addViewController("/{spring:\\S+}/**{spring:?!(\\.js|\\.css)$}")
                .setViewName("forward:/");
    }
}