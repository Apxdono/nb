package org.apx.nova.reports;

import com.sun.xml.internal.messaging.saaj.util.ByteOutputStream;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import net.sf.jasperreports.export.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by oleg on 14.04.2015.
 */

@Service
public class ReportProcessor {

    @Autowired
    ApplicationContext context;

    public byte[] processReport(String reportName,Map args) throws JRException {
        ReportParametersBuilder rpb = null;
        Map<String, ReportParametersBuilder> builderMap = context.getBeansOfType(ReportParametersBuilder.class);

        for (Map.Entry<String, ReportParametersBuilder> builderEntry : builderMap.entrySet()) {
            if(builderEntry.getValue().getOwningTemplateName().equals(reportName)){
                rpb = builderEntry.getValue();
                break;
            }
        }

        if(rpb == null) return null;

        JasperReport jr = JasperCompileManager.compileReport(rpb.getOwningTemplate());

        JasperPrint result = JasperFillManager.fillReport(jr,rpb.buildParameters(args));

        JRDocxExporter exporter = new JRDocxExporter();
        ByteOutputStream stream = new ByteOutputStream();
        exporter.setExporterInput(new SimpleExporterInput(result));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));
        exporter.exportReport();

        return stream.getBytes();
    }

}
