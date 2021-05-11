package com.rankerapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONTINUE)
public class RedirectException extends RuntimeException {
}
