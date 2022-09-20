package com.gumid105.recipenav.recipe.dto;

import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ReviewDto {
    private Long recRevSeq;
    private String recRevTitle;
    private String recRevContent;
    private Integer recRevGrade;
    private User user;

    public static ReviewDto of(Review review){
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.recRevSeq = review.getRecRevSeq();
        reviewDto.recRevTitle = review.getRecRevTitle();
        reviewDto.recRevContent = review.getRecRevContent();
        reviewDto.recRevGrade = review.getRecRevGrade();
        reviewDto.user = review.getUser();

        return reviewDto;
    }

    public static ArrayList<ReviewDto> ofList(List<Review> reviewList){
        ArrayList<ReviewDto> reviewDtoArrayList = new ArrayList<>();
        int i=0;
        while(i<reviewList.size()){
            ReviewDto reviewDto = new ReviewDto();
            reviewDto.recRevSeq = reviewList.get(i).getRecRevSeq();
            reviewDto.recRevTitle = reviewList.get(i).getRecRevTitle();
            reviewDto.recRevContent = reviewList.get(i).getRecRevContent();
            reviewDto.recRevGrade = reviewList.get(i).getRecRevGrade();
            reviewDto.user = reviewList.get(i).getUser();

            reviewDtoArrayList.add(reviewDto);
            i++;
        }

        return reviewDtoArrayList;
    }
}