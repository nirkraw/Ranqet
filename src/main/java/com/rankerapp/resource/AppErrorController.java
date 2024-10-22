package com.rankerapp.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Controller
public class AppErrorController implements ErrorController {
    
    private static final Logger LOG = LoggerFactory.getLogger(AppErrorController.class);
    
    private static final String ERROR_PATH = "/error";
    
    @RequestMapping(value = ERROR_PATH)
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
    
        if (status != null) {
            int statusCode = Integer.valueOf(status.toString());
            return new ResponseEntity<>(HttpStatus.resolve(statusCode));
        }
        
        return new ResponseEntity<>(HttpStatus.resolve(500));
    }
    
    @Override
    public String getErrorPath() {
        return null;
    }
    
}
