package org.apx.nova.reports;

import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.export.ooxml.JRDocxExporter;
import net.sf.jasperreports.export.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Map;

/**
 * Created by oleg on 14.04.2015.
 */

@Service
public class ReportProcessor {

    @Autowired
    ApplicationContext context;

    public ResultReport processReport(String reportName,Map args) throws JRException {
        ReportParametersBuilder rpb = null;
        Map<String, ReportParametersBuilder> builderMap = context.getBeansOfType(ReportParametersBuilder.class);
        ResultReport rr = new ResultReport();
        for (Map.Entry<String, ReportParametersBuilder> builderEntry : builderMap.entrySet()) {
            if(builderEntry.getValue().getOwningTemplateName().equals(reportName)){
                rpb = builderEntry.getValue();
                break;
            }
        }

        if(rpb == null) return null;

        JasperReport jr = JasperCompileManager.compileReport(rpb.getOwningTemplate());
        Map m = rpb.buildParameters(args);
        JasperPrint result = JasperFillManager.fillReport(jr,m);

//        JRRtfExporter rtfExporter = new JRRtfExporter();
//        JRDocxExporter exporter = new JRDocxExporter();
        ByteArrayOutputStream stream = new ByteArrayOutputStream();

        JRAbstractExporter exporter = new JRDocxExporter();

        exporter.setExporterInput(new SimpleExporterInput(result));
        exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(stream));

//                new SimpleOutputStreamExporterOutput(stream));
        exporter.exportReport();
        rr.setBinData( stream.toByteArray());
        if(m.get("_filename") !=null){
            rr.setFileName((String) m.get("_filename"));
        }
        return rr;
    }

}
