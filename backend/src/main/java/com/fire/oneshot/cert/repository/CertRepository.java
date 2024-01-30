package com.fire.oneshot.cert.repository;

import com.fire.oneshot.cert.domain.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CertRepository extends JpaRepository<Certification, Long> {

    @Query(value = "select * from certification where user_id = :userId ",nativeQuery = true)
    Optional<List<Certification>> findAllByUserId(String userId);

}
