package org.apx.nb.model;

import org.apx.nb.model.enums.AreaType;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "units")
@Access(AccessType.FIELD)
public class Unit extends BaseObject {

    @ManyToOne(targetEntity = Section.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "section_id", referencedColumnName = "id")
    Section section;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    UnitType type;

    @Column(length = 10)
    String number;

    @Column(name = "structural_number", length = 10)
    String structuralNumber;

    @Column(name = "postal_number", length = 10)
    String postalNumber;

    @Column
    int floor;

    @Column
    int span;

    @Column
    int roomCount;

    @ElementCollection(targetClass = Double.class)
    @CollectionTable(name = "unit_areas")
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "area")
    Map<AreaType,Double> areas;

    @Column(name = "starting_price")
    Double startingPrice;

    @ManyToOne
    @JoinColumn(name = "client_id")
    Client client;

    @Column
    boolean booked;

    public Unit(){
        areas = new HashMap<AreaType, Double>();
    }


    public Section getSection() {
        return section;
    }

    public UnitType getType() {
        return type;
    }

    public String getNumber() {
        return number;
    }

    public String getStructuralNumber() {
        return structuralNumber;
    }

    public String getPostalNumber() {
        return postalNumber;
    }

    public int getFloor() {
        return floor;
    }

    public int getSpan() {
        return span;
    }

    public int getRoomCount() {
        return roomCount;
    }

    public Map<AreaType, Double> getAreas() {
        return areas;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public Client getClient() {
        return client;
    }

    public boolean isBooked() {
        return booked;
    }

    public void setSection(Section section) {
        this.section = section;
    }

    public void setType(UnitType type) {
        this.type = type;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setStructuralNumber(String structuralNumber) {
        this.structuralNumber = structuralNumber;
    }

    public void setPostalNumber(String postalNumber) {
        this.postalNumber = postalNumber;
    }

    public void setFloor(int floor) {
        this.floor = floor;
    }

    public void setSpan(int span) {
        this.span = span;
    }

    public void setRoomCount(int roomCount) {
        this.roomCount = roomCount;
    }

    public void setAreas(Map<AreaType, Double> areas) {
        this.areas = areas;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setBooked(boolean booked) {
        this.booked = booked;
    }
}
