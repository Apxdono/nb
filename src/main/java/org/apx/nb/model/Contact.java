package org.apx.nb.model;

import org.apx.nb.model.enums.ContactType;
import org.apx.nb.model.listener.BaseEntityListener;

import javax.persistence.*;

/**
 * Created by oleg on 10/23/14.
 */

@Entity
@Table(name = "contacts")
@EntityListeners({BaseEntityListener.class})
@Access(AccessType.FIELD)
public class Contact implements IEntity {

    @Id
    String id;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    Client client;

    @Column(name = "contact")
    String contact;

    @Column(name = "type",length = 36)
    @Enumerated(EnumType.STRING)
    ContactType type;

    public String getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getContact() {
        return contact;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }


    public ContactType getType() {
        return type;
    }

    public void setType(ContactType type) {
        this.type = type;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Contact contact = (Contact) o;

        if (!id.equals(contact.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }
}
