package org.apx.nova.model;

import org.apx.nova.model.enums.ContactType;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by oleg on 10/23/14.
 */

@Entity
@Table(name = "contacts")
@Access(AccessType.PROPERTY)
public class Contact implements IEntity {

    String id = UUID.randomUUID().toString();


    Client client;

    String contact;


    ContactType type;

    Boolean main = false;

    Boolean deleted = false;

    @Id
    public String getId() {
        return id;
    }

    @ManyToOne(cascade = CascadeType.ALL, targetEntity = Client.class)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Column(name = "contact")
    public String getContact() {
        return contact;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    @Column(name = "type",length = 36)
    @Enumerated(EnumType.STRING)
    public ContactType getType() {
        return type;
    }

    public void setType(ContactType type) {
        this.type = type;
    }

    @Column(name = "main")
    public Boolean getMain() {
        return main;
    }

    public void setMain(Boolean main) {
        this.main = main;
    }

    @Column(name = "deleted")
    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
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
        return id != null ? id.hashCode()+deleted.hashCode() : 0;
    }
}
