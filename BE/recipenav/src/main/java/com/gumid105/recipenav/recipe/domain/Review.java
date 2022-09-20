package com.gumid105.recipenav.recipe.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "t_review", schema = "recipenav")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rec_rev_seq")
    private Long recRevSeq;

    @Column(name = "rec_rev_title")
    private String recRevTitle;

    @Column(name = "rec_rev_content")
    private String recRevContent;

    @Column(name = "rec_rev_grade")
    private Integer recRevGrade;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rec_seq")
    private Recipe recipe;

    public void updateReview (String recRevTitle, String recRevContent, Integer recRevGrade){
        this.recRevTitle = recRevTitle;
        this.recRevContent = recRevContent;
        this.recRevGrade = recRevGrade;
    }
}
