package com.webauthn4j;

import static spark.Spark.*;

public class SparkServer {
    public static void main(String[] args) {
        get("/hello", (req, res) -> "Hello world");

        get("/options", (req, res) -> {
            return "-hei";
        });
    }
}
