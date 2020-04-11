package com.example.service;

import com.example.model.Taco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TacoService extends JpaRepository<Taco, Long> { }