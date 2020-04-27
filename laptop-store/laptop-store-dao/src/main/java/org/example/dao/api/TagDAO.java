package org.example.dao.api;

import org.example.model.Tag;

import javax.ejb.Local;
import java.util.List;

@Local
public interface TagDAO {
    List<Tag> findAll();
}
