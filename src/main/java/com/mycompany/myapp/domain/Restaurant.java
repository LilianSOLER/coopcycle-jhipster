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
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "name", length = 50, nullable = false)
    private String name;

    @Size(max = 255)
    @Column(name = "description", length = 255)
    private String description;

    @NotNull
    @Size(min = 5, max = 255)
    @Column(name = "location", length = 255, nullable = false)
    private String location;

    @NotNull
    @Column(name = "cooperative_id", nullable = false)
    private Long cooperativeId;

    @OneToMany(mappedBy = "restaurantId")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "items", "restaurantId" }, allowSetters = true)
    private Set<Menu> menus = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "restaurants", "members" }, allowSetters = true)
    private Cooperative cooperativeId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Restaurant id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Restaurant name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public Restaurant description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return this.location;
    }

    public Restaurant location(String location) {
        this.setLocation(location);
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getCooperativeId() {
        return this.cooperativeId;
    }

    public Restaurant cooperativeId(Long cooperativeId) {
        this.setCooperativeId(cooperativeId);
        return this;
    }

    public void setCooperativeId(Long cooperativeId) {
        this.cooperativeId = cooperativeId;
    }

    public Set<Menu> getMenus() {
        return this.menus;
    }

    public void setMenus(Set<Menu> menus) {
        if (this.menus != null) {
            this.menus.forEach(i -> i.setRestaurantId(null));
        }
        if (menus != null) {
            menus.forEach(i -> i.setRestaurantId(this));
        }
        this.menus = menus;
    }

    public Restaurant menus(Set<Menu> menus) {
        this.setMenus(menus);
        return this;
    }

    public Restaurant addMenus(Menu menu) {
        this.menus.add(menu);
        menu.setRestaurantId(this);
        return this;
    }

    public Restaurant removeMenus(Menu menu) {
        this.menus.remove(menu);
        menu.setRestaurantId(null);
        return this;
    }

    public Cooperative getCooperativeId() {
        return this.cooperativeId;
    }

    public void setCooperativeId(Cooperative cooperative) {
        this.cooperativeId = cooperative;
    }

    public Restaurant cooperativeId(Cooperative cooperative) {
        this.setCooperativeId(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", location='" + getLocation() + "'" +
            ", cooperativeId=" + getCooperativeId() +
            "}";
    }
}
