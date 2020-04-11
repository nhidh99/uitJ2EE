package tacos.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;
import tacos.model.Ingredient;
import tacos.model.Order;
import tacos.model.Taco;
import tacos.model.User;
import tacos.service.IngredientService;
import tacos.service.TacoService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Controller
@SessionAttributes("order")
@RequestMapping("/design")
public class DesignController {

    @Autowired
    private IngredientService ingredientService;
    @Autowired
    private TacoService tacoService;

    @ModelAttribute(name = "order")
    public Order order() {
        return new Order();
    }

    @ModelAttribute(name = "taco")
    public Taco taco() { return new Taco(); }

    @GetMapping
    public String showDesignForm(Model model) {
        List<Ingredient> ingredients = ingredientService.findAll();
        for (Ingredient.Type type : Ingredient.Type.values()) {
            String typeName = type.toString().toLowerCase();
            List<Ingredient> typeIngredients = findIngredientsByType(ingredients, typeName);
            model.addAttribute(typeName, typeIngredients);
        }
        return "design";
    }

    @PostMapping
    public String processDesign(@Valid Taco taco, Errors errors,
                                @ModelAttribute Order order) {
        if (errors.hasErrors()) {
            return "redirect:/design";
        } else {
            Taco save = tacoService.save(taco);
            order.addTaco(save);
            return "redirect:/orders/current";
        }
    }

    private List<Ingredient> findIngredientsByType(List<Ingredient> ingredients, String type) {
        return ingredients.stream()
                .filter(i -> i.getType().equalsIgnoreCase(type))
                .collect(Collectors.toList());
    }
}