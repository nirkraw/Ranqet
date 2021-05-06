package com.rankerapp.resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

@Controller
public class AppErrorController implements ErrorController {
    
    private static final Logger LOG = LoggerFactory.getLogger(AppErrorController.class);
    
    private static final String ERROR_PATH = "/error";
    
    @RequestMapping(value = ERROR_PATH)
    public String errorHtml(HttpServletRequest request) {
        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
    
        // for brevity, only handling 404
        if (status != null) {
            int statusCode = Integer.valueOf(status.toString());
            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                // TODO: redirect to the url that was initially requested
                LOG.error("Endpoint not found. Returning static 404 page");
                return "redirect:index.html";
            }
        }
        return "error";
    }
    
    @Override
    public String getErrorPath() {
        return null;
    }
    
}
