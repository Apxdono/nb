package org.apx.nova.repo;

import org.apx.nova.model.Contact;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

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
