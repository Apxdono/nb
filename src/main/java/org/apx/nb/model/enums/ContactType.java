package org.apx.nb.model.enums;

/**
 * Created by oleg on 10/23/14.
 */
public enum ContactType {

    CONTACT_PHONE("",""),
    MOBILE_PHONE("",""),
    HOME_PHONE("",""),
    EMAIL("",""),
    SKYPE("",""),
    FAX("","");

    final String mask;
    final String regex;

    ContactType(String m, String r){
        mask = m;
        regex = r;
    }

}
