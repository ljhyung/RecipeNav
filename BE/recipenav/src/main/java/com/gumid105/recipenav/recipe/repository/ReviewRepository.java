package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
