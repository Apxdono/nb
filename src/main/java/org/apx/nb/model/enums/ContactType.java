package org.apx.nb.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by oleg on 10/23/14.
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ContactType {

    CONTACT_PHONE("Контактный телефон",""),
    MOBILE_PHONE("Мобильный телефон",""),
    HOME_PHONE("Домашний телефон",""),
    EMAIL("Электронная почта","email"),
    SKYPE("Skype",""),
    FAX("Факс","");

    final String label;
    final String regex;

    ContactType(String m, String r){
        label = m;
        regex = r;
    }

    public String getName(){
        return this.name();
    }

    public String getLabel() {
        return label;
    }

    public String getRegex() {
        return regex;
    }

    @JsonCreator
    public ContactType create(@JsonProperty("name") String name){

        return ContactType.valueOf(name);
    }

}
