package com.smartcampus.backend.controller;

import com.smartcampus.backend.entity.Resource;
import com.smartcampus.backend.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Resource resource) {
        try {
            System.out.println("CREATE called");
            Resource saved = resourceService.createResource(resource);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ GET ALL - IMPORTANT: Changed to ResponseEntity<?>
    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            System.out.println("===== GET ALL RESOURCES CALLED =====");
            List<Resource> resources = resourceService.getAllResources();
            System.out.println("Found: " + resources.size() + " resources");
            return ResponseEntity.ok(resources);
        } catch (Exception e) {
            System.out.println("===== ERROR in GET ALL =====");
            e.printStackTrace();  // This will print in terminal
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable String id) {
        try {
            Resource resource = resourceService.getResourceById(id);
            if (resource == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resource not found");
            }
            return ResponseEntity.ok(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody Resource resource) {
        try {
            Resource updated = resourceService.updateResource(id, resource);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            resourceService.deleteResource(id);
            return ResponseEntity.ok("Resource deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}