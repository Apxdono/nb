package org.apx.nb.model;

import com.fasterxml.jackson.annotation.JsonView;
import org.apx.nb.model.enums.ClientType;
import org.apx.nb.model.listener.ClientListener;
import org.eclipse.persistence.annotations.PrivateOwned;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "clients")
@EntityListeners({ClientListener.class})
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "dtype",discriminatorType = DiscriminatorType.STRING)
@DiscriminatorValue("client")
@Access(AccessType.PROPERTY)
public class Client extends BaseObject {

    ClientType type;

    List<Contact> contacts = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    public ClientType getType() {
        return type;
    }

    @JsonView(Views.Deep.class)
    @RestResource(exported = false)
    @PrivateOwned
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, mappedBy = "client", orphanRemoval = true)
    public List<Contact> getContacts() {
        return contacts;
    }

    public void setType(ClientType type) {
        this.type = type;
    }

    public void setContacts(List<Contact> contacts) {
//        if(this.contacts != null){
//            this.contacts.clear();
//            this.contacts.addAll(contacts);
//        } else {
            this.contacts = contacts;
//        }
//
    }
}
