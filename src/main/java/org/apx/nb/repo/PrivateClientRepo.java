package org.apx.nb.repo;

import org.apx.nb.model.Client;
import org.apx.nb.model.PrivateClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface PrivateClientRepo extends PagingAndSortingRepository<PrivateClient,String> {

}
