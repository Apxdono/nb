package org.apx.nova.model.listener;

import org.apx.nova.model.Contact;

import javax.persistence.PreUpdate;

/**
 * Created by oleg on 04.12.2014.
 */
public class ContactListener {

    @PreUpdate
    public void preUpdate(Contact c){
    }
}
