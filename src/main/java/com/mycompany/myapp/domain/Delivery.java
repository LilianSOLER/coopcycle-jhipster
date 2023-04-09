package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "cart_id", nullable = false)
    private Long cartId;

    @NotNull
    @Column(name = "courier_id", nullable = false)
    private Long courierId;

    @NotNull
    @Column(name = "restaurant_id", nullable = false)
    private Long restaurantId;

    @NotNull
    @Column(name = "delivery_time", nullable = false)
    private Instant deliveryTime;

    @NotNull
    @Column(name = "pickup_time", nullable = false)
    private Instant pickupTime;

    @ManyToOne
    @JsonIgnoreProperties(value = { "userIds", "cooperativeId" }, allowSetters = true)
    private Member courierId;

    @ManyToOne
    @JsonIgnoreProperties(value = { "menus", "cooperativeId" }, allowSetters = true)
    private Restaurant restaurantId;

    @ManyToOne
    @JsonIgnoreProperties(value = { "deliveries", "userId" }, allowSetters = true)
    private Cart cartId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Delivery id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCartId() {
        return this.cartId;
    }

    public Delivery cartId(Long cartId) {
        this.setCartId(cartId);
        return this;
    }

    public void setCartId(Long cartId) {
        this.cartId = cartId;
    }

    public Long getCourierId() {
        return this.courierId;
    }

    public Delivery courierId(Long courierId) {
        this.setCourierId(courierId);
        return this;
    }

    public void setCourierId(Long courierId) {
        this.courierId = courierId;
    }

    public Long getRestaurantId() {
        return this.restaurantId;
    }

    public Delivery restaurantId(Long restaurantId) {
        this.setRestaurantId(restaurantId);
        return this;
    }

    public void setRestaurantId(Long restaurantId) {
        this.restaurantId = restaurantId;
    }

    public Instant getDeliveryTime() {
        return this.deliveryTime;
    }

    public Delivery deliveryTime(Instant deliveryTime) {
        this.setDeliveryTime(deliveryTime);
        return this;
    }

    public void setDeliveryTime(Instant deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Instant getPickupTime() {
        return this.pickupTime;
    }

    public Delivery pickupTime(Instant pickupTime) {
        this.setPickupTime(pickupTime);
        return this;
    }

    public void setPickupTime(Instant pickupTime) {
        this.pickupTime = pickupTime;
    }

    public Member getCourierId() {
        return this.courierId;
    }

    public void setCourierId(Member member) {
        this.courierId = member;
    }

    public Delivery courierId(Member member) {
        this.setCourierId(member);
        return this;
    }

    public Restaurant getRestaurantId() {
        return this.restaurantId;
    }

    public void setRestaurantId(Restaurant restaurant) {
        this.restaurantId = restaurant;
    }

    public Delivery restaurantId(Restaurant restaurant) {
        this.setRestaurantId(restaurant);
        return this;
    }

    public Cart getCartId() {
        return this.cartId;
    }

    public void setCartId(Cart cart) {
        this.cartId = cart;
    }

    public Delivery cartId(Cart cart) {
        this.setCartId(cart);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Delivery)) {
            return false;
        }
        return id != null && id.equals(((Delivery) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", cartId=" + getCartId() +
            ", courierId=" + getCourierId() +
            ", restaurantId=" + getRestaurantId() +
            ", deliveryTime='" + getDeliveryTime() + "'" +
            ", pickupTime='" + getPickupTime() + "'" +
            "}";
    }
}
