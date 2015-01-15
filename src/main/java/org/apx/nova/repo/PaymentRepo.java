package org.apx.nova.repo;

import org.apx.nova.model.Payment;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by oleg on 11/12/14.
 */
@RepositoryRestResource
public interface PaymentRepo extends BaseRepository<Payment,String> {

}
