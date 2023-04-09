package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.UserCoopcycle;
import com.mycompany.myapp.repository.UserCoopcycleRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UserCoopcycleResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UserCoopcycleResourceIT {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_LAST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_LAST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVATED = false;
    private static final Boolean UPDATED_ACTIVATED = true;

    private static final String DEFAULT_AUTHORITIES = "AAAAAAAAAA";
    private static final String UPDATED_AUTHORITIES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/user-coopcycles";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UserCoopcycleRepository userCoopcycleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserCoopcycleMockMvc;

    private UserCoopcycle userCoopcycle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCoopcycle createEntity(EntityManager em) {
        UserCoopcycle userCoopcycle = new UserCoopcycle()
            .login(DEFAULT_LOGIN)
            .password(DEFAULT_PASSWORD)
            .firstName(DEFAULT_FIRST_NAME)
            .lastName(DEFAULT_LAST_NAME)
            .email(DEFAULT_EMAIL)
            .location(DEFAULT_LOCATION)
            .activated(DEFAULT_ACTIVATED)
            .authorities(DEFAULT_AUTHORITIES);
        return userCoopcycle;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCoopcycle createUpdatedEntity(EntityManager em) {
        UserCoopcycle userCoopcycle = new UserCoopcycle()
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .location(UPDATED_LOCATION)
            .activated(UPDATED_ACTIVATED)
            .authorities(UPDATED_AUTHORITIES);
        return userCoopcycle;
    }

    @BeforeEach
    public void initTest() {
        userCoopcycle = createEntity(em);
    }

    @Test
    @Transactional
    void createUserCoopcycle() throws Exception {
        int databaseSizeBeforeCreate = userCoopcycleRepository.findAll().size();
        // Create the UserCoopcycle
        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isCreated());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeCreate + 1);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testUserCoopcycle.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testUserCoopcycle.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testUserCoopcycle.getLastName()).isEqualTo(DEFAULT_LAST_NAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUserCoopcycle.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testUserCoopcycle.getActivated()).isEqualTo(DEFAULT_ACTIVATED);
        assertThat(testUserCoopcycle.getAuthorities()).isEqualTo(DEFAULT_AUTHORITIES);
    }

    @Test
    @Transactional
    void createUserCoopcycleWithExistingId() throws Exception {
        // Create the UserCoopcycle with an existing ID
        userCoopcycle.setId(1L);

        int databaseSizeBeforeCreate = userCoopcycleRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkLoginIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setLogin(null);

        // Create the UserCoopcycle, which fails.

        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkPasswordIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setPassword(null);

        // Create the UserCoopcycle, which fails.

        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setEmail(null);

        // Create the UserCoopcycle, which fails.

        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setLocation(null);

        // Create the UserCoopcycle, which fails.

        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkAuthoritiesIsRequired() throws Exception {
        int databaseSizeBeforeTest = userCoopcycleRepository.findAll().size();
        // set the field null
        userCoopcycle.setAuthorities(null);

        // Create the UserCoopcycle, which fails.

        restUserCoopcycleMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isBadRequest());

        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUserCoopcycles() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        // Get all the userCoopcycleList
        restUserCoopcycleMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCoopcycle.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD)))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME)))
            .andExpect(jsonPath("$.[*].lastName").value(hasItem(DEFAULT_LAST_NAME)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION)))
            .andExpect(jsonPath("$.[*].activated").value(hasItem(DEFAULT_ACTIVATED.booleanValue())))
            .andExpect(jsonPath("$.[*].authorities").value(hasItem(DEFAULT_AUTHORITIES)));
    }

    @Test
    @Transactional
    void getUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        // Get the userCoopcycle
        restUserCoopcycleMockMvc
            .perform(get(ENTITY_API_URL_ID, userCoopcycle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userCoopcycle.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(DEFAULT_LAST_NAME))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION))
            .andExpect(jsonPath("$.activated").value(DEFAULT_ACTIVATED.booleanValue()))
            .andExpect(jsonPath("$.authorities").value(DEFAULT_AUTHORITIES));
    }

    @Test
    @Transactional
    void getNonExistingUserCoopcycle() throws Exception {
        // Get the userCoopcycle
        restUserCoopcycleMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();

        // Update the userCoopcycle
        UserCoopcycle updatedUserCoopcycle = userCoopcycleRepository.findById(userCoopcycle.getId()).get();
        // Disconnect from session so that the updates on updatedUserCoopcycle are not directly saved in db
        em.detach(updatedUserCoopcycle);
        updatedUserCoopcycle
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .location(UPDATED_LOCATION)
            .activated(UPDATED_ACTIVATED)
            .authorities(UPDATED_AUTHORITIES);

        restUserCoopcycleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUserCoopcycle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUserCoopcycle))
            )
            .andExpect(status().isOk());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testUserCoopcycle.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUserCoopcycle.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testUserCoopcycle.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserCoopcycle.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testUserCoopcycle.getActivated()).isEqualTo(UPDATED_ACTIVATED);
        assertThat(testUserCoopcycle.getAuthorities()).isEqualTo(UPDATED_AUTHORITIES);
    }

    @Test
    @Transactional
    void putNonExistingUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, userCoopcycle.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userCoopcycle))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(userCoopcycle))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(userCoopcycle)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUserCoopcycleWithPatch() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();

        // Update the userCoopcycle using partial update
        UserCoopcycle partialUpdatedUserCoopcycle = new UserCoopcycle();
        partialUpdatedUserCoopcycle.setId(userCoopcycle.getId());

        partialUpdatedUserCoopcycle
            .password(UPDATED_PASSWORD)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .activated(UPDATED_ACTIVATED)
            .authorities(UPDATED_AUTHORITIES);

        restUserCoopcycleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserCoopcycle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserCoopcycle))
            )
            .andExpect(status().isOk());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testUserCoopcycle.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUserCoopcycle.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testUserCoopcycle.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserCoopcycle.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testUserCoopcycle.getActivated()).isEqualTo(UPDATED_ACTIVATED);
        assertThat(testUserCoopcycle.getAuthorities()).isEqualTo(UPDATED_AUTHORITIES);
    }

    @Test
    @Transactional
    void fullUpdateUserCoopcycleWithPatch() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();

        // Update the userCoopcycle using partial update
        UserCoopcycle partialUpdatedUserCoopcycle = new UserCoopcycle();
        partialUpdatedUserCoopcycle.setId(userCoopcycle.getId());

        partialUpdatedUserCoopcycle
            .login(UPDATED_LOGIN)
            .password(UPDATED_PASSWORD)
            .firstName(UPDATED_FIRST_NAME)
            .lastName(UPDATED_LAST_NAME)
            .email(UPDATED_EMAIL)
            .location(UPDATED_LOCATION)
            .activated(UPDATED_ACTIVATED)
            .authorities(UPDATED_AUTHORITIES);

        restUserCoopcycleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUserCoopcycle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUserCoopcycle))
            )
            .andExpect(status().isOk());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
        UserCoopcycle testUserCoopcycle = userCoopcycleList.get(userCoopcycleList.size() - 1);
        assertThat(testUserCoopcycle.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testUserCoopcycle.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testUserCoopcycle.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testUserCoopcycle.getLastName()).isEqualTo(UPDATED_LAST_NAME);
        assertThat(testUserCoopcycle.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUserCoopcycle.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testUserCoopcycle.getActivated()).isEqualTo(UPDATED_ACTIVATED);
        assertThat(testUserCoopcycle.getAuthorities()).isEqualTo(UPDATED_AUTHORITIES);
    }

    @Test
    @Transactional
    void patchNonExistingUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, userCoopcycle.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userCoopcycle))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(userCoopcycle))
            )
            .andExpect(status().isBadRequest());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUserCoopcycle() throws Exception {
        int databaseSizeBeforeUpdate = userCoopcycleRepository.findAll().size();
        userCoopcycle.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUserCoopcycleMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(userCoopcycle))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the UserCoopcycle in the database
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUserCoopcycle() throws Exception {
        // Initialize the database
        userCoopcycleRepository.saveAndFlush(userCoopcycle);

        int databaseSizeBeforeDelete = userCoopcycleRepository.findAll().size();

        // Delete the userCoopcycle
        restUserCoopcycleMockMvc
            .perform(delete(ENTITY_API_URL_ID, userCoopcycle.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserCoopcycle> userCoopcycleList = userCoopcycleRepository.findAll();
        assertThat(userCoopcycleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
