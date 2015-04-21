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
public class Page4ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page4.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page4";
    }

    @Override
    public InputStream getOwningTemplate() {
        return getReport(REPORT_FILENAME);
    }

    @Override
    public Map buildParameters(Map arguments) {
        Map result = new HashMap();
        Unit unit = unitRepo.findOne(((String[]) arguments.get("unit"))[0]);
        if(unit != null && unit.getClient() != null){
            PrivateClient client = (PrivateClient) unit.getClient();
            Section section = unit.getSection();
            House house = section.getHouse();
            Cooperative coop = house.getCooperative();
            result.put("object_org","\""+coop.getName()+"\"");
            result.put("coop_ruk",coop.getChairman());
            result.put("from", client.getName());
            result.put("client_name", client.getName());
            result.put("pasport_num", client.getPassportData());
            result.put("pasport_vidan", client.getPassportGiven());
            result.put("client_address", client.getRegistration());
            result.put("inn", client.getInn());
            result.put("object_type", unit.getType().getName());
            result.put("object_num", unit.getPostalNumber());
            result.put("object_square", unit.getAreas().get(AreaType.WHOLE));
            result.put("object_address", house.getAddress()+" "+house.getStructuralNumber()+"");
        }


        return result;
    }
}
