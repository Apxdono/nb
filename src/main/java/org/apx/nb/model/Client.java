package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "clients")
@Inheritance(strategy = InheritanceType.JOINED)
@Access(AccessType.FIELD)
public class Client extends BaseObject {

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    ClientType type;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "client", targetEntity = Contact.class)
    Set<Contact> contacts;


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
        this.contacts = contacts;
    }
}
