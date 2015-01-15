package org.apx.nova.model;

import java.io.Serializable;

/**
 * Created by oleg on 10/23/14.
 */
public interface IEntity extends Serializable {

    String getId();
    void setId(String id);

}
