package com.smartcampus.backend.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Bean
    public MongoClient mongoClient() {
        String uri = "mongodb+srv://smartcampus_admin:pceQynoeTQpkoSUq@cluster0.okcq0yk.mongodb.net/";
        return MongoClients.create(uri);
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), "DB");
    }

    @Bean
    public GridFSBucket gridFSBucket() {
        return GridFSBuckets.create(mongoTemplate().getDb());
    }
}