package com.rankerapp.resource;

import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Controller
public class AppErrorController implements ErrorController {
    
    private static final String ERROR_PATH = "/error";
    
    
    @RequestMapping(value = ERROR_PATH, produces = "text/html")
    public String errorHtml(HttpServletRequest request) {
        return "<html><body><h1>HELLO WORLD</h1></body></html>";
    }
    
    @Override
    public String getErrorPath() {
        return ERROR_PATH;
    }
    
}
