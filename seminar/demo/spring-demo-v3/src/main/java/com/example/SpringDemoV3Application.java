package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
@EnableJpaRepositories
@EntityScan("com.example.*")
@ComponentScan(basePackages = {"com.example.*"})
@SpringBootApplication
public class SpringDemoV3Application {
    public static void main(String[] args) {
        SpringApplication.run(SpringDemoV3Application.class, args);
    }

}
