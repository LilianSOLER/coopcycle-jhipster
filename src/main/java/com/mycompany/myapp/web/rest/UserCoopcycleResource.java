package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.UserCoopcycle;
import com.mycompany.myapp.repository.UserCoopcycleRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.UserCoopcycle}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserCoopcycleResource {

    private final Logger log = LoggerFactory.getLogger(UserCoopcycleResource.class);

    private static final String ENTITY_NAME = "userCoopcycle";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserCoopcycleRepository userCoopcycleRepository;

    public UserCoopcycleResource(UserCoopcycleRepository userCoopcycleRepository) {
        this.userCoopcycleRepository = userCoopcycleRepository;
    }

    /**
     * {@code POST  /user-coopcycles} : Create a new userCoopcycle.
     *
     * @param userCoopcycle the userCoopcycle to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userCoopcycle, or with status {@code 400 (Bad Request)} if the userCoopcycle has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-coopcycles")
    public ResponseEntity<UserCoopcycle> createUserCoopcycle(@Valid @RequestBody UserCoopcycle userCoopcycle) throws URISyntaxException {
        log.debug("REST request to save UserCoopcycle : {}", userCoopcycle);
        if (userCoopcycle.getId() != null) {
            throw new BadRequestAlertException("A new userCoopcycle cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCoopcycle result = userCoopcycleRepository.save(userCoopcycle);
        return ResponseEntity
            .created(new URI("/api/user-coopcycles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-coopcycles/:id} : Updates an existing userCoopcycle.
     *
     * @param id the id of the userCoopcycle to save.
     * @param userCoopcycle the userCoopcycle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCoopcycle,
     * or with status {@code 400 (Bad Request)} if the userCoopcycle is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userCoopcycle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-coopcycles/{id}")
    public ResponseEntity<UserCoopcycle> updateUserCoopcycle(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody UserCoopcycle userCoopcycle
    ) throws URISyntaxException {
        log.debug("REST request to update UserCoopcycle : {}, {}", id, userCoopcycle);
        if (userCoopcycle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userCoopcycle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userCoopcycleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        UserCoopcycle result = userCoopcycleRepository.save(userCoopcycle);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCoopcycle.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /user-coopcycles/:id} : Partial updates given fields of an existing userCoopcycle, field will ignore if it is null
     *
     * @param id the id of the userCoopcycle to save.
     * @param userCoopcycle the userCoopcycle to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCoopcycle,
     * or with status {@code 400 (Bad Request)} if the userCoopcycle is not valid,
     * or with status {@code 404 (Not Found)} if the userCoopcycle is not found,
     * or with status {@code 500 (Internal Server Error)} if the userCoopcycle couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/user-coopcycles/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<UserCoopcycle> partialUpdateUserCoopcycle(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody UserCoopcycle userCoopcycle
    ) throws URISyntaxException {
        log.debug("REST request to partial update UserCoopcycle partially : {}, {}", id, userCoopcycle);
        if (userCoopcycle.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, userCoopcycle.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!userCoopcycleRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<UserCoopcycle> result = userCoopcycleRepository
            .findById(userCoopcycle.getId())
            .map(existingUserCoopcycle -> {
                if (userCoopcycle.getLogin() != null) {
                    existingUserCoopcycle.setLogin(userCoopcycle.getLogin());
                }
                if (userCoopcycle.getPassword() != null) {
                    existingUserCoopcycle.setPassword(userCoopcycle.getPassword());
                }
                if (userCoopcycle.getFirstName() != null) {
                    existingUserCoopcycle.setFirstName(userCoopcycle.getFirstName());
                }
                if (userCoopcycle.getLastName() != null) {
                    existingUserCoopcycle.setLastName(userCoopcycle.getLastName());
                }
                if (userCoopcycle.getEmail() != null) {
                    existingUserCoopcycle.setEmail(userCoopcycle.getEmail());
                }
                if (userCoopcycle.getLocation() != null) {
                    existingUserCoopcycle.setLocation(userCoopcycle.getLocation());
                }
                if (userCoopcycle.getActivated() != null) {
                    existingUserCoopcycle.setActivated(userCoopcycle.getActivated());
                }
                if (userCoopcycle.getAuthorities() != null) {
                    existingUserCoopcycle.setAuthorities(userCoopcycle.getAuthorities());
                }

                return existingUserCoopcycle;
            })
            .map(userCoopcycleRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCoopcycle.getId().toString())
        );
    }

    /**
     * {@code GET  /user-coopcycles} : get all the userCoopcycles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userCoopcycles in body.
     */
    @GetMapping("/user-coopcycles")
    public List<UserCoopcycle> getAllUserCoopcycles() {
        log.debug("REST request to get all UserCoopcycles");
        return userCoopcycleRepository.findAll();
    }

    /**
     * {@code GET  /user-coopcycles/:id} : get the "id" userCoopcycle.
     *
     * @param id the id of the userCoopcycle to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userCoopcycle, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-coopcycles/{id}")
    public ResponseEntity<UserCoopcycle> getUserCoopcycle(@PathVariable Long id) {
        log.debug("REST request to get UserCoopcycle : {}", id);
        Optional<UserCoopcycle> userCoopcycle = userCoopcycleRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userCoopcycle);
    }

    /**
     * {@code DELETE  /user-coopcycles/:id} : delete the "id" userCoopcycle.
     *
     * @param id the id of the userCoopcycle to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-coopcycles/{id}")
    public ResponseEntity<Void> deleteUserCoopcycle(@PathVariable Long id) {
        log.debug("REST request to delete UserCoopcycle : {}", id);
        userCoopcycleRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
