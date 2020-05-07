package org.example.input;

import lombok.Data;

import javax.ws.rs.FormParam;

@Data
public class RegisterInput {
    @FormParam("username")
    private String username;

    @FormParam("password")
    private String password;

    @FormParam("name")
    private String name;

    @FormParam("email")
    private String email;

    @FormParam("phone")
    private String phone;
}
