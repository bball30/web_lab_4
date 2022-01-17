package com.example.lab4.controllers;

import com.example.lab4.jwt.JwtUtils;
import com.example.lab4.models.BasicPoint;
import com.example.lab4.models.Point;
import com.example.lab4.models.User;
import com.example.lab4.repositories.PointRepository;
import com.example.lab4.services.PointService;
import com.example.lab4.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/points")
public class ModelController {

    @Autowired
    private PointService pointService;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private UserService userService;

    private User getUserByJwtToken(String jwtToken) {
        return (User) userService.loadUserByUsername(jwtUtils.getUsernameFromJwtToken(jwtToken));
    }

    @GetMapping
    @CrossOrigin
    public ResponseEntity<?> getPoints(HttpServletRequest request) {
        String jwtToken = jwtUtils.extractJwtToken(request);
        if (jwtToken == null) return ResponseEntity.badRequest().body("Bad token");
        List<PointRepository.NoUserInfo> pointList = pointService.getAllPointsByUser(getUserByJwtToken(jwtToken));

        List<Point> pPoints = new ArrayList<>();
        for (PointRepository.NoUserInfo p: pointList) {
            Point pPoint = new Point();
            pPoint.setX(p.getX());
            pPoint.setY(p.getY());
            pPoint.setR(p.getR());
            pPoint.setUser(p.getUser());
            pPoint.setTime(p.getTime());
            pPoint.validate();
            pPoints.add(pPoint);
        }
        return ResponseEntity.ok(pPoints);
        //return ResponseEntity.ok(basicPoints);
    }

    @PostMapping
    @CrossOrigin
    public ResponseEntity<Point> addPoint(HttpServletRequest request, @RequestBody Point point) {
        User initiator = getUserByJwtToken(jwtUtils.extractJwtToken(request));
        point.setUser(initiator);
        point.setTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        point.validate();

        if (!pointService.savePoint(point)) return ResponseEntity.badRequest().body(point);
        return ResponseEntity.ok(point);
    }

    @DeleteMapping
    @CrossOrigin
    public ResponseEntity<?> deletePoints(HttpServletRequest request) {
        String jwtToken = jwtUtils.extractJwtToken(request);
        if (jwtToken == null) return ResponseEntity.badRequest().body("Bad token");
        User user = getUserByJwtToken(jwtToken);
        return ResponseEntity.ok(pointService.deletePoints(user.getUsername()));

    }

}
