package org.apx.nb.repo;

import org.apx.nb.model.Payment;
import org.apx.nb.model.Price;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface PaymentRepo extends BaseRepository<Payment,String> {

}
