package com.gumid105.auth.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Pair <K,V>{
    private K first;
    private V second;
}
