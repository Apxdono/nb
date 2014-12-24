package org.apx.nb.repo;

import org.apx.nb.model.Company;
import org.apx.nb.model.PrivateClient;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface CompanyRepo extends PagingAndSortingRepository<Company,String> {

}
