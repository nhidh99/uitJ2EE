package org.example.demo;

import org.example.model.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

public class RestClientExample {
    private static final String endpointURL = "http://localhost:8080/rest/v1/users/";
    private static final RestTemplate restTemplate = new RestTemplate();

    public void updateUser(User user) {
        try {
            restTemplate.put(endpointURL + "{id}", user, user.getId());
        } catch (HttpClientErrorException e) {
            System.out.println(e.getMessage());
        }
    }

    public void deleteUser(Integer id) {
        try {
            restTemplate.delete(endpointURL + "{id}", id);
        } catch (HttpClientErrorException e) {
            System.out.println(e.getMessage());
        }
    }
}
