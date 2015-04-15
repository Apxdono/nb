package org.apx.nova.reports;

import org.apx.nova.model.*;
import org.apx.nova.model.enums.AreaType;
import org.apx.nova.model.enums.ContactType;
import org.apx.nova.repo.UnitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by oleg on 14.04.2015.
 */

@Component
public class Page1ReportBuilder extends AbstractReportBuilder {

    static final String REPORT_FILENAME = "page1.jrxml";

    @Autowired
    UnitRepo unitRepo;

    @Override
    public String getOwningTemplateName() {
        return "page1";
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
            result.put("client_name", client.getName());
            Contact contact = null;
            for (Contact c : client.getContacts()) {
                if( c.getDeleted().equals(Boolean.FALSE) && ContactType.CONTACT_PHONE.equals(c.getType())){
                    contact = c;
                    break;
                }
            }
            result.put("client_tel", contact != null? contact.getContact() : "<Телефон не указан>");

            result.put("object_num",house.getAddress()+" "+house.getStructuralNumber()+"");
            result.put("object_kv", unit.getStructuralNumber()+"" );
            result.put("object_room_num", unit.getRoomCount()+"");
            result.put("object_square", unit.getAreas().get(AreaType.WHOLE)+"");
            result.put("object_level", unit.getFloor()+"");
            result.put("object_sec", section.getPostalNumber()+"");
            result.put("object_cost",unit.getStartingPrice()+"");

            result.put("year", new SimpleDateFormat("yyyy").format(new Date()));

            List<Price> prices = unit.getPrices();
            Price latest = null;
            Calendar current = Calendar.getInstance();
            if(prices != null && prices.size() > 0){
                if(prices.size() > 1) {
                    for (Price price : prices) {
                        if( current.compareTo(price.getStartDate()) > -1  && current.compareTo(price.getEndDate()) < 1  ){
                            latest = price;
                            break;
                        }
                    }
                }
            }

            result.put("object_down_pay_share",(unit.getStartingPrice()*0.05)+"");
            result.put("object_cost_m2",(latest.getValue()+""));



        }

        return result;
    }
}
