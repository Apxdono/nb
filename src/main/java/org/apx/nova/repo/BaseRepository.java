package org.apx.nova.repo;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.List;

/**
 * Created by oleg on 02.12.2014.
 */
@NoRepositoryBean
public interface BaseRepository<T,ID extends Serializable> extends PagingAndSortingRepository<T,ID> {

    List<T> findByActiveIsTrueOrderByNameAsc();
}
