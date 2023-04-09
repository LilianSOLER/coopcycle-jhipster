package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Member;
import com.mycompany.myapp.repository.MemberRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Member}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MemberResource {

    private final Logger log = LoggerFactory.getLogger(MemberResource.class);

    private static final String ENTITY_NAME = "member";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MemberRepository memberRepository;

    public MemberResource(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * {@code POST  /members} : Create a new member.
     *
     * @param member the member to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new member, or with status {@code 400 (Bad Request)} if the member has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/members")
    public ResponseEntity<Member> createMember(@Valid @RequestBody Member member) throws URISyntaxException {
        log.debug("REST request to save Member : {}", member);
        if (member.getId() != null) {
            throw new BadRequestAlertException("A new member cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Member result = memberRepository.save(member);
        return ResponseEntity
            .created(new URI("/api/members/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /members/:id} : Updates an existing member.
     *
     * @param id the id of the member to save.
     * @param member the member to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated member,
     * or with status {@code 400 (Bad Request)} if the member is not valid,
     * or with status {@code 500 (Internal Server Error)} if the member couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/members/{id}")
    public ResponseEntity<Member> updateMember(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Member member
    ) throws URISyntaxException {
        log.debug("REST request to update Member : {}, {}", id, member);
        if (member.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, member.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!memberRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Member result = memberRepository.save(member);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, member.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /members/:id} : Partial updates given fields of an existing member, field will ignore if it is null
     *
     * @param id the id of the member to save.
     * @param member the member to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated member,
     * or with status {@code 400 (Bad Request)} if the member is not valid,
     * or with status {@code 404 (Not Found)} if the member is not found,
     * or with status {@code 500 (Internal Server Error)} if the member couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/members/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Member> partialUpdateMember(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Member member
    ) throws URISyntaxException {
        log.debug("REST request to partial update Member partially : {}, {}", id, member);
        if (member.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, member.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!memberRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Member> result = memberRepository
            .findById(member.getId())
            .map(existingMember -> {
                if (member.getFirstName() != null) {
                    existingMember.setFirstName(member.getFirstName());
                }
                if (member.getLastName() != null) {
                    existingMember.setLastName(member.getLastName());
                }
                if (member.getEmail() != null) {
                    existingMember.setEmail(member.getEmail());
                }
                if (member.getRole() != null) {
                    existingMember.setRole(member.getRole());
                }
                if (member.getCooperativeId() != null) {
                    existingMember.setCooperativeId(member.getCooperativeId());
                }
                if (member.getUserId() != null) {
                    existingMember.setUserId(member.getUserId());
                }

                return existingMember;
            })
            .map(memberRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, member.getId().toString())
        );
    }

    /**
     * {@code GET  /members} : get all the members.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of members in body.
     */
    @GetMapping("/members")
    public List<Member> getAllMembers() {
        log.debug("REST request to get all Members");
        return memberRepository.findAll();
    }

    /**
     * {@code GET  /members/:id} : get the "id" member.
     *
     * @param id the id of the member to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the member, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/members/{id}")
    public ResponseEntity<Member> getMember(@PathVariable Long id) {
        log.debug("REST request to get Member : {}", id);
        Optional<Member> member = memberRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(member);
    }

    /**
     * {@code DELETE  /members/:id} : delete the "id" member.
     *
     * @param id the id of the member to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/members/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        log.debug("REST request to delete Member : {}", id);
        memberRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
