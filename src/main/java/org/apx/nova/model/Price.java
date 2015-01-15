package org.apx.nova.model;

import javax.persistence.*;
import java.util.Calendar;

/**
 * Created by oleg on 12.12.2014.
 */
@Entity
@Table(name = "prices")
public class Price extends BaseObject {

    Calendar startDate;
    Calendar endDate;
    Double value;
    Unit parentUnit;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    public Calendar getStartDate() {
        return startDate;
    }

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "end_date")
    public Calendar getEndDate() {
        return endDate;
    }

    @Column(name = "value")
    public Double getValue() {
        return value;
    }

    @ManyToOne
    @JoinColumn(name = "parent_unit_id")
    public Unit getParentUnit() {
        return parentUnit;
    }

    public void setParentUnit(Unit parentUnit) {
        this.parentUnit = parentUnit;
    }

    public void setStartDate(Calendar startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Calendar endDate) {
        this.endDate = endDate;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
