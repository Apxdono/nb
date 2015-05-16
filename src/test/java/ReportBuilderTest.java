import net.sf.jasperreports.engine.JRException;
import org.apx.nova.Application;
import org.apx.nova.DatabaseConfig;
import org.apx.nova.reports.ReportProcessor;
import org.apx.nova.reports.ResultReport;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.support.AnnotationConfigContextLoader;

import java.util.HashMap;

/**
 * Created by oleg on 14.04.2015.
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration(classes= {TestConfig.class,DatabaseConfig.class}, loader=AnnotationConfigContextLoader.class)

public class ReportBuilderTest {

    @Autowired
    ReportProcessor processor;


//    @Test
    public void simpleTest(){
        try {
            ResultReport result = processor.processReport("page2",new HashMap());
            System.out.println(new String(result.getBinData()));
        } catch (JRException e) {
            e.printStackTrace();
        }
    }
}
