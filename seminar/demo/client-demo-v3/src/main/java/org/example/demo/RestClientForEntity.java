package org.example.demo;

import org.example.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RestClientForEntity {
    private static final String endpointURL = "http://localhost:8080/rest/v1/users/";
    private static final RestTemplate restTemplate = new RestTemplate();

    public List<User> retrieveAllUsers() {
        try {
            Class<List<User>> clazz = (Class<List<User>>) (Class<?>) List.class;
            ResponseEntity<List<User>> response = restTemplate.getForEntity(endpointURL, clazz);
            System.out.println("Status code: " + response.getStatusCodeValue());
            return response.getBody();
        } catch (HttpClientErrorException e) {
            System.out.println("Status code: " + e.getRawStatusCode());
            System.out.println("Message: " + e.getResponseBodyAsString());
            return null;
        }
    }

    public User retrieveUserById(Integer id) {
        try {
            Map<String, Integer> urlVariables = new HashMap<>();
            urlVariables.put("id", id);
            ResponseEntity<User> response = restTemplate.getForEntity(endpointURL + "{id}", User.class, urlVariables);
            System.out.println("Status code: " + response.getStatusCodeValue());
            return response.getBody();
        } catch (HttpClientErrorException e) {
            System.out.println("Status code: " + e.getRawStatusCode());
            System.out.println("Message: " + e.getResponseBodyAsString());
            return null;
        }
    }

    public int postUser(User user) {
        try {
            ResponseEntity<User> response = restTemplate.postForEntity(endpointURL, user, User.class);
            return response.getStatusCodeValue();
        } catch (Exception e) {
            return HttpStatus.BAD_REQUEST.value();
        }
    }
}
