package com.gumid105.recipenav.user.service;

import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.user.domain.User;
import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.dto.UserRecipeDto;
import com.gumid105.recipenav.user.repository.UserRecipeRepository;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final UserRecipeRepository userRecipeRepository;
    private final RecipeRepository recipeRepository;
    /**
     *
     * @param oAuthAttribute
     * @return 새로운 사용자 : true 기존 사용자: false
     */
    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE) //팬텀 리드시 에러 , 아이디는 유니크해야함
    public UserDto authenticationProcess(OAuthAttribute oAuthAttribute) {
        //주어진 아이디가 있다면, 그에 따른 정보를 가져오고 , 없다면
        //만든다.

        Optional<User> user =  userRepo.findByUserId(oAuthAttribute.getId());

        UserDto userDto;
        if(user.isPresent()){
            //새로운 사용자인가, 기존 사용자인가...
            userDto = UserDto.of (user.get());
            userDto.setIsNewUser(0); //0은 false를 의미한다.
            return userDto;
        }

        User newUser =User.of(oAuthAttribute);
        userRepo.save(newUser);

        userDto = UserDto.of(newUser);
        userDto.setIsNewUser(1);
        return userDto;
    }

    @Override
    public UserDto getUserInfo(UserDto userDto) {

        Optional<User> user= userRepo.findByUserSeqAndUserId(userDto.getUserSeq(),userDto.getUserId());
        if(!user.isPresent()){
            return null;
        }
        return UserDto.of(user.get());
    }

    public List<Recipe> getMyRecipes(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = (UserDto) auth.getPrincipal();
        List<UserRecipeDto> userRecipeList = userRecipeRepository.findAllByUser_userSeq(user.getUserSeq());
        List<Recipe> recipeList = new ArrayList<Recipe>();
        for(UserRecipeDto ur : userRecipeList){
            Optional<Recipe> rec = recipeRepository.findById(ur.getRec_seq());

            if(rec.isPresent()){
                Recipe recipe = rec.get();
                recipeList.add(recipe);
            }
        }
        System.out.println(recipeList.size());
        return recipeList;
    }

    @Transactional
    public UserRecipe addRecipeToUser(Recipe recipe){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = (UserDto) auth.getPrincipal();


        User user1 = new User(user);
        UserRecipe userRecipe = new UserRecipe(user1, recipe);
        userRecipeRepository.save(userRecipe);
        //중복으로 눌렀을 때 처리는 백? 프론트?
        return userRecipe;
    }

    @Transactional
    public int deleteRecipeFromUser(Long recipesSeq){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = (UserDto) auth.getPrincipal();
        //Optional<UserRecipe> userRecipe = userRecipeRepository.findByUser_userSeqAndRecipe_recSeq(user.getUserSeq(), recipesSeq);
        Optional<UserRecipeDto> userRecipe = userRecipeRepository.findByUser_userSeqAndRecipe_recSeq(user.getUserSeq(), recipesSeq);
        if(userRecipe.isPresent()){
            userRecipeRepository.deleteById(userRecipe.get().getUserRecipeSeq());
            return 1;
        }


        return 0;
    }
}
