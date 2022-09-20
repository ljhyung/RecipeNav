package com.gumid105.recipenav.recipe.repository;

import com.gumid105.recipenav.recipe.domain.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByRecipe_RecSeq(Long recSeq);
}
