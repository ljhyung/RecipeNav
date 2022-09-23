package com.gumid105.recipenav.user.dto;


import com.gumid105.recipenav.user.domain.UserRecipe;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRecipeDto {

    private Long userRecipeSeq;
    private Long user_seq;
    private Long rec_seq;

    public static UserRecipeDto of(UserRecipe userRecipe){
        UserRecipeDto userRecipeDto = new UserRecipeDto();
        userRecipeDto.userRecipeSeq = userRecipe.getUserRecipeSeq();
        userRecipeDto.user_seq = userRecipe.getUser().getUserSeq();
        userRecipeDto.rec_seq = userRecipe.getRecipe().getRecSeq();

        return userRecipeDto;
    }

}
