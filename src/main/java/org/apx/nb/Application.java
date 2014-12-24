package org.apx.nb;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationConfig;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by oleg on 11/12/14.
 */
@Configuration
@ComponentScan
@EnableJpaRepositories
@Import({RestDataConfig.class,Security.class})
@EnableAutoConfiguration
public class Application {

    static ApplicationContext ctx;

    public static ApplicationContext context(){
        return ctx;
    }

    @Autowired
    public void setContext(ApplicationContext context) {
        ctx = context;
    }

    @Bean
    public ObjectMapper jacksonObjectMapper(){
        ObjectMapper mapper = new ObjectMapper();
//        mapper.disable(MapperFeature.DEFAULT_VIEW_INCLUSION);
        SimpleFilterProvider fp = new SimpleFilterProvider();
        fp.addFilter("coopFilter", SimpleBeanPropertyFilter.serializeAllExcept("curators"));
        mapper.setFilters(fp);
        return mapper;
    }

    @Bean
    public SerializationConfig serializationConfig(){
        return jacksonObjectMapper().getSerializationConfig();
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}

