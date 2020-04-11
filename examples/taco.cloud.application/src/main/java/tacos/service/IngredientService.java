package tacos.service;

import org.springframework.data.jpa.repository.JpaRepository;
import tacos.model.Ingredient;

public interface IngredientService extends JpaRepository<Ingredient, String> { }