package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;

import javax.persistence.*;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "companies")
@Access(AccessType.PROPERTY)
@DiscriminatorValue("company")
public class Company extends Client {

    String president;

    String legalAddress;

    public Company(){
        type = ClientType.COMPANY;
    }

    @Column
    public String getPresident() {
        return president;
    }

    @Column(name = "legal_address", length = 512)
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
