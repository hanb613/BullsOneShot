package com.fire.oneshot.auth.repository;

import com.fire.oneshot.auth.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String > {
}
