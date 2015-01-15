package org.apx.nova.repo;

import org.apx.nova.model.PrivateClient;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface PrivateClientRepo extends PagingAndSortingRepository<PrivateClient,String> {

}
