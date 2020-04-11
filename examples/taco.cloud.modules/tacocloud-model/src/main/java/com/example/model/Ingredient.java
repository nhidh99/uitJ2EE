package com.example.model;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "ingredient")
public class Ingredient {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "type")
    private String type;

    @ToString.Exclude
    @ManyToMany(targetEntity = Taco.class, mappedBy = "ingredients")
    private List<Taco> tacos;

    public enum Type {
        WRAP, PROTEIN, CHEESE, VEGGIES, SAUCE
    }
}