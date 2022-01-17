package com.example.lab4.models;

public class BasicPoint {
    protected double x;
    protected double y;
    protected double r;
    protected boolean hit;

    public void validate() {
        hit = isRectangleHit() || isCircleHit() || isTriangleHit();
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

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }
}
