package org.apx.nb.model.listener;

import org.apx.nb.model.Client;
import org.apx.nb.model.Contact;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

/**
 * Created by oleg on 03.12.2014.
 */
public class ClientListener {

    @PrePersist
    public void prePersist(Client cl){
        processContacts(cl);
    }

    @PreUpdate
    public void preUpdate(Client cl){
        processContacts(cl);
    }

    protected void processContacts(Client cl){
        if(cl.getContacts() != null){
            for (Contact contact : cl.getContacts()) {
                if(contact.getClient() == null){
                    contact.setClient(cl);
                } else if(contact.getDeleted()) {
                    contact.setClient(null);
                }

            }
        }
    }
}
