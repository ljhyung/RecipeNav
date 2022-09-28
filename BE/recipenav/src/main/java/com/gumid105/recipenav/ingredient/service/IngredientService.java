package com.gumid105.recipenav.ingredient.service;

import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
//import com.gumid105.recipenav.ingredient.dto.ChangeRate;
import com.gumid105.recipenav.ingredient.dto.IngredientDto;
import com.gumid105.recipenav.ingredient.dto.IngredientPriceLogDto;
import com.gumid105.recipenav.ingredient.dto.IngredientPriceLogSeparateDto;
import com.gumid105.recipenav.ingredient.repository.IngredientPriceLogRepository;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.PriorityQueue;

@Service
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientPriceLogRepository ingredientPriceLogRepository;

    public Page<Ingredient> getAllIngredientByPage(Integer page, Integer size){
        PageRequest pageRequest = PageRequest.of(page,size);
        Page<Ingredient> ingredientPage = ingredientRepository.findAll(pageRequest);
//        List<Ingredient> ingredientList = ingredientRepository.findAll(pageRequest).getContent();
        return ingredientPage;
    }

    public List<IngredientDto> getAllIngredient(){
        List<Ingredient> ingredientList = ingredientRepository.findAll();
        return IngredientDto.ofList(ingredientList);
    }

    public IngredientDto getIngredientDetail(Long seq){
        Optional<Ingredient> ingredientOptional = ingredientRepository.findById(seq);
        Ingredient ingredient = ingredientOptional.get();
        return IngredientDto.of(ingredient);
    }

    public List<RecipeDto> getRecipesByIngredient(Long ingredientSeq){
        Optional<Ingredient> ingredientOptional = ingredientRepository.findById(ingredientSeq);
        Ingredient ingredient = ingredientOptional.get();
        List<Recipe> recipeList = recipeRepository.findRecipesByIngredientName(ingredient.getIngName());
        return RecipeDto.ofList(recipeList);
    }

    public List<IngredientDto> getSeasonIngredients(Integer month){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByIngSeasonContaining(month);
        return IngredientDto.ofList(ingredientList);
    }

    public List<IngredientDto> searchIngredients(String title, Integer minPrice, Integer maxPrice, String category, String season){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByOptions(title, minPrice, maxPrice, category, season);
        return IngredientDto.ofList(ingredientList);
    }

    public List<IngredientPriceLogDto> getIngredientPriceLog(Long ingredientSeq){
        List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(ingredientSeq);
        return IngredientPriceLogDto.ofList(ingredientPriceLogList);
    }

    public List<IngredientPriceLogSeparateDto> getIngredientPriceLogSeparate(Long ingredientSeq){
        List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(ingredientSeq);
        return IngredientPriceLogSeparateDto.ofList(ingredientPriceLogList);
    }

//    public Double getIngredientByTopGainers(){
//        PriorityQueue<ChangeRate> priorityQueue = new PriorityQueue<>(10);
//        for(Long i=0l;i<100;i++){
//
//            List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(i);
//            Integer logLength = ingredientPriceLogList.size();
//            System.out.println("진입"+i+", "+"길이"+logLength);
//            if (logLength<10) continue;
//            if (ingredientPriceLogList.get(logLength-10).getIngDate().isBefore(LocalDate.of(2022, 7, 29))) continue;
//            System.out.println("날짜 만족");
//            Double result = (ingredientPriceLogList.get(logLength-1).getIngAvgCost()-ingredientPriceLogList.get(logLength-11).getIngAvgCost())*100/ingredientPriceLogList.get(logLength-1).getIngAvgCost();
//            priorityQueue.add(new ChangeRate(result,ingredientPriceLogList.get(0).getIngredient()));
//        }
////        List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(ingredientSeq);
////        Double todayResult = ingredientPriceLogList.get(ingredientPriceLogList.size()-1).getIngAvgCost();
////        Double pastResult = ingredientPriceLogList.get(ingredientPriceLogList.size()-11).getIngAvgCost();
////        Double result = (todayResult - pastResult)*100/todayResult;
//        while(!priorityQueue.isEmpty()){
//            ChangeRate temp = priorityQueue.poll();
//            System.out.println(temp.getRate()+""+ temp.getIngredient().getIngSeq());
//        }
//        Double result=1d;
//        return result;
//    }



}
