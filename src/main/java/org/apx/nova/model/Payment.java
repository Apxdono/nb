package org.apx.nova.model;

import javax.persistence.*;
import java.util.Calendar;

/**
 * Created by oleg on 15.12.2014.
 */
@Entity
@Table(name = "payments")
public class Payment extends BaseObject {

    Calendar payDay;
    Double amount;
    Double payed;
    Client client;
    Unit unit;

    @Column(name = "payed")
    public Double getPayed() {
        return payed;
    }

    public void setPayed(Double payed) {
        this.payed = payed;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "pay_day")
    public Calendar getPayDay() {
        return payDay;
    }

    @Column(name = "amount")
    public Double getAmount() {
        return amount;
    }

    @ManyToOne
    @JoinColumn(name = "client_id")
    public Client getClient() {
        return client;
    }

    @ManyToOne
    @JoinColumn(name = "unit_id")
    public Unit getUnit() {
        return unit;
    }

    public void setPayDay(Calendar payDay) {
        this.payDay = payDay;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }
}
