package org.apx.nova.reports;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

/**
 * Created by oleg on 14.04.2015.
 */

public abstract class AbstractReportBuilder implements ReportParametersBuilder {

    @Autowired
    ApplicationContext ctx;

    protected InputStream getReport(String fileName){
        Resource r = ctx.getResource("classpath:reports/"+fileName);
        try {
            return r != null ? r.getInputStream() : null;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
