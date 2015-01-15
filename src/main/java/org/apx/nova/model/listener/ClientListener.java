package org.apx.nova.model.listener;

import org.apx.nova.model.Client;
import org.apx.nova.model.Contact;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Iterator;

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
            Iterator<Contact> it = cl.getContacts().iterator();
            while (it.hasNext()){
                Contact contact = it.next();
                if(contact.getClient() == null) {
                    contact.setClient(cl);
                }
            }
        }
    }
}
