package com.gumid105.recipenav.ingredient.service;

import com.gumid105.recipenav.config.RedisConfig;
import com.gumid105.recipenav.ingredient.domain.Ingredient;
import com.gumid105.recipenav.ingredient.domain.IngredientPrice;
import com.gumid105.recipenav.ingredient.domain.IngredientPriceLog;
import com.gumid105.recipenav.ingredient.dto.*;
import com.gumid105.recipenav.ingredient.repository.IngredientPriceLogRepository;
import com.gumid105.recipenav.ingredient.repository.IngredientPriceRepository;
import com.gumid105.recipenav.ingredient.repository.IngredientRepository;
import com.gumid105.recipenav.recipe.domain.Recipe;
import com.gumid105.recipenav.recipe.dto.RecipeDto;
import com.gumid105.recipenav.recipe.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class IngredientService {
    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;
    private final IngredientPriceLogRepository ingredientPriceLogRepository;
    private final IngredientPriceRepository ingredientPriceRepository;
    private final RedisTemplate<String,byte[]> redisTemplate;

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

    public List<IngredientPriceDto> getIngredientPrice(Long ingredientSeq){
        List<IngredientPrice> ingredientPriceList = ingredientPriceRepository.findIngredientPricesByIngredient_IngSeq(ingredientSeq);
        return IngredientPriceDto.ofList(ingredientPriceList);
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

    public List<IngredientDto> searchIngredientsByName(String ingName){
        List<Ingredient> ingredientList = ingredientRepository.findIngredientsByIngNameContaining(ingName);
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

    public List<IngredientDto> getIngredientByTopGainers(){
        List<Ingredient> ingredientList = ingredientRepository.findTop10ByOrderByIngPriceRateDesc();
        return IngredientDto.ofList(ingredientList);


//        ValueOperations<String,byte[]> valueOperations = redisTemplate.opsForValue();
//
//        byte[] imageByte = valueOperations.get(RedisConfig.TOPGAINER);
//
//        if (imageByte==null){
//            PriorityQueue<ChangeRate> priorityQueue = new PriorityQueue<>();
//            List<ChangeRate> result = new LinkedList<>();
//            StringBuffer redisResult = new StringBuffer();
//            for(Long i=0l;i<230;i++){
//
//                List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(i);
//                Integer logLength = ingredientPriceLogList.size();
//                if (logLength<10) continue;
//                if (ingredientPriceLogList.get(logLength-10).getIngDate().isBefore(LocalDate.of(2022, 7, 29))) continue;
//                Double resultChange = (ingredientPriceLogList.get(logLength-1).getIngAvgCost()-ingredientPriceLogList.get(logLength-11).getIngAvgCost())*100/ingredientPriceLogList.get(logLength-1).getIngAvgCost();
//                priorityQueue.add(new ChangeRate(resultChange,IngredientDto.of(ingredientPriceLogList.get(0).getIngredient())));
//            }
//
//            for(int j=0;j<10;j++){
//                ChangeRate temp = priorityQueue.poll();
//                result.add(temp);
//                redisResult.append(String.format("%f,%d,",temp.getRate(),temp.getIngredientDto().getIngSeq()));
//            }
//            try {
//                imageByte = redisResult.toString().getBytes("utf-8");
//            }catch (Exception e){
//            }
//
//            valueOperations.set(RedisConfig.TOPGAINER,imageByte, Duration.ofHours(24));
//
//            return result;
//        }else {
//            String redisResult = new String(imageByte);
//            log.info("상승률 top10 레디스 캐싱 : {}", redisResult);
//            List<ChangeRate> result = new LinkedList<>();
//
//            ArrayList<String> redisResultList = new ArrayList<>(List.of(redisResult.split(",")));
//            for (int i=0;i<10;i++){
//                result.add(new ChangeRate(Double.parseDouble(redisResultList.get(i*2)),IngredientDto.of(ingredientRepository.findById(Long.parseLong(redisResultList.get(i*2+1))).get())));
//            }
//            return result;
//        }



    }

    public List<IngredientDto> getIngredientByTopLosers(){

        List<Ingredient> ingredientList = ingredientRepository.findTop10ByOrderByIngPriceRate();
        return IngredientDto.ofList(ingredientList);
//        ValueOperations<String,byte[]> valueOperations = redisTemplate.opsForValue();
//
//        byte[] imageByte = valueOperations.get(RedisConfig.TOPLOSER);
//
//        if (imageByte==null){
//            PriorityQueue<ChangeRate> priorityQueue = new PriorityQueue<>(Comparator.reverseOrder());
//            List<ChangeRate> result = new LinkedList<>();
//            StringBuffer redisResult = new StringBuffer();
//            for(Long i=0l;i<230;i++){
//
//                List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(i);
//                Integer logLength = ingredientPriceLogList.size();
//                if (logLength<10) continue;
//                if (ingredientPriceLogList.get(logLength-10).getIngDate().isBefore(LocalDate.of(2022, 7, 29))) continue;
//                Double resultChange = (ingredientPriceLogList.get(logLength-1).getIngAvgCost()-ingredientPriceLogList.get(logLength-11).getIngAvgCost())*100/ingredientPriceLogList.get(logLength-1).getIngAvgCost();
//                priorityQueue.add(new ChangeRate(resultChange,IngredientDto.of(ingredientPriceLogList.get(0).getIngredient())));
//            }
//
//            for(int j=0;j<10;j++){
//                ChangeRate temp = priorityQueue.poll();
//                result.add(temp);
//                redisResult.append(String.format("%f,%d,",temp.getRate(),temp.getIngredientDto().getIngSeq()));
//            }
//            try {
//                imageByte = redisResult.toString().getBytes("utf-8");
//            }catch (Exception e){
//            }
//
//            valueOperations.set(RedisConfig.TOPLOSER,imageByte, Duration.ofHours(24));
//
//            return result;
//        }else {
//            String redisResult = new String(imageByte);
//            log.info("하락률 top10 레디스 캐싱 : {}", redisResult);
//            List<ChangeRate> result = new LinkedList<>();
//
//            ArrayList<String> redisResultList = new ArrayList<>(List.of(redisResult.split(",")));
//            for (int i=0;i<10;i++){
//                result.add(new ChangeRate(Double.parseDouble(redisResultList.get(i*2)),IngredientDto.of(ingredientRepository.findById(Long.parseLong(redisResultList.get(i*2+1))).get())));
//            }
//            return result;
//        }

    }

    public int updateRate(){
        try {
            for(Long i=0l;i<250;i++){

                List<IngredientPriceLog> ingredientPriceLogList = ingredientPriceLogRepository.findIngredientPriceLogsByIngredient_IngSeqOrderByIngDate(i);
                Integer logLength = ingredientPriceLogList.size();
                if (logLength<10) continue;
                if (ingredientPriceLogList.get(logLength-10).getIngDate().isBefore(LocalDate.of(2022, 7, 29))) continue;
                Double resultChange = (ingredientPriceLogList.get(logLength-1).getIngAvgCost()-ingredientPriceLogList.get(logLength-11).getIngAvgCost())*100/ingredientPriceLogList.get(logLength-1).getIngAvgCost();
                Ingredient ingredient = ingredientPriceLogList.get(0).getIngredient();
                ingredient.updateRate(resultChange);
            }
            return 1;
        }catch (Exception e) {
            return 0;
        }


    }



}
