package com.example.service;

import com.example.model.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientService extends JpaRepository<Ingredient, String> { }