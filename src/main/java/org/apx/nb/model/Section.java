package org.apx.nb.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "sections")
@Access(AccessType.FIELD)
public class Section extends BaseObject {

    @ManyToOne
    @JoinColumn(name = "house_id")
    House house;

    @Column(name = "floor_count")
    int floorCount =0;

    @Column(name = "structural_number",length = 10)
    String structuralNumber;

    @Column(name = "postal_number",length = 10)
    String postalNumber;

    @OneToMany(mappedBy = "section", targetEntity = Unit.class, fetch = FetchType.LAZY)
    List<Unit> units;

    public Section(){
        units = new ArrayList<Unit>();
    }


    public House getHouse() {
        return house;
    }

    public int getFloorCount() {
        return floorCount;
    }

    public String getStructuralNumber() {
        return structuralNumber;
    }

    public String getPostalNumber() {
        return postalNumber;
    }

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
