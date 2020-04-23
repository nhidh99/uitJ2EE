package org.example.model;

import lombok.Data;

import javax.ws.rs.QueryParam;

@Data
public class UserInput {

    @QueryParam("username")
    private String username;

    @QueryParam("password")
    private String password;
}
