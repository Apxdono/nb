package org.apx.nova;

import org.apx.nova.servlet.handler.LoginErrorHandler;
import org.apx.nova.servlet.points.LFEntryPoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.filter.CharacterEncodingFilter;

import javax.servlet.Filter;
import javax.sql.DataSource;

/**
 * Created by oleg on 1/9/15.
 */
@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class Security  extends WebSecurityConfigurerAdapter {

    static final String USER_QUERY = "SELECT login as principal,password as credentials, enabled from users WHERE login = ?";
    static final String AUTHORITIES_QUERY = "SELECT user_id as principal, role_name as authority FROM user_roles WHERE user_id = ?";

    @Autowired
    DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .exceptionHandling().defaultAuthenticationEntryPointFor(entryPoint(),new AntPathRequestMatcher("/rest/api/**"))
                .and().exceptionHandling().defaultAuthenticationEntryPointFor(entryPoint(),new AntPathRequestMatcher("/user/**"))
                .and().authorizeRequests().antMatchers("/rest/api/**").authenticated()
                .and().authorizeRequests().antMatchers("/user/**").authenticated()
                .and().authorizeRequests().anyRequest().permitAll()
                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/").invalidateHttpSession(true).permitAll()
                .and().formLogin().failureHandler(loginErrorHandler()).
                passwordParameter("password").usernameParameter("username").loginProcessingUrl("/login").defaultSuccessUrl("/");

        http.addFilterBefore(characterEncodingFilter(), AnonymousAuthenticationFilter.class);
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        super.configure(auth);

        auth.jdbcAuthentication().
                passwordEncoder(new Md5PasswordEncoder()).
                dataSource(dataSource).
                usersByUsernameQuery(USER_QUERY).authoritiesByUsernameQuery(AUTHORITIES_QUERY);
    }



    @Bean
    public LoginErrorHandler loginErrorHandler(){
        return new LoginErrorHandler();
    }

    @Bean
    public Filter characterEncodingFilter(){
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("UTF-8");
        filter.setForceEncoding(true);
        return filter;
    }

    @Bean
    public LFEntryPoint entryPoint(){
        return new LFEntryPoint("/login");
    }
}
