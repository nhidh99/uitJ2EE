package com.example.jug.config;

import com.example.jug.model.Event;
import com.example.jug.model.Group;
import com.example.jug.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

@Component
public class DataConfig implements CommandLineRunner {

    @Autowired
    private GroupService groupService;

    @Override
    public void run(String... args) throws Exception {
        Stream.of("Denver JUG", "Utah JUG", "Seattle JUG", "Richmond JUG")
              .forEach(name -> groupService.save(new Group(name)));

        Group denverJUG = groupService.findByName("Denver JUG");
        Event event = Event.builder()
                .title("Full stack Reactive")
                .description("Reactive with Spring + React")
                .date(Instant.parse("2020-01-02T18:00:00.000Z"))
                .build();
        denverJUG.setEvents(Collections.singleton(event));
        groupService.save(denverJUG);
    }
}