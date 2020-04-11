package tacos.service;

import org.springframework.data.jpa.repository.JpaRepository;
import tacos.model.Taco;

public interface TacoService extends JpaRepository<Taco, Long> { }