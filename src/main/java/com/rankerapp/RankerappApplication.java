package com.rankerapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class RankerappApplication {

	public static void main(String[] args) {
		SpringApplication.run(RankerappApplication.class, args);
	}

}
