package com.example.lab4.repositories;

import com.example.lab4.models.Point;
import com.example.lab4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long>, CrudRepository<Point, Long> {
    interface NoUserInfo {
        double getX();
        double getY();
        double getR();
        User getUser();
        String getTime();
        boolean isHit();
    }

    List<NoUserInfo> findAllByUser(User user);

    @Transactional
    long removePointsByOwner(String owner);


}
