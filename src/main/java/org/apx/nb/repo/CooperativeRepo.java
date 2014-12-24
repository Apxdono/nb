package org.apx.nb.repo;

import org.apx.nb.model.Cooperative;
import org.apx.nb.model.UnitType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface CooperativeRepo extends BaseRepository<Cooperative,String> {

    @Query(value = "SELECT i from Cooperative i WHERE (:name = '' OR lower(i.name) like concat('%', lower(:name), '%')) AND (:chairman = '' OR lower(i.chairman) like concat('%', lower(:chairman) ,'%')) ")
    Page<Cooperative> tableResult(@Param("name") String name,@Param("chairman") String chairman, Pageable pageable);

    List<Cooperative> findByActiveIsTrueOrderByNameAsc();

}
