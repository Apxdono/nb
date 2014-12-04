package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;
import org.apx.nb.model.listener.ClientListener;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "clients")
@EntityListeners({ClientListener.class})
@Inheritance(strategy = InheritanceType.JOINED)
@Access(AccessType.FIELD)
public class Client extends BaseObject {

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    ClientType type;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL, mappedBy = "client", targetEntity = Contact.class , orphanRemoval = true)
    Set<Contact> contacts = new HashSet<>();


    public ClientType getType() {
        return type;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setType(ClientType type) {
        this.type = type;
    }

    public void setContacts(Set<Contact> contacts) {
        if(this.contacts != null){
            this.contacts.clear();
            this.contacts.addAll(contacts);
        } else {
            this.contacts = contacts;
        }

    }
}
