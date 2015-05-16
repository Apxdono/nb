package org.apx.nova.repo;

import org.apx.nova.model.Cooperative;
import org.apx.nova.model.House;
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
public interface HouseRepo extends PagingAndSortingRepository<House,String> {

    @Query(value = "SELECT i from House i WHERE (:address = '' OR lower(i.address) like concat('%', lower(:address) ,'%')) AND ( :structuralNumber='' OR i.structuralNumber = :structuralNumber) AND (:zipCode = '' OR i.zipCode = :zipCode)")
    Page<House> tableResult(@Param("address") String address, @Param("structuralNumber") String structuralNumber, @Param("zipCode") String zipCode, Pageable pageable);

    @Query(value = "SELECT i from House i WHERE (:criteria = '' OR lower(i.address) like concat('%', lower(:criteria) ,'%') OR lower(i.structuralNumber) like concat('%', lower(:criteria) ,'%')  ) ORDER BY i.name")
    List<House> autocomplete(@Param("criteria") String criteria);
}
