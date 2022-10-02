package com.gumid105.recipenav.user.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import com.gumid105.recipenav.user.domain.User;
import com.gumid105.recipenav.user.domain.UserRecipe;
import com.gumid105.recipenav.user.domain.UserRecipeSimil;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.dto.UserRecipeDto;
import com.gumid105.recipenav.user.repository.UserRecipeRepository;
import com.gumid105.recipenav.user.repository.UserRecipeSimilRepository;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import com.gumid105.recipenav.user.domain.UserIngredient;
import com.gumid105.recipenav.user.dto.ReqUserDto;
import com.gumid105.recipenav.user.repository.UserIngredientRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;
    private final UserRecipeRepository userRecipeRepository;
    private final RecipeRepository recipeRepository;
    private final UserIngredientRepository userIngredientRepository;
    private final IngredientRepository ingredientRepository;
    private final UserRecipeSimilRepository userRecipeSimilRepository;
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

    public List<RecipeDto> getMyRecipes(){
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
        return RecipeDto.ofList(recipeList);
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
    public int deleteRecipeFromUser(Long recipesSeq) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        UserDto user = (UserDto) auth.getPrincipal();
        //Optional<UserRecipe> userRecipe = userRecipeRepository.findByUser_userSeqAndRecipe_recSeq(user.getUserSeq(), recipesSeq);
//        Optional<UserRecipeDto> userRecipe = userRecipeRepository.findByUser_userSeqAndRecipe_recSeq(user.getUserSeq(), recipesSeq);
        int result = userRecipeRepository.deleteUsersByUser(user.getUserSeq(), recipesSeq);

//        if (userRecipe.isPresent()) {
//            userRecipeRepository.deleteById(userRecipe.get().getUserRecipeSeq());
//            return 1;
//        }
        return result;
    }


    public UserDto getProfile(){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userDto;
    }

    public UserDto updateProfile(ReqUserDto reqUserDto){

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findById(userDto.getUserSeq()).get();

        user.updateProfile(reqUserDto.getUserName(), reqUserDto.getUserEmail(), reqUserDto.getUserTel(), reqUserDto.getUserAge(), reqUserDto.getUserGender(), reqUserDto.getUserImg());

        return UserDto.of(user);

    }

    public List<IngredientDto> getMyIngredients(){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findByUserId(userDto.getUserId()).get();
        List<IngredientDto> ingredientDtoList = new LinkedList<>();
        List<UserIngredient> userIngredientList = user.getUserIngredients();
        for(UserIngredient userIngredient:userIngredientList){
            Ingredient ingredient = userIngredient.getIngredient();
            ingredientDtoList.add(IngredientDto.of(ingredient));
        }
        return ingredientDtoList;
    }

    public int addMyIngredient(Long ingSeq){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findByUserId(userDto.getUserId()).get();
        Optional<UserIngredient> userIngredientOptional = userIngredientRepository.findByUser_UserSeqAndIngredient_IngSeq(user.getUserSeq(), ingSeq);
        if (userIngredientOptional.isPresent()){
            return 0;
        }
        Ingredient ingredient = ingredientRepository.findById(ingSeq).orElseThrow();
        UserIngredient userIngredient = new UserIngredient(user, ingredient);
        userIngredientRepository.save(userIngredient);
        return 1;
    }

    public int deleteMyIngredient(Long ingSeq) {
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepo.findByUserId(userDto.getUserId()).get();
        Optional<UserIngredient> userIngredientOptional = userIngredientRepository.findByUser_UserSeqAndIngredient_IngSeq(user.getUserSeq(), ingSeq);
        if (userIngredientOptional.isPresent()) {
            userIngredientRepository.deleteById(userIngredientOptional.get().getUserIngSeq());
            return 1;
        }

        return 0;
    }

    public List<RecipeDto> getSimilarRecipeByUserLike(Long userSeq) {
        List<UserRecipeSimil> userRecipeSimils =  userRecipeSimilRepository.findByFirstId(userSeq);
        //유사 유저 가져오기, 자신은 포함되어 있지 않다.

        List<Recipe> recipes = null;

        if(userRecipeSimils != null && userRecipeSimils.size() > 0){
            List<Long> otherUserSeqs = new ArrayList<Long>();
            for(UserRecipeSimil item:userRecipeSimils){
                otherUserSeqs.add(item.getPk().getSecondUser());
            }
            List<Map<String, Object>> list =  userRecipeRepository.findLikeRecipeInSimilarUser(otherUserSeqs,userSeq,PageRequest.of(0,10));
            recipes =  list.stream().map(stringObjectMap -> ((Recipe)stringObjectMap.get("recipe")) ).collect(Collectors.toList());
        }

        if(recipes == null){
            recipes = new ArrayList<>();
        }

        if(recipes.size() < 10) {
            while (recipes.size() < 10) {
                List<Recipe> tempRecipe = recipeRepository.findRecipesByRandom();
                for(int i = 0 ; i < tempRecipe.size() && recipes.size() < 10 ; i++){
                    if(!recipes.contains(tempRecipe)){ //같은 객체라면 퍼시스턴스에 의해 객체의 주소가 같다.
                        recipes.add(tempRecipe.get(i));
                    }
                }
            }
        }

    return RecipeDto.ofList(recipes);
    }
}
