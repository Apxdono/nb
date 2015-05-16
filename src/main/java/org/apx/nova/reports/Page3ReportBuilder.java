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
public class Page3ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page3.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page3";
    }

    @Override
    public InputStream getOwningTemplate() {
        return getReport(REPORT_FILENAME);
    }

    @Override
    public Map buildParameters(Map arguments) {
        Map result = new HashMap();
        String protoNum =  ((String[])arguments.get("number"))[0];
        Unit unit = unitRepo.findOne(((String[]) arguments.get("unit"))[0]);
        if(unit != null && unit.getClient() != null){
            result.put("protocol_number",protoNum);
            PrivateClient client = (PrivateClient) unit.getClient();
            Section section = unit.getSection();
            House house = section.getHouse();
            Cooperative coop = house.getCooperative();
            result.put("coop_name","\""+coop.getInternalName()+"\"");
            result.put("coop_ruk",coop.getChairman());
            result.put("from", client.getName());
            result.put("client_name", client.getName());
            result.put("pasport_num", client.getPassportData());
            result.put("pasport_vidan", client.getPassportGiven());
            result.put("client_address", client.getRegistration());
            result.put("inn", client.getInn());
            result.put("_filename","Протокол №"+result.get("protocol_number")+" "+client.getName());

        }

        return result;
    }
}
