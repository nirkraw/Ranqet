package com.rankerapp.resource;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SSLResource {
    
    @CrossOrigin(origins = "*")
    @GetMapping("/.well-known/acme-challenge/{key}")
    public String returnChecksumResponse(@PathVariable(value = "key") String key) {
        return "3JLfyMdtyYIQDuoVdk0yre5QlXsI6mJKtJPqvHGg1Hk.5iaLsA_8UuwhIXgaCgzY32KP8RRLIhRo-GWe0vvuvUw";
    }
    
}
