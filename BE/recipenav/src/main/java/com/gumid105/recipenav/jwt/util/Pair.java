package com.gumid105.recipenav.jwt.util;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Pair <K,V>{
    private K first;
    private V second;
}
