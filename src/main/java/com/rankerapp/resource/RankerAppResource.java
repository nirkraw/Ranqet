package com.rankerapp.resource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RankerAppResource {

    @GetMapping("/greeting")
    public String greeting(@RequestParam(value = "name") String name) {
        System.out.println("Hello " + name);
        return "FUCK YOU";
    }

}