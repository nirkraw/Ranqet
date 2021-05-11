package com.rankerapp.resource;

import com.rankerapp.exceptions.RedirectException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;

@RestController
public class RedirectResource {
    
    @Inject
    public RedirectResource() {
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/error/{errorMessage}")
    public void errorErrormessage(@PathVariable(value = "errorMessage") String errorMessage) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/new/{listId}")
    public void listNewListid(@PathVariable(value = "listId") String listId) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/create-list")
    public void createlist() {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{listId}/quiz")
    public void listIdQuiz(@PathVariable(value = "quiz") String quiz) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{listId}/rankings")
    public void listIdRankings(@PathVariable(value = "rankings") String rankings) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/profile/{userId}")
    public void profileUserid(@PathVariable(value = "userId") String userId) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/search/{searchVal}")
    public void searchSearchval(@PathVariable(value = "searchVal") String searchVal) {
        throw new RedirectException();
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public void index() {
        throw new RedirectException();
    }
}