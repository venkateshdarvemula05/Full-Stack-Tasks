package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;

@Service
public class StudentService {

@Autowired
StudentRepository repo;

public Student saveStudent(Student student)
{
return repo.save(student);
}

public List<Student> getAllStudents()
{
return repo.findAll();
}

public List<Student> getByDepartment(String dept)
{
return repo.findByDepartment(dept);
}

public Page<Student> pagination(int page,int size)
{
return repo.findAll(PageRequest.of(page,size));
}

}