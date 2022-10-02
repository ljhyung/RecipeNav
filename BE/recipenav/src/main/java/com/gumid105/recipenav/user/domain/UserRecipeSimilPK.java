package com.gumid105.recipenav.user.domain;


import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@Embeddable
public class UserRecipeSimilPK implements Serializable {


    @Column(name="first_user")
    private Long firstUser;

    @Column(name="second_user")
    private Long secondUser;

}
