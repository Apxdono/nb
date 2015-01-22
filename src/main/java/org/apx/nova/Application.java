package org.apx.nova;

import org.apx.nova.servlet.listener.SessionListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.embedded.ServletListenerRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.List;

/**
 * Created by oleg on 1/8/15.
 */
@Configuration
@ComponentScan
@EnableJpaRepositories
@Import({RestDataConfig.class,DatabaseConfig.class,Security.class})
//@ImportResource(value = "classpath:security.xml")
@EnableAutoConfiguration
public class Application{

    static ApplicationContext ctx;

    public static ApplicationContext context(){
        return ctx;
    }

    @Value("${nova.session.timeout}")
    private int timeout;

    @Autowired
    public void setContext(ApplicationContext context) {
        ctx = context;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ServletListenerRegistrationBean<SessionListener> sessionTimeoutListener(){
        return new ServletListenerRegistrationBean<SessionListener>(new SessionListener(timeout));
    }

}
