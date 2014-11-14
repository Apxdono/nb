package org.apx.nb.repo;

import org.apx.nb.model.Unit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface UnitRepo extends PagingAndSortingRepository<Unit,String> {
}
