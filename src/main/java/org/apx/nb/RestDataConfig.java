package org.apx.nb;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestMvcConfiguration;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.metamodel.ManagedType;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * Created by oleg on 12.11.2014.
 */
@Configuration
@Import(RepositoryRestMvcConfiguration.class)
public class RestDataConfig extends RepositoryRestMvcConfiguration {

    @PersistenceContext
    EntityManager em;

    @Override
    protected void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        super.configureRepositoryRestConfiguration(config);
        try {
            config.setBaseUri(new URI("/rest/api"));
            Set<ManagedType<?>> l  = em.getMetamodel().getManagedTypes();
            List<Class<?>> classes = new ArrayList<>();
            for (ManagedType<?> type : l) {
                classes.add(type.getJavaType());
            }
            config.exposeIdsFor(classes.toArray(new Class<?>[]{}));
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
}