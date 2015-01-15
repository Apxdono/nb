package org.apx.nova.model;

import org.apx.nova.model.listener.BaseEntityListener;

import javax.persistence.*;

/**
 * Created by oleg on 30.09.2014.
 */

@MappedSuperclass
@EntityListeners({BaseEntityListener.class})
@Access(AccessType.PROPERTY)
public abstract class BaseObject implements IEntity {


    String id;

    String name;

    String internalName;

    Long version;

    Boolean active;

    public BaseObject(){
        id = "";
        name = "";
        internalName = "";
        version = 0L;
        active = true;
    }

    @Id
    @Column(length = 36)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Column
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "internal_name")
    public String getInternalName() {
        return internalName;
    }

    public void setInternalName(String internalName) {
        this.internalName = internalName;
    }

    @Version
    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @Column
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
