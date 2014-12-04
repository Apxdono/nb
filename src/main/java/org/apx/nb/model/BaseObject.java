package org.apx.nb.model;

import org.apx.nb.model.listener.BaseEntityListener;

import javax.persistence.*;
import java.util.UUID;

/**
 * Created by oleg on 30.09.2014.
 */

@MappedSuperclass
@EntityListeners({BaseEntityListener.class})
@Access(AccessType.FIELD)
public abstract class BaseObject implements IEntity {

    @Id
    @Column(length = 36)
    String id;

    @Column
    String name;

    @Column(name = "internal_name")
    String internalName;

    @Version
    Long version;

    @Column
    Boolean active;

    public BaseObject(){
        id = "";
        name = "";
        internalName = "";
        version = 0L;
        active = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInternalName() {
        return internalName;
    }

    public void setInternalName(String internalName) {
        this.internalName = internalName;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BaseObject)) return false;

        BaseObject that = (BaseObject) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "BaseObject{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", internalName='" + internalName + '\'' +
                ", version=" + version +
                ", active=" + active +
                '}';
    }
}
