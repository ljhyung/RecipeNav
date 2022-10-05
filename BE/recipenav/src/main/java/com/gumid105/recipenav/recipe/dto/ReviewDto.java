package com.gumid105.recipenav.recipe.dto;

import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ReviewDto {
    private Long recRevSeq;
    private String recRevTitle;
    private String recRevContent;
    private Integer recRevGrade;
    private LocalDateTime revRegDate;
    private LocalDateTime revModDate;
    private Long userSeq;
    private String userName;

    public static ReviewDto of(Review review){
        ReviewDto reviewDto = new ReviewDto();
        reviewDto.recRevSeq = review.getRecRevSeq();
        reviewDto.recRevTitle = review.getRecRevTitle();
        reviewDto.recRevContent = review.getRecRevContent();
        reviewDto.recRevGrade = review.getRecRevGrade();
        reviewDto.revRegDate = review.getRevRegDate();
        reviewDto.revModDate = review.getRevModDate();
        reviewDto.userSeq = review.getUser().getUserSeq();
        reviewDto.userName = review.getUser().getUserName();

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
            reviewDto.revRegDate = reviewList.get(i).getRevRegDate();
            reviewDto.revModDate = reviewList.get(i).getRevModDate();
            reviewDto.userSeq = reviewList.get(i).getUser().getUserSeq();
            reviewDto.userName = reviewList.get(i).getUser().getUserName();

            reviewDtoArrayList.add(reviewDto);
            i++;
        }

        return reviewDtoArrayList;
    }
}
