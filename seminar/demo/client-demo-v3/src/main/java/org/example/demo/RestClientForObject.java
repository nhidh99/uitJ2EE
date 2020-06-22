package org.example.demo;

import org.example.model.User;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RestClientForObject {

    private static final String endpointURL = "http://localhost:8080/rest/v1/users/";
    private static final RestTemplate restTemplate = new RestTemplate();

    public List<User> retrieveAllUsers() {
        try {
            Class<List<User>> clazz = (Class<List<User>>) (Class<?>) List.class;
            return restTemplate.getForObject(endpointURL, clazz);
        } catch (Exception e) {
            return null;
        }
    }

    public User retrieveUserById(Integer id) {
        try {
            Map<String, Integer> urlVariables = new HashMap<>();
            urlVariables.put("id", id);
            return restTemplate.getForObject(endpointURL + "{id}", User.class, urlVariables);
        } catch (Exception e) {
            return null;
        }
    }

    public User postUser(User user) {
        try {
            return restTemplate.postForObject(endpointURL, user, User.class);
        } catch (Exception e) {
            return null;
        }
    }
}
