package com.example.lab4.services;

import com.example.lab4.models.Point;
import com.example.lab4.models.User;
import com.example.lab4.repositories.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class PointService {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    PointRepository pointRepository;

    public List<PointRepository.NoUserInfo> getAllPointsByUser(User user) {
        List<PointRepository.NoUserInfo> points = pointRepository.findAllByUser(user);
        return points;
    }

    public boolean savePoint(Point p) {
        pointRepository.save(p);
        return true;
    }

    public long deletePoints(String user) {
        return pointRepository.removePointsByOwner(user);
    }

}
