package org.apx.nb.repo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import org.apx.nb.model.Client;
import org.apx.nb.model.PrivateClient;
import org.apx.nb.model.UnitType;
import org.apx.nb.model.Views;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource()
@PostAuthorize(value = "hasRole('superuser')")
public interface ClientRepo extends PagingAndSortingRepository<Client,String> {

    @JsonView(Views.Shallow.class)
    @Query(value = "SELECT i from Client i WHERE (:name = '' OR lower(i.name) like concat('%', lower(:name) ,'%'))")
    Page<Client> tableResult(@Param("name") String name, Pageable pageable);


    @Query(value = "SELECT i from Client i WHERE (:criteria = '' OR lower(i.name) like concat('%', lower(:criteria) ,'%')) ORDER BY i.name")
    List<Client> autocomplete(@Param("criteria")String criteria);
}
