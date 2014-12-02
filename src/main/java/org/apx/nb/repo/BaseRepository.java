package org.apx.nb.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.Serializable;
import java.util.List;

/**
 * Created by oleg on 02.12.2014.
 */
@NoRepositoryBean
public interface BaseRepository<T,ID extends Serializable> extends PagingAndSortingRepository<T,ID> {

    List<T> findByActiveIsTrueOrderByNameAsc();
}
