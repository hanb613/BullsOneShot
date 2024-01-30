package com.fire.oneshot.cert.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fire.oneshot.auth.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long certId;

    private String certName;

    private String certContent;

    private LocalDateTime getTime;

    private int trainingHour;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "user_id")
    private User user;

}
