package org.apx.nb.model;

import org.apx.nb.model.enums.ContactType;
import org.apx.nb.model.listener.BaseEntityListener;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by oleg on 10/23/14.
 */

@Entity
@Table(name = "contacts")
@EntityListeners({BaseEntityListener.class})
@Access(AccessType.FIELD)
public class Contact implements IEntity {

    @Id
    String id = UUID.randomUUID().toString();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    Client client;

    @Column(name = "contact")
    String contact;

    @Column(name = "type",length = 36)
    @Enumerated(EnumType.STRING)
    ContactType type;

    @Column(name = "main")
    Boolean main = false;

    @Column(name = "deleted")
    Boolean deleted = false;

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


    public Boolean getMain() {
        return main;
    }

    public void setMain(Boolean main) {
        this.main = main;
    }

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
        return id != null ? id.hashCode() : 0;
    }
}
