package org.example.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.example.type.GenderType;
import org.example.type.RoleType;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @Column(name = "id")
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Column(name = "password")
    @JsonIgnore
    private String password;

    @Column(name = "email")
    @JsonIgnore
    private String email;

    @Column(name = "name")
    @JsonProperty("name")
    private String name;

    @Column(name = "phone")
    @JsonProperty("phone")
    private String phone;

    @Column(name = "role")
    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private RoleType role;

    @Column(name = "gender")
    @JsonProperty("gender")
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Column(name="birthday")
    @JsonProperty("birthday")
    private LocalDate birthday;
}