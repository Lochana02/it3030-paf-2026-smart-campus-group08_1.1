package com.smartcampus.backend.config;

import com.smartcampus.backend.entity.*;
import com.smartcampus.backend.repository.RoleManagementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private RoleManagementRepository roleManagementRepository;
    
    @Override
    public void run(String... args) throws Exception {
        if (roleManagementRepository.count() == 0) {
            // Add sample users
            RoleManagement user1 = new RoleManagement("1", "Elena Sterling", "e.sterling@campushub.edu", Role.ADMIN, Status.ACTIVE);
            user1.setAvatarUrl("https://randomuser.me/api/portraits/women/1.jpg");
            user1.setCreatedBy("SYSTEM");
            
            RoleManagement user2 = new RoleManagement("2", "Marcus Knight", "m.knight@campushub.edu", Role.TECHNICIAN, Status.ACTIVE);
            user2.setAvatarUrl("https://randomuser.me/api/portraits/men/2.jpg");
            user2.setCreatedBy("SYSTEM");
            
            RoleManagement user3 = new RoleManagement("3", "Julian Drake", "j.drake@campushub.edu", Role.USER, Status.PENDING);
            user3.setAvatarUrl("https://randomuser.me/api/portraits/men/3.jpg");
            user3.setCreatedBy("SYSTEM");
            
            RoleManagement user4 = new RoleManagement("4", "Lydia Wells", "l.wells@campushub.edu", Role.USER, Status.DISABLED);
            user4.setAvatarUrl("https://randomuser.me/api/portraits/women/4.jpg");
            user4.setCreatedBy("SYSTEM");
            
            roleManagementRepository.save(user1);
            roleManagementRepository.save(user2);
            roleManagementRepository.save(user3);
            roleManagementRepository.save(user4);
        }
    }
}