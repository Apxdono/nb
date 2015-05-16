package org.apx.nova.rest;

import com.google.common.net.MediaType;
import net.sf.jasperreports.engine.JRException;
import org.apx.nova.model.enums.ContactType;
import org.apx.nova.model.security.User;
import org.apx.nova.repo.UserRepo;
import org.apx.nova.reports.ReportProcessor;
import org.apx.nova.reports.ResultReport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by oleg on 24.11.2014.
 */
@RestController
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionBean implements Serializable {

    @Autowired
    UserRepo repo;

    User user;

    @Autowired
    ReportProcessor reportProcessor;

    @PostConstruct
    public void init() {

    }

    @RequestMapping("/user/get")
    public User getUrer(HttpServletResponse response) throws IOException {
        return fetchUser(response);
    }

    @RequestMapping("/rest/api/contacttypes")
    public List<ContactType> contactTypes(){

        return Arrays.asList(ContactType.values());
    }

    @RequestMapping(value = "/user/reports/{report}",method = RequestMethod.GET,produces = {"application/vnd.openxmlformats-officedocument.wordprocessingml.document"} )
//    @RequestMapping(value = "/user/reports/{report}",method = RequestMethod.GET,produces = {"application/rtf"} )
    @ResponseBody
    public byte[] processReport(@PathVariable("report") String report, HttpServletRequest request,HttpServletResponse  response) throws JRException, IOException {
        Map m = new HashMap(request.getParameterMap());
        ResultReport rr = reportProcessor.processReport(report,m);
        if(rr.getFileName() !=null){
            response.setHeader("Content-disposition", "attachment; filename=" + URLEncoder.encode(rr.getFileName(),"UTF-8").replace("+", "%20")+".docx");
        }

        return rr.getBinData();
    }

    protected User fetchUser(HttpServletResponse response) throws IOException {
        if (user == null) {

            SecurityContext ctx = SecurityContextHolder.getContext();
            if (!ctx.getAuthentication().isAuthenticated()) {
                user = null;
                throw new BadCredentialsException("Login required");
            } else {
                user = repo.findOne(ctx.getAuthentication().getName());
                if(user==null){
                    throw new BadCredentialsException("Login required");
                }
            }
        }
        return user;
    }
}
