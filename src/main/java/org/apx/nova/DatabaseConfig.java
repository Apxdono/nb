package org.apx.nova;

import com.jolbox.bonecp.BoneCPDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.instrument.classloading.InstrumentationLoadTimeWeaver;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.EclipseLinkJpaVendorAdapter;

import javax.persistence.SharedCacheMode;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by oleg on 04.12.2014.
 */
@Configuration
public class DatabaseConfig {

    @Value("${nova.datasource.url}")
    public String dbUrl;

    @Value("${nova.datasource.username}")
    public String dbUser;

    @Value("${nova.datasource.password}")
    public String dbPass;

    @Value("${nova.datasource.driver}")
    public String dbDriver;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        EclipseLinkJpaVendorAdapter vendorAdapter = new EclipseLinkJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(false);

        LocalContainerEntityManagerFactoryBean factory =
                new LocalContainerEntityManagerFactoryBean();
//        factory.setLoadTimeWeaver(loadTimeWeaver());

        factory.setJpaVendorAdapter(vendorAdapter);
        factory.setPackagesToScan("org.apx.nova.model");
        factory.setDataSource(dataSource());
        factory.setSharedCacheMode(SharedCacheMode.NONE);
        factory.setJpaProperties(jpaProperties());
        factory.setPersistenceUnitName("novaDS");
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

    @Bean(name = "dataSource")
    public DataSource dataSource() {
        BoneCPDataSource ds = new BoneCPDataSource();
        ds.setJdbcUrl(dbUrl);
        ds.setDriverClass(dbDriver);
        ds.setUsername(dbUser);
        ds.setPassword(dbPass);
        ds.setMaxConnectionsPerPartition(30);
        ds.setMinConnectionsPerPartition(10);
        ds.setPartitionCount(3);
        ds.setStatementsCacheSize(100);
        return ds;
    }

    private Properties jpaProperties() {
        Properties properties = new Properties();
        try {
            properties = PropertiesLoaderUtils.loadAllProperties("jpa.properties");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return properties;
    }
}
