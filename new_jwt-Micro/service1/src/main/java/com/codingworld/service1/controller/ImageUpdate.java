package com.codingworld.service1.controller;

import com.codingworld.service1.services.ImageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/images")
public class ImageUpdate {

    @Autowired
    private  ImageDataService service;

    @PostMapping("/set-background/{id}")
    public ResponseEntity<String> setBackground(@PathVariable Long id) {
        service.setBackgroundImage(id);
        return ResponseEntity.ok("Background set");
    }

}


