package com.todo.task_tracker.service;

import org.springframework.stereotype.Service;
import com.todo.task_tracker.repository.TaskRepository;
import com.todo.task_tracker.model.Task;
import java.util.List;


@Service
public class TaskService { 
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
}