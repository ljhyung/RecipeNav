package com.gumid105.recipenav.recipe.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RecipeProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_pro_seq")
    private Long recProSeq;

    private String rec_code;
    private String rec_order;
    private String rec_des;
    private String pro_url;
    private String pro_tip;
}
