package com.todo.task_tracker;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    
    @GetMapping("/")
    public String index() {
        return "Testing";
    }
}
