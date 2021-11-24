package de.neuefische.backend.security.service;


import de.neuefische.backend.security.repo.AppUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AppUserDetailService implements UserDetailsService {

    private final AppUserRepo appUserRepo;

    @Autowired
    public AppUserDetailService(AppUserRepo appUserRepo) {
        this.appUserRepo = appUserRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return appUserRepo.findById(username)
                .map(appUser -> User
                        .withUsername(username)
                        .password(appUser.getPassword())
                        .authorities("user")
                        .build())
                .orElseThrow(() -> new UsernameNotFoundException("Username '" + username + "' does not exist!"));
    }
}

