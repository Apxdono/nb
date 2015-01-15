package org.apx.nova.repo;

import org.apx.nova.model.UnitType;
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
public interface UnitTypeRepo extends BaseRepository<UnitType,String> {

    @Query(value = "SELECT i from UnitType i WHERE :name = '' OR lower(i.name) like concat('%',lower(:name),'%')")
    Page<UnitType> tableResult(@Param("name") String name, Pageable pageable);

    List<UnitType> findByActiveIsTrueOrderByNameAsc();
}
