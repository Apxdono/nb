package org.apx.nb.model;

import org.apx.nb.model.enums.ClientType;

import javax.persistence.*;

/**
 * Created by oleg on 10/23/14.
 */
@Entity
@Table(name = "private_clients")
@DiscriminatorValue("privateclient")
@Access(AccessType.PROPERTY)
public class PrivateClient extends Client {

    String inn;

    String passportData;

    String registration;

    public PrivateClient(){
        type = ClientType.PRIVATE;
    }

    @Column(length = 14)
    public String getInn() {
        return inn;
    }

    @Column(name = "passport_data",length = 512)
    public String getPassportData() {
        return passportData;
    }

    @Column(name = "registration",length = 512)
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
