package org.apx.nova.reports;

import org.apx.nova.model.*;
import org.apx.nova.model.enums.AreaType;
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
public class Page8ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page8.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page8";
    }

    @Override
    public InputStream getOwningTemplate() {
        return getReport(REPORT_FILENAME);
    }

    @Override
    public Map buildParameters(Map arguments) {
        Map result = new HashMap();

        Unit unit = unitRepo.findOne(((String[]) arguments.get("unit"))[0]);
        if(unit != null && unit.getClient()!= null) {

            PrivateClient client = (PrivateClient) unit.getClient();
            Section section = unit.getSection();
            House house = section.getHouse();
            Cooperative coop = house.getCooperative();

            result.put("coop_name", "\"" + coop.getInternalName() + "\"");
            result.put("coop_ruk", coop.getChairman());

            result.put("inn", client.getInn());
            result.put("_filename","Свидетельство "+client.getName());


        }


        return result;
    }
}
