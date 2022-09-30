package com.gumid105.recipenav.recipe.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.gumid105.recipenav.user.domain.User;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@DynamicInsert
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
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


    @CreatedDate
    @Column(name = "rev_reg_date")
    private LocalDateTime revRegDate;

    @LastModifiedDate
    @Column(name = "rev_mod_date")
    private LocalDateTime revModDate;

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
