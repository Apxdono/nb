package org.apx.nova.rest;

import org.apx.nova.model.enums.ContactType;
import org.apx.nova.model.security.User;
import org.apx.nova.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;

/**
 * Created by oleg on 24.11.2014.
 */
@RestController
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionBean implements Serializable {

    @Autowired
    UserRepo repo;

    User user;

    @PostConstruct
    public void init() {

    }

    @RequestMapping("/user/get")
    public User getUrer(HttpServletResponse response) throws IOException {
        return fetchUser(response);
    }

    @RequestMapping("/rest/api/contacttypes")
    public List<ContactType> contactTypes(){

        return Arrays.asList(ContactType.values());
    }

    protected User fetchUser(HttpServletResponse response) throws IOException {
        if (user == null) {

            SecurityContext ctx = SecurityContextHolder.getContext();
            if (!ctx.getAuthentication().isAuthenticated()) {
                user = null;
                throw new BadCredentialsException("Login required");
            } else {
                user = repo.findOne(ctx.getAuthentication().getName());
                if(user==null){
                    throw new BadCredentialsException("Login required");
                }
            }
        }
        return user;
    }
}
