package com.smartcampus.backend.service;

import com.smartcampus.backend.entity.Resource;
import java.util.List;

public interface ResourceService {

    List<Resource> getAllResources();

    Resource getResourceById(String id);

    Resource createResource(Resource resource);

    Resource updateResource(String id, Resource resource);

    void deleteResource(String id);
}
