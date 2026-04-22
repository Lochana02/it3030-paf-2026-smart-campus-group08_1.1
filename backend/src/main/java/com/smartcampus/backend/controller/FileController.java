package com.smartcampus.backend.controller;

import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSDownloadStream;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "http://localhost:5173")
public class FileController {

    @Autowired
    private GridFSBucket gridFSBucket;

    @GetMapping("/{id}")
    public ResponseEntity<InputStreamResource> getFile(@PathVariable String id) {
        try {
            ObjectId fileId = new ObjectId(id);
            GridFSFile file = gridFSBucket.find(new org.bson.Document("_id", fileId)).first();
            if (file == null) {
                return ResponseEntity.notFound().build();
            }
            GridFSDownloadStream downloadStream = gridFSBucket.openDownloadStream(fileId);
            InputStreamResource resource = new InputStreamResource(downloadStream);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getMetadata().getString("_contentType")))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}