package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cart.
 */
@Entity
@Table(name = "cart")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cart implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @OneToMany(mappedBy = "cartId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "courierId", "restaurantId", "cartId" }, allowSetters = true)
    private Set<Delivery> deliveries = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "carts", "member" }, allowSetters = true)
    private UserCoopcycle userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cart id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Cart userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<Delivery> getDeliveries() {
        return this.deliveries;
    }

    public void setDeliveries(Set<Delivery> deliveries) {
        if (this.deliveries != null) {
            this.deliveries.forEach(i -> i.setCartId(null));
        }
        if (deliveries != null) {
            deliveries.forEach(i -> i.setCartId(this));
        }
        this.deliveries = deliveries;
    }

    public Cart deliveries(Set<Delivery> deliveries) {
        this.setDeliveries(deliveries);
        return this;
    }

    public Cart addDeliveries(Delivery delivery) {
        this.deliveries.add(delivery);
        delivery.setCartId(this);
        return this;
    }

    public Cart removeDeliveries(Delivery delivery) {
        this.deliveries.remove(delivery);
        delivery.setCartId(null);
        return this;
    }

    public UserCoopcycle getUserId() {
        return this.userId;
    }

    public void setUserId(UserCoopcycle userCoopcycle) {
        this.userId = userCoopcycle;
    }

    public Cart userId(UserCoopcycle userCoopcycle) {
        this.setUserId(userCoopcycle);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cart)) {
            return false;
        }
        return id != null && id.equals(((Cart) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cart{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            "}";
    }
}
