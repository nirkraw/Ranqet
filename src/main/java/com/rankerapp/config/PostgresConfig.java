package com.rankerapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories
public class PostgresConfig {

    @Autowired
    private Environment env;

    @Value("${ranker.environment:development}")
    private String environmentName;

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        if (environmentName.equalsIgnoreCase("production")) {
            dataSource.setUrl(env.getProperty("spring.datasource.url"));
            dataSource.setUsername(env.getProperty("spring.datasource.username"));
            dataSource.setPassword(env.getProperty("spring.datasource.password"));
        } else {
            dataSource.setUrl("jdbc:postgresql://localhost:5432/ranker");
            dataSource.setUsername("rankeradmin");
            dataSource.setPassword("rankerbaby");
        }

        return dataSource;
    }

}

