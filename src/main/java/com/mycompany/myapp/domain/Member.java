package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.MemberRole;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Member.
 */
@Entity
@Table(name = "member")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Member implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @NotNull
    @Size(min = 2, max = 50)
    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @NotNull
    @Size(max = 254)
    @Column(name = "email", length = 254, nullable = false)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private MemberRole role;

    @NotNull
    @Column(name = "cooperative_id", nullable = false)
    private Long cooperativeId;

    @Column(name = "user_id")
    private Long userId;

    @OneToMany(mappedBy = "member")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "carts", "member" }, allowSetters = true)
    private Set<UserCoopcycle> userIds = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "restaurants", "members" }, allowSetters = true)
    private Cooperative cooperativeId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Member id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Member firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Member lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return this.email;
    }

    public Member email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public MemberRole getRole() {
        return this.role;
    }

    public Member role(MemberRole role) {
        this.setRole(role);
        return this;
    }

    public void setRole(MemberRole role) {
        this.role = role;
    }

    public Long getCooperativeId() {
        return this.cooperativeId;
    }

    public Member cooperativeId(Long cooperativeId) {
        this.setCooperativeId(cooperativeId);
        return this;
    }

    public void setCooperativeId(Long cooperativeId) {
        this.cooperativeId = cooperativeId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public Member userId(Long userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<UserCoopcycle> getUserIds() {
        return this.userIds;
    }

    public void setUserIds(Set<UserCoopcycle> userCoopcycles) {
        if (this.userIds != null) {
            this.userIds.forEach(i -> i.setMember(null));
        }
        if (userCoopcycles != null) {
            userCoopcycles.forEach(i -> i.setMember(this));
        }
        this.userIds = userCoopcycles;
    }

    public Member userIds(Set<UserCoopcycle> userCoopcycles) {
        this.setUserIds(userCoopcycles);
        return this;
    }

    public Member addUserId(UserCoopcycle userCoopcycle) {
        this.userIds.add(userCoopcycle);
        userCoopcycle.setMember(this);
        return this;
    }

    public Member removeUserId(UserCoopcycle userCoopcycle) {
        this.userIds.remove(userCoopcycle);
        userCoopcycle.setMember(null);
        return this;
    }

    public Cooperative getCooperativeId() {
        return this.cooperativeId;
    }

    public void setCooperativeId(Cooperative cooperative) {
        this.cooperativeId = cooperative;
    }

    public Member cooperativeId(Cooperative cooperative) {
        this.setCooperativeId(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Member)) {
            return false;
        }
        return id != null && id.equals(((Member) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Member{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", role='" + getRole() + "'" +
            ", cooperativeId=" + getCooperativeId() +
            ", userId=" + getUserId() +
            "}";
    }
}
