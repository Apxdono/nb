package org.apx.nb.main.rest;

import org.apx.nb.model.security.User;
import org.apx.nb.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.io.Serializable;

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
        fetchUser();
    }

    @RequestMapping("/user/get")
    public User getUrer() {

        return fetchUser();

    }

    protected User fetchUser() {
        if (user == null) {

            SecurityContext ctx = SecurityContextHolder.getContext();
            if (!ctx.getAuthentication().isAuthenticated()) {
                user = null;

            } else {
                user = repo.findOne(ctx.getAuthentication().getName());
            }
        }
        return user;
    }
}
