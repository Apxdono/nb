package org.apx.nb.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.MapperFeature;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleg on 10/16/14.
 */

@Entity
@Table(name = "cooperatives")
@Access(AccessType.FIELD)
public class Cooperative extends BaseObject {

    @Column(length = 512)
    String address;

    @Column(length = 512)
    String requisits;

    @Column
    String chairman;

    @ElementCollection(fetch = FetchType.EAGER,targetClass = String.class)
    @CollectionTable(name = "coop_curators")
    @Column(name = "curator")
    List<String> curators;

    public Cooperative() {
        curators = new ArrayList<String>();
    }

    public String getAddress() {
        return address;
    }

    public String getRequisits() {
        return requisits;
    }

    public String getChairman() {
        return chairman;
    }

    public List<String> getCurators() {
        return curators;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setRequisits(String requisits) {
        this.requisits = requisits;
    }

    public void setChairman(String chairman) {
        this.chairman = chairman;
    }

    public void setCurators(List<String> curators) {
        this.curators = curators;
    }
}
