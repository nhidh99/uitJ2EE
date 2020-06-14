package org.example.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String sex;
    private String address;
    private String email;
    private String mobilePhone;
    private Group group;
}
