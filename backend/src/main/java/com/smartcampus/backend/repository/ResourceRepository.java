package com.smartcampus.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.smartcampus.backend.entity.Resource;

public interface ResourceRepository extends MongoRepository<Resource, String> {
}
