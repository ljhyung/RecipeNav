package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.RecipeProcess;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeProcessRepository extends JpaRepository<RecipeProcess, Long> {
}
