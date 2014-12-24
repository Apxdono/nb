package org.apx.nb.repo;

import org.apx.nb.model.Section;
import org.apx.nb.model.Unit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface SectionRepo extends BaseRepository<Section,String> {

}
