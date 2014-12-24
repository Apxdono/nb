package org.apx.nb.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "houses")
@Access(AccessType.PROPERTY)
public class House extends BaseObject {


    Cooperative cooperative;


    String address;


    String structuralNumber;


    String zipCode;


    List<Section> sections;

    public House(){
        sections = new ArrayList<Section>();
    }

    @ManyToOne(fetch = FetchType.EAGER, targetEntity = Cooperative.class)
    @JoinColumn(name = "coop_id")
    public Cooperative getCooperative() {
        return cooperative;
    }

    @Column(length = 512)
    public String getAddress() {
        return address;
    }

    @Column(length = 10,name = "structural_number")
    public String getStructuralNumber() {
        return structuralNumber;
    }

    @Column(length = 10,name = "zip_code")
    public String getZipCode() {
        return zipCode;
    }

    @OneToMany(targetEntity = Section.class,mappedBy = "house")
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
