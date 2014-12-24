package org.apx.nb;

import com.jolbox.bonecp.BoneCPDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;

import javax.persistence.SharedCacheMode;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by oleg on 04.12.2014.
 */
@Configuration
public class DatabaseConfig {
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        EclipseLinkJpaVendorAdapter vendorAdapter = new EclipseLinkJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(false);

        LocalContainerEntityManagerFactoryBean factory =
                new LocalContainerEntityManagerFactoryBean();
//        factory.setLoadTimeWeaver(loadTimeWeaver());

        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("org.apx.nb.model");
        factory.setDataSource(dataSource());
        factory.setSharedCacheMode(SharedCacheMode.NONE);
        factory.setJpaProperties(jpaProperties());
        return factory;
    }

//    @Bean
    public InstrumentationLoadTimeWeaver loadTimeWeaver(){
        InstrumentationLoadTimeWeaver weaver = new InstrumentationLoadTimeWeaver();
        return weaver;
    }

    @Bean
    public JpaTransactionManager transactionManager() {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory().getObject());
        return txManager;
    }

    @Bean
    public PersistenceExceptionTranslationPostProcessor persistenceExceptionTranslationPostProcessor() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    @Bean
    public DataSource dataSource() {
        BoneCPDataSource ds = new BoneCPDataSource();
        ds.setJdbcUrl("jdbc:postgresql://localhost:5432/nb");
        ds.setDriverClass("org.postgresql.Driver");
        ds.setUsername("postgres");
        ds.setPassword("postgres");
        ds.setMaxConnectionsPerPartition(30);
        ds.setMinConnectionsPerPartition(10);
        ds.setPartitionCount(3);
        ds.setStatementsCacheSize(100);
        return ds;
    }

    private Properties jpaProperties() {
        Properties properties = new Properties();
        //use whatever EclipseLink properties you like
        properties.put("eclipselink.weaving","false");
        properties.put("eclipselink.ddl-generation","create-or-extend-tables");
        properties.put("eclipselink.ddl-generation.output-mode","database");
        return properties;
    }
}
