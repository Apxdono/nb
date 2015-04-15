package org.apx.nova.reports;

import org.apx.nova.model.*;
import org.apx.nova.model.enums.AreaType;
import org.apx.nova.model.enums.ContactType;
import org.apx.nova.repo.UnitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by oleg on 14.04.2015.
 */

@Component
public class Page5ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page5.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page5";
    }

    @Override
    public InputStream getOwningTemplate() {
        return getReport(REPORT_FILENAME);
    }

    @Override
    public Map buildParameters(Map arguments) {
        Map result = new HashMap();
        if(false){
            Unit unit = unitRepo.findOne(((String[]) arguments.get("unit"))[0]);
            PrivateClient client = (PrivateClient) unit.getClient();
            Section section = unit.getSection();
            House house = section.getHouse();
            Cooperative coop = house.getCooperative();
            result.put("coop_name","\""+coop.getName()+"\"");
            result.put("coop_manager",coop.getChairman());
            result.put("from", client.getName());
            result.put("inn", client.getInn());
            result.put("address", client.getRegistration());
            result.put("pasport", client.getPassportData());
            Contact contact = null;
            for (Contact c : client.getContacts()) {
                if( c.getDeleted().equals(Boolean.FALSE) && ContactType.CONTACT_PHONE.equals(c.getType())){
                    contact = c;
                    break;
                }
            }
            result.put("telephone", contact != null? contact.getContact() : "<Телефон не указан>");
            result.put("kv_num", unit.getNumber()+"");
            result.put("kv_square", unit.getAreas().get(AreaType.WHOLE)+"");
            result.put("kv_level", unit.getFloor()+"");
            result.put("kv_parad", section.getPostalNumber()+"");
            result.put("kv_house", house.getAddress() + " " +house.getStructuralNumber()+"");

        }

        return result;
    }
}