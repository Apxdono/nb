package org.apx.nova.reports;

import org.apx.nova.model.*;
import org.apx.nova.model.enums.AreaType;
import org.apx.nova.model.enums.ContactType;
import org.apx.nova.repo.UnitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
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
        Unit unit = unitRepo.findOne(((String[]) arguments.get("unit"))[0]);
        if(unit != null && unit.getClient()!= null){
            SimpleDateFormat ds = new SimpleDateFormat("dd.MM.yyyy");
            result.put("act_num",((String[]) arguments.get("number"))[0]);
            result.put("act_date", ds.format(new Date()));


            PrivateClient client = (PrivateClient) unit.getClient();
            Section section = unit.getSection();
            House house = section.getHouse();
            Cooperative coop = house.getCooperative();

            result.put("coop_name","\""+coop.getInternalName()+"\"");
            result.put("object_org","\""+coop.getInternalName()+"\"");
            result.put("coop_ruk",coop.getChairman());
            result.put("object_org_ruk",coop.getChairman());

            result.put("client_name", client.getName());
            result.put("pasport_num", client.getPassportData());
            result.put("pasport_vidan", client.getPassportGiven());
            result.put("client_address", client.getRegistration());
            result.put("inn", client.getInn());

            result.put("object_type", unit.getType().getName());
            result.put("object_parad", section.getStructuralNumber()+"");
            result.put("object_num", unit.getPostalNumber()+"");
            result.put("object_square", unit.getAreas().get(AreaType.WHOLE)+"");
            result.put("object_street", house.getAddress()+" "+house.getStructuralNumber()+"");
            result.put("object_num_str", house.getStructuralNumber()+"");

            result.put("_filename","Акт приёма - передачи №"+result.get("act_num")+" "+client.getName());


        }

        return result;
    }
}
