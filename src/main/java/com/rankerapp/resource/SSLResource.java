package com.rankerapp.resource;

import org.springframework.web.bind.annotation.*;

@RestController
public class SSLResource {
    
    @CrossOrigin(origins = "*")
    @GetMapping("/.well-known/acme-challenge/{key}")
    public String sendSSLData(@PathVariable(value = "key") String key) {
        return "3JLfyMdtyYIQDuoVdk0yre5QlXsI6mJKtJPqvHGg1Hk.5iaLsA_8UuwhIXgaCgzY32KP8RRLIhRo-GWe0vvuvUw";
    }
}
