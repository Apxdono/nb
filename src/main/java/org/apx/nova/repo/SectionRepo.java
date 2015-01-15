package org.apx.nova.repo;

import org.apx.nova.model.Section;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface SectionRepo extends BaseRepository<Section,String> {

}