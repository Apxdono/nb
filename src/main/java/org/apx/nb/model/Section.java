package org.apx.nb.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "sections")
@Access(AccessType.PROPERTY)
public class Section extends BaseObject {


    House house;


    int floorCount =0;


    String structuralNumber;


    String postalNumber;

    List<Unit> units;

    public Section(){
        units = new ArrayList<Unit>();
    }

    @ManyToOne
    @JoinColumn(name = "house_id")
    public House getHouse() {
        return house;
    }

    @Column(name = "floor_count")
    public int getFloorCount() {
        return floorCount;
    }

    @Column(name = "structural_number",length = 10)
    public String getStructuralNumber() {
        return structuralNumber;
    }

    @Column(name = "postal_number",length = 10)
    public String getPostalNumber() {
        return postalNumber;
    }

    @OneToMany(mappedBy = "section", targetEntity = Unit.class, fetch = FetchType.LAZY)
    public List<Unit> getUnits() {
        return units;
    }

    public void setHouse(House house) {
        this.house = house;
    }

    public void setFloorCount(int floorCount) {
        this.floorCount = floorCount;
    }

    public void setStructuralNumber(String structuralNumber) {
        this.structuralNumber = structuralNumber;
    }

    public void setPostalNumber(String postalNumber) {
        this.postalNumber = postalNumber;
    }

    public void setUnits(List<Unit> units) {
        this.units = units;
    }
}
