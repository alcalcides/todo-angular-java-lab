export interface Todo {
  id?: String; //optional
  titulo: String;
  descricao?: String;
  dataParaFinalizar: Date;
  finalizado: Boolean;
}
