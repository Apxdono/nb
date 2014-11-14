package org.apx.nb.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "houses")
@Access(AccessType.FIELD)
public class House extends BaseObject {

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Cooperative.class)
    @JoinColumn(name = "coop_id")
    Cooperative cooperative;

    @Column(length = 512)
    String address;

    @Column(length = 10)
    String structuralNumber;

    @Column(length = 10)
    String zipCode;

    @OneToMany(targetEntity = Section.class,mappedBy = "house")
    List<Section> sections;

    public House(){
        sections = new ArrayList<Section>();
    }


    public Cooperative getCooperative() {
        return cooperative;
    }

    public String getAddress() {
        return address;
    }

    public String getStructuralNumber() {
        return structuralNumber;
    }

    public String getZipCode() {
        return zipCode;
    }

    public List<Section> getSections() {
        return sections;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setStructuralNumber(String structuralNumber) {
        this.structuralNumber = structuralNumber;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public void setSections(List<Section> sections) {
        this.sections = sections;
    }
}
