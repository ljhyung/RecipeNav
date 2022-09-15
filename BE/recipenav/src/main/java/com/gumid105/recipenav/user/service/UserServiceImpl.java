package com.gumid105.recipenav.user.service;

import com.gumid105.recipenav.oauth.OAuthAttribute;
import com.gumid105.recipenav.user.domain.User;
import com.gumid105.recipenav.user.dto.UserDto;
import com.gumid105.recipenav.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    /**
     *
     * @param oAuthAttribute
     * @return 새로운 사용자 : true 기존 사용자: false
     */
    @Override
    @Transactional
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


}
