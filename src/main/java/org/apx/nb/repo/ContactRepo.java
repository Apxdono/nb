package org.apx.nb.repo;

import org.apx.nb.model.Client;
import org.apx.nb.model.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PostAuthorize;

/**
 * Created by oleg on 11/12/14.
 */

@RepositoryRestResource
//    @NoRepositoryBean
public interface ContactRepo extends PagingAndSortingRepository<Contact,String> {

    @Override
    void delete(String s);

    @Override
    void delete(Contact entity);

    @Override
    void delete(Iterable<? extends Contact> entities);

    @Override
    <E extends Contact> Iterable<E> save(Iterable<E> entities);
}
