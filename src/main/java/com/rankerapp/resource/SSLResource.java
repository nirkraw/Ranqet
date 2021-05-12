package com.rankerapp.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SSLResource {
    
    @GetMapping(".well-known/acme-challenge/{key}")
    public String returnChecksumResponse(@PathVariable(value = "key") String key) {
        return key;
    }
    
}
