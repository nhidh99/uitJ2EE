package org.example.main;

import org.example.demo.RestClientExample;
import org.example.demo.RestClientForEntity;
import org.example.demo.RestClientForObject;
import org.example.model.User;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        demoGetForEntity();
    }

    public static void demoGetForObject() {
        RestClientForObject client = new RestClientForObject();

        List<?> users = client.retrieveAllUsers();
        System.out.println("List user: " + users + "\n---");

        User user = client.retrieveUserById(2);
        System.out.println("User: " + user + "\n---");

        User notFoundUser = client.retrieveUserById(5);
        System.out.println("Not found user: " + notFoundUser);
    }

    public static void demoGetForEntity() {
        RestClientForEntity client = new RestClientForEntity();

        List<?> users = client.retrieveAllUsers();
        System.out.println("List user: " + users + "\n---");

        User user = client.retrieveUserById(2);
        System.out.println("User: " + user + "\n---");

        User notFoundUser = client.retrieveUserById(5);
        System.out.println("Not found user: " + notFoundUser);
    }

    public static void demoPostForObject() {
        RestClientForObject client = new RestClientForObject();

        User validUser = User.builder().id(null).username("post_username").password("post_password").build();
        User validPostedUser = client.postUser(validUser);
        System.out.println("Valid posted user: " + validPostedUser + "\n---");

        User invalidUser = User.builder().id(5).username("post_username").password("post_password").build();
        User invalidPostedUser = client.postUser(invalidUser);
        System.out.println("Invalid posted user: " + invalidPostedUser);
    }

    public static void demoPostForEntity() {
        RestClientForEntity client = new RestClientForEntity();

        User validUser = User.builder().id(null).username("post_username").password("post_password").build();
        int validStatusCode = client.postUser(validUser);
        System.out.println("Post valid user status code: " + validStatusCode + "\n---");

        User invalidUser = User.builder().id(5).username("post_username").password("post_password").build();
        int invalidStatusCode = client.postUser(invalidUser);
        System.out.println("Post invalid user status code: " + invalidStatusCode);
    }

    public static void demoPut() {
        RestClientExample client = new RestClientExample();
        User updatedUser = User.builder().id(5).username("new_username").password("new_password").build();
        client.updateUser(updatedUser);
    }

    public static void demoDelete() {
        RestClientExample client = new RestClientExample();
        client.deleteUser(10);
    }

    public static void demoExchange() {
        RestClientExample client = new RestClientExample();
        client.getUserById(2);
    }
}
