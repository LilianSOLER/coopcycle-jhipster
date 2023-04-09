package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class UserCoopcycleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCoopcycle.class);
        UserCoopcycle userCoopcycle1 = new UserCoopcycle();
        userCoopcycle1.setId(1L);
        UserCoopcycle userCoopcycle2 = new UserCoopcycle();
        userCoopcycle2.setId(userCoopcycle1.getId());
        assertThat(userCoopcycle1).isEqualTo(userCoopcycle2);
        userCoopcycle2.setId(2L);
        assertThat(userCoopcycle1).isNotEqualTo(userCoopcycle2);
        userCoopcycle1.setId(null);
        assertThat(userCoopcycle1).isNotEqualTo(userCoopcycle2);
    }
}
