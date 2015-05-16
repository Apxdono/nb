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
public class Page6ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page6.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page6";
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
            result.put("coop_name","\""+coop.getInternalName()+"\"");
            result.put("coop_ruk",coop.getChairman());
            result.put("coop_adr_street_ua",coop.getAddress());
            result.put("coop_adr_street_ru",coop.getAddress());
            result.put("coop_tel",coop.getPhone());
            result.put("client_name", client.getName());
            result.put("resh_num", ((String[])arguments.get("decno"))[0]);
            result.put("object_type", unit.getType().getInternalName());
            result.put("object_num", unit.getPostalNumber()+"");
            result.put("object_square", unit.getAreas().get(AreaType.WHOLE)+"");
            result.put("object_level", unit.getFloor()+"");
            result.put("object_address", house.getAddress() + " " +house.getStructuralNumber()+"");
            result.put("_filename","Справка №"+result.get("resh_num")+" "+client.getName());

        }

        return result;
    }
}
