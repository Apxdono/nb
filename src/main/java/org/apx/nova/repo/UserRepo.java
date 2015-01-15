package org.apx.nova.repo;

import org.apx.nova.model.security.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by oleg on 24.11.2014.
 */
@Repository
public interface UserRepo extends CrudRepository<User,String> {
}
