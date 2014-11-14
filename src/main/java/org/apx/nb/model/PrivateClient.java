package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;

import javax.persistence.*;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "private_clients")
@Access(AccessType.FIELD)
public class PrivateClient extends Client {

    @Column(length = 14)
    String inn;

    @Column(name = "passport_data",length = 512)
    String passportData;

    @Column(name = "registration",length = 512)
    String registration;

    public PrivateClient(){
        type = ClientType.PRIVATE;
    }

    public String getInn() {
        return inn;
    }

    public String getPassportData() {
        return passportData;
    }

    public String getRegistration() {
        return registration;
    }

    public void setInn(String inn) {
        this.inn = inn;
    }

    public void setPassportData(String passportData) {
        this.passportData = passportData;
    }


    public void setRegistration(String registration) {
        this.registration = registration;
    }
}
