package com.todo.task_tracker.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.task_tracker.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // can add custom queries here if needed
}