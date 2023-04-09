package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Delivery;
import com.mycompany.myapp.repository.DeliveryRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Delivery}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeliveryResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryResource.class);

    private static final String ENTITY_NAME = "delivery";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryRepository deliveryRepository;

    public DeliveryResource(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    /**
     * {@code POST  /deliveries} : Create a new delivery.
     *
     * @param delivery the delivery to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new delivery, or with status {@code 400 (Bad Request)} if the delivery has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deliveries")
    public ResponseEntity<Delivery> createDelivery(@Valid @RequestBody Delivery delivery) throws URISyntaxException {
        log.debug("REST request to save Delivery : {}", delivery);
        if (delivery.getId() != null) {
            throw new BadRequestAlertException("A new delivery cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Delivery result = deliveryRepository.save(delivery);
        return ResponseEntity
            .created(new URI("/api/deliveries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /deliveries/:id} : Updates an existing delivery.
     *
     * @param id the id of the delivery to save.
     * @param delivery the delivery to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated delivery,
     * or with status {@code 400 (Bad Request)} if the delivery is not valid,
     * or with status {@code 500 (Internal Server Error)} if the delivery couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deliveries/{id}")
    public ResponseEntity<Delivery> updateDelivery(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Delivery delivery
    ) throws URISyntaxException {
        log.debug("REST request to update Delivery : {}, {}", id, delivery);
        if (delivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, delivery.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Delivery result = deliveryRepository.save(delivery);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, delivery.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /deliveries/:id} : Partial updates given fields of an existing delivery, field will ignore if it is null
     *
     * @param id the id of the delivery to save.
     * @param delivery the delivery to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated delivery,
     * or with status {@code 400 (Bad Request)} if the delivery is not valid,
     * or with status {@code 404 (Not Found)} if the delivery is not found,
     * or with status {@code 500 (Internal Server Error)} if the delivery couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/deliveries/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Delivery> partialUpdateDelivery(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Delivery delivery
    ) throws URISyntaxException {
        log.debug("REST request to partial update Delivery partially : {}, {}", id, delivery);
        if (delivery.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, delivery.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deliveryRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Delivery> result = deliveryRepository
            .findById(delivery.getId())
            .map(existingDelivery -> {
                if (delivery.getCartId() != null) {
                    existingDelivery.setCartId(delivery.getCartId());
                }
                if (delivery.getCourierId() != null) {
                    existingDelivery.setCourierId(delivery.getCourierId());
                }
                if (delivery.getRestaurantId() != null) {
                    existingDelivery.setRestaurantId(delivery.getRestaurantId());
                }
                if (delivery.getDeliveryTime() != null) {
                    existingDelivery.setDeliveryTime(delivery.getDeliveryTime());
                }
                if (delivery.getPickupTime() != null) {
                    existingDelivery.setPickupTime(delivery.getPickupTime());
                }

                return existingDelivery;
            })
            .map(deliveryRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, delivery.getId().toString())
        );
    }

    /**
     * {@code GET  /deliveries} : get all the deliveries.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveries in body.
     */
    @GetMapping("/deliveries")
    public List<Delivery> getAllDeliveries() {
        log.debug("REST request to get all Deliveries");
        return deliveryRepository.findAll();
    }

    /**
     * {@code GET  /deliveries/:id} : get the "id" delivery.
     *
     * @param id the id of the delivery to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the delivery, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deliveries/{id}")
    public ResponseEntity<Delivery> getDelivery(@PathVariable Long id) {
        log.debug("REST request to get Delivery : {}", id);
        Optional<Delivery> delivery = deliveryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(delivery);
    }

    /**
     * {@code DELETE  /deliveries/:id} : delete the "id" delivery.
     *
     * @param id the id of the delivery to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deliveries/{id}")
    public ResponseEntity<Void> deleteDelivery(@PathVariable Long id) {
        log.debug("REST request to delete Delivery : {}", id);
        deliveryRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
