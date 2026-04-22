package com.smartcampus.backend.service.impl;

import com.smartcampus.backend.entity.Resource;
import com.smartcampus.backend.repository.ResourceRepository;
import com.smartcampus.backend.service.ResourceService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository repository;

    public ResourceServiceImpl(ResourceRepository repository) {
        this.repository = repository;
        System.out.println("✅✅✅ ResourceServiceImpl CREATED ✅✅✅");
    }

    @Override
    public List<Resource> getAllResources() {
        System.out.println("📦 getAllResources() called");
        List<Resource> resources = repository.findAll();
        System.out.println("📦 Found " + resources.size() + " resources");
        return resources;
    }

    @Override
    public Resource getResourceById(String id) {
        System.out.println("🔍 getResourceById() called for id: " + id);
        return repository.findById(id).orElse(null);
    }

    @Override
    public Resource createResource(Resource resource) {
        System.out.println("➕ createResource() called for: " + resource.getName());
        return repository.save(resource);
    }

    @Override
    public Resource updateResource(String id, Resource resource) {
        System.out.println("✏️ updateResource() called for id: " + id);
        Resource existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        existing.setName(resource.getName());
        existing.setType(resource.getType());
        existing.setStatus(resource.getStatus());
        existing.setCapacity(resource.getCapacity());
        existing.setLocation(resource.getLocation());
        existing.setAvailableFrom(resource.getAvailableFrom());
        existing.setAvailableTo(resource.getAvailableTo());

        return repository.save(existing);
    }

    @Override
    public void deleteResource(String id) {
        System.out.println("🗑️ deleteResource() called for id: " + id);
        repository.deleteById(id);
    }
}