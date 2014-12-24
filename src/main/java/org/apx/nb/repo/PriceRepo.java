package org.apx.nb.repo;

import org.apx.nb.model.Price;
import org.apx.nb.model.UnitType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface PriceRepo extends BaseRepository<Price,String> {

}
