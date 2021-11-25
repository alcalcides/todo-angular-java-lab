package com.osvaldoprosper.todo.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.osvaldoprosper.todo.domain.Todo;
import com.osvaldoprosper.todo.repositories.TodoRepository;

@Service
public class DBService {

	@Autowired
	private TodoRepository todoRepository;

	public void instaciaBaseDeDados() throws ParseException {

		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");

		Todo t1 = new Todo(null, "Ler", "Estudar Angular 12 e Spring Boot 2", sdf.parse("25/03/2022"), false);
		Todo t2 = new Todo(null, "Estudar", "Ler livro de desenvolvimento pessoal", sdf.parse("22/03/2022"), true);
		Todo t3 = new Todo(null, "Exercicios", "Praticar exercicios fisicos", sdf.parse("21/03/2022"), false);
		Todo t4 = new Todo(null, "Meditar", "Meditar durante 30 minutos pela manha", sdf.parse("27/03/2022"), true);
  
		todoRepository.saveAll(Arrays.asList(t1, t2, t3, t4));
	}
 
}
