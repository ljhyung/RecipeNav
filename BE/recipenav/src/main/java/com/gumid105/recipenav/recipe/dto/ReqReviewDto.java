package com.gumid105.recipenav.recipe.dto;

import com.gumid105.recipenav.recipe.domain.Review;
import com.gumid105.recipenav.user.domain.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ReqReviewDto {

    private String recRevTitle;
    private String recRevContent;
    private Integer recRevGrade;



    public static ReqReviewDto of(Review review){
        ReqReviewDto reqReviewDto = new ReqReviewDto();
        reqReviewDto.recRevTitle = review.getRecRevTitle();
        reqReviewDto.recRevContent = review.getRecRevContent();
        reqReviewDto.recRevGrade = review.getRecRevGrade();
        return reqReviewDto;
    }

}
