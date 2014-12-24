package org.apx.nb.model.listener;

import org.apx.nb.model.IEntity;

import javax.persistence.PrePersist;
import java.util.UUID;

/**
 * Created by oleg on 30.09.2014.
 */
public class BaseEntityListener {

    @PrePersist
    public void prePersist(IEntity bo){
        if(bo.getId() == null || bo.getId().equals("")) bo.setId(UUID.randomUUID().toString());
    }
}
