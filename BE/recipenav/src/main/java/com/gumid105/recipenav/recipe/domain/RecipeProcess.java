package com.gumid105.recipenav.recipe.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_recipe_process", schema = "recipenav")
public class RecipeProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_pro_seq")
    private Long recProSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_seq")
    @JsonBackReference
    private Recipe recipe;

    @Column(name = "rec_code")
    private String recCode;

    @Column(name = "rec_order")
    private String recOrder;

    @Column(name = "rec_des")
    private String recDes;

    @Column(name = "pro_url")
    private String proUrl;

    @Column(name = "pro_tip")
    private String proTip;
}
