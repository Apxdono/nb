package org.apx.nb.model.security;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;


/**
 * Created by oleg on 24.11.2014.
 */
@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = -3533190277683860377L;
    String username;
    String password;
    String login;
    Boolean enabled;
    List<String> roles;

    @Column(name = "user_name",length = 255)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "password")
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Id
    @Column(name = "login",length = 128,nullable = false)
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    @Column(name = "enabled")
    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles" , joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "login")})
    @Column(name = "role_name",length = 40)
    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User)) return false;

        User user = (User) o;

        if (!login.equals(user.login)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return login.hashCode();
    }
}
