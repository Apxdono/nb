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
@Access(AccessType.PROPERTY)
public class Cooperative extends BaseObject {

    String address;

    String requisits;

    String chairman;


    List<String> curators;

    public Cooperative() {
        curators = new ArrayList<String>();
    }

    @Column(length = 512)
    public String getAddress() {
        return address;
    }

    @Column(length = 512)
    public String getRequisits() {
        return requisits;
    }

    @Column
    public String getChairman() {
        return chairman;
    }

    @ElementCollection(fetch = FetchType.EAGER,targetClass = String.class)
    @CollectionTable(name = "coop_curators")
    @Column(name = "curator")
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
