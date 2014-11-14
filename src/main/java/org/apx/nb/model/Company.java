package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;

import javax.persistence.*;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "companies")
@Access(AccessType.FIELD)
public class Company extends Client {

    @Column
    String president;

    @Column(name = "legal_address", length = 512)
    String legalAddress;

    public Company(){
        type = ClientType.COMPANY;
    }

    public String getPresident() {
        return president;
    }

    public String getLegalAddress() {
        return legalAddress;
    }

    public void setPresident(String president) {
        this.president = president;
    }

    public void setLegalAddress(String legalAddress) {
        this.legalAddress = legalAddress;
    }
}
