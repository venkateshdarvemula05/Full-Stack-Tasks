package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Student;
import com.example.demo.service.StudentService;

@RestController

public class StudentController {

@Autowired
StudentService service;

@PostMapping("/add")

public Student addStudent(@RequestBody Student student)
{
return service.saveStudent(student);
}

@GetMapping("/students")

public List<Student> getStudents()
{
return service.getAllStudents();
}

@GetMapping("/dept/{dept}")

public List<Student> getDept(@PathVariable String dept)
{
return service.getByDepartment(dept);
}

@GetMapping("/page/{page}/{size}")

public Page<Student> pagination(
@PathVariable int page,
@PathVariable int size)
{
return service.pagination(page,size);
}

}