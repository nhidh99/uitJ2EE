package com.example.jug.controller;

import com.example.jug.model.Group;
import com.example.jug.model.User;
import com.example.jug.service.GroupService;
import com.example.jug.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.Collection;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping("/api")
public class GroupController {

    @Autowired
    private GroupService groupService;
    @Autowired
    private UserService userService;

    @GetMapping("/groups")
    public Collection<Group> findAllGroups(Principal principal) {
        return groupService.findAllByUserId(principal.getName());
    }

    @GetMapping("/group/{id}")
    public ResponseEntity<?> getGroup(@PathVariable Long id) {
        log.info("Request to get group: {}", id);
        Optional<Group> group = groupService.findById(id);
        return group.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/group")
    public ResponseEntity<?> createGroup(@Valid @RequestBody Group group,
                                         @AuthenticationPrincipal OAuth2User principal) throws URISyntaxException {
        log.info("Request to create group: {}", group);
        Map<String, Object> details = principal.getAttributes();
        String userId = details.get("sub").toString();

        // check to see if user already exists
        User user = userService.findById(userId).orElse(null);
        if (user == null) {
            String name = details.get("name").toString();
            String email = details.get("email").toString();
            user = new User(userId, name, email);
        }
        group.setUser(user);
        Group result = groupService.save(group);
        URI uri = new URI("/api/group/" + result.getId());
        return ResponseEntity.created(uri).body(result);
    }

    @PutMapping("/group/{id}")
    public ResponseEntity<?> updateGroup(@Valid @RequestBody Group group) {
        log.info("Request to update group: {}", group);
        Group result = groupService.save(group);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        log.info("Request to delete group: {}", id);
        groupService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}