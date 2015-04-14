package org.apx.nova.reports;

import java.io.InputStream;
import java.util.Map;

/**
 * Created by oleg on 14.04.2015.
 */
public interface ReportParametersBuilder {
    String getOwningTemplateName();
    InputStream getOwningTemplate();
    Map buildParameters(Map arguments);
}
