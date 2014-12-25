package org.apx.nb.model;

import org.apx.nb.model.enums.AreaType;
import org.springframework.data.rest.core.annotation.RestResource;

import javax.persistence.*;
import java.util.*;

/**
 * Created by oleg on 10/20/14.
 */
@Entity
@Table(name = "units")
@Access(AccessType.PROPERTY)
public class Unit extends BaseObject {

    Section section;

    UnitType type;

    String number;

    String structuralNumber;

    String postalNumber;

    int floor;

    int span;

    int roomCount;

    Boolean hasClient;

    Map<AreaType, Double> areas;

    Double startingPrice;

    Client client;

    List<Price> prices;

    List<Payment> payments;

    boolean booked;

    public Unit() {
        areas = new HashMap<AreaType, Double>();
        prices = new ArrayList<>();
        payments = new ArrayList<>();
        hasClient = false;
    }

    @ManyToOne(targetEntity = Section.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "section_id", referencedColumnName = "id")
    public Section getSection() {
        return section;
    }

    @RestResource(exported = false)
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "type_id")
    public UnitType getType() {
        return type;
    }

    @Column(length = 10)
    public String getNumber() {
        return number;
    }

    @Column(name = "structural_number", length = 10)
    public String getStructuralNumber() {
        return structuralNumber;
    }

    @Column(name = "postal_number", length = 10)
    public String getPostalNumber() {
        return postalNumber;
    }

    @Column
    public int getFloor() {
        return floor;
    }

    @Column
    public int getSpan() {
        return span;
    }

    @Column(name = "room_count")
    public int getRoomCount() {
        return roomCount;
    }

    @ElementCollection(targetClass = Double.class)
    @CollectionTable(name = "unit_areas")
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "area")
    public Map<AreaType, Double> getAreas() {
        return areas;
    }

    @Column(name = "starting_price")
    public Double getStartingPrice() {
        return startingPrice;
    }

    @ManyToOne
    @JoinColumn(name = "client_id")
    public Client getClient() {
        return client;
    }

    @Column
    public boolean isBooked() {
        return booked;
    }


    @OneToMany(mappedBy = "parentUnit")
    public List<Price> getPrices() {
        return prices;
    }

    @OneToMany(mappedBy = "unit")
    public List<Payment> getPayments() {
        return payments;
    }

    @Column(name = "has_client")
    public Boolean getHasClient() {
        return hasClient;
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

    public void setPrices(List<Price> prices) {
        this.prices = prices;
    }

    public void setPayments(List<Payment> payments) {
        this.payments = payments;
    }

    public void setHasClient(Boolean hasClient) {
        this.hasClient = hasClient;
    }
}
