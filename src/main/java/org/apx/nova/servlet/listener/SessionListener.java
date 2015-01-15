package org.apx.nova.servlet.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * Created by oleg on 1/9/15.
 */
public class SessionListener implements HttpSessionListener {

    int timeout=1;

    public SessionListener(int minutes){
        timeout = minutes;
    }

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        event.getSession().setMaxInactiveInterval(timeout * 60);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {

    }
}
