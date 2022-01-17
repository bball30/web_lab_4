package com.example.lab4.models;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "point_table")
public class Point extends BasicPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double x;
    private double y;
    private double r;
    private String time;
    private boolean hit;
    private String owner;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    /**public Point(double x, double y, double r, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.user = user;
        validate();
        this.owner = user.getUsername();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        time = format.format(date);
    }**/

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User initiator) {
        this.user = initiator;
    }

    public String getTime() {
        return time;
    }

    public String getOwner() {
        return owner;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    private boolean isRectangleHit() {
        return x >= 0 && y <= 0 && x <= r  && y >= -r;
    }

    private boolean isCircleHit() {
        return x <= 0 && y >= 0 && (x*x + y*y <= r*r/4);
    }

    private boolean isTriangleHit() {
        return x <= 0 && y <= 0 && y >= -x - r / 2;
    }

    public void validate() {
        owner = user.getUsername();
        //SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //Date date = new Date();
        //time = format.format(date);
        hit = isRectangleHit() || isCircleHit() || isTriangleHit();
    }
}
