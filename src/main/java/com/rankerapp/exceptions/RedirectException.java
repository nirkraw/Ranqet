package com.rankerapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.MOVED_PERMANENTLY)
public class RedirectException extends RuntimeException {
}
