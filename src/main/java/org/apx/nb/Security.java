package org.apx.nb;

import org.apx.nb.repo.UnitTypeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.orm.jpa.EntityManagerFactoryInfo;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import javax.persistence.EntityManager;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by oleg on 24.11.2014.
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class Security extends WebSecurityConfigurerAdapter {

    static final String USER_QUERY = "SELECT login as principal,password as credentials, enabled from users WHERE login = ?";
    static final String AUTHORITIES_QUERY = "SELECT user_id as principal, role_name as authority FROM user_roles WHERE user_id = ?";
    static final String[] UNSECURED_RESOURCE_LIST =
            new String[]{"/login", "/logout", "/resources/**", "/webjars/**",
                    "/images/**"};

    @Autowired
    EntityManager em;

 /*   @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers(UNSECURED_RESOURCE_LIST);
    }*/

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().antMatchers(UNSECURED_RESOURCE_LIST).permitAll()
                .and().formLogin().loginPage("/login.html").defaultSuccessUrl("/").permitAll()
                .and().logout().logoutUrl("/logout").permitAll()
                .and().authorizeRequests().anyRequest().authenticated();
    }
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        super.configure(auth);

        auth.jdbcAuthentication().
                passwordEncoder(new Md5PasswordEncoder()).
                dataSource(((EntityManagerFactoryInfo) em.getEntityManagerFactory()).getDataSource()).
                usersByUsernameQuery(USER_QUERY).authoritiesByUsernameQuery(AUTHORITIES_QUERY);
    }

}
