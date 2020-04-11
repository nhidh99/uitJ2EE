package com.example.converter;

import com.example.model.Ingredient;
import com.example.service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class IngredientConverter implements Converter<String, Ingredient> {

    @Autowired
    private IngredientService ingredientService;

    @Override
    public Ingredient convert(String id) {
        return ingredientService.findById(id).orElse(null);
    }
}