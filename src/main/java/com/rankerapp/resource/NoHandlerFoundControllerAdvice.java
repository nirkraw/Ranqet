package com.rankerapp.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.util.Optional;

@ControllerAdvice
public class NoHandlerFoundControllerAdvice {
    
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<String> handleNoHandlerFoundException(NoHandlerFoundException ex) {
        // prepare responseEntity
        return ResponseEntity.of(Optional.of("<html><body><h1>HELLO WORLD</h1></body></html>"));
    }
    
}